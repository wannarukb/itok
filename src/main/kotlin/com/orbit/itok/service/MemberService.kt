package com.orbit.itok.service

import com.fasterxml.jackson.annotation.JsonView
import com.google.appengine.api.search.*
import com.google.appengine.api.taskqueue.QueueFactory
import com.google.appengine.api.taskqueue.TaskOptions
import com.googlecode.objectify.ObjectifyService

import com.googlecode.objectify.ObjectifyService.ofy
import com.googlecode.objectify.ObjectifyService.register
import com.googlecode.objectify.Ref
import com.googlecode.objectify.annotation.*
import com.googlecode.objectify.annotation.Index
import com.orbit.itok.web.View
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.core.env.Environment
import org.springframework.data.jpa.datatables.mapping.DataTablesOutput
import org.springframework.stereotype.Service
import java.util.*

/**
 * Created For RIDMIS Web service
 */

@Entity
data class Member(@JsonView(View.Member::class) @Id var id: Long? = null,
        // รหัสสมาชิก
                  @JsonView(View.Member::class) var memberId: String = "",
        //ภาพถ่ายสมาชิกเครือข่าย
                  var image: UploadedImage? = null,
        //คานาหน้าชื่อ
                  var title: String = "",
        // ชื่อ *
                  @JsonView(View.Member::class) var firstName: String = "",
        // นามสกุล *
                  @JsonView(View.Member::class) var lastName: String = "",
        // ชื่อเล่น
                  var nickname: String? = "",
        // วัน เดือน ปีเกิด
                  var birthday: Date? = Date(),
        // หมายเลขบัตรประชาชน
                  var citizenId: String = "",
        // เพศ
                  var isMale: Boolean = true,
        // สถานภาพการสมรส
                  var maritalStatus: String? = "",
        // ระดับการศึกษา
                  var educationDegree: String? = "",
        //ที่อยู่ที่ติดต่อได้
                  var addressString: String = "",
        //เบอร์โทรศัพท์มือถือ*
                  @JsonView(DataTablesOutput.View::class) var mobile: String = "",
        //                  Email Address
                  @JsonView(DataTablesOutput.View::class) var email: String? = "",
        //                  Facebook
                  var facebook: String? = "",
        //                  Line ID
                  var line: String? = "",
        //                  สถานะการเป็นสมาชิก
                  var status: String = "",
                  var address: Address = Address(),
                  @Index var date: Date = Date(),
                  @Load var membership: Ref<Membership>? = null,
        // activites
                  @Index var memberLands: MutableList<Ref<MemberLand>> = mutableListOf(),
                  @Index var courses: MutableList<Ref<Course>> = mutableListOf(),
                  @Index var activities: MutableList<Ref<Activity>> = mutableListOf(),
                  @Index var equipments: MutableList<Ref<Equipment>> = mutableListOf(),
        // end activities
                  @Ignore var membershipTemp: Membership? = null,
                  @Ignore var memberLandsTemp: MutableList<MemberLand> = mutableListOf()
) {
    fun fixMobile(@AlsoLoad("mobile") m: String) {
        if (m != "-" && !m.startsWith("0")) this.mobile = "0$m"
        if (m.isEmpty()) this.mobile = "-"
    }

    fun getDisplayName(): String {
        return "$title$firstName $lastName"
    }
}
//เลขที่
//หมู่ที่
//ชื่อหมู่บ้าน/อาคาร/ชุมชน
//ตรอก/ซอย
//ถนน
//ตำบล/แขวง
//อำเภอ/เขต
//จังหวัด*
//รหัสไปรษณีย์

data class Address(var number: String? = "", var moo: String? = "", var village: String? = "", var alley: String? = "",
                   var road: String? = "", var subdistrict: String? = "", var district: String? = "",
                   var province: String? = "", var postalCode: String? = "") {
    override fun toString(): String {
        return "$number $moo $village $alley $road $subdistrict $district $province $postalCode".replace(" null", "")
    }
}

data class UploadedImage(var key: String = "", var imageUrl: String? = "", var isImage: Boolean = false)

interface MemberService {
    fun createMember(member: Member): Long?
    fun count(): Long
    fun findAll(start: Int? = 0, length: Int? = 50): MutableList<Member>
    fun findOne(id: Long): Member?
    fun update(id: Long, member: Member)
    fun search(query: String, start: Int?, length: Int?): MutableList<Member>
    fun countSearch(query: String): Long
    fun clear()
    fun import(list: MutableList<Member>)
    fun findByLandId(id: Long): Member?
    fun updateAll(page: Int)
    fun clearIndex()
}

@Service
class MemberServiceImpl : MemberService, CommandLineRunner {
    override fun clearIndex() {
        var result: List<Document>
        do {
            result = index.getRange(GetRequest.newBuilder().setLimit(1000).setReturningIdsOnly(true)).results
            index.delete(result.map { it.id })
        } while (result.isNotEmpty())
    }

    override fun updateAll(page: Int) {
        if (page == 0) clearIndex()
        val list = ofy().load().type(Member::class.java).limit(50).offset(page * 50).list()
        if (list.isNotEmpty()) {
            QueueFactory.getDefaultQueue().add(TaskOptions.Builder.withUrl("/_ah/updateMember").param("page", (page + 1).toString()))
            ofy().save().entities(list)
            index.put(list.map { getDocument(it) })
        }
    }

