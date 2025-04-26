import React, { useState } from 'react';

const HikingPoll = () => {
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      type: 'single',
      question: "Which gear is essential for a mountain hike?",
      options: ["Tent", "Sleeping bag", "Sleeping pad", "All three"]
    },
    {
      type: 'single',
      question: "How often do you check your gear's condition?",
      options: ["Before every hike", "Once a season", "When it breaks"]
    },
    {
      type: 'single',
      question: "What size backpack do you prefer?",
      options: ["30-50L", "50-70L", "70L+"]
    },
    {
      type: 'text',
      question: "What difficulties have you faced on your hikes?"
    },
    {
      type: 'multi',
      question: "Which items do you always carry with you?",
      options: ["GPS", "Thermos", "First aid kit", "Multitool", "Extra food", "Flashlight"]
    }
  ];

  const handleAnswer = (value) => {
    setAnswers(prev => ({ ...prev, [currentQ]: value }));
  };

  const handleMultiChange = (option) => {
    const selected = answers[currentQ] || [];
    const updated = selected.includes(option)
      ? selected.filter(o => o !== option)
      : [...selected, option];
    handleAnswer(updated);
  };

  const handleSubmit = () => setShowResults(true);

  const determineType = () => {
    const [gear, checkFreq, backpack] = [answers[0], answers[1], answers[2]];
    if (gear === "All three" && checkFreq === "Before every hike" && backpack === "70L+") {
      return "Survivalist";
    } else if (checkFreq === "Once a season" && ["50-70L", "70L+"].includes(backpack)) {
      return "Experienced Mountaineer";
    } else {
      return "Enthusiast";
    }
  };

  const isAnswered = () => {
    const ans = answers[currentQ];
    return questions[currentQ].type === 'text'
      ? !!ans?.trim()
      : Array.isArray(ans)
        ? ans.length > 0
        : !!ans;
  };

  return (
    <div className="hiking-poll">
      <h3>Quiz: What Type of Mountaineer Are You?</h3>

      {!started ? (
        <div className="name-input">
          <p>Please enter your name to begin:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          <button
            onClick={() => setStarted(true)}
            disabled={!name.trim()}
            className="poll-nav-btn"
          >
            Start Quiz
          </button>
        </div>
      ) : showResults ? (
        <div className="poll-results">
          <h4>{name}, you are a <em>{determineType()}</em>!</h4>
          <button className="poll-nav-btn" onClick={() => {
            setShowResults(false);
            setAnswers({});
            setCurrentQ(0);
            setStarted(false);
            setName('');
          }}>
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="poll-question">
            <p>{questions[currentQ].question}</p>
            <div className="poll-options">
              {questions[currentQ].type === 'single' &&
                questions[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    className={answers[currentQ] === opt ? 'selected' : ''}
                    onClick={() => handleAnswer(opt)}
                  >
                    {opt}
                  </button>
                ))}

              {questions[currentQ].type === 'multi' &&
                questions[currentQ].options.map((opt, i) => (
                  <label key={i}>
                    <input
                      type="checkbox"
                      checked={(answers[currentQ] || []).includes(opt)}
                      onChange={() => handleMultiChange(opt)}
                    />
                    {opt}
                  </label>
                ))}

              {questions[currentQ].type === 'text' && (
                <textarea
                  rows="4"
                  cols="40"
                  value={answers[currentQ] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                />
              )}
            </div>
          </div>

          <div className="poll-nav">
            {currentQ > 0 && (
              <button onClick={() => setCurrentQ(currentQ - 1)}>← Back</button>
            )}
            {currentQ < questions.length - 1 ? (
              <button onClick={() => setCurrentQ(currentQ + 1)} disabled={!isAnswered()}>
                Next →
              </button>
            ) : (
              <button className="submit-btn" onClick={handleSubmit} disabled={!isAnswered()}>
                Submit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HikingPoll;
