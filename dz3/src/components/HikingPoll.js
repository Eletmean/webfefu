import React, { useState } from 'react';
import startImage from '../images/poll2.jpg';
import resultImage from '../images/poll1.jpg';

const HikingPoll = () => {
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0); // индекс текущего вопроса
  const [answers, setAnswers] = useState({}); // объект с ответами (ключ — номер вопроса)
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
      options: ["GPS", "Thermos", "First aid kit", "Multitool"]
    }
  ];

  const handleAnswer = (value) => {
    if (questions[currentQ].type === 'text') { // если текст то валидируем 
      const filteredValue = value.replace(/[^A-Za-z0-9\s.,!?'"():;@#&$%*+\-=/\\\n\r]/g, '');
      setAnswers(prev => ({ ...prev, [currentQ]: filteredValue })); //бновляет ответ на текущий вопрос и сохраняет остальные ответы без изменений.
    } else {
      setAnswers(prev => ({ ...prev, [currentQ]: value })); // иначе просто напрямую сохраняем
    }
  };

  const handleMultiChange = (option) => { // множественный выбор опшн
    const selected = answers[currentQ] || []; // если пусто (ниче не выбрали) подставим пустой массив 
    const updated = selected.includes(option) //проверяем, есть ли в массиве селектед уже такой вариант опшн
      ? selected.filter(o => o !== option) // если да  новый массив, где только те элементы, которые не равны опшн.
      : [...selected, option]; // если нет то новый массив 
    handleAnswer(updated);
  };

  const handleSubmit = () => setShowResults(true); 

  const determineType = () => { // опеределяем какой тип у пользователя
    const [gear, checkFreq, backpack] = [answers[0], answers[1], answers[2]];
    if (gear === "All three" && checkFreq === "Before every hike" && backpack === "70L+") {
      return "Survivalist";
    } else if (checkFreq === "Once a season" && ["50-70L", "70L+"].includes(backpack)) {
      return "Experienced Mountaineer";
    } else {
      return "Enthusiast";
    }
  };

  const isAnswered = () => { // чтобы кнопка некст не работала если на вопросик не ответили
    const ans = answers[currentQ];
    return questions[currentQ].type === 'text'
      ? !!ans?.trim() // ?	Оператор проверки на null, !! певращает значение в true/false
      : Array.isArray(ans)
        ? ans.length > 0
        : !!ans;
  };

  const handleNameChange = (e) => {
    const filteredValue = e.target.value.replace(/[^A-Za-z\s]/g, '');
    setName(filteredValue);
  };

  return (
    <div className="hiking-poll">
      {!started ? (
        <div className="name-input">
          <h3>Quiz: What Type of Mountaineer Are You?</h3>
          <img src={startImage} alt="" className="start-image" />
          <p>Please enter your name to begin:</p>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Your name (English only)"
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
          <h3>Quiz: What Type of Mountaineer Are You?</h3>
          <div className="result-content">
            <h2>{name}, you are a <span className="result-type">{determineType()}</span>!</h2>
            <img src={resultImage} alt="" className="result-image" />
          </div>
          <button 
            className="poll-nav-btn try-again-btn"
            onClick={() => { // Сброс всех состояний до начального
              setShowResults(false);
              setAnswers({});
              setCurrentQ(0);
              setStarted(false);
              setName('');
            }}
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          <h3>Quiz: What Type of Mountaineer Are You?</h3>
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
                  placeholder="Type your answer here (English only)..."
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
