// See https://github.com/JetBrains/kotlin-examples/blob/master/LICENSE
package org.jetbrains.kotlin.demo

import com.googlecode.objectify.ObjectifyFilter
import org.jetbrains.kotlin.demo.util.dialect.GcsHrefProcessor
import org.jetbrains.kotlin.demo.util.dialect.GcsResourceDialect
import org.jetbrains.kotlin.demo.util.dialect.GcsSrcProcessor
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.boot.web.support.SpringBootServletInitializer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.support.ReloadableResourceBundleMessageSource
import org.springframework.web.servlet.LocaleResolver
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor
import org.springframework.web.servlet.i18n.SessionLocaleResolver
import java.util.*

@Configuration
open class WebConfig : WebMvcConfigurerAdapter() {

    @Bean open fun gscHrefProcessor() = GcsHrefProcessor()
    @Bean open fun gscSrcProcessor() = GcsSrcProcessor()
    @Bean open fun gscDialectProcessor() = GcsResourceDialect()

    @Bean open fun filterRegistrationBean(): FilterRegistrationBean {
        val filterRegistrationBean = FilterRegistrationBean()
        filterRegistrationBean.filter = ObjectifyFilter()
        filterRegistrationBean.urlPatterns = listOf("/*")
        filterRegistrationBean.order = 1
        filterRegistrationBean.setName("ObjectifyFilter")
        return filterRegistrationBean
    }

    @Bean
    open fun localeResolver(): LocaleResolver {
        val slr = SessionLocaleResolver()
        slr.setDefaultLocale(Locale.forLanguageTag("th"))
        return slr
    }

    @Bean
    open fun localeChangeInterceptor(): LocaleChangeInterceptor {
        val lci = LocaleChangeInterceptor()
        lci.paramName = "lang"
        return lci
    }

}

@SpringBootApplication
class Application : SpringBootServletInitializer() {

    @Bean
    open fun messageSource(): ReloadableResourceBundleMessageSource {
        val messageSource = ReloadableResourceBundleMessageSource()
        messageSource.setDefaultEncoding("UTF-8")
        messageSource.setBasename("classpath:lang/messages")
        messageSource.setCacheSeconds(10) //reload messages every 10 seconds
        return messageSource
    }
}

fun main(args: Array<String>) {
    SpringApplication.run(Application::class.java, *args)
}
