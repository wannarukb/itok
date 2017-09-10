package com.orbit.itok.web

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

/**
 * Created For RIDMIS Web service
 */
@RequestMapping
@Controller
class HomeController {
    @RequestMapping
    fun index(): String {
        return "index"
    }
}