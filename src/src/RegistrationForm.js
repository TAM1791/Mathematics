import { useState } from "react";

export default function RegistrationForm({ onComplete }) {
  const [formData, setFormData] = useState({ name: "", age: "", school: "", dob: "" });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("studentInfo", JSON.stringify(formData));
    onComplete();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold text-center">Student Registration</h2>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="text" name="school" placeholder="School Name" value={formData.school} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full p-2 border rounded" />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
    </form>
  );
}

