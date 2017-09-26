package com.orbit.itok.web

import com.orbit.itok.service.MemberLand
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.RequestMapping

@Controller
@RequestMapping("land")
class LandController {
    @ModelAttribute
    fun pageName(): String = "land"

    @RequestMapping("new")
    fun fieldSetup(model: Model): String {
        val memberLand = MemberLand()
        model.addAttribute("memberLand", memberLand)
        return "land"
    }
}