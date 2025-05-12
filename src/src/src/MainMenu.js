export default function MainMenu({ onSelect }) {
  const student = JSON.parse(localStorage.getItem("studentInfo"));

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md space-y-6 text-center">
      <h2 className="text-2xl font-bold">Welcome, {student?.name}!</h2>
      <p className="text-lg">Choose your training:</p>
      <div className="space-y-2">
        <button onClick={() => onSelect("subtraction")} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 text-xl rounded">➖ Subtraction</button>
        <button onClick={() => alert("Coming Soon")} className="w-full bg-green-500 text-white py-3 text-xl rounded">➕ Addition</button>
        <button onClick={() => alert("Coming Soon")} className="w-full bg-purple-500 text-white py-3 text-xl rounded">✖️ Multiplication</button>
        <button onClick={() => alert("Coming Soon")} className="w-full bg-red-500 text-white py-3 text-xl rounded">➗ Division</button>
      </div>
    </div>
  );
}

