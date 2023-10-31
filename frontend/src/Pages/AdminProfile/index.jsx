import { Modal } from "antd";
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import axios from "axios";
import styles from "./money.module.css";
import {
  ProfileOutlined,
  UserOutlined,
  SafetyOutlined,
  AliwangwangOutlined,
} from "@ant-design/icons";

function Money() {
  const [id, setID] = useState(null);
  const [formData, setFormData] = useState({
    authority_adminType: "",
    admin_username: "",
    admin_password: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("herr");

    try {
      const response = await axios.post(`http://localhost:3001/api/updatePassword/${id}`, {
        password: formData.admin_password,
      });
      
      if (response.data === 'success') {
        Modal.success({
          title: 'Successful!',
          content: 'আপনি সফলভাবে পাসওয়ার্ড পরিবর্তন করেছেন',
        });
      } else {
        Modal.error({
          title: 'Error',
          content: 'পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন',
        });
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    // Fetch the user ID
    axios.get("http://localhost:3001/api/profile", { withCredentials: true })
      .then((res) => {
        if (res.data.statusbar === "success") {
          console.log(res.data.id);
          setID(res.data.id);
          // After setting the ID, call the function to fetch profile info
          fetchProfileInfo(res.data.id);
        } else {
          console.log("error");
        }
      });
  }, []);

  async function fetchProfileInfo(id) {
    try {
      const response = await axios.get(`http://localhost:3001/api/profileInfo/${id}`);
      if (response.data) {
        console.log(response.data.id);
        setFormData({
          authority_adminType: response.data.authority_adminType,
          admin_username: response.data.username,
          admin_password: response.data.password,
        });
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <div className="SetPageContent">
          <div className="PageContents">
            <h1 className="PageHeader">
              <ProfileOutlined className="icon" />
              অ্যাডমিন প্রোফাইল
            </h1>
            <form className={styles.moneyForm} onSubmit={handleSubmit}>
              <div className={styles.moneyInfield}>
                <p className={styles.moneyParagraph}>
                  <AliwangwangOutlined className={styles.iconShow} />
                  অ্যাডমিন টাইপ
                </p>
                <input
                  className={styles.moneyInput}
                  type="text"
                  id="authority_adminType"
                  name="authority_adminType"
                  placeholder="অ্যাডমিন টাইপ নির্বাচন করুন"
                  value={formData.authority_adminType}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>

              <div className={styles.moneyInfield}>
                <p className={styles.moneyParagraph}>
                  <UserOutlined className={styles.iconShow} />
                  অ্যাডমিন ইউজারনেম
                </p>
                <input
                  className={`${styles.moneyInput} ${styles.readonly}`} // Add a custom CSS class for readonly style
                  type="text"
                  id="admin_username"
                  name="admin_username"
                  placeholder="অ্যাডমিন ইউজারনেম দিন"
                  value={formData.admin_username}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>

              <div className={styles.moneyInfield}>
                <p className={styles.moneyParagraph}>
                  <SafetyOutlined className={styles.iconShow} />
                  পাসওয়ার্ড
                </p>
                <input
                  className={`${styles.moneyInput} ${styles.readonly}`} // Add a custom CSS class for readonly style
                  type="text"
                  id="admin_password"
                  name="admin_password"
                  placeholder="পাসওয়ার্ড প্রদান করুন"
                  value={formData.admin_password}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className={styles.moneyButton}>
                পাসওয়ার্ড পরিবর্তন করুন
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Money;
