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
    fun members(@RequestParam(required = false, defaultValue = "0") page: Int,
                @RequestParam(required = false, defaultValue = "50") limit: Int): MutableList<Member> {
        val findAll = memberServiceImpl.findAll(page * limit, limit)
        findAll.forEach {
            it.membershipTemp = it.membership?.get()
            it.memberLandsTemp = it.memberLands.map { it.get() }.toMutableList()
            it.membership = null
            it.memberLands = mutableListOf()
        }
        return findAll
    }

    @Autowired lateinit var memberServiceImpl: MemberService
}