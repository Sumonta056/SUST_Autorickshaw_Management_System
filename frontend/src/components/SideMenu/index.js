import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  UsergroupAddOutlined,
  CarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./index.css"; // Import your custom CSS here

function DriverMenu() {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKey(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();

  return (
    <div className="DriverMenu">
      <div
        className={`DriverMenuItem ${
          selectedKey === "/dashboard" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/dashboard")}
      >
        <AppstoreOutlined className="icon" /> <span className="CustomLabel">Home</span>
      </div>
      <div
        className={`DriverMenuItem ${
          selectedKey === "/inventory" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/dashboard")}
      >
        <UserOutlined className="icon"/> <span className="CustomLabel">Owner List</span>
      </div>
      <div
        className={`DriverMenuItem ${
          selectedKey === "/orders" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/dashboard")}
      >
        <CarOutlined className="icon"/> <span className="CustomLabel">Auto-Rickshaw List</span>
      </div>
      <div
        className={`DriverMenuItem ${
          selectedKey === "/driver" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/driver")}
      >
        <UsergroupAddOutlined className="icon"/> <span className="CustomLabel">Driver List</span>
      </div>
    </div>
  );
}

export default DriverMenu;
