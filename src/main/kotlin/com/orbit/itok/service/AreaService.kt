package com.orbit.itok.service

import com.googlecode.objectify.ObjectifyService
import com.googlecode.objectify.annotation.Entity
import com.googlecode.objectify.annotation.Id
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
                      var usage: String? = null, var characteristic: String? = null, var soilType: String? = null, var problem: String? = null)

interface MemberLandService

@Service
class MemberLandServiceImpl : MemberLandService,CommandLineRunner {
    override fun run(vararg p0: String?) {
        ObjectifyService.register(MemberLand::class.java)
    }

}