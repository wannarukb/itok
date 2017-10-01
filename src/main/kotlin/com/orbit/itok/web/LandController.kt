package com.orbit.itok.web

import com.orbit.itok.service.MemberLand
import com.orbit.itok.service.MemberLandService
import com.orbit.itok.service.MemberService
import com.orbit.itok.util.UploadUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest
import javax.validation.Valid

@Controller
@RequestMapping("land")
class LandController {
    @ModelAttribute
    fun pageName(): String = "land"

    @GetMapping("{id}")
    fun fieldSetup(model: Model, @PathVariable id: Long): String {
        val memberLand = memberLandServiceImpl.findOne(id)
        model.addAttribute("memberLand", memberLand)
        return "land"
    }

    @GetMapping("{id}/action")
    @ResponseBody
    fun getAction(@PathVariable id: Long): String {
        return uploadUtil.getUrl("/land/$id/files", "landFiles")
    }


    @PostMapping("{id}/files")
    @ResponseBody
    fun uploadFiles(@PathVariable id: Long, httpServletRequest: HttpServletRequest): String {
        val files = uploadUtil.processFile(request = httpServletRequest, paramName = "file")
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

        val member = memberServiceImpl.findByLandId(id)
        model.addAttribute("landId", id)
        if (member != null) {
            model.addAttribute("userId", member.id)
        }
        model.addAttribute("mapUrl", "http://35.198.237.232/itok_map/addlandplot.php")
        model.addAttribute("lat", 15.8700)
        model.addAttribute("lng", 100.9925)
        return "land2"
    }

    @Autowired lateinit var memberLandServiceImpl: MemberLandService
    @Autowired lateinit var memberServiceImpl: MemberService
    @Autowired lateinit var uploadUtil: UploadUtil
}