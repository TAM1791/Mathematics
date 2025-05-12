import { useState, useEffect } from "react";

export default function SubtractionApp({ onBack, digits }) {
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [history, setHistory] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function generateQuestion() {
    const min = digits === 2 ? 10 : 100;
    const max = digits === 2 ? 99 : 999;
    const a = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (a - min + 1)) + min;
    return { a, b };
  }

  useEffect(() => setQuestion(generateQuestion()), [digits]);

  function checkAnswer() {
    const correct = question.a - question.b;
    const isCorrect = parseInt(userAnswer) === correct;
    setScore(score + (isCorrect ? 1 : 0));
    setAttempts(attempts + 1);
    setHistory([{ ...question, userAnswer, isCorrect }, ...history]);
    setIsSubmitted(true);
  }

  function nextQuestion() {
    setUserAnswer("");
    setQuestion(generateQuestion());
    setIsSubmitted(false);
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md space-y-6 border border-gray-300">
      <button onClick={onBack} className="text-left text-blue-600 underline">← Back to Menu</button>
      <h1 className="text-2xl font-extrabold text-center text-gray-800 underline">Subtraction ({digits}-Digit)</h1>
      <div className="flex justify-center">
        <div className="font-mono text-5xl tracking-widest">
          <div className="text-right w-40">{question.a}</div>
          <div className="text-right w-40">
            <span className="inline-block w-8 text-left">-</span>
            <span className="inline-block w-28 text-right">{question.b}</span>
          </div>
        </div>
      </div>
      <input
        type="number"
        className="border-2 border-gray-500 p-3 text-3xl w-full rounded text-center"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Your answer"
        disabled={isSubmitted}
      />
      {!isSubmitted ? (
        <button onClick={checkAnswer} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-xl rounded w-full">✔ Submit</button>
      ) : (
        <button onClick={nextQuestion} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-xl rounded w-full">➜ Next Question</button>
      )}
      <div className="text-lg text-gray-700 text-center">Score: <span className="font-bold">{score}</span> / {attempts}</div>
    </div>
  );
}
