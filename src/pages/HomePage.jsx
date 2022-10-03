import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.clear();
    navigate(`/login`);
  };

  return (
    <>
      <div>
        <button onClick={handleSignout} type="button">
          Logout
        </button>
      </div>
    </>
  );
};

export default HomePage;
