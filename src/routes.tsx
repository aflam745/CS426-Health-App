import { Routes, Route } from "react-router-dom";
import { ProfileForm } from "./components/infoComponents/ProfileForm";
import JournalPage  from "./components/journalComponents/journalPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={} /> */}
      <Route path="/profile" element={<ProfileForm />} />
      <Route path="/journal" element={<JournalPage/>} />
    </Routes>
  );
}
