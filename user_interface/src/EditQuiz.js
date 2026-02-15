import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./style/EditQuiz.css";

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState({
    title: "",
    username: "",
    questions: [],
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/quizzes/${id}`
        );
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleTitleChange = (e) => {
    setQuiz({ ...quiz, title: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          text: "",
          options: ["", "", "", ""],
          correctOption: "",
        },
      ],
    });
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = quiz.questions.filter(
      (_, i) => i !== index
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8080/quizzes/${id}`,
        quiz
      );
      alert("Quiz updated successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  return (
    <div className="edit-container">
      <h2>Edit Quiz</h2>

      <input
        type="text"
        value={quiz.title}
        onChange={handleTitleChange}
        className="title-input"
        placeholder="Quiz Title"
      />

      {quiz.questions.map((question, qIndex) => (
        <div key={qIndex} className="question-box">
          <input
            type="text"
            value={question.text}
            onChange={(e) =>
              handleQuestionChange(qIndex, "text", e.target.value)
            }
            placeholder="Question Text"
          />

          {question.options.map((option, oIndex) => (
            <input
              key={oIndex}
              type="text"
              value={option}
              onChange={(e) =>
                handleOptionChange(qIndex, oIndex, e.target.value)
              }
              placeholder={`Option ${oIndex + 1}`}
            />
          ))}

          <input
            type="text"
            value={question.correctOption}
            onChange={(e) =>
              handleQuestionChange(
                qIndex,
                "correctOption",
                e.target.value
              )
            }
            placeholder="Correct Option"
          />

          <button
            className="delete-question-btn"
            onClick={() => deleteQuestion(qIndex)}
          >
            Delete Question
          </button>
        </div>
      ))}

      <button className="add-btn" onClick={addQuestion}>
        Add Question
      </button>

      <button className="save-btn" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default EditQuiz;
