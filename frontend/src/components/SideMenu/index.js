import React, { useEffect, useState } from "react";
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
  // EyeOutlined,
  UserSwitchOutlined

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
      <div className="unauthorized1">
        {" "}
        <CaretRightOutlined className="icons" />
        ড্যাশবোর্ড
      </div>
      <div
        className={`DriverMenuItem ${
          selectedKey === "/dashboard" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/dashboard")}
      >
        <AppstoreOutlined className="icon" />{" "}
        <span className="CustomLabel">হোম</span>
      </div>
      <div className="unauthorized">
        {" "}
        <CaretRightOutlined className="icons" />
        অনুমোদনপ্রাপ্ত 
      </div>
      <div
        className={`OwnerMenuItem ${
          selectedKey === "/owner" ? "OwnerMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/owner")}
      >
        <UsergroupAddOutlined className="icon" />{" "}
        <span className="CustomLabel">মালিকের তালিকা</span>
      </div>
      <div
        className={`OwnerMenuItem ${
          selectedKey === "/owner" ? "OwnerMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/autorickshaw")}
      >
        <CarOutlined className="icon" />{" "}
        <span className="CustomLabel">অটোরিকশার তালিকা</span>
      </div>
      <div
        className={`DriverMenuItem ${
          selectedKey === "/driver" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/driver")}
      >
        <UsergroupAddOutlined className="icon" />{" "}
        <span className="CustomLabel">ড্রাইভারের তালিকা</span>
      </div>
      <div
        className={`ManagerMenuItem ${
          selectedKey === "/manager" ? "ManagerMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/manager")}
      >
        <UserSwitchOutlined className="icon" />{" "}
        <span className="CustomLabel">ম্যানেজার তালিকা</span>
      </div>
      <div className="unauthorized">
        <CaretRightOutlined className="icons" />
        অননুমোদিত
      </div>
      <div
        className={`OwnerMenuItem ${
          selectedKey === "/inventory" ? "OwnerMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/UnauthorizedOwner")}
      >
        <UserOutlined className="icon" />{" "}
        <span className="CustomLabel">মালিকের তালিকা</span>
      </div>
      <div
        className={`AutorickshawMenuItem ${
          selectedKey === "/UnauthorizedAutorickshaw" ? "AutorickshawMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/UnauthorizedAutorickshaw")}
      >
        <CarOutlined className="icon" />{" "}
        <span className="CustomLabel">অটোরিকশার তালিকা</span>
      </div>
      <div
        className={`DriverMenuItem ${
          selectedKey === "/UnauthorizedDriver" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/UnauthorizedDriver")}
      >
        <UsergroupAddOutlined className="icon" />{" "}
        <span className="CustomLabel">ড্রাইভারের তালিকা</span>
      </div>
      <div
        className={`ManagerMenuItem ${
          selectedKey === "/UnauthorizedManager" ? "ManagerMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/UnauthorizedManager")}
      >
        <UserSwitchOutlined className="icon" />{" "}
        <span className="CustomLabel">ম্যানেজার তালিকা</span>
      </div>
      <div className="unauthorized">
        <CaretRightOutlined className="icons" />
        শিডিউল
      </div>
      <div
        className={`DriverMenuItem ${
          selectedKey === "/inventory" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/scheduleCreate")}
      >
        <EditOutlined className="icon" />{" "}
        <span className="CustomLabel">শিডিউল তৈরি করুন</span>
      </div>
      {/* <div
        className={`DriverMenuItem ${
          selectedKey === "/orders" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/scheduleCreate")}
      >
        <EyeOutlined className="icon" />{" "}
        <span className="CustomLabel">শিডিউল দেখুন</span>
      </div> */}
      <div className="unauthorized">
        <CaretRightOutlined className="icons" />
        অর্থ ব্যবস্থাপনা
      </div>
      <div
        className={`DriverMenuItem ${
          selectedKey === "/inventory" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/money")}
      >
        <MoneyCollectOutlined  className="icon" />{" "}
        <span className="CustomLabel">পেমেন্ট ফর্ম</span>
      </div>

      <div
        className={`DriverMenuItem ${
          selectedKey === "/inventory" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/moneyShow")}
      >
        <MoneyCollectOutlined  className="icon" />{" "}
        <span className="CustomLabel">হিসাব-নিকাশ বিবরণী</span>
      </div>


      <div className="unauthorized">
        <CaretRightOutlined className="icons" />
        সেটিংস
      </div>
      <div
        className={`DriverMenuItem ${
          selectedKey === "/inventory" ? "DriverMenuItemSelected" : ""
        }`}
        onClick={() => navigate("/dashboard")}
      >
        <SettingOutlined  className="icon" />{" "}
        <span className="CustomLabel">লগ আউট</span>
      </div>
    </div>

    
  );
}

export default DriverMenu;
