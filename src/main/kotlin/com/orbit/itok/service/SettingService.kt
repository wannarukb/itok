package com.orbit.itok.service

import org.springframework.stereotype.Service

/**
 * Created For RIDMIS Web service
 */
interface SettingService {
}

@Service
class SettingServiceImpl : SettingService {
    fun getAppName(): String = "ITOK"

}