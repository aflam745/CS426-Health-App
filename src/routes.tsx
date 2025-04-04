import { Routes, Route } from "react-router-dom";
import { ProfileForm } from "./components/infoComponents/ProfileForm";
import { PrescriptionsPage } from "./components/prescriptionComponents/PrescriptionsPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={} /> */}
      <Route path="/prescriptions" element={<PrescriptionsPage/>} />
      <Route path="/profile" element={<ProfileForm />} />
    </Routes>
  );
}
