import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./style/QuizData.css";
import { FiChevronLeft } from "react-icons/fi";

const QuizData = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [quizDetails, setQuizDetails] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/quizzes/${id}`
        );
        setQuizDetails(response.data);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
      }
    };

    fetchQuizDetails();
  }, [id]);

  // Handle option click
  const handleOptionClick = (questionId, selectedOption) => {
    if (selectedAnswers[questionId]) return; // prevent re-selection

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  // Submit quiz
  const handleSubmit = () => {
    let score = 0;

    quizDetails.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctOption) {
        score++;
      }
    });

    navigate("/result", {
      state: {
        score: score,
        total: quizDetails.questions.length,
      },
    });
  };

  return (
    <div className="quiz-details">
      <div className="header">
        <button
          onClick={() => navigate("/home")}
          className="back-button"
        >
          <FiChevronLeft />
        </button>
        <h1 className="quiz-title">Quiz Details</h1>
      </div>

      {quizDetails.questions?.map((question) => (
        <div key={question.id} className="question-container">
          <p className="question-text">{question.text}</p>

          <ul className="options-list">
            {question.options?.map((option, index) => {
              const selectedOption = selectedAnswers[question.id];
              const isSelected = selectedOption === option;
              const isCorrect = option === question.correctOption;

              return (
                <li
                  key={index}
                  className={`option
                    ${
                      selectedOption &&
                      isCorrect
                        ? "correct"
                        : ""
                    }
                    ${
                      isSelected && !isCorrect
                        ? "wrong"
                        : ""
                    }
                  `}
                  onClick={() =>
                    handleOptionClick(question.id, option)
                  }
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {/* Submit Button */}
      {quizDetails.questions && (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Quiz
        </button>
      )}
    </div>
  );
};

export default QuizData;
