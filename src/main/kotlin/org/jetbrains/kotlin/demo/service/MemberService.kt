package org.jetbrains.kotlin.demo.service

import com.googlecode.objectify.ObjectifyService
import com.googlecode.objectify.annotation.Id
import org.springframework.boot.CommandLineRunner
import java.util.*

/**
 * Created For RIDMIS Web service
 */
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
                  var nickname: String = "",
        // วัน เดือน ปีเกิด
                  var birthday: Date? = null,
        // หมายเลขบัตรประชาชน
                  var citizenId: String = "",
        // เพศ
                  var isMale: Boolean = true,
        // สถานภาพการสมรส
                  var maritalStatus: String = "",
        // ระดับการศึกษา
                  var educationDegree: String = "",
        //ที่อยู่ที่ติดต่อได้
                  var address: String = "",
        //เบอร์โทรศัพท์มือถือ*
                  var mobile: String = "",
        //                  Email Address
                  var email: String = "",
        //                  Facebook
                  var facebook: String = "",
        //                  Line ID
                  var line: String = "",
        //                  สถานะการเป็นสมาชิก
                  var status: String = ""


)

data class UploadedImage(var key: String, var imageUrl:String) {

}

interface MemberService {

}

class MemberServiceImpl : MemberService, CommandLineRunner {

    override fun run(vararg p0: String?) {
        ObjectifyService.register(Member::class.java)
    }

}