package isil.java_quiz_server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import isil.java_quiz_server.modal.Quiz;
import isil.java_quiz_server.repository.QuizRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class QuizController {

    @Autowired
    private QuizRepository quizRepository;

    // GET ALL QUIZZES
    @GetMapping("/quizzes")
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    // CREATE QUIZ
    @PostMapping("/quizzes")
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        return quizRepository.save(quiz);
    }

    // GET QUIZ BY ID
    @GetMapping("/quizzes/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        return quizRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/quizzes/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long id,
                                           @RequestBody Quiz updatedQuiz) {

        return quizRepository.findById(id)
                .map(existingQuiz -> {

                    existingQuiz.setTitle(updatedQuiz.getTitle());
                    existingQuiz.setUsername(updatedQuiz.getUsername());

                    // Important: Replace full question list
                    existingQuiz.setQuestions(updatedQuiz.getQuestions());

                    return ResponseEntity.ok(quizRepository.save(existingQuiz));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE QUIZ
    @DeleteMapping("/quizzes/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {

        if (!quizRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        quizRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
