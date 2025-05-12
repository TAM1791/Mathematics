import { useState, useEffect } from "react";

function RegistrationForm({ onComplete }) { const [formData, setFormData] = useState({ name: "", age: "", school: "", dob: "" });

function handleChange(e) { setFormData({ ...formData, [e.target.name]: e.target.value }); }

function handleSubmit(e) { e.preventDefault(); localStorage.setItem("studentInfo", JSON.stringify(formData)); onComplete(); }

return ( <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md"> <h2 className="text-xl font-bold text-center">Student Registration</h2> <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" /> <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required className="w-full p-2 border rounded" /> <input type="text" name="school" placeholder="School Name" value={formData.school} onChange={handleChange} required className="w-full p-2 border rounded" /> <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required className="w-full p-2 border rounded" /> <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Register</button> </form> ); }

function MainMenu({ onSelect }) { const student = JSON.parse(localStorage.getItem("studentInfo")); return ( <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md space-y-6 text-center"> <h2 className="text-2xl font-bold text-gray-800">Welcome, {student?.name}!</h2> <p className="text-lg text-gray-600">Choose your training category:</p> <div className="space-y-3"> <button onClick={() => onSelect("subtractionMenu")} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 text-xl rounded">➖ Subtraction</button> <button onClick={() => onSelect("addition")} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-xl rounded">➕ Addition</button> <button onClick={() => onSelect("multiplication")} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-xl rounded">✖ Multiplication</button> <button onClick={() => onSelect("division")} className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-xl rounded">➗ Division</button> </div> </div> ); }

function SubtractionMenu({ onSelect }) { return ( <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md text-center space-y-4"> <h2 className="text-xl font-bold">Choose Digit Level</h2> <button onClick={() => onSelect(2)} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">2-Digit</button> <button onClick={() => onSelect(3)} className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded">3-Digit</button> </div> ); }

function SubtractionApp({ digitCount, onBack }) { const [question, setQuestion] = useState(generateQuestion()); const [userAnswer, setUserAnswer] = useState(""); const [score, setScore] = useState(0); const [attempts, setAttempts] = useState(0); const [history, setHistory] = useState([]); const [isSubmitted, setIsSubmitted] = useState(false);

function generateQuestion() { const max = digitCount === 2 ? 90 : 900; const min = digitCount === 2 ? 10 : 100; const a = Math.floor(Math.random() * (max - min + 1)) + min; const b = Math.floor(Math.random() * (a - min + 1)) + min; return { a, b }; }

function checkAnswer() { const correct = question.a - question.b; const isCorrect = parseInt(userAnswer) === correct; setScore(score + (isCorrect ? 1 : 0)); setAttempts(attempts + 1); setHistory([{ ...question, userAnswer, isCorrect }, ...history]); setIsSubmitted(true); }

function nextQuestion() { setUserAnswer(""); setQuestion(generateQuestion()); setIsSubmitted(false); }

return ( <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md space-y-6 border border-gray-300"> <h1 className="text-2xl font-extrabold text-center text-gray-800 underline">SubtractMaster - School Workbook</h1> <div className="flex justify-center"> <div className="font-mono text-5xl tracking-widest"> <div className="text-right w-40">{question.a}</div> <div className="text-right w-40"> <span className="inline-block w-8 text-left">-</span> <span className="inline-block w-28 text-right">{question.b}</span> </div> </div> </div> <input type="number" className="border-2 border-gray-500 p-3 text-3xl w-full rounded text-center" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="Your answer" disabled={isSubmitted} /> {!isSubmitted ? ( <button
onClick={checkAnswer}
className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-xl rounded w-full"
> ✔ Submit </button> ) : ( <button
onClick={nextQuestion}
className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-xl rounded w-full"
> ➜ Next Question </button> )} <div className="text-lg text-gray-700 text-center"> Score: <span className="font-bold">{score}</span> / {attempts} </div> <div className="mt-4"> <h2 className="font-semibold text-gray-800 mb-2">Previous Question</h2> <ul className="text-lg list-disc ml-6"> {history.slice(0, 1).map((q, idx) => ( <li key={idx} className={q.isCorrect ? "text-green-600" : "text-red-600"}> {q.a} - {q.b} = {q.userAnswer} ({q.isCorrect ? "✔" : "✘"}) </li> ))} </ul> </div> </div> ); }

export default function App() { const [stage, setStage] = useState("loading"); const [digitMode, setDigitMode] = useState(null);

useEffect(() => { const student = localStorage.getItem("studentInfo"); setStage(student ? "menu" : "register"); }, []);

if (stage === "loading") return null; if (stage === "register") return <RegistrationForm onComplete={() => setStage("menu")} />; if (stage === "menu") return <MainMenu onSelect={(type) => setStage(type)} />; if (stage === "subtractionMenu") return <SubtractionMenu onSelect={(digit) => { setDigitMode(digit); setStage("subtraction"); }} />; if (stage === "subtraction") return <SubtractionApp digitCount={digitMode} onBack={() => setStage("menu")} />;

return null; }
