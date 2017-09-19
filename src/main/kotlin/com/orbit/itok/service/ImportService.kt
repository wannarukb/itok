package com.orbit.itok.service


import org.supercsv.cellprocessor.Optional
import org.supercsv.cellprocessor.ParseDate
import org.supercsv.cellprocessor.constraint.NotNull
import org.supercsv.cellprocessor.ift.CellProcessor
import org.supercsv.io.dozer.CsvDozerBeanReader
import org.supercsv.prefs.CsvPreference
import java.io.File

/**
 * Created For RIDMIS Web service
 */
interface ImportService {
    fun import(file: File): List<Member>

}

class ImportServiceImpl : ImportService {
    private val FIELD_MAPPING: Array<String> = arrayOf("date", "title", "firstName", "lastName")

    private val PROCESSORS: Array<CellProcessor> = arrayOf(ParseDate("M/d/yyyy HH:mm:ss"),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional(),
            Optional()
    )


    override fun import(file: File): MutableList<Member> {
        val output = mutableListOf<Member>()
        val csvDozerBeanReader = CsvDozerBeanReader(file.reader(), CsvPreference.STANDARD_PREFERENCE)
        csvDozerBeanReader.getHeader(true)
        csvDozerBeanReader.configureBeanMapping(Member::class.java, FIELD_MAPPING)

        var x = csvDozerBeanReader.read<Member>(Member::class.java, *PROCESSORS)
        while (x != null) {
            output.add(x)
            x = csvDozerBeanReader.read<Member>(Member::class.java, *PROCESSORS)
        }
        return output
    }

    lateinit var file: File

}