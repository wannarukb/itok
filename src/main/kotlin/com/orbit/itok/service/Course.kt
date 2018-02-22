package com.orbit.itok.service

import com.googlecode.objectify.annotation.Entity
import com.googlecode.objectify.annotation.Id

@Entity
data class Course(@Id var id: Long? = null, var name: String = "")
@Entity
data class Equipment(@Id var id: Long? = null, var name: String = "")
@Entity
data class Activity(@Id var id: Long? = null, var name: String = "")