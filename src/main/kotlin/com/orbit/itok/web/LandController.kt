package com.orbit.itok.web

import com.orbit.itok.service.MemberLand
import com.orbit.itok.service.MemberLandService
import com.orbit.itok.service.MemberLandServiceImpl
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping

@Controller
@RequestMapping("land")
class LandController {
    @ModelAttribute
    fun pageName(): String = "land"

    @RequestMapping("{id}")
    fun fieldSetup(model: Model,@PathVariable id:Long): String {
        val memberLand = memberLandServiceImpl.findOne(id)
        model.addAttribute("memberLand", memberLand)
        return "land"
    }

    @Autowired lateinit var memberLandServiceImpl: MemberLandService
}