package com.orbit.itok.web

import com.orbit.itok.service.MemberLand
import com.orbit.itok.service.MemberLandService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*
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
        model.addAttribute("mapUrl", "http://35.198.237.232/itok_map/addlandplot.php")
        model.addAttribute("lat", 15.8700)
        model.addAttribute("lng", 100.9925)
        return "land"
    }

    @PostMapping("{id}")
    fun fieldSetupPost(@PathVariable id: Long, @Valid memberLand: MemberLand, bindingResult: BindingResult, model: Model): String {
        if (bindingResult.hasErrors()) {
            model.addAttribute("mapUrl", "http://35.198.237.232/itok_map/addlandplot.php")
            model.addAttribute("lat", 15.8700)
            model.addAttribute("lng", 100.9925)
            return "land"
        }
        memberLandServiceImpl.update(id, memberLand)
        return "redirect:/land/$id"
    }

    @Autowired lateinit var memberLandServiceImpl: MemberLandService
}