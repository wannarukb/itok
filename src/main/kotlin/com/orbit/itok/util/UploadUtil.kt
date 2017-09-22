package com.lpa.abtc.util


import com.google.appengine.api.appidentity.AppIdentityServiceFactory
import com.google.appengine.api.blobstore.*
import com.google.appengine.api.images.ImagesServiceFactory
import com.google.appengine.api.images.ServingUrlOptions
import com.orbit.itok.service.UploadedImage
import javax.mail.internet.MimeUtility
import javax.servlet.http.HttpServletRequest

/**
 * Created by cmmad_000 on 6/3/2016.
 */
class UploadUtil {
    val PORTRAIT_WIDTH = 300
    val PORTRAIT_HEIGHT = 400
    val SIGNATURE_WIDTH = 100
    val SIGNATURE_HEIGHT = 75
    private val ONE_MEGABYTE = 1024 * 1024
    private val TWO_MEGABYTE = 2 * 1024 * 1024

    fun processImageFile(request: HttpServletRequest, remove: Boolean = false): MutableList<UploadedImage> {
        val paramName = "file[]"
        return processImageFile(paramName, request, remove)
    }

    fun processImageFile(paramName: String, request: HttpServletRequest, remove: Boolean = false): MutableList<UploadedImage> {
        val imagesService = ImagesServiceFactory.getImagesService()
        val blobStoreService = BlobstoreServiceFactory.getBlobstoreService()
        val output = mutableListOf<UploadedImage>()


        val keys = blobStoreService.getUploads(request)[paramName]
        val info = blobStoreService.getFileInfos(request)[paramName]

        var counter = 0
        if (info != null) {
            for (item in info) {
                var key = keys!!.get(counter++)
                if (item.size.equals(0.toLong()) || item.size > TWO_MEGABYTE) {
                    blobStoreService.delete(key)
                } else {
                    if (isImage(item)) {
//                        val imageUrl = imagesService.getServingUrl(ServingUrlOptions.Builder.withBlobKey(key).secureUrl(true))
                        output.add(UploadedImage(key = key.keyString, isImage = true))
                    } else if (remove) {
                        blobStoreService.delete(key)
                    }
                }
            }
        }
        return output
    }


    fun processPdfOrImageFile(paramName: String, request: HttpServletRequest, remove: Boolean = false): MutableList<UploadedImage> {
        val imagesService = ImagesServiceFactory.getImagesService()
        val blobStoreService = BlobstoreServiceFactory.getBlobstoreService()
        val output = mutableListOf<UploadedImage>()


        val keys = blobStoreService.getUploads(request)[paramName]
        val info = blobStoreService.getFileInfos(request)[paramName]

        var counter = 0
        if (info != null) {
            for (item in info) {
                var key = keys!!.get(counter++)
                if (item.size.equals(0.toLong())) {
                    blobStoreService.delete(key)
                } else {
                    if (isImage(item)) {
                        // check size must be less than 1 MB to proceed
                        if (item.size < TWO_MEGABYTE) {
//                            val imageUrl = imagesService.getServingUrl(ServingUrlOptions.Builder.withBlobKey(key).secureUrl(true))
                            output.add(UploadedImage(key = key.keyString, isImage = true))
                        } else blobStoreService.delete(key)
                    } else if (isPdf(item)) {
                        output.add(UploadedImage(key = key.keyString))
                    } else if (remove) {
                        blobStoreService.delete(key)
                    }
                }
            }
        }
        return output
    }

    fun fillImageUrl(uploadedImage: UploadedImage) {
        if (uploadedImage.isImage) {
            val imagesService = ImagesServiceFactory.getImagesService()
            val servingUrl = imagesService.getServingUrl(ServingUrlOptions.Builder.withBlobKey(BlobKey(uploadedImage.key)).secureUrl(true))
            uploadedImage.imageUrl = servingUrl
        }
    }

    private fun isPdf(item: FileInfo): Boolean {
        val filename = item.filename
        val after = MimeUtility.decodeText(filename)

        return after.toLowerCase().endsWith("pdf")
    }

