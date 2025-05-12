import { useState } from "react";

export default function RegistrationForm({ onComplete }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    school: "",
    dob: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("studentInfo", JSON.stringify(formData));
    onComplete(); // Proceed to main menu
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md border"
    >
      <h2 className="text-2xl font-bold text-center text-blue-700">Student Registration</h2>
      
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded text-xl"
      />
      
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded text-xl"
      />
      
      <input
        type="text"
        name="school"
        placeholder="School Name"
        value={formData.school}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded text-xl"
      />
      
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded text-xl"
      />
      
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-xl rounded font-bold"
      >
        Register & Start
      </button>
    </form>
  );
}
