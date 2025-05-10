"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddDoctor() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    speciality: "",
    experience: "",
    language: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Doctor added!");
      router.push("/doctors");
    } else {
      alert("Error adding doctor");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Doctor</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Doctor's Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <select
          name="speciality"
          value={form.speciality}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select Speciality</option>
          <option value="cardiology">Cardiology</option>
          <option value="neurology">Neurology</option>
          <option value="dermatology">Dermatology</option>
          <option value="orthopedics">Orthopedics</option>
        </select>

        <select
          name="language"
          value={form.language}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select language</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Telugu">Telugu</option>
          <option value="Kannada">Kannada</option>
        </select>

        <input
          type="number"
          name="experience"
          placeholder="Years of Experience"
          value={form.experience}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
}
