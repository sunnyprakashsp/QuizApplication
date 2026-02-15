import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style/Result.css";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Safe destructuring
  const score = location.state?.score ?? 0;
  const total = location.state?.total ?? 0;

  const percentage =
    total > 0 ? ((score / total) * 100).toFixed(2) : 0;

  return (
    <div className="result-container">
      <h1>Quiz Result</h1>
      <h2>
        {score} / {total}
      </h2>
      <h3>{percentage}%</h3>

      <button onClick={() => navigate("/home")}>
        Back to Home
      </button>
    </div>
  );
};

export default Result;
