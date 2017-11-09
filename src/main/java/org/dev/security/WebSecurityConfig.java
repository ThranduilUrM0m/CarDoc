package org.dev.security;


import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dev.entities.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.util.matcher.AndRequestMatcher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestHeaderRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private SpringDataJpaUserDetailsService userDetailsService;

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(Account.PASSWORD_ENCODER);
	}

	// Needed by Spring Security OAuth
	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	@Override
    protected void configure(HttpSecurity http) throws Exception {
        http
	        .authorizeRequests()
	          	.antMatchers(HttpMethod.POST, "/signup").permitAll()
	          	.antMatchers(HttpMethod.POST, "/signupmotorist").permitAll()
	          	.antMatchers(HttpMethod.POST, "/signuptvg").permitAll()
	          	.and()
	        .authorizeRequests()
	        	.antMatchers("/css/**").permitAll()
				.antMatchers("/media/**").permitAll()
				.antMatchers("/js/**").permitAll()
				.and()
	        .authorizeRequests()
	          	.antMatchers("/", "/index", "/register", "/success")
	            .permitAll()
	            .anyRequest().fullyAuthenticated()
	            .and()
	        .formLogin()
	        	.loginPage("/index")
	            .defaultSuccessUrl("/profil", true)
	            .failureHandler(handleAuthenticationFailure())
	            .permitAll()
	            .and()
	        .httpBasic()
				.and()
			.csrf().disable()
			.logout()
		.logoutSuccessUrl("/")
				.invalidateHttpSession(true)
				.deleteCookies("JSESSIONID");
    }
	
	@Override
    public void configure(WebSecurity web) throws Exception {
		RequestHeaderRequestMatcher requestHeaderRequestMatcher = new RequestHeaderRequestMatcher("x-my-custom-header", "INDEED");
		AntPathRequestMatcher antPathRequestMatcher = new AntPathRequestMatcher("/api/**");
		AndRequestMatcher andRequestMatcher = new AndRequestMatcher(requestHeaderRequestMatcher, antPathRequestMatcher);
		
		AntPathRequestMatcher antPathRequestMatcherS = new AntPathRequestMatcher("/sessionLP");
		AndRequestMatcher andRequestMatcherS = new AndRequestMatcher(requestHeaderRequestMatcher, antPathRequestMatcherS);
		
		AntPathRequestMatcher antPathRequestMatcherV = new AntPathRequestMatcher("/validateEmail");
		AndRequestMatcher andRequestMatcherV = new AndRequestMatcher(requestHeaderRequestMatcher, antPathRequestMatcherV);
		web
		    .ignoring()
		        .requestMatchers(andRequestMatcher)
		        .requestMatchers(andRequestMatcherS)
		        .requestMatchers(andRequestMatcherV);
    }

	@Bean
	public AuthenticationFailureHandler handleAuthenticationFailure() {
	    return new SimpleUrlAuthenticationFailureHandler() {

	        @Override
	        public void onAuthenticationFailure(HttpServletRequest httpRequest, 
	        									HttpServletResponse httpResponse,
	                                            AuthenticationException authenticationException) throws IOException, ServletException {
	        	
	            setDefaultFailureUrl("/index?error="+authenticationException.getLocalizedMessage());
	            super.onAuthenticationFailure(httpRequest, httpResponse, authenticationException);
	        }
	    };
	}
}