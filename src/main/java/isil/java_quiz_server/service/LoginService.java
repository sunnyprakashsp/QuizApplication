package isil.java_quiz_server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import isil.java_quiz_server.modal.User;
import isil.java_quiz_server.repository.UserRepository;
import isil.java_quiz_server.requests.LoginRequest;
import isil.java_quiz_server.response.LoginResponse;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    public LoginResponse authenticateUser(LoginRequest loginRequest) {

    User user = userRepository.findByUsername(loginRequest.getUsername());

    if (user == null) {
        return new LoginResponse(null, false);
    }

    if (user.getPassword().equals(loginRequest.getPassword())) {
        return new LoginResponse(user, true);
    }

    return new LoginResponse(null, false);
}
}
