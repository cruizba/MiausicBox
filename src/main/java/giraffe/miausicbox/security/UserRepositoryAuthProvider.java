package giraffe.miausicbox.security;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import giraffe.miausicbox.repositories.UserRepository;
import giraffe.miausicbox.user.User;
import giraffe.miausicbox.user.UserComponent;

@Component
public class UserRepositoryAuthProvider implements AuthenticationProvider{
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserComponent userComponent;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {

		String username = authentication.getName();
		String password = (String) authentication.getCredentials();
		

		List<User> users = userRepository.findUserByUserName(username);
		User user = users.get(0);
		
		if (user == null) {
			throw new BadCredentialsException("User not found");
		}

		if (!new BCryptPasswordEncoder().matches(password, user.getPasswordHash())) {

			throw new BadCredentialsException("Wrong password");
		} else {
			
			userComponent.setLoggedUser(user);
			List<GrantedAuthority> roles = new ArrayList<>();

			return new UsernamePasswordAuthenticationToken(username, password, roles);
		}
	}

	@Override
	public boolean supports(Class<?> authenticationObject) {
		return true;
	}
	

}
