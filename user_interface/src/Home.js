import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./userContext";
import { Link, useNavigate } from "react-router-dom";
import "./style/Home.css";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [quizes, setQuizes] = useState([]);
  const navigate = useNavigate();

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Fetch quizzes
  useEffect(() => {
    const fetchQuizes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/quizzes");
        setQuizes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizes();
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  // ✅ DELETE QUIZ FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quiz?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/quizzes/${id}`);

      // Remove deleted quiz from UI
      setQuizes(quizes.filter((quiz) => quiz.id !== id));

      alert("Quiz deleted successfully!");
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Quiz Titles</h1>

      <ul className="home-list">
        {quizes.map((quiz) => (
          <li className="home-list-items" key={quiz.id}>
            <div className="quiz-row">
              <Link to={`/quiz/${quiz.id}`} className="quiz-title-link">
                {quiz.title}
              </Link>

              {user.user.teacher && (
                <div className="quiz-actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/editQuiz/${quiz.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(quiz.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="wrapp-buttons">
        {user.user.teacher && (
          <Link to="/addQuiz">
            <button className="Home-button">Create New Title</button>
          </Link>
        )}

        <button className="Home-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
