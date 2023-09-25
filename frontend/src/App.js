import React from "react";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import OwnerRegistration from "./components/OwnerRegistration/OwnerRegistration";
<<<<<<< Updated upstream

=======
import DriverRegistration from "./components/DriverRegistration/DriverRegistration";
import Home from "./components/Home/Home";
>>>>>>> Stashed changes
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
<<<<<<< Updated upstream
        <Route path="/OwnerRegistration" element={<OwnerRegistration/>} />
=======
        <Route path="/OwnerRegistration" element={<OwnerRegistration />} />
        <Route path="/DriverRegistration" element={<DriverRegistration />} />
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}

export default App;
