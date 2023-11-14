import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  UsergroupAddOutlined,
  CarOutlined,
  UserOutlined,
  CaretRightOutlined,
  SettingOutlined,
  MoneyCollectOutlined,
  EditOutlined,
  HistoryOutlined,
  UserSwitchOutlined,
  ProfileOutlined,
  EyeOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";
import "./index.css"; // Import your custom CSS here

function DriverMenu() {
  const location = useLocation();
  const [status, setStatus] = useState(true);
  const [selectedKey, setSelectedKey] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKey(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user ID
    axios
      .get("http://localhost:3001/api/profile", { withCredentials: true })
      .then((res) => {
        if (res.data.statusbar === "success") {
          console.log(res.data.id);

          fetchProfileInfo(res.data.id);
        } else {
          console.log("error");
        }
      });
  }, []);

  async function fetchProfileInfo(id) {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/profileInfo/${id}`
      );
      if (response.data) {
        console.log(response.data.id);
        console.log(response.data.authority_adminType);
        if (response.data.authority_adminType === "ম্যানেজার") {
          setStatus(false);
        }
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <div className="DriverMenu">
      <div className="unauthorized1">
        {" "}
        <CaretRightOutlined className="icons" />
        ড্যাশবোর্ড
      </div>
      <button
        className={`DriverMenuItem ${
          selectedKey === "/dashboard" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/dashboard")}
      >
        <AppstoreOutlined className="icon" />{" "}
        <span className="CustomLabel">হোম</span>
      </button>
      <div className="unauthorized">
        {" "}
        <CaretRightOutlined className="icons" />
        অনুমোদনপ্রাপ্ত
      </div>
      <button
        className={`OwnerMenuItem ${
          selectedKey === "/owner" ? "OwnerMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/owner")}
      >
        <UsergroupAddOutlined className="icon" />{" "}
        <span className="CustomLabel">মালিকের তালিকা</span>
      </button>
      <button
        className={`OwnerMenuItem ${
          selectedKey === "/owner" ? "OwnerMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/autorickshaw")}
      >
        <CarOutlined className="icon" />{" "}
        <span className="CustomLabel">অটোরিকশার তালিকা</span>
      </button>
      <button
        className={`DriverMenuItem ${
          selectedKey === "/driver" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/driver")}
      >
        <UsergroupAddOutlined className="icon" />{" "}
        <span className="CustomLabel">ড্রাইভারের তালিকা</span>
      </button>
      <button
        className={`ManagerMenuItem ${
          selectedKey === "/manager" ? "ManagerMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/manager")}
      >
        <UserSwitchOutlined className="icon" />{" "}
        <span className="CustomLabel">ম্যানেজার তালিকা</span>
      </button>

      {status && (
        <div className="unauthorized">
          <CaretRightOutlined className="icons" />
          অননুমোদিত
        </div>
      )}

      {status && (
        <button
          className={`OwnerMenuItem ${
            selectedKey === "/inventory" ? "OwnerMenuItemSelected" : ""
          }`}
          onClick={() => navigate("/UnauthorizedOwner")}
        >
          <UserOutlined className="icon" />
          <span className="CustomLabel">মালিকের তালিকা</span>
        </button>
      )}

      {status && (
        <button
          className={`AutorickshawMenuItem ${
            selectedKey === "/UnauthorizedAutorickshaw"
              ? "AutorickshawMenuItemSelected"
              : ""
          }`}
          onClick={() => navigate("/UnauthorizedAutorickshaw")}
        >
          <CarOutlined className="icon" />
          <span className="CustomLabel">অটোরিকশার তালিকা</span>
        </button>
      )}

      {status && (
        <button
          className={`DriverMenuItem ${
            selectedKey === "/UnauthorizedDriver"
              ? "DriverMenuItemSelected"
              : ""
          }`}
          onClick={() => navigate("/UnauthorizedDriver")}
        >
          <UsergroupAddOutlined className="icon" />
          <span className="CustomLabel">ড্রাইভারের তালিকা</span>
        </button>
      )}

      {status && (
        <button
          className={`ManagerMenuItem ${
            selectedKey === "/UnauthorizedManager"
              ? "ManagerMenuItemSelected"
              : ""
          }`}
          onClick={() => navigate("/UnauthorizedManager")}
        >
          <UserSwitchOutlined className="icon" />
          <span className="CustomLabel">ম্যানেজার তালিকা</span>
        </button>
      )}

      <div className="unauthorized">
        <CaretRightOutlined className="icons" />
        শিডিউল
      </div>
      <button
        className={`DriverMenuItem ${
          selectedKey === "/inventory" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/scheduleCreate")}
      >
        <EditOutlined className="icon" />{" "}
        <span className="CustomLabel">শিডিউল তৈরি করুন</span>
      </button>

      <button
        className={`DriverMenuItem ${
          selectedKey === "/inventory" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/scheduleWatch")}
      >
        <EyeOutlined className="icon" />{" "}
        <span className="CustomLabel">শিডিউল দেখুন</span>
      </button>

      <div className="unauthorized">
        <CaretRightOutlined className="icons" />
        অর্থ ব্যবস্থাপনা
      </div>
      <button
        className={`DriverMenuItem ${
          selectedKey === "/inventory" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/money")}
      >
        <MoneyCollectOutlined className="icon" />{" "}
        <span className="CustomLabel">পেমেন্ট ফর্ম</span>
      </button>

      <button
        className={`DriverMenuItem ${
          selectedKey === "/inventory" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/moneyShow")}
      >
        <HistoryOutlined className="icon" />{" "}
        <span className="CustomLabel">হিসাব নিকাশ তথ্য</span>
      </button>

      <div className="unauthorized">
        <CaretRightOutlined className="icons" />
        সেটিংস
      </div>
      {status && (
        <button
          className={`DriverMenuItem ${
            selectedKey === "/inventory" ? "DriverMenuItemSelected" : ""
          }`}
          onClick={() => navigate("/access")}
        >
          <SecurityScanOutlined className="icon" />{" "}
          <span className="CustomLabel">প্রবেশাধিকার প্রদান</span>
        </button>
      )}
      <button
        className={`DriverMenuItem ${
          selectedKey === "/inventory" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/profile")}
      >
        <ProfileOutlined className="icon" />{" "}
        <span className="CustomLabel">প্রোফাইল</span>
      </button>
      <button
        className={`DriverMenuItem ${
          selectedKey === "/inventory" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/dashboard")}
      >
        <SettingOutlined className="icon" />{" "}
        <span className="CustomLabel">লগ আউট</span>
      </button>
    </div>
  );
}

export default DriverMenu;