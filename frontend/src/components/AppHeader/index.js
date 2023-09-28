import { Image } from "antd";
import "./index.css";

function AppHeader() {
  return (
    <div className="AppHeader">
      <div className="dashboard-header">Dashboard</div>
      <div className="AppHeaderTitle">
        <Image width={40} className="AppHeaderImg" src="./logo.png"></Image>
        <div className="AppHeaderTitle2">
          SUST Auto-Rickshaw Management System
        </div>
      </div>
    </div>
  );
}
export default AppHeader;
