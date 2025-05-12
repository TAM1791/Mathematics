export default function MainMenu({ onSelect }) {
  const student = JSON.parse(localStorage.getItem("studentInfo"));

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md space-y-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800">
        Welcome, {student?.name}!
      </h2>
      <p className="text-lg text-gray-600">Choose your training category:</p>
      
      <div className="space-y-3">
        <button
          onClick={() => onSelect("subtraction")}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 text-xl rounded"
        >
          ➖ Subtraction
        </button>
        <button
          onClick={() => onSelect("addition")}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-xl rounded"
        >
          ➕ Addition
        </button>
        <button
          onClick={() => onSelect("multiplication")}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-xl rounded"
        >
          ✖️ Multiplication
        </button>
        <button
          onClick={() => onSelect("division")}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-xl rounded"
        >
          ➗ Division
        </button>
      </div>
    </div>
  );
}

