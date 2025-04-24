// src/components/HikingPoll.js
import React, { useState } from 'react';

const HikingPoll = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      type: 'single',
      question: "Какое снаряжение критично для горного похода?",
      options: ["Палатка", "Спальник", "Коврик", "Вся тройка"]
    },
    {
      type: 'single',
      question: "Как часто проверяете состояние снаряжения?",
      options: ["Перед каждым походом", "Раз в сезон", "При поломке"]
    },
    {
      type: 'single',
      question: "Какой рюкзак предпочитаете?",
      options: ["30-50л", "50-70л", "70л+"]
    },
    {
      type: 'text',
      question: "Какие трудности вы сталкивались в походах?",
    },
    {
      type: 'multi',
      question: "Какие предметы вы обязательно берёте с собой?",
      options: ["GPS", "Термос", "Аптечка", "Мультитул", "Запас еды", "Фонарик"]
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
    if (gear === "Вся тройка" && checkFreq === "Перед каждым походом" && backpack === "70л+") {
      return "Выживальщик";
    } else if (checkFreq === "Раз в сезон" && ["50-70л", "70л+"].includes(backpack)) {
      return "Опытный альпинист";
    } else {
      return "Легкий треккер";
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
      <h3>Тест "Какой ты альпинист"</h3>

      {showResults ? (
        <div className="poll-results">
          <h4>Ваш тип: <em>{determineType()}</em></h4>
          <button className="poll-nav-btn" onClick={() => {
            setShowResults(false);
            setAnswers({});
            setCurrentQ(0);
          }}>
            Пройти еще раз
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
                  placeholder="Введите ваш ответ..."
                />
              )}
            </div>
          </div>

          <div className="poll-nav">
            {currentQ > 0 && (
              <button onClick={() => setCurrentQ(currentQ - 1)}>← Назад</button>
            )}
            {currentQ < questions.length - 1 ? (
              <button onClick={() => setCurrentQ(currentQ + 1)} disabled={!isAnswered()}>
                Далее →
              </button>
            ) : (
              <button className="submit-btn" onClick={handleSubmit} disabled={!isAnswered()}>
                Отправить
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HikingPoll;
