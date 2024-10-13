import "./App.css";
// react
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/signup" element={<SignupPage />} />
               <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
         </BrowserRouter>
      </>
   );
}

export default App;
