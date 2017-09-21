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
data class Membership(@Id var id: Long? = null, var membershipId: String? = "",
                      var yearJoin: Int? = 2017, var villageDelegate: Boolean? = false,
                      var type: String? = "", var previousJob: String? = "", var mainJob: String? = "",
                      var secondJob: String? = "",
                      var typeOrganization: MutableList<String> = mutableListOf(),
                      var agricultureSpecialty: MutableList<String> = mutableListOf(),
                      var agricultureInterest: MutableList<String> = mutableListOf(),
                      var associate: String? = ""
)

interface MembershipService {

}

@Service
class MembershipServiceImpl : MembershipService, CommandLineRunner {
    override fun run(vararg p0: String?) {
        ObjectifyService.register(Membership::class.java)
    }


}