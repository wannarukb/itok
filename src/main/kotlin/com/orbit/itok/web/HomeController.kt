package com.orbit.itok.web

import com.google.appengine.api.taskqueue.QueueFactory
import com.google.appengine.api.taskqueue.TaskOptions
import com.orbit.itok.service.ImportServiceImpl
import com.orbit.itok.service.MemberServiceImpl
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ResourceLoaderAware
import org.springframework.core.env.Environment
import org.springframework.core.io.ResourceLoader
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.servlet.mvc.support.RedirectAttributes

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

    @RequestMapping("page/{pageName}")
    fun pageName(@PathVariable pageName: String): String {
        return pageName
    }

    @RequestMapping
    fun login(): String {
        return "login"
    }

    @RequestMapping("home")
    fun home():String{
        return "index"
    }

    private val PAGE_LIMIT: Int = 10

    @RequestMapping("member", "member/view/{id}", "member/edit/{id}","member/new")
    fun member(model: Model, @RequestParam(required = false) page: Int?, redirectAttributes: RedirectAttributes,
               @RequestParam(required = false) fromDashboard: Boolean?,
               @RequestParam(required = false) query: String?): String {
//        if (page == null) {
//            redirectAttributes.addAttribute("page", 1)
//            return "redirect:/member?page=1"
//        }
//        if (fromDashboard == null) {
//            model.addAttribute("showDashboard", false)
//            model.addAttribute("pageName", "member")
//        } else {
//            model.addAttribute("showDashboard", true)
//        }
//        if (query == null) {
//            model.addAttribute("list", memberServiceImpl.findAll((page - 1) * PAGE_LIMIT, PAGE_LIMIT))
//            model.addAttribute("totalPages", memberServiceImpl.count() / PAGE_LIMIT + 1)
//        } else {
//            model.addAttribute("list", memberServiceImpl.search(query, (page - 1) * PAGE_LIMIT, PAGE_LIMIT))
//            model.addAttribute("totalPages", memberServiceImpl.countSearch(query) / PAGE_LIMIT + 1)
//        }
//        model.addAttribute("page", page)
        model.addAttribute("pageName","member")
        if (environment.activeProfiles.isNotEmpty() && environment.activeProfiles.first() == "development") {
            model.addAttribute("development", true)
        } else model.addAttribute("development", false)

        return "react-skeleton/member"
    }

    @RequestMapping("clearDB")
    fun clearDb(): String {
        memberServiceImpl.clear()
        return "redirect:/"
    }

    @RequestMapping("importDB")
    fun importDb(): String {
        val file = loader.getResource("classpath:data3.csv").file
        val list = importServiceImpl.import(file)
        memberServiceImpl.import(list)

        return "redirect:/"
    }

    @RequestMapping("/_ah/updateMember")
    @ResponseBody
    fun updateMember(@RequestParam(required=false) page:Int?): String {
        if (page == null){
            QueueFactory.getDefaultQueue().add(TaskOptions.Builder.withUrl("/_ah/updateMember").param("page", "0"))
        }
        else {
            memberServiceImpl.updateAll(page)
        }
        return "success"
    }

    @Autowired lateinit var memberServiceImpl: MemberServiceImpl
    @Autowired lateinit var importServiceImpl: ImportServiceImpl
    @Autowired lateinit var environment: Environment
}