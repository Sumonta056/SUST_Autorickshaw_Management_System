import React from "react";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import OwnerRegistration from "./components/OwnerRegistration/OwnerRegistration";
import DriverRegistration from "./components/DriverRegistration/DriverRegistration";
import Home from "./components/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Student from "./components/CRUD/practice";
import Create from "./components/CRUD/CreateStudent";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/OwnerRegistration" element={<OwnerRegistration />} />

        <Route path="/student" element={<Student />} />
        <Route path="/create" element={<Create />} />

        <Route path="/DriverRegistration" element={<DriverRegistration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
