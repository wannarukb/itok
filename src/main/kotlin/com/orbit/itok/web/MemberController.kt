package com.orbit.itok.web


import com.orbit.itok.service.*
import com.orbit.itok.util.UploadUtil
import org.joda.time.DateTime
import org.joda.time.DateTimeFieldType
import org.joda.time.chrono.BuddhistChronology
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.env.Environment
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest

/**
 * Created For RIDMIS Web service
 */
@RestController
@RequestMapping("member")
class MemberController {
    @ModelAttribute("pageName")
    fun pageName(): String = "member"

//    @ModelAttribute("memberTypes")
//    fun memberTypes(): List<SelectField> {
//        return settingServiceImpl.memberTypes.map { SelectField(it, it) }
//    }

    data class MemberList(var id: Long, var name: String, var address: String, var fieldCount: Int, var totalArea: Float,
                          var memberListArea: MutableList<MemberListArea>, var mobile: String, var type: String)

    data class MemberListArea(var id: Long, var name: String, var ownerName: String, var areaText: String, var province: String, var basin: String)

    val LIMIT = 10


    @RequestMapping("pageCount")
    fun pageCount(@RequestParam(required = false) query: String?): Int {
        return if (query == null) (memberServiceImpl.count() / LIMIT + 1).toInt()
        else (memberServiceImpl.countSearch(query) / LIMIT + 1).toInt()
    }


