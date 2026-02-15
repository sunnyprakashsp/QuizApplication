package isil.java_quiz_server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import isil.java_quiz_server.modal.User;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByUsername(String username);

}
