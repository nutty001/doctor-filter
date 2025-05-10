import connectDBase from "@/lib/mongodb";
import dotenv from "dotenv";
import Doctor from "@/models/doctors";

dotenv.config(); 
export async function POST(req) {
  try {
    await connectDBase();
    const body = await req.json();
    const { name, speciality, experience, language } = body;

    if (!name || !speciality || !experience || !language) {
      return new Response("All fields are required", { status: 400 });
    }

    const newDoctor = new Doctor({
      name,
      speciality,
      experience,
      language,
    });

    await newDoctor.save();

    return new Response("Doctor added successfully", { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return new Response({error:"Error adding doctor"}, { status: 500 });
}
}

export async function GET(req) {
  await connectDBase();
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const name = searchParams.get("name");
  const speciality = searchParams.get("speciality");
  const experience = searchParams.get("experience");
  const language = searchParams.get("language");

  const query = {};

  if (name) query.name = name;
  if (speciality) query.speciality = speciality;
  if (experience) query.experience = { $gte: parseInt(experience) }; // e.g., 5+ years
  if(language) query.language = language; 

  const total = await Doctor.countDocuments(query);
  const doctors = await Doctor.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  return Response.json({
    doctors,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
