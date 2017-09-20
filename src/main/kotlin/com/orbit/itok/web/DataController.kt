package com.orbit.itok.web

import com.fasterxml.jackson.annotation.JsonView
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
    @JsonView(DataTablesOutput.View::class)

    fun member(@Valid input: DataTablesInput): DataTablesOutput<Member> {

        val output = DataTablesOutput<Member>()
        val count = memberServiceImpl.count()

        val query = input.search.value
        val start = input.start
        val length = input.length

        if (query == null || query.isEmpty()) {
            val findAll = memberServiceImpl.findAll(start, length)
            output.recordsFiltered = count
            output.data = findAll
        } else {
            val findAll = memberServiceImpl.search(query, start, length)
            output.recordsFiltered = memberServiceImpl.countSearch(query)
            output.data = findAll
        }
        output.recordsTotal = count
        output.draw = input.draw
        return output

    }

    @Autowired lateinit var memberServiceImpl: MemberServiceImpl
}

class View {
    class Member
}
