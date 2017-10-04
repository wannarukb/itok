package com.orbit.itok.web

import com.google.appengine.api.blobstore.BlobKey
import com.google.appengine.api.blobstore.BlobstoreService
import com.google.appengine.api.blobstore.BlobstoreServiceFactory
import com.orbit.itok.service.*
import com.orbit.itok.util.UploadUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import javax.validation.Valid

@Controller
@RequestMapping("land")
class LandController {
    @ModelAttribute
    fun pageName(): String = "land"

    @ModelAttribute("landTypes")
    fun landTypes() = settingServiceImpl.landTypes.map { SelectField(it, it) }

    @ModelAttribute("basins")
    fun basins() = settingServiceImpl.basins.map { SelectField(it, it) }

    @ModelAttribute("posessionDocument")
    fun posessionDocuments() = settingServiceImpl.posessionDocuments.map { SelectField(it, it) }

    @GetMapping("{id}")
    fun fieldSetup(model: Model, @PathVariable id: Long): String {
        val memberLand = memberLandServiceImpl.findOne(id)
        model.addAttribute("memberLand", memberLand)
        if (memberLand != null) {
            model.addAttribute("files", memberLand.files)
        }
        return "land"
    }

    @GetMapping("{id}/copyAddress")
    fun copyAddresss(@PathVariable id: Long): String {
        val findByLandId = memberServiceImpl.findByLandId(id)
        val findOne = memberLandServiceImpl.findOne(id)
        if (findOne != null && findByLandId != null) {
            findOne.address = findByLandId.address
            memberLandServiceImpl.update(id, findOne)
        }
        return "redirect:/land/$id"


    }

    @GetMapping("{id}/action")
    @ResponseBody
    fun getAction(@PathVariable id: Long): String {
        return uploadUtil.getUrl("/land/$id/files", "landFiles")
    }

    @GetMapping("download/{key}")
    fun download(@PathVariable key: String, httpServletResponse: HttpServletResponse) {
        BlobstoreServiceFactory.getBlobstoreService().serve(BlobKey(key), httpServletResponse)

    }

    @PostMapping("{id}/files")
    @ResponseBody
    fun uploadFiles(@PathVariable id: Long, httpServletRequest: HttpServletRequest): String {
        val files = uploadUtil.processFile(request = httpServletRequest, paramName = "file")
        val findOne = memberLandServiceImpl.findOne(id)
        if (findOne != null) {
            findOne.files.addAll(files)
            memberLandServiceImpl.update(id, findOne)
        }

        return "success"

    }

    @PostMapping("{id}")
    fun fieldSetupPost(@PathVariable id: Long, @Valid memberLand: MemberLand, bindingResult: BindingResult, model: Model): String {
        if (bindingResult.hasErrors()) {
            return "land"
        }
        memberLandServiceImpl.update(id, memberLand)
        return "redirect:/land/$id/2"
    }

    @GetMapping("{id}/2")
    fun fieldSetup2(@PathVariable id: Long, model: Model): String {
        val memberLand = memberLandServiceImpl.findOne(id)

        val member = memberServiceImpl.findByLandId(id)
        model.addAttribute("landId", id)
        if (member != null) {
            model.addAttribute("userId", member.id)
        }
        model.addAttribute("mapUrl", "http://35.198.237.232/itok_map/addlandplot.php")
        if (memberLand != null) {
            model.addAttribute("lat", memberLand.lat ?: 15)
            model.addAttribute("lng", memberLand.lng ?: 100.9925)
        }
        return "land2"
    }

    @Autowired lateinit var memberLandServiceImpl: MemberLandService
    @Autowired lateinit var memberServiceImpl: MemberService
    @Autowired lateinit var uploadUtil: UploadUtil
    @Autowired lateinit var settingServiceImpl: SettingServiceImpl
}