package org.dev.security;


import org.dev.entities.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
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
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
			.userDetailsService(this.userDetailsService)
				.passwordEncoder(Account.PASSWORD_ENCODER);
	}
	
	@Override
    protected void configure(HttpSecurity http) throws Exception {
	        http
	        .authorizeRequests()
	        	.antMatchers("/css/**").permitAll()
				.antMatchers("/media/**").permitAll()
				.antMatchers("/js/**").permitAll()
				.and()
	        .authorizeRequests()
	          	.antMatchers("/", "/index")
	            .permitAll()
	            .anyRequest().fullyAuthenticated()
	            .and()
	        .formLogin()
	        	.loginPage("/index")
	            .defaultSuccessUrl("/profil", true)
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
		web
		    .ignoring()
		        .requestMatchers(andRequestMatcher);
    }
}