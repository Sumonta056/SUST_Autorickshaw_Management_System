import { Image } from "antd";
import "./index.css";

function AppHeader() {
  return (
    <div className="AppHeader">
      <div className="AppHeaderTitle">
        <Image width={35} className="AppHeaderImg" src="./logo.png"></Image>
        <div className="AppHeaderTitle2">
        <span> স্বাগতম ,</span> শাবিপ্রবি অটোরিকশা ম্যানেজমেন্ট সিস্টেম
        </div>
      </div>
    </div>
  );
}
export default AppHeader;