package com.orbit.itok.service

import java.io.File

/**
 * Created For RIDMIS Web service
 */
interface ImportService {
    fun import(file: File): List<Member>

}

class ImportServiceImpl : ImportService {
    override fun import(file: File): List<Member> {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    lateinit var file: File

}