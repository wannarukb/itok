package com.orbit.itok.web


import com.fasterxml.jackson.annotation.JsonView
import com.orbit.itok.service.*
import com.orbit.itok.util.UploadUtil
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

    data class MemberList(var id: Long, var name: String, var address: String, var fieldCcount: Int, var totalArea: Float,
                          var memberListArea: MutableList<MemberListArea>)

    data class MemberListArea(var id: Long, var name: String, var ownerName: String, var areaText: String, var province: String, var basin: String)

    @RequestMapping("json")
    @ResponseBody
    fun member(@RequestParam(required = false) page: Int?): List<MemberList> {
        var page2 = 0
        val limit = 20
        if (page == null) {
            page2 = 0
        }
        return memberServiceImpl.findAll(page2 * limit, limit).map {
            var totalArea = 0f

            val lands = it.memberLands.map { it.get() }.map {
                totalArea += it.rai ?: 0f
                MemberListArea(
                        id = it.id ?: 0L,
                        name = it.name ?: "-",
                        province = it.address.province ?: "-",
                        areaText = "${it.rai ?: '-'} ไร่ ${it.gnan ?: '-'} งาน ${it.wah ?: '-'} ตร.วา.",
                        basin = it.basin ?: "-", ownerName = ""
                )
            }
            val ownerName = "${it.firstName} ${it.lastName}"
            lands.forEach { it.ownerName = ownerName }
            MemberList(id = it.id!!, name = ownerName, address = it.address.toString(), fieldCcount = lands.size, memberListArea = lands.toMutableList(), totalArea = totalArea)
        }
    }

    @RequestMapping("search")
    @JsonView(View.Member::class)
    @ResponseBody
    fun member(@RequestParam(required = false) page: Int?, @RequestParam query: String): MutableList<Member> {
        var page2 = 0
        val limit = 20
        if (page == null) {
            page2 = 0
        }
        return memberServiceImpl.search(query, page2 * limit, limit)
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

    @ModelAttribute("educationDegrees")
    fun educationDegree(): List<SelectField> {
        val status = settingServiceImpl.educationDegrees
        return status.map { SelectField(it, it) }
    }

    @ModelAttribute("specialties")
    fun specialties() = settingServiceImpl.specialties.map { SelectField(it, it) }

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
        val image = uploadUtil.processImageFile(request)
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
//        val findOne = memberServiceImpl.findOne(id)
//        model.addAttribute("member", findOne)
        return "layout-member"
    }

    @GetMapping("{id}/newLand")
    fun newLand(@PathVariable id: Long): String {
        val id2 = memberLandServiceImpl.newLandForMember(id)
        return "redirect:/land/$id2"
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
        } else member.image = findOne?.image

        if (findOne != null) {
            memberServiceImpl.update(id, member.copy(memberLands = findOne.memberLands, membership = findOne.membership))
        }
        return "redirect:/member/$id"
    }

    //    edit
    @GetMapping("{id}/edit")
    fun editMember(@PathVariable id: Long, model: Model): String {

        val findOne = memberServiceImpl.findOne(id)
        model.addAttribute("member", findOne)

        return "newMember"
    }

    @Autowired lateinit var memberServiceImpl: MemberService
    @Autowired lateinit var settingServiceImpl: SettingServiceImpl
    @Autowired lateinit var uploadUtil: UploadUtil
    @Autowired lateinit var memberLandServiceImpl: MemberLandService
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
