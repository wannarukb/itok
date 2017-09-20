package com.orbit.itok.web

import com.orbit.itok.service.ImportServiceImpl
import com.orbit.itok.service.MemberServiceImpl
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ResourceLoaderAware
import org.springframework.core.io.ResourceLoader
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

/**
 * Created For RIDMIS Web service
 */
@RequestMapping
@Controller
class HomeController : ResourceLoaderAware {
    lateinit var loader: ResourceLoader

    override fun setResourceLoader(p0: ResourceLoader) {
        this.loader = p0
    }

    @RequestMapping
    fun index(): String {
        return "index"
    }

    @RequestMapping("clearDB")
    fun clearDb(): String {
        memberServiceImpl.clear()
        return "redirect:/"
    }

    @RequestMapping("importDB")
    fun importDb(): String {
        val file = loader.getResource("classpath:data.csv").file
        var list = importServiceImpl.import(file)
        memberServiceImpl.import(list)

        return "redirect:/"
    }

    @Autowired lateinit var memberServiceImpl: MemberServiceImpl
    @Autowired lateinit var importServiceImpl: ImportServiceImpl
}