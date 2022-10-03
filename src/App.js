import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  const faceId = localStorage.getItem("facialId");
  // console.log(faceId);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {faceId === null ? (
            <>
              <Route path="/" element={<LoginPage />} />
              <Route path="login" element={<LoginPage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
            </>
          )}
          <Route path="home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
