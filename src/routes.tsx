import { Routes, Route } from "react-router-dom";
import { ProfileForm } from "./components/infoComponents/ProfileForm";

export default function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={} /> */}
      <Route path="/profile" element={<ProfileForm />} />
    </Routes>
  );
}
