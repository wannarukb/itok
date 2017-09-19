package com.orbit.itok.service

import com.google.appengine.api.search.*
import com.googlecode.objectify.ObjectifyService
import com.googlecode.objectify.ObjectifyService.*
import com.googlecode.objectify.annotation.Entity
import com.googlecode.objectify.annotation.Id
import org.hibernate.cfg.IndexOrUniqueKeySecondPass
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Service
import java.util.*

/**
 * Created For RIDMIS Web service
 */
@Entity
data class Member(@Id var id: Long? = null,
        // รหัสสมาชิก
                  var memberId: String = "",
        //ภาพถ่ายสมาชิกเครือข่าย
                  var image: UploadedImage? = null,
        //คานาหน้าชื่อ
                  var title: String = "",
        // ชื่อ *
                  var firstName: String = "",
        // นามสกุล *
                  var lastName: String = "",
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
                  var mobile: String = "",
        //                  Email Address
                  var email: String? = "",
        //                  Facebook
                  var facebook: String? = "",
        //                  Line ID
                  var line: String? = "",
        //                  สถานะการเป็นสมาชิก
                  var status: String = "",
                  var address: Address = Address(),
                  var date: Date = Date()


)
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
                   var province: String? = "", var postalCode: String? = "")

data class UploadedImage(var key: String, var imageUrl: String) {

}

interface MemberService {
    fun createMember(member: Member)
    fun count(): Long
    fun findAll(start: Int? = 0, length: Int? = 50): MutableList<Member>
    fun findOne(id: Long): Member?
    fun update(id: Long, member: Member)
    fun search(query: String, start: Int?, length: Int?): MutableList<Member>
    fun countSearch(query: String): Long

}

@Service
class MemberServiceImpl : MemberService, CommandLineRunner {
    override fun countSearch(query: String): Long {
        return index.search(query).numberFound
    }

    override fun search(query: String, start: Int?, length: Int?): MutableList<Member> {
        val search = index.search(Query.newBuilder().setOptions(QueryOptions.newBuilder().setReturningIdsOnly(true)).build(query))
        val map = search.results.map { it.id.toLong() }
        return ofy().load().type(Member::class.java).ids(map).values.toMutableList()
    }

    override fun findOne(id: Long): Member? {
        return ofy().load().type(Member::class.java).id(id).now()
    }

    override fun update(id: Long, member: Member) {
        member.id = id
        ofy().save().entity(member)
        index.delete(id.toString())
        index.put(getDocument(member))
    }

    private fun getDocument(member: Member): Document {
        return Document.newBuilder().setId(member.id.toString())
                .addField(Field.newBuilder().setName("firstName").setText(member.firstName))
                .addField(Field.newBuilder().setName("lastName").setText(member.lastName))
                .addField(Field.newBuilder().setName("email").setText(member.email))
                .addField(Field.newBuilder().setName("tel").setText(member.mobile))
                .addField(Field.newBuilder().setName("memberId").setText(member.memberId)).build()

    }

    override fun count(): Long {
        return ofy().load().type(Member::class.java).count().toLong()
    }

    override fun findAll(start: Int?, length: Int?): MutableList<Member> {
        val list = ofy().load().type(Member::class.java).limit(length ?: 50).offset(start ?: 0).list()
        return list
    }

    override fun createMember(member: Member) {
        val id = ofy().save().entity(member).now().id
        member.id = id
        index.put(getDocument(member))
    }

    lateinit var index: Index

    override fun run(vararg p0: String?) {
        register(Member::class.java)
        this.index = SearchServiceFactory.getSearchService().getIndex(IndexSpec.newBuilder().setName("member"))
    }

}