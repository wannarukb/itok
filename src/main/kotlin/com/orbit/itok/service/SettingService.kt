package com.orbit.itok.service

import org.springframework.context.ResourceLoaderAware
import org.springframework.core.io.ResourceLoader
import org.springframework.stereotype.Service

/**
 * Created For RIDMIS Web service
 */
interface SettingService {
}

@Service
class SettingServiceImpl : SettingService, ResourceLoaderAware {
    lateinit var loader: ResourceLoader
    var posessionDocuments: List<String> = listOf()
        get() {
            if (field.isEmpty()) {
                val file = loader.getResource("classpath:posessionDocument.txt").file
                field = file.readLines()
            }
            return field
        }
    var basins: List<String> = listOf()
        get() {
            if (field.isEmpty()) {
                val ifle = loader.getResource("classpath:basin.txt").file
                field = ifle.readLines()
            }
            return field
        }
    var memberTypes: List<String> = listOf()
        get() {
            if (field.isEmpty()) {
                val file = loader.getResource("classpath:memberType.txt").file
                field = file.readLines()
            }
            return field

        }
    var jobTypes: List<String> = listOf()
        get() {
            if (field.isEmpty()) {
                val file = loader.getResource("classpath:jobType.txt").file
                field = file.readLines()
            }
            return field

        }
    var organizationTypes: List<String> = listOf()
        get() {
            if (field.isEmpty()) {
                val file = loader.getResource("classpath:organizationType.txt").file
                field = file.readLines()
            }
            return field

        }


    override fun setResourceLoader(p0: ResourceLoader) {
        this.loader = p0
    }

    fun getAppName(): String = "ITOK"


}