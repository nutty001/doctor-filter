import { Suspense } from "react";
import DoctorsListClient from "./DoctorsListClient";

export default function DoctorsPage() {
  return (
    <Suspense fallback={<div>Loading doctors...</div>}>
      <DoctorsListClient />
    </Suspense>
  );
}
