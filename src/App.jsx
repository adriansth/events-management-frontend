import "./App.css";
// react
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import HomePage from "./pages/HomePage";

function App() {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<HomePage />} />
            </Routes>
         </BrowserRouter>
      </>
   );
}

export default App;