    private fun isImage(item: FileInfo): Boolean {
        val filename = item.filename
        val after = MimeUtility.decodeText(filename)

        return after.toLowerCase().endsWith("jpg") || after.toLowerCase().endsWith("png") || after.toLowerCase().endsWith("gif")
    }

    fun processFile(request: HttpServletRequest): MutableList<UploadedFile> {
        val paramName = "file[]"
        return processFile(paramName, request)
    }

    fun processFile(paramName: String, request: HttpServletRequest): MutableList<UploadedFile> {
        val blobstoreService = BlobstoreServiceFactory.getBlobstoreService()
        val output = mutableListOf<UploadedFile>()


        val keys = blobstoreService.getUploads(request)[paramName]
        val info = blobstoreService.getFileInfos(request)[paramName]

        var counter = 0
        if (info != null) {
            for (item in info) {
                var key = keys!!.get(counter++)
                if (item.size.equals(0.toLong())) {
                    blobstoreService.delete(key)
                } else {
                    if (!isImage(item))
                        output.add(UploadedFile(key = key.keyString, fileName = item.filename))
                }
            }
        }


        return output
    }

    fun getUrl(url: String, folder: String): String {
        val blobstoreService = BlobstoreServiceFactory.getBlobstoreService()
        var option = UploadOptions.Builder.withGoogleStorageBucketName("${AppIdentityServiceFactory.getAppIdentityService().defaultGcsBucketName}/$folder")
        return blobstoreService.createUploadUrl(url, option)
    }

    fun deleteImage(image: UploadedImage?) {
        if (image == null || image.key.isEmpty()) return
        val imagesService = ImagesServiceFactory.getImagesService()
        val blobstoreService = BlobstoreServiceFactory.getBlobstoreService()
        val blobKey = BlobKey(image.key)
        try {
            imagesService.deleteServingUrl(blobKey)
        } catch (e: Exception) {
        }
        try {
            blobstoreService.delete(blobKey)
        } catch (e: Exception) {
        }
    }

    fun deleteImages(images: MutableList<UploadedImage?>) {
        for (image in images) {
            deleteImage(image)
        }
    }

    fun deleteFiles(files: MutableList<UploadedFile>) {
        for (file in files) {
            deleteFile(file)
        }
    }

    fun deleteFile(file: UploadedFile) {
        val blobstoreService = BlobstoreServiceFactory.getBlobstoreService()
        try {
            blobstoreService.delete(BlobKey(file.key))
        } catch (e: Exception) {
        }
    }

    fun cleanRequestFile(request: HttpServletRequest, listOf: List<String>) {
        val blobstoreService = BlobstoreServiceFactory.getBlobstoreService()
        val uploads = blobstoreService.getUploads(request)
        for ((k, v) in uploads) {
            if (!listOf.contains(k)) {
                v.forEach { blobstoreService.delete(BlobKey(it.keyString)) }
            }
        }
    }

    fun checkResolution(image: UploadedImage, width: Int, height: Int): Boolean {
        try {
            val data = BlobstoreServiceFactory.getBlobstoreService().fetchData(BlobKey(image.key), 0, BlobstoreService.MAX_BLOB_FETCH_SIZE.toLong() - 1)
            val makeImageFromBlob = ImagesServiceFactory.makeImage(data)
            if (makeImageFromBlob.width < width || makeImageFromBlob.height < height) return false
            else return true

        } catch (e: Exception) {
            return false
        }
    }

    fun getPdfOrImage(uploadedImage: UploadedImage?): String? {
        if (uploadedImage == null) return null
        else {
            if (uploadedImage.imageUrl != null) return uploadedImage.imageUrl as String
            else return "/document/${uploadedImage.key}/document.pdf"
        }
    }

    fun hasDocument(uploadedImage: UploadedImage?): Boolean {
        if (uploadedImage == null) return false
        return true

    }

}

data class UploadedFile(var key: String? = "", var fileName: String? = "") {

}
