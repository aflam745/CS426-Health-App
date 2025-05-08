import { Routes, Route, Navigate } from "react-router-dom";
import { ProfileForm } from "./components/infoComponents/ProfileForm";
import JournalPage  from "./components/journalComponents/journalPage";
import { HomePage } from "./components/homeComponents/homeCard"
import { LoginForm } from "./components/loginComponents/loginForm"
import { PrescriptionsPage } from "./components/prescriptionComponents/PrescriptionsPage";
export default function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={} /> */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/prescriptions" element={<PrescriptionsPage/>} />
      <Route path="/profile/:id" element={<ProfileForm />} />
      <Route path="/journal" element={<JournalPage/>} />
    </Routes>
  );
}
