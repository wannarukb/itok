package com.orbit.itok.web


import com.orbit.itok.util.UploadUtil
import com.orbit.itok.service.Member
import com.orbit.itok.service.MemberService
import com.orbit.itok.service.Membership
import com.orbit.itok.service.SettingServiceImpl
import org.joda.time.DateTime
import org.joda.time.DateTimeFieldType
import org.joda.time.chrono.BuddhistChronology
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.validation.BindingResult
import org.springframework.validation.Errors
import org.springframework.validation.ValidationUtils
import org.springframework.validation.Validator
import org.springframework.web.bind.WebDataBinder
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest
import javax.validation.Valid

/**
 * Created For RIDMIS Web service
 */
@Controller
@RequestMapping("member")
class MemberController {
    @ModelAttribute("pageName")
    fun pageName(): String = "member"

    @ModelAttribute("memberTypes")
    fun memberTypes(): List<SelectField> {
        return settingServiceImpl.memberTypes.map { SelectField(it, it) }
    }

    @ModelAttribute("jobTypes")
    fun jobTypes(): List<SelectField> {
        return settingServiceImpl.jobTypes.map { SelectField(it, it) }
    }

    @ModelAttribute("organizationTypes")
    fun organizationTypes(): List<SelectField> {
        return settingServiceImpl.organizationTypes.map { SelectField(it, it) }
    }

    @ModelAttribute("titles")
    fun titles(): List<SelectField> {
        return listOf(SelectField("นาย", "นาย"), SelectField("นาง", "นาง")
                , SelectField("นางสาว", "นางสาว"))
    }

    @ModelAttribute("maritalStatus")
    fun maritalStatus(): List<SelectField> {
        val status = listOf("โสด", "หย่า", "สมรส", "หม้าย")
        return status.map { SelectField(it, it) }
    }

    @ModelAttribute("status")
    fun status(): List<SelectField> {
        val status = listOf("สมาชิกเครือข่าย", "ยังไม่เป็นสมาชิกเครือข่าย")
        return status.map { SelectField(it, it) }
    }

    @ModelAttribute("educationDegree")
    fun educationDegree(): List<SelectField> {
        val status = listOf("ปริญญาเอก", "ปริญญาโท", "ปริญญาตรี", "ปวส./อนุปริญญา", "ปวช.",
                "มัธยมปลาย", "มัธยมต้น", "ประถมศึกษา", "ไม่ได้ศึกษา")
        return status.map { SelectField(it, it) }
    }

    @ModelAttribute("yearJoin")
    fun yearJoin(): List<SelectField> {
        val get = DateTime.now().withChronology(BuddhistChronology.getInstance()).get(DateTimeFieldType.year())
        val toList = (get downTo 2500).toList().map { SelectField(it.toString(), it.toString()) }
        return toList
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
    fun postMember(@Valid member: Member, bindingResult: BindingResult, request: HttpServletRequest): String {
        var image = uploadUtil.processImageFile(request)
        if (bindingResult.hasErrors()) {
            return "newMember"
        }
        if (image.isNotEmpty()) {
            uploadUtil.fillImageUrl(image.first())
            member.image = image.first()
        }
        val id = memberServiceImpl.createMember(member)
        return "redirect:/member/$id"
    }

    @GetMapping("{id}/action")
    @ResponseBody
    fun action(@PathVariable id: String?, model: Model): String {
        if (id != "null")
            return uploadUtil.getUrl("/member/$id", "memberFiles")
        return uploadUtil.getUrl("/member/new", "memberFiles")
    }

    @GetMapping("{id}")
    fun updateMember(@PathVariable id: Long, model: Model): String {
        val findOne = memberServiceImpl.findOne(id)
        model.addAttribute("member", findOne)
        return "newMember"
    }

    @PostMapping("{id}")
    fun postMember(@PathVariable id: Long, @Valid member: Member, bindingResult: BindingResult, request: HttpServletRequest): String {
        val findOne = memberServiceImpl.findOne(id)
        val image = uploadUtil.processImageFile(request = request)
        if (bindingResult.hasErrors()) {
            if (image.isNotEmpty()) uploadUtil.deleteImage(image.first())
            return "newMember"
        }

        if (image.isNotEmpty()) {
            uploadUtil.fillImageUrl(image.first())
            if (findOne != null) {
                if (findOne.image != null) uploadUtil.deleteImage(findOne.image)
            }
            member.image = image.first()
        }
        member.image = findOne!!.image

        memberServiceImpl.update(id, member)
        return "redirect:/"
    }

    @Autowired lateinit var memberServiceImpl: MemberService
    @Autowired lateinit var settingServiceImpl: SettingServiceImpl
    @Autowired lateinit var uploadUtil: UploadUtil
}

data class SelectField(var id: String = "", var name: String = "")


class MemberValidator : Validator {
    override fun validate(p0: Any?, p1: Errors?) {
        ValidationUtils.rejectIfEmpty(p1, "firstName", "required")
        ValidationUtils.rejectIfEmpty(p1, "lastName", "required")
        ValidationUtils.rejectIfEmpty(p1, "mobile", "required")
        ValidationUtils.rejectIfEmpty(p1, "address.province", "required")
    }

    override fun supports(p0: Class<*>?): Boolean {
        return Member::class.java.isAssignableFrom(p0) || Membership::class.javaObjectType.isAssignableFrom(p0)
    }

}