    override fun findByLandId(id: Long): Member? {
        return ofy().load().type(Member::class.java).filter("memberLands", MemberLand(id)).first().now()
    }

    override fun import(list: MutableList<Member>) {
        list.forEach {
            val membershipTemp = it.membershipTemp
            val id = membershipTemp?.id
            if (id == null) {
                if (membershipTemp != null) {
                    membershipTemp.id = ofy().save().entity(membershipTemp).now().id
                }
            }
            val memberLandsTemp = it.memberLandsTemp
            memberLandsTemp.forEach {
                it.id = ofy().save().entity(it).now().id
            }
            it.membership = Ref.create(it.membershipTemp)
            it.memberLands = it.memberLandsTemp.map { Ref.create(it) }.toMutableList()
        }
        ofy().save().entities(list).now().forEach {
            index.put(getDocument(it.value))
        }
    }

    override fun clear() {
        val list = ofy().load().type(Member::class.java).list()
        for (member in list) {
            member.membershipTemp = member.membership?.get()
            member.memberLandsTemp = member.memberLands.map { it.get() }.filter { it != null }.toMutableList()
            if (member.membershipTemp != null) ofy().delete().entity(member.membershipTemp)
            ofy().delete().entities(member.memberLandsTemp)
            index.delete(member.id.toString())
        }
        ofy().delete().entities(list)
    }

    override fun countSearch(query: String): Long {
        return index.search(query).numberFound
    }

    override fun search(query: String, start: Int?, length: Int?): MutableList<Member> {
        val search = index.search(Query.newBuilder().setOptions(QueryOptions.newBuilder().setReturningIdsOnly(true)).build(query))
        val map = search.results.map { it.id.toLong() }
        val values = ofy().load().type(Member::class.java).ids(map).values
        values.forEach {
            it.membershipTemp = it.membership?.get()
            it.memberLandsTemp = it.memberLands.map { it.get() }.toMutableList()
        }
        return values.toMutableList()
    }

    override fun findOne(id: Long): Member? {
        val now = ofy().load().type(Member::class.java).id(id).now()

        now.membershipTemp = now.membership?.get()
        now.memberLandsTemp = now.memberLands.map { it.get() }.toMutableList()
        now.membership = null
        now.memberLands = mutableListOf()
        now.courses = mutableListOf()
        now.equipments = mutableListOf()
        now.activities = mutableListOf()

        return now
    }

    override fun update(id: Long, member: Member) {
        member.id = id
        val membershipTemp = member.membershipTemp

        if (membershipTemp != null) {
            val findOne = findOne(id)
            if (findOne != null) {
                val get = findOne.membership?.get()
                if (get != null) {
                    val copy = membershipTemp.copy(id = get.id)
                    ofy().save().entity(copy)
                } else {
                    val entity = ofy().save().entity(membershipTemp).now()
                    member.membership = Ref.create(entity)
                }
            }

//            val now = ofy().save().entity(membershipTemp).now()
//            member.membership = Ref.create(now)
        }
        ofy().save().entity(member)
        index.delete(id.toString())
        index.put(getDocument(member))
    }

    private fun getDocument(member: Member): Document {
        return Document.newBuilder().setId(member.id.toString())
                .addField(Field.newBuilder().setName("name").setText(member.firstName + " " + member.lastName))
                .addField(Field.newBuilder().setName("province").setText(member.address.toString()))
                .addField(Field.newBuilder().setName("email").setText(member.email))
                .addField(Field.newBuilder().setName("tel").setText(member.mobile))
                .addField(Field.newBuilder().setName("memberId").setText(member.memberId)).build()

    }

    override fun count(): Long {
        return ofy().load().type(Member::class.java).count().toLong()
    }

    override fun findAll(start: Int?, length: Int?): MutableList<Member> {
        val list = ofy().load().type(Member::class.java).limit(length ?: 50).offset(start ?: 0).order("-date").list()
        if (list.isEmpty()) {
            QueueFactory.getDefaultQueue().add(TaskOptions.Builder.withUrl("/_ah/updateMember"))
        }
        list.forEach {
            it.membershipTemp = it.membership?.get()
            it.memberLandsTemp = it.memberLands.map { it.get() }.toMutableList()
        }
        return list
    }

    override fun createMember(member: Member): Long? {
        val now = ofy().save().entity(member.membershipTemp ?: Membership()).now()
        member.membership = Ref.create(now)
        val id = ofy().save().entity(member).now().id
        member.id = id
        index.put(getDocument(member))
        return member.id
    }

    lateinit var index: com.google.appengine.api.search.Index

    override fun run(vararg p0: String?) {
        register(Member::class.java)
        this.index = SearchServiceFactory.getSearchService().getIndex(IndexSpec.newBuilder().setName("member"))
        if (environment.activeProfiles.isNotEmpty() && environment.activeProfiles.first() == "development") {
            val closable = ObjectifyService.begin()
            register(Membership::class.java)

            if (count() < 10L) {
                for (i in 1..40)
                    createMember(Member(firstName = "first$i", lastName = "last$i"))

            }
            closable.close()

        }
    }

    @Autowired lateinit var environment: Environment

}