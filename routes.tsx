import { Routes, Route } from "react-router-dom";
import { ProfileForm } from "./components/infoComponents/ProfileForm";
import { HomePage } from "./components/homeComponents/homeCard"
import { LoginForm } from "./components/loginComponents/loginForm"

export default function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={} /> */}
      <Route path="/login" element={<LoginForm />} /> 
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<ProfileForm />} />
    </Routes>
  );
}
