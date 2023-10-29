import React from "react";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import OwnerRegistration from "./components/OwnerRegistration/OwnerRegistration";
import DriverRegistration from "./components/DriverRegistration/DriverRegistration";
import ManagerRegistration from "./components/ManagerRegistration/ManagerRegistration";
import AutorickshawRegistration from "./components/AutorickshawRegistration/AutorickshawRegistration";
import Home from "./components/Home/Home";
//import "bootstrap/dist/css/bootstrap.min.css";
// import Student from "./components/CRUD/practice";
// import Create from "./components/CRUD/CreateStudent";
// import Update from "./components/CRUD/UpdateStudent";

import Driver from "./Pages/Driver/index";
import PermitDriver from "./Pages/PermitDriver/DriverRegistration"
import UnauthorizedDriver from "./Pages/UnauthorizedDriver/index";
import DriverUpdate from "./Pages/UpdateDriver/UpdateDriverInfo";
import Dashboard from "./Pages/Dashbaord/index";
import Owner from "./Pages/Owner/index";
import UnauthorizedOwner from "./Pages/UnauthorizedOwner/index";
import OwnerUpdate from "./Pages/UpdateOwner/UpdateOwnerInfo";
import Autorickshaw from "./Pages/Autorickshaw/index"
import PermitAutorickshaw from "./Pages/PermitAutoRickshaw/AutorickshawRegistration"
import UnauthorizedAutorickshaw from "./Pages/UnauthorizedAutorickshaw/index"
import AutorickshawUpdate from "./Pages/UpdateAutoRickshaw/AutorickshawRegistration"
import Manager from "./Pages/Manager/index";
import UnauthorizedManager from "./Pages/UnauthorizedManager/index";
import ManagerUpdate from "./Pages/UpdateManager/UpdateManagerInfo";
import CreateSchedule from "./Pages/Schedule/index";


import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/OwnerRegistration" element={<OwnerRegistration />} />
        <Route path="/DriverRegistration" element={<DriverRegistration />} />
        <Route path="/ManagerRegistration" element={<ManagerRegistration />} />
        <Route path="/AutorickshawRegistration" element={<AutorickshawRegistration />} />


        {/* <Route path="/student" element={<Student />} />
        <Route path="/create" element={<Create />} />
        <Route path="/student/update/:id" element={<Update />} /> */}


        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/driver" element={<Driver />}></Route>
        <Route path="/PermitDriver/:id" element={<PermitDriver />}></Route>
        <Route path="/UnauthorizedDriver" element={<UnauthorizedDriver />}></Route>
        <Route path="/editDriver/:id" element={<DriverUpdate />} />
        <Route path="/owner" element={<Owner />}></Route>
        <Route path="/UnauthorizedOwner" element={<UnauthorizedOwner />}></Route>
        <Route path="/editOwner/:id" element={<OwnerUpdate />} />
        <Route path="/autorickshaw" element={<Autorickshaw />}></Route>
        <Route path="/PermitAutorickshaw/:id" element={<PermitAutorickshaw />}></Route>
        <Route path="/UnauthorizedAutorickshaw" element={<UnauthorizedAutorickshaw />}></Route>
        <Route path="/editAutorickshaw/:id" element={<AutorickshawUpdate />} />
        <Route path="/manager" element={<Manager />}></Route>
        <Route path="/UnauthorizedManager" element={<UnauthorizedManager />}></Route>
        <Route path="/editManager/:id" element={<ManagerUpdate />} />


        <Route path="/scheduleCreate" element={<CreateSchedule />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
