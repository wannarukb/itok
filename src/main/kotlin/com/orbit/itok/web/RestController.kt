package com.orbit.itok.web

import com.orbit.itok.service.Member
import com.orbit.itok.service.MemberService
import com.orbit.itok.service.MemberServiceImpl
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("mapRest")
class RestController {
    @RequestMapping("member")
    fun members(@RequestParam(required = false, defaultValue = "0") page: Int): MutableList<Member> {
        return memberServiceImpl.findAll(page * 50, 50)
    }

    @Autowired lateinit var memberServiceImpl: MemberService
}