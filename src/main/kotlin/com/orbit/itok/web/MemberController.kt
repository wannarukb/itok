package com.orbit.itok.web


import com.orbit.itok.service.Member
import com.orbit.itok.service.MemberService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.validation.BindingResult
import org.springframework.validation.Errors
import org.springframework.validation.ValidationUtils
import org.springframework.validation.Validator
import org.springframework.web.bind.WebDataBinder
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

/**
 * Created For RIDMIS Web service
 */
@Controller
@RequestMapping("member")
class MemberController {
    @ModelAttribute("titles")
    fun titles(): List<SelectField> {
        return listOf(SelectField("นาย", "นาย"), SelectField("นาง", "นาง")
                , SelectField("นางสาว", "นางสาว"))
    }

    @InitBinder
    fun initBinder(webDataBinder: WebDataBinder) {
        return webDataBinder.addValidators(MemberValidator())
    }

    @GetMapping("new")
    fun newMember(member: Member): String {
        return "newMember"
    }

    @PostMapping("new")
    fun postMember(@Valid member: Member, bindingResult: BindingResult): String {
        if (bindingResult.hasErrors()) {
            return "newMember"
        }
        memberServiceImpl.createMember(member)
        return "redirect:/"
    }

    @Autowired lateinit var memberServiceImpl: MemberService
}

data class SelectField(var id: String = "", var name: String = "")


class MemberValidator : Validator {
    override fun validate(p0: Any?, p1: Errors?) {
        ValidationUtils.rejectIfEmpty(p1, "firstName", "required")
        ValidationUtils.rejectIfEmpty(p1, "lastName", "required")
        ValidationUtils.rejectIfEmpty(p1, "mobile", "required")

    }

    override fun supports(p0: Class<*>?): Boolean {
        return Member::class.java.isAssignableFrom(p0)
    }

}