    @RequestMapping("json")
    fun member(@RequestParam(required = false) page: Int?): List<MemberList> {
        var page2 = 0
        val limit = LIMIT
        if (page == null) {
            page2 = 0
        } else page2 = page
        return memberServiceImpl.findAll(page2 * limit, limit).map {
            var totalArea = 0f

            var lands = it.memberLands.map { it.get() }.map {
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
            if (environment.activeProfiles.isNotEmpty() && environment.activeProfiles.contains("development")) if (lands.isEmpty()) {
                lands = listOf(MemberListArea(id = 1L, ownerName = ownerName, name = "Placeholder name", areaText = "area Text placeholder",
                        basin = "basin placeholder", province = "province placehodler"))
            }
            lands.forEach { it.ownerName = ownerName }
            if (it.membershipTemp == null) it.membershipTemp = it.membership?.get()
            MemberList(
                    id = it.id!!,
                    name = ownerName,
                    address = it.address.toString(),
                    fieldCount = lands.size,
                    memberListArea = lands.toMutableList(),
                    totalArea = totalArea,
                    type = it.membershipTemp?.type ?: "",
                    mobile = it.mobile
            )
        }
    }


    @RequestMapping("search")
    fun member(@RequestParam(required = false) page: Int?, @RequestParam query: String): List<MemberList> {
        var page2 = 0
        val limit = LIMIT
        if (page == null) {
            page2 = 0
        }
        return memberServiceImpl.search(query, page2 * limit, limit).map {
            var totalArea = 0f

            var lands = it.memberLands.map { it.get() }.map {
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
            if (environment.activeProfiles.isNotEmpty() && environment.activeProfiles.contains("development")) if (lands.isEmpty()) {
                lands = listOf(MemberListArea(id = 1L, ownerName = ownerName, name = "Placeholder name", areaText = "area Text placeholder",
                        basin = "basin placeholder", province = "province placehodler"))
            }
            lands.forEach { it.ownerName = ownerName }
            if (it.membershipTemp == null) it.membershipTemp = it.membership?.get()
            MemberList(
                    id = it.id!!,
                    name = ownerName,
                    address = it.address.toString(),
                    fieldCount = lands.size,
                    totalArea = totalArea,
                    memberListArea = lands.toMutableList(), type = it.membershipTemp?.type ?: "", mobile = it.mobile

            )
        }
    }

    data class MetaData(
            val titles: List<SelectField>,
            val status: List<SelectField>,
            val jobTypes: List<SelectField>,
            val organizationTypes: List<SelectField>,
            val maritalStatus: List<SelectField>,
            val educationDegrees: List<SelectField>,
            val specialties: List<SelectField>,
            val yearJoin: List<SelectField>,
            val memberTypes: List<SelectField>
    )

    @RequestMapping("metaData")
    fun metaData(): MetaData {
        val get = DateTime.now().withChronology(BuddhistChronology.getInstance()).get(DateTimeFieldType.year())
        val toList = (get downTo 2500).toList().map { SelectField(it.toString(), it.toString()) }
        return MetaData(titles = listOf(
                SelectField("นาย", "นาย"),
                SelectField("นาง", "นาง")
                , SelectField("นางสาว", "นางสาว")
        ), status = listOf(
                SelectField("สมาชิกเครือข่าย", "สมาชิกเครือข่าย"),
                SelectField("ยังไม่เป็นสมาชิกเครือข่าย", "ยังไม่เป็นสมาชิกเครือข่าย")
        ), jobTypes = settingServiceImpl.jobTypes.map { SelectField(it, it) },
                organizationTypes = settingServiceImpl.organizationTypes.map { SelectField(it, it) },
                maritalStatus = listOf("โสด", "หย่า", "สมรส", "หม้าย").map { SelectField(it, it) },
                educationDegrees = settingServiceImpl.educationDegrees.map { SelectField(it, it) },
                specialties = settingServiceImpl.specialties.map { SelectField(it, it) },
                yearJoin = toList,
                memberTypes = settingServiceImpl.memberTypes.map { SelectField(it, it) }
        )
    }

    @RequestMapping("update")
    fun update(@RequestBody member: Member): Long? {
        val id = member.id
        if (id != null) {
            memberServiceImpl.update(id, member)
            return id
        } else return memberServiceImpl.createMember(member)
    }

    @RequestMapping("{id}")
    fun fetchMember(@PathVariable id: Long): Member? {
        return memberServiceImpl.findOne(id)
    }

    @RequestMapping("uploadUrl/{id}")
    fun uploadUrl(@PathVariable id: Long): String {
        return uploadUtil.getUrl("/member/upload/$id", "memberFiles")
    }

    @RequestMapping("upload/{id}")
    fun upload(@PathVariable id: Long, request: HttpServletRequest): String {
        val processImageFile = uploadUtil.processImageFile(request)
        if (processImageFile.isNotEmpty()) {
            val findOne = memberServiceImpl.findOne(id)
            if (findOne != null) {
                if (findOne.image != null) uploadUtil.deleteImage(findOne.image)
                uploadUtil.fillImageUrl(processImageFile.first())
                findOne.image = processImageFile.first()
                memberServiceImpl.update(id, findOne)
            }
        }
        return "success"
    }
//
//    @ModelAttribute("jobTypes")
//    fun jobTypes(): List<SelectField> {
//        return settingServiceImpl.jobTypes.map { SelectField(it, it) }
//    }
//
//    @ModelAttribute("organizationTypes")
//    fun organizationTypes(): List<SelectField> {
//        return settingServiceImpl.organizationTypes.map { SelectField(it, it) }
//    }
//
//    @ModelAttribute("titles")
//    fun titles(): List<SelectField> {
//        return listOf(SelectField("นาย", "นาย"), SelectField("นาง", "นาง")
//                , SelectField("นางสาว", "นางสาว"))
//    }
//
//    @ModelAttribute("maritalStatus")
//    fun maritalStatus(): List<SelectField> {
//        val status = listOf("โสด", "หย่า", "สมรส", "หม้าย")
//        return status.map { SelectField(it, it) }
//    }
//
//    @ModelAttribute("status")
//    fun status(): List<SelectField> {
//        val status = listOf("สมาชิกเครือข่าย", "ยังไม่เป็นสมาชิกเครือข่าย")
//        return status.map { SelectField(it, it) }
//    }
//
//    @ModelAttribute("educationDegrees")
//    fun educationDegree(): List<SelectField> {
//        val status = settingServiceImpl.educationDegrees
//        return status.map { SelectField(it, it) }
//    }
//
//    @ModelAttribute("specialties")
//    fun specialties() = settingServiceImpl.specialties.map { SelectField(it, it) }
//
//    @ModelAttribute("yearJoin")
//    fun yearJoin(): List<SelectField> {
//        val get = DateTime.now().withChronology(BuddhistChronology.getInstance()).get(DateTimeFieldType.year())
//        val toList = (get downTo 2500).toList().map { SelectField(it.toString(), it.toString()) }
//        return toList
//    }
//
//    @InitBinder
//    fun initBinder(webDataBinder: WebDataBinder) {
//        return webDataBinder.addValidators(MemberValidator())
//    }
//
//    @GetMapping("new")
//    fun newMember(member: Member): String {
//        return "newMember"
//    }
//
//    @PostMapping("new")
//    fun postMember(@Valid member: Member, bindingResult: BindingResult, request: HttpServletRequest): String {
//        val image = uploadUtil.processImageFile(request)
//        if (bindingResult.hasErrors()) {
//            return "newMember"
//        }
//        if (image.isNotEmpty()) {
//            uploadUtil.fillImageUrl(image.first())
//            member.image = image.first()
//        }
//        val id = memberServiceImpl.createMember(member)
//        return "redirect:/member/$id"
//    }
//
//    @GetMapping("{id}/action")
//    @ResponseBody
//    fun action(@PathVariable id: String?, model: Model): String {
//        if (id != "null")
//            return uploadUtil.getUrl("/member/$id", "memberFiles")
//        return uploadUtil.getUrl("/member/new", "memberFiles")
//    }
//
//    @GetMapping("{id}")
//    fun updateMember(@PathVariable id: Long, model: Model): String {
////        val findOne = memberServiceImpl.findOne(id)
////        model.addAttribute("member", findOne)
//        return "layout-member"
//    }
//
//    @GetMapping("{id}/newLand")
//    fun newLand(@PathVariable id: Long): String {
//        val id2 = memberLandServiceImpl.newLandForMember(id)
//        return "redirect:/land/$id2"
//    }
//
//    @PostMapping("{id}")
//    fun postMember(@PathVariable id: Long, @Valid member: Member, bindingResult: BindingResult, request: HttpServletRequest): String {
//        val findOne = memberServiceImpl.findOne(id)
//        val image = uploadUtil.processImageFile(request = request)
//        if (bindingResult.hasErrors()) {
//            if (image.isNotEmpty()) uploadUtil.deleteImage(image.first())
//            return "newMember"
//        }
//
//        if (image.isNotEmpty()) {
//            uploadUtil.fillImageUrl(image.first())
//            if (findOne != null) {
//                if (findOne.image != null) uploadUtil.deleteImage(findOne.image)
//            }
//            member.image = image.first()
//        } else member.image = findOne?.image
//
//        if (findOne != null) {
//            memberServiceImpl.update(id, member.copy(memberLands = findOne.memberLands, membership = findOne.membership))
//        }
//        return "redirect:/member/$id"
//    }
//
//    //    edit
//    @GetMapping("{id}/edit")
//    fun editMember(@PathVariable id: Long, model: Model): String {
//
//        val findOne = memberServiceImpl.findOne(id)
//        model.addAttribute("member", findOne)
//
//        return "newMember"
//    }

    @Autowired
    lateinit var memberServiceImpl: MemberService
    @Autowired
    lateinit var settingServiceImpl: SettingServiceImpl
    @Autowired
    lateinit var uploadUtil: UploadUtil
    @Autowired
    lateinit var memberLandServiceImpl: MemberLandService
    @Autowired
    lateinit var environment: Environment
}

data class SelectField(var id: String = "", var name: String = "")


//class MemberValidator : Validator {
//    override fun validate(p0: Any?, p1: Errors?) {
//        ValidationUtils.rejectIfEmpty(p1, "firstName", "required")
//        ValidationUtils.rejectIfEmpty(p1, "lastName", "required")
//        ValidationUtils.rejectIfEmpty(p1, "mobile", "required")
//        ValidationUtils.rejectIfEmpty(p1, "address.province", "required")
//    }
//
//    override fun supports(p0: Class<*>?): Boolean {
//        return Member::class.java.isAssignableFrom(p0) || Membership::class.javaObjectType.isAssignableFrom(p0)
//    }
//
//}
