"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function DoctorsList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1");
  const experience = searchParams.get("experience") || "";
  const selectedSpecialities = searchParams.getAll("speciality");
  const selectedLanguage = searchParams.getAll("language");

  const [data, setData] = useState({ doctors: [], totalPages: 1 });

  const [filters, setFilters] = useState({
    specialities: selectedSpecialities,
    experience,
    language: selectedLanguage,
  });

  const specialityOptions = [
    "cardiology",
    "neurology",
    "dermatology",
    "orthopedics",
  ];

  const languageOptions = ["English", "Hindi", "Telugu", "Kannada"];

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams();

      if (filters.specialities.length > 0) {
        filters.specialities.forEach((s) => params.append("speciality", s));
      }
      if (filters.language.length > 0) {
        filters.language.forEach((s) => params.append("language", s));
      }
      if (filters.experience) {
        params.set("experience", filters.experience);
      }
      params.set("page", page);

      const res = await fetch(`/api/doctors?${params.toString()}`);
      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, [filters, page]);

  const handleSpecialityChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setFilters((prev) => {
      const newSpecialities = isChecked
        ? [...prev.specialities, value]
        : prev.specialities.filter((s) => s !== value);
      return { ...prev, specialities: newSpecialities };
    });
  };

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setFilters((prev) => {
      const newLanguage = isChecked
        ? [...prev.language, value]
        : prev.language.filter((s) => s !== value);
      return { ...prev, language: newLanguage };
    });
  };

  const handleExperienceChange = (e) => {
    setFilters((prev) => ({ ...prev, experience: e.target.value }));
  };

  const goToPage = (p) => {
    const params = new URLSearchParams();
    filters.specialities.forEach((s) => params.append("speciality", s));
    filters.language.forEach((s) => params.append("language", s));
    if (filters.experience) params.set("experience", filters.experience);
    params.set("page", p.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <Navbar />
      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/*left side*/}
        <div className="md:w-1/5 h-2/3 w-full border p-4 rounded shadow bg-white sticky top-0 my-12">
          <h2 className="text-2xl font-bold mb-4">Filter</h2>
          {/* Filters */}

          <div className="mb-4">
            <label className="block font-medium mb-2">Speciality</label>
            <div className="space-x-4">
              {specialityOptions.map((spec) => (
                <label key={spec} className="block">
                  <input
                    type="checkbox"
                    value={spec}
                    checked={filters.specialities.includes(spec)}
                    onChange={handleSpecialityChange}
                  />
                  {spec}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Language</label>
            <div className="space-x-4">
              {languageOptions.map((lang) => (
                <label key={lang} className="block">
                  <input
                    type="checkbox"
                    value={lang}
                    checked={filters.language.includes(lang)}
                    onChange={handleLanguageChange}
                  />
                  {lang}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Minimum Experience</label>
            <input
              type="number"
              value={filters.experience}
              onChange={handleExperienceChange}
              className="ml-2"
              placeholder="e.g. 5"
            />
          </div>
        </div>

        {/*right side*/}
        <div className="md:w-2/3 w-full">
          <h1 className="text-2xl font-bold mb-4 flex justify-center items-center">
            Consult General Physicians Online - Internal Medicine Specialists
          </h1>
          {/* Doctor List */}
          <div className="flex justify-center items-center mb-4 ">
            <ul className="space-y-4 w-2/3">
              {data.doctors.map((doctor) => (
                <li
                  key={doctor._id}
                  className=" relative p-10 bg-white border border-gray-300 rounded-lg shadow-md w-full  min-h-[200px]"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    Dr. {doctor.name}
                  </h2>
                  <p>
                    <span className="font-medium">Speciality:</span>{" "}
                    {doctor.speciality}
                  </p>
                  <p>
                    <span className="font-medium">Experience:</span>{" "}
                    {doctor.experience} years
                  </p>
                  <p>
                    <span className="font-medium">Language:</span>{" "}
                    {doctor.language}
                  </p>
                  <button className="absolute bottom-4 right-4 bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer transition">
                    Book Appointment
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center space-x-2">
            {Array.from({ length: data.totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-2 ${
                  page === i + 1 ? "font-bold underline" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
