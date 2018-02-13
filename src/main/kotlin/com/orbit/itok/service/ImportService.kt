package com.orbit.itok.service


import org.joda.time.DateTime
import org.joda.time.chrono.BuddhistChronology
import org.joda.time.format.DateTimeFormat
import org.springframework.stereotype.Service
import org.supercsv.cellprocessor.CellProcessorAdaptor
import org.supercsv.cellprocessor.ConvertNullTo
import org.supercsv.cellprocessor.Optional
import org.supercsv.cellprocessor.ParseDate
import org.supercsv.cellprocessor.ift.CellProcessor
import org.supercsv.exception.SuperCsvCellProcessorException
import org.supercsv.io.dozer.CsvDozerBeanReader
import org.supercsv.prefs.CsvPreference
import org.supercsv.util.CsvContext
import java.io.File


/**
 * Created For RIDMIS Web service
 */
interface ImportService {
    fun import(file: File): List<Member>

}

@Service
class ImportServiceImpl : ImportService {
    private val FIELD_MAPPING: Array<String> = arrayOf("date", "title", "firstName", "lastName", "nickname", "birthday", "male",
            "maritalStatus", "educationDegree", "address.number", "address.moo", "address.village", "address.alley",
            "address.road", "address.subdistrict", "address.district", "address.province", "address.postalCode",
            "mobile", "email", "facebook", "line",
            "membershipTemp.yearJoin", "membershipTemp.villageDelegate", "membershipTemp.type", "membershipTemp.previousJob",
            "membershipTemp.mainJob", "membershipTemp.secondJob", "membershipTemp.typeOrganization[0]", "membershipTemp.typeOrganization[1]",
            "membershipTemp.typeOrganization[2]", "membershipTemp.typeOrganization[3]", "membershipTemp.typeOrganization[4]",
            "membershipTemp.agricultureSpecialty[0]", "membershipTemp.agricultureSpecialty[1]",
            "membershipTemp.agricultureSpecialty[2]", "membershipTemp.agricultureSpecialty[3]", "membershipTemp.agricultureSpecialty[4]",
            "membershipTemp.agricultureSpecialty[5]", "membershipTemp.agricultureSpecialty[6]",
            "membershipTemp.agricultureInterest[0]", "membershipTemp.agricultureInterest[1]",
            "membershipTemp.agricultureInterest[2]", "membershipTemp.agricultureInterest[3]", "membershipTemp.agricultureInterest[4]",
            "membershipTemp.agricultureInterest[5]", "membershipTemp.agricultureInterest[6]",
            "membershipTemp.associate",
            "memberLandsTemp[0].basin","memberLandsTemp[0].name", "memberLandsTemp[0].address.moo", "memberLandsTemp[0].address.village", "memberLandsTemp[0].address.subdistrict",
            "memberLandsTemp[0].address.district", "memberLandsTemp[0].address.province", "memberLandsTemp[0].lat", "memberLandsTemp[0].lng",
            "memberLandsTemp[0].rai", "memberLandsTemp[0].gnan", "memberLandsTemp[0].wah")


    private val PROCESSORS: Array<CellProcessor> = arrayOf(ParseDate("M/d/yyyy HH:mm:ss"),
            Optional(), Optional(), Optional(), Optional(), Optional(BirthdayProcessor()),
            Optional(GenderProcessor()), // first line
            Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), // end address alley
            Optional(), Optional(), Optional(), Optional(), Optional(), // end postal code
            ConvertNullTo("-"), Optional(), Optional(), Optional(), //end line
            Optional(), Optional(VillageDelegateProcessor()), Optional(), Optional(), // end previous job
            Optional(), Optional(), Optional(), Optional(), // type orgationzation 1
            Optional(), Optional(), Optional(), // type orgationzation 4
            Optional(), Optional(), // agricultureSpecialty 1
            Optional(), Optional(), Optional(), // agricultureSpecialty 4
            Optional(), Optional(), // agricultureSpecialty 6
            Optional(), Optional(), // agricultureInterest 1
            Optional(), Optional(), Optional(), // agricultureInterest 4
            Optional(), Optional(), // agricultureInterest 6
            Optional(), // associate
            Optional(),
            Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(),
            Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(),
            Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(), Optional(),
            Optional(), Optional(), Optional(), Optional(), Optional()
    )


    override fun import(file: File): MutableList<Member> {
        val output = mutableListOf<Member>()
        val csvDozerBeanReader = CsvDozerBeanReader(file.reader(), CsvPreference.EXCEL_PREFERENCE)
        csvDozerBeanReader.getHeader(true)
        csvDozerBeanReader.configureBeanMapping(Member::class.java, FIELD_MAPPING)
//        val member = Member()
//        member.isMale
        var x = csvDozerBeanReader.read<Member>(Member::class.java, *PROCESSORS)
        while (x != null) {
            output.add(x)

            x = csvDozerBeanReader.read<Member>(Member::class.java, *PROCESSORS)
            val membershipTemp = x?.membershipTemp
            if (membershipTemp != null) {
                membershipTemp.typeOrganization = membershipTemp.typeOrganization.filter { !it.isNullOrBlank() }.toMutableList()
                membershipTemp.agricultureSpecialty = membershipTemp.agricultureSpecialty.filter { !it.isNullOrBlank() }.toMutableList()
                membershipTemp.agricultureInterest = membershipTemp.agricultureInterest.filter { !it.isNullOrBlank() }.toMutableList()
            }

        }
        return output
    }

    lateinit var file: File

}

class VillageDelegateProcessor : CellProcessorAdaptor() {
    override fun <T : Any?> execute(p0: Any?, p1: CsvContext?): T {
        return next.execute(p0.toString() == "ใช่", p1)
    }

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
