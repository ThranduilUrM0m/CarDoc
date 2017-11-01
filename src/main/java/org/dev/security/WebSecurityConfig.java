package org.dev.security;

import java.util.ArrayList;
import java.util.List;

import org.dev.entities.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.IgnoredRequestCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
        web.ignoring().antMatchers(HttpMethod.OPTIONS, "/api/**");
    }
	
	@Bean
	public IgnoredRequestCustomizer optionsIgnoredRequestsCustomizer() {
	   return configurer -> {
	      List<RequestMatcher> matchers = new ArrayList<>();
	      matchers.add(new AntPathRequestMatcher("/**", "OPTIONS"));
	      configurer.requestMatchers(new OrRequestMatcher(matchers));
	   };
	}
}