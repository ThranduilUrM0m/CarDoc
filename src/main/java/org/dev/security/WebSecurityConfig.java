package org.dev.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Override
    protected void configure(HttpSecurity http) throws Exception {
        
      http
        .authorizeRequests().antMatchers("/css/**").permitAll()
							.antMatchers("/media/**").permitAll()
							.antMatchers("/js/**").permitAll()
							.antMatchers("/api/**").permitAll()
          .and()
        .authorizeRequests()
          .antMatchers("/", "/index")
            .permitAll()
            .anyRequest().authenticated()
            .and()
        .formLogin()
            .loginPage("/index")
            .defaultSuccessUrl("/profil")
            .permitAll()
            .and()
        .logout()
            .permitAll()
            .and()
        .httpBasic()
            .and()
        .csrf().disable(); //Disable CSRF

    }
     
    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {  
    	auth.inMemoryAuthentication().withUser("user1234").password("user4321").roles("USER");
    }
}