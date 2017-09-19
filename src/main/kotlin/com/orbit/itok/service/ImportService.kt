package com.orbit.itok.service


import javafx.scene.control.DateCell
import org.joda.time.DateTime
import org.joda.time.chrono.BuddhistChronology
import org.joda.time.format.DateTimeFormat
import org.supercsv.cellprocessor.CellProcessorAdaptor
import org.supercsv.cellprocessor.Optional
import org.supercsv.cellprocessor.ParseDate
import org.supercsv.cellprocessor.constraint.NotNull
import org.supercsv.cellprocessor.ift.CellProcessor
import org.supercsv.cellprocessor.ift.DateCellProcessor
import org.supercsv.io.dozer.CsvDozerBeanReader
import org.supercsv.prefs.CsvPreference
import org.supercsv.util.CsvContext
import java.io.File
import java.util.*
import org.supercsv.exception.SuperCsvCellProcessorException


/**
 * Created For RIDMIS Web service
 */
interface ImportService {
    fun import(file: File): List<Member>

}

class ImportServiceImpl : ImportService {
    private val FIELD_MAPPING: Array<String> = arrayOf("date", "title", "firstName", "lastName", "nickname", "birthday", "male",
            "maritalStatus", "educationDegree", "address.number", "address.moo", "address.village", "address.alley",
            "address.road", "address.subdistrict", "address.district", "address.province", "address.postalCode",
            "mobile", "email", "facebook", "line")

    private val PROCESSORS: Array<CellProcessor> = arrayOf(ParseDate("M/d/yyyy HH:mm:ss"),
            Optional(), Optional(), Optional(), Optional(), Optional(BirthdayProcessor()),
            Optional(GenderProcessor()), Optional(), Optional(),
            Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(),
            Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(),
            Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(),
            Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(),
            Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(),
            Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(),
            Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(),
            Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(),
            Optional(), Optional(), Optional(), Optional(), Optional()
    )


    override fun import(file: File): MutableList<Member> {
        val output = mutableListOf<Member>()
        val csvDozerBeanReader = CsvDozerBeanReader(file.reader(), CsvPreference.STANDARD_PREFERENCE)
        csvDozerBeanReader.getHeader(true)
        csvDozerBeanReader.configureBeanMapping(Member::class.java, FIELD_MAPPING)
//        val member = Member()
//        member.isMale
        var x = csvDozerBeanReader.read<Member>(Member::class.java, *PROCESSORS)
        while (x != null) {
            output.add(x)
            x = csvDozerBeanReader.read<Member>(Member::class.java, *PROCESSORS)
        }
        return output
    }

    lateinit var file: File

}

class GenderProcessor : CellProcessorAdaptor() {
    override fun <T : Any?> execute(p0: Any?, p1: CsvContext?): T {
        return next.execute(p0.toString() == "ชาย", p1)
    }

}

class BirthdayProcessor : CellProcessorAdaptor() {

    override fun <T : Any?> execute(p0: Any?, p1: CsvContext?): T {
        validateInputNotNull(p0, p1)
        val formatter = DateTimeFormat.forPattern("M/d/yyyy").withChronology(BuddhistChronology.getInstance())
        try {
            return next.execute(DateTime.parse(p0.toString(), formatter).toDate(), p1)

        } catch (e: Exception) {
            throw SuperCsvCellProcessorException(
                    String.format("Could not parse '%s' as a day", p0), p1, this)
        }
    }


}
