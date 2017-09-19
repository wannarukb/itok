package com.orbit.itok.service

import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import java.io.File

/**
 * Created For RIDMIS Web service
 */
class ImportServiceImplTest {

    val importServiceImpl = ImportServiceImpl()
    @Before
    fun init() {
        importServiceImpl.file = File(javaClass.classLoader.getResource("data.csv").file)
    }

    @Test
    fun getListOfMemberName() {
        val list = importServiceImpl.import(importServiceImpl.file)
        assertTrue(list.isNotEmpty())

    }
}