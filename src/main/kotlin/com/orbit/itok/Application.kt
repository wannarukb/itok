// See https://github.com/JetBrains/kotlin-examples/blob/master/LICENSE
package com.orbit.itok

import com.fasterxml.jackson.module.kotlin.KotlinModule
import com.googlecode.objectify.ObjectifyFilter
import com.orbit.itok.util.dialect.GcsHrefProcessor
import com.orbit.itok.util.dialect.GcsResourceDialect
import com.orbit.itok.util.dialect.GcsSrcProcessor
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.boot.web.support.SpringBootServletInitializer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.support.ReloadableResourceBundleMessageSource
import org.springframework.format.FormatterRegistry
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder
import org.springframework.web.servlet.LocaleResolver
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor
import org.springframework.web.servlet.i18n.SessionLocaleResolver
import java.util.*

@Configuration
open class WebConfig : WebMvcConfigurerAdapter() {

    @Bean open fun gscHrefProcessor() = GcsHrefProcessor()
    @Bean open fun gscSrcProcessor() = GcsSrcProcessor()
    @Bean open fun gscDialectProcessor() = GcsResourceDialect()

    @Bean
    open fun objectMapperBuilder(): Jackson2ObjectMapperBuilder
            = Jackson2ObjectMapperBuilder().modulesToInstall(KotlinModule())

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

@SpringBootApplication(exclude = arrayOf(HibernateJpaAutoConfiguration::class))
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
