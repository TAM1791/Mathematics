import { useState, useEffect } from "react";
import RegistrationForm from "./RegistrationForm";
import MainMenu from "./MainMenu";
import SubtractionApp from "./SubtractionApp";
import AdditionApp from "./AdditionApp";
import MultiplicationApp from "./MultiplicationApp";
import DivisionApp from "./DivisionApp";

export default function App() {
  const [stage, setStage] = useState("loading");
  const [digitMode, setDigitMode] = useState(null);
  const [selectedOperation, setSelectedOperation] = useState(null);

  useEffect(() => {
    const student = localStorage.getItem("studentInfo");
    setStage(student ? "menu" : "register");
  }, []);

  const handleDigitSelect = (operation, digits) => {
    setSelectedOperation(operation);
    setDigitMode(digits);
    setStage(operation);
  };

  if (stage === "loading") return null;
  if (stage === "register") return <RegistrationForm onComplete={() => setStage("menu")} />;
  if (stage === "menu") return (
    <MainMenu onSelect={(op) => setStage(`${op}-select`)} />
  );

  if (stage === "subtraction-select") return (
    <DigitSelector operation="subtraction" onSelect={handleDigitSelect} />
  );
  if (stage === "addition-select") return (
    <DigitSelector operation="addition" onSelect={handleDigitSelect} />
  );
  if (stage === "multiplication-select") return (
    <DigitSelector operation="multiplication" onSelect={handleDigitSelect} singleOption />
  );
  if (stage === "division-select") return (
    <DigitSelector operation="division" onSelect={handleDigitSelect} />
  );

  if (stage === "subtraction") return <SubtractionApp onBack={() => setStage("menu")} digits={digitMode} />;
  if (stage === "addition") return <AdditionApp onBack={() => setStage("menu")} digits={digitMode} />;
  if (stage === "multiplication") return <MultiplicationApp onBack={() => setStage("menu")} />;
  if (stage === "division") return <DivisionApp onBack={() => setStage("menu")} digits={digitMode} />;

  return null;
}

function DigitSelector({ operation, onSelect, singleOption = false }) {
  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md space-y-6 text-center">
      <h2 className="text-xl font-bold">Select Digit Mode for {capitalize(operation)}</h2>
      <div className="space-y-4">
        <button onClick={() => onSelect(operation, 2)} className="w-full bg-blue-500 text-white py-3 rounded text-xl">2-Digit</button>
        {!singleOption && (
          <button onClick={() => onSelect(operation, 3)} className="w-full bg-indigo-500 text-white py-3 rounded text-xl">3-Digit</button>
        )}
        <button onClick={() => onSelect(null, null)} className="text-blue-600 underline text-sm mt-4" style={{ marginTop: '10px' }}>← Back to Menu</button>
      </div>
    </div>
  );
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
