package org.jetbrains.kotlin.demo.web


import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

/**
 * Created For RIDMIS Web service
 */
@Controller
@RequestMapping("member")
class MemberController{
    @RequestMapping("new")
    fun newMember(): String {
        return "newMember"
    }
}