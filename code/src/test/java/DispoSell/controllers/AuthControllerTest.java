package DispoSell.controllers;

import DispoSell.models.*;
import DispoSell.payload.request.*;
import DispoSell.payload.response.*;
import DispoSell.repositories.*;
import DispoSell.security.jwt.JwtUtils;
import DispoSell.security.services.UserDetailsImpl;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {
    @InjectMocks
    private AuthController authControllerImpl;

    @Mock
    AuthenticationManager authenticationManager;

    @Mock
    UserRepository userRepository;

    @Mock
    RoleRepository roleRepository;

    @Mock
    PasswordEncoder encoder;

    @Mock
    JwtUtils jwtUtils;

    @Mock
    Authentication authentication;

    @Mock
    UserDetailsImpl userDetails;

    @Before("")
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void authenticateUser() {
        // Arrange
        String testUsername = "username";
        String testPassword = "password";
        String jwtToken = "jwtToken";
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(testUsername);
        loginRequest.setPassword(testPassword);
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());
        when(authenticationManager.authenticate(token)).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn(userDetails);
        when(jwtUtils.generateJwtToken(authentication)).thenReturn(jwtToken);
        List<String> roles = new ArrayList<>();
        when(userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList())).thenReturn(roles);
        // Act
        ResponseEntity<?> response = authControllerImpl.authenticateUser(loginRequest);
        // Assert
        verify(authenticationManager).authenticate(token);
        verify(jwtUtils).generateJwtToken(authentication);

        assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof JwtResponse);
        assertEquals(jwtToken, ((JwtResponse) response.getBody()).getAccessToken());
        assertEquals(userDetails.getId(), ((JwtResponse) response.getBody()).getId());
        assertEquals(userDetails.getUsername(), ((JwtResponse) response.getBody()).getUsername());
        assertEquals(userDetails.getFirstName(), ((JwtResponse) response.getBody()).getFirstName());
        assertEquals(userDetails.getLastName(), ((JwtResponse) response.getBody()).getLastName());
        assertEquals(userDetails.getEmail(), ((JwtResponse) response.getBody()).getEmail());
        assertEquals(userDetails.getDeliveryAddress(), ((JwtResponse) response.getBody()).getDeliveryAddress());
        assertEquals(userDetails.getPhoneNumber(), ((JwtResponse) response.getBody()).getPhoneNumber());
        assertEquals(roles, ((JwtResponse) response.getBody()).getRoles());
    }

    @Test
    void registerUser_existsByUsername() {
        // Arrange
        String errorMessage = "Error: Username is already taken!";
        SignupRequest signUpRequest = new SignupRequest();
        String testUsername = "username";
        signUpRequest.setUsername(testUsername);
        when(userRepository.existsByUsername(testUsername)).thenReturn(true);
        // Act
        ResponseEntity<?> response = authControllerImpl.registerUser(signUpRequest);
        // Assert
        assertEquals(HttpStatus.BAD_REQUEST.value(), response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof MessageResponse);
        assertEquals(errorMessage, ((MessageResponse) response.getBody()).getMessage());
    }

    @Test
    void registerUser_existsByEmail() {
        // Arrange
        String errorMessage = "Error: Email is already in use!";
        SignupRequest signUpRequest = new SignupRequest();
        String testEmail = "email@gmail.com";
        String testUsername = "username";
        signUpRequest.setEmail(testEmail);
        signUpRequest.setUsername(testUsername);
        when(userRepository.existsByUsername(testUsername)).thenReturn(false);
        when(userRepository.existsByEmail(testEmail)).thenReturn(true);
        // Act
        ResponseEntity<?> response = authControllerImpl.registerUser(signUpRequest);
        // Assert
        assertEquals(HttpStatus.BAD_REQUEST.value(), response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof MessageResponse);
        assertEquals(errorMessage, ((MessageResponse) response.getBody()).getMessage());
    }

    @Captor
    ArgumentCaptor<User> userArgumentCaptor;

    @Test
    void registerUserSuccessful() {
        // Arrange
        String successfulMessage = "User registered successfully!";
        String testEmail = "email@gmail.com";
        String testUsername = "username";
        SignupRequest signUpRequest = new SignupRequest();
        signUpRequest.setUsername(testUsername);
        signUpRequest.setFirstName("firstName");
        signUpRequest.setLastName("lastName");
        signUpRequest.setEmail(testEmail);
        signUpRequest.setPassword("password");
        signUpRequest.setDeliveryAddress("deliveryAddress");
        signUpRequest.setPhoneNumber("1234567890");
        when(userRepository.existsByUsername(testUsername)).thenReturn(false);
        when(userRepository.existsByEmail(testEmail)).thenReturn(false);
        String encodedPassword = "encodedPassword";
        when(encoder.encode(signUpRequest.getPassword())).thenReturn(encodedPassword);
        User user = new User(signUpRequest.getUsername(), signUpRequest.getFirstName(), signUpRequest.getLastName(),
                signUpRequest.getEmail(), encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getDeliveryAddress(), signUpRequest.getPhoneNumber());
        Set<Role> roles = new HashSet<>();
        Role userRole = new Role(ERole.ROLE_USER);
        roles.add(userRole);
        user.setRoles(roles);
        when(roleRepository.findByName(ERole.ROLE_USER)).thenReturn(Optional.of(userRole));
        // Act
        ResponseEntity<?> response = authControllerImpl.registerUser(signUpRequest);
        // Assert
        assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
        assertTrue(response.getBody() instanceof MessageResponse);
        assertEquals(successfulMessage, ((MessageResponse) response.getBody()).getMessage());

        verify(userRepository).save(userArgumentCaptor.capture());
        User argument = userArgumentCaptor.getValue();
        assertEquals(testUsername, argument.getUsername());
        assertEquals(testEmail, argument.getEmail());
        assertEquals(user.getFirstName(), argument.getFirstName());
        assertEquals(user.getLastName(), argument.getLastName());
        assertEquals(user.getPassword(), argument.getPassword());
        assertEquals(user.getContactAddress(), argument.getContactAddress());
        assertEquals(user.getPhoneNumber(), argument.getPhoneNumber());
        assertEquals(user.getRoles(), argument.getRoles());
    }

    @Test
    void getAllShippers() {
        // Arrange
        Role modRole = new Role(ERole.ROLE_SHIPPER);
        List<User> expectedUsers = new ArrayList<User>();
        expectedUsers.add(new User("username", "firstName", "lastName", "email",
                "password", "deliveryAddress", "phoneNumber"));
        when(roleRepository.findByName(ERole.ROLE_SHIPPER)).thenReturn(Optional.of(modRole));
        when(userRepository.findByRoles(modRole)).thenReturn(expectedUsers);
        // Act
        List<User> actualUsers = authControllerImpl.getAllShippers();
        // Assert
        assertEquals(expectedUsers, actualUsers);
    }
}