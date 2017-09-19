package com.orbit.itok.util

import org.joda.time.DateTime
import org.joda.time.chrono.BuddhistChronology
import org.joda.time.format.DateTimeFormat
import org.springframework.format.Formatter
import org.springframework.stereotype.Component
import java.util.*

@Component
class DateFormatter : Formatter<Date> {
    var formatter = DateTimeFormat.forPattern("dd/MM/yyyy").withChronology(BuddhistChronology.getInstance())

    override fun parse(p0: String, p1: Locale): Date {
        return DateTime.parse(p0, formatter).toDate()
    }

    override fun print(p0: Date, p1: Locale): String {
        return DateTime(p0).toString(formatter)
    }

}

