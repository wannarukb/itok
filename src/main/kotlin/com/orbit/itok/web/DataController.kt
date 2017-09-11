package com.orbit.itok.web

import com.orbit.itok.service.Member
import com.orbit.itok.service.MemberServiceImpl
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.jpa.datatables.mapping.DataTablesInput
import org.springframework.data.jpa.datatables.mapping.DataTablesOutput
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.validation.Valid

@RestController
@RequestMapping("data")
class DataController {
    @RequestMapping("members")
    fun member(@Valid input: DataTablesInput): DataTablesOutput<Member> {

        val output = DataTablesOutput<Member>()
        val count = memberServiceImpl.count()

        output.draw = input.draw
        val findAll = memberServiceImpl.findAll(input.start, input.length)
        output.data = findAll
        output.recordsTotal = count
        output.recordsFiltered = count
        return output

    }

    @Autowired lateinit var memberServiceImpl: MemberServiceImpl
}
