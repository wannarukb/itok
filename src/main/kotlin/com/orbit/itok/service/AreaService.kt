package com.orbit.itok.service

import com.googlecode.objectify.ObjectifyService
import com.googlecode.objectify.ObjectifyService.ofy
import com.googlecode.objectify.Ref
import com.googlecode.objectify.annotation.Entity
import com.googlecode.objectify.annotation.Id
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Service

/**
 * Created For RIDMIS Web service
 */
@Entity
data class MemberLand(@Id var id: Long? = null, var landOrder: Int? = 0,
                      var address: Address = Address(), var lat: Float? = null, var lng: Float? = null,
                      var basin: String? = null, var posessionType: String? = null, var posessionDocument: String? = null,
                      var rai: Float? = null, var gnan: Float? = null, var wah: Float? = null, var intendedPurpose: String? = null,
                      var usage: String? = null, var characteristic: String? = null, var soilType: String? = null, var problem: String? = null,
                      var files: MutableList<UploadedFile> = mutableListOf()) {
                      var usage: String? = null, var characteristic: String? = null, var soilType: String? = null, var problem: String? = null,
                      var name: String? = ""
) {
    fun getSize(): String {
        return "$rai ไร่ $gnan งาน $wah ตารางวา"

    }
}

interface MemberLandService {
    fun findOne(id: Long): MemberLand?
    fun newLandForMember(id: Long): Long?
    fun update(id: Long, memberLand: MemberLand)
    fun getTotalSize(list: MutableList<MemberLand>): String
}

@Service
class MemberLandServiceImpl : MemberLandService, CommandLineRunner {
    override fun getTotalSize(list: MutableList<MemberLand>): String {
        var count = 0
        count += list.sumBy { (it.rai?.toInt() ?: 0) * 4 * 100 }
        count += list.sumBy { (it.gnan?.toInt() ?: 0) * 100 }
        count += list.sumBy { it.wah?.toInt() ?: 0 }
        val rai = (count / 400)
        val gnan = count % 400 / 100
        val wah = (count % 100)
        return "$rai ไร่ $gnan งาน $wah ตารางวา"
    }

    override fun update(id: Long, memberLand: MemberLand) {
        memberLand.id = id
        ofy().save().entity(memberLand)
    }

    override fun newLandForMember(id: Long): Long? {
        val findOne = memberServiceImpl.findOne(id)
        if (findOne != null) {
            val memberLand = MemberLand()
            val now = ofy().save().entity(memberLand).now()
            findOne.memberLands.add(Ref.create(now))
            memberServiceImpl.update(id, findOne)
            return now.id
        }
        return null
    }

    override fun findOne(id: Long): MemberLand? {
        return ofy().load().type(MemberLand::class.java).id(id).now()
    }

    override fun run(vararg p0: String?) {
        ObjectifyService.register(MemberLand::class.java)
    }

    @Autowired lateinit var memberServiceImpl: MemberService

}