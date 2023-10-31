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
AliwangwangOutlined ,

} from "@ant-design/icons";

function Money() {
  const [autorickshaws, setAutorickshaws] = useState([]);
  const [formData, setFormData] = useState({
    payment_date: "",
    autorickshaw_number: "",
    driver_name: "",
    driver_nid: "",
    payment_amount: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAutorickshawChange = async (event) => {
    const selectedAutorickshawNumber = event.target.value;

    try {
      const response = await axios.get(
        `http://localhost:3001/api/driverInfoForAutorickshaw/${selectedAutorickshawNumber}`
      );

      if (response.data && response.data.driverInfo) {
        const { driverInfo } = response.data;
        const driverName = `${driverInfo.driver_firstName} ${driverInfo.driver_lastName}`;

        setFormData({
          ...formData,
          autorickshaw_number: selectedAutorickshawNumber,
          driver_name: driverName,
          driver_nid: driverInfo.driver_nid,
        });
      } else {
        console.log("No driver found for the selected autorickshaw.");
        // You can provide feedback to the user as needed
      }
    } catch (error) {
      console.error("Error fetching driver information:", error);
      // Handle errors, e.g., display an error message to the user
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      "http://localhost:3001/insertmoney",
      formData
    );
    if (response.data === "success") {
      Modal.success({
        title: "Successful!",
        content: "আপনি সফলভাবে পেমেন্ট করেছেন",
        onOk: () => {
          setFormData({
            payment_date: "",
            autorickshaw_number: "",
            driver_name: "",
            driver_nid: "",
            payment_amount: "",
          });
        },
      });
    } else {
      Modal.error({
        title: "Error",
        content: "পেমেন্ট ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন",
        onOk: () => {
          // Handle error, e.g., allow the user to retry
        },
      });
    }
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/autorickshaw")
      .then((response) => response.json())
      .then((data) => {
        setAutorickshaws(data.users);
      })
      .catch((error) => {
        console.error("Error fetching autorickshaw data: ", error);
      });
  }, []);
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
                  <AliwangwangOutlined  className={styles.iconShow} />
                  অ্যাডমিন টাইপ
                </p>
                <input
                  className={styles.moneyInput}
                  type="text"
                  id="driver_name"
                  name="driver_name"
                  placeholder="অ্যাডমিন টাইপ নির্বাচন করুন"
                  value={formData.driver_name}
                  onChange={handleInputChange}
                  readOnly // Add the readonly attribute
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
                  id="driver_nid"
                  name="driver_nid"
                  placeholder="অ্যাডমিন ইউজারনেম দিন"
                  value={formData.driver_nid}
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
                  id="driver_nid"
                  name="driver_nid"
                  placeholder="পাসওয়ার্ড প্রদান করুন"
                  value={formData.driver_nid}
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
