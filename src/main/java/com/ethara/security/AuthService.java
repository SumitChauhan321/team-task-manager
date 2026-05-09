package com.ethara.security;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ethara.Repository.UserRepository;
import com.ethara.dto.AuthResponseDTO;
import com.ethara.dto.LoginRequestDTO;
import com.ethara.dto.SignupRequestDto;
import com.ethara.dto.SignupResponseDto;
import com.ethara.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtTokenService jwtTokenService;

	public SignupResponseDto signup(SignupRequestDto signupRequestDto) {

		User user = (User) userRepository.findByEmail(signupRequestDto.getEmail());
		if (user != null)
			throw new IllegalArgumentException("User already exits");

		User user1 = new User();
		user1.setRole("MEMBER");
		user1.setPassword(passwordEncoder.encode(signupRequestDto.getPassword()));
		user1.setName(signupRequestDto.getName());
		user1.setEmail(signupRequestDto.getEmail());
		user1.setDate(LocalDate.now());
		userRepository.save(user1);
		return new SignupResponseDto(user1.getId(), user1.getName(), user1.getEmail(), user1.getRole());
	}

	public AuthResponseDTO login(LoginRequestDTO loginRequestDto) {
		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword()));
			User user = (User) authentication.getPrincipal();
			String token = jwtTokenService.generateAccessToken(user);

			return new AuthResponseDTO(token, user.getEmail(), user.getRole(), user.getName(), user.getId());
		} catch (Exception ex) {
			return new AuthResponseDTO(null, null, "Invalid username or password", null, null);
		}
	}
}
