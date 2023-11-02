import { Modal } from "antd";
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import axios from "axios";
import moneyRegistrationValidation from "./moneyValidation";
import styles from "./money.module.css";
import {
  EditOutlined,
  CalendarOutlined,
  CarOutlined,
  HourglassOutlined,
  NotificationOutlined,
  PoundOutlined,
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
  const [errors, setErrors] = useState({
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
console.log("Selected Autorickshaw Number:", selectedAutorickshawNumber);
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

    // Validate the form data
    const validationErrors = moneyRegistrationValidation(formData);
    setErrors(validationErrors);

    // Check if there are any errors
    const hasErrors = Object.values(validationErrors).some((error) => error !== "");

    if (!hasErrors) {
      try {
        const response = await axios.post("http://localhost:3001/insertmoney", formData);
        if (response.data.status === "success") {
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
        }
        
        else {
          Modal.error({
            title: "Error",
            content: "পেমেন্ট ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন",
            onOk: () => {
              // Handle error, e.g., allow the user to retry
            },
          });
        }
      } catch (error) {
        console.error("Error submitting payment:", error);
        Modal.error({
          title: "Error",
          content: "পেমেন্ট ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন",
          onOk: () => {
            // Handle error, e.g., allow the user to retry
          },
        });
      }
    }
    else {
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
    fetch("http://localhost:3001/api/permittedAutorickshaws")
      .then((response) => response.json())
      .then((data) => {
        if (data.autorickshaws && Array.isArray(data.autorickshaws)) { // Check if data.autorickshaws is an array
          setAutorickshaws(data.autorickshaws);
        } else {
          console.error("Invalid or missing data for autorickshaws.");
        }
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
              <EditOutlined className="icon" />
              ড্রাইভারের পেমেন্ট বিবরণ এন্ট্রি ফর্ম
            </h1>
            <form className={styles.moneyForm} onSubmit={handleSubmit}>
              <div className={styles.moneyInfield}>
                <p className={styles.moneyParagraph}>
                  <CalendarOutlined className={styles.iconShow} />
                  তারিখ
                </p>
                <input
                  className={styles.moneyInput}
                  type="text"
                  id="payment_date"
                  name="payment_date"
                  placeholder="তারিখ প্রদান করুন"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  value={formData.payment_date}
                  onChange={handleInputChange}
                />
                {errors.payment_date && (
                  <span className={styles.moneyError}>
                    {errors.payment_date}
                  </span>
                )}
              </div>

              <div className={styles.moneyInfield}>
                <p className={styles.moneyParagraph}>
                  <CarOutlined className={styles.iconShow} />
                  অটোরিকশা নাম্বার
                </p>
                <select
                className={styles.moneySelect}
                id="autorickshaw_number"
                name="autorickshaw_number"
                value={formData.autorickshaw_number}
                onChange={handleAutorickshawChange}
              >
                <option value="">
                  {" "}
                  <span className={styles.first}>অটোরিকশা নির্বাচন করুন</span>
                </option>
                {autorickshaws.length > 0 &&
                  autorickshaws.map((autorickshaw, index) => (
                    <option key={index} value={autorickshaw.autorickshaw_number}>
                      {autorickshaw.autorickshaw_number}
                    </option>
                  ))}
              </select>

                {errors.autorickshaw_number && (
                  <span className={styles.moneyError}>
                    {errors.autorickshaw_number}
                  </span>
                )}
              </div>

              <div className={styles.moneyInfield}>
                <p className={styles.moneyParagraph}>
                  <HourglassOutlined className={styles.iconShow} />
                  ড্রাইভারের নাম
                </p>
                <input
                  className={styles.moneyInput}
                  type="text"
                  id="driver_name"
                  name="driver_name"
                  placeholder="ড্রাইভারের নাম দিন"
                  value={formData.driver_name}
                  onChange={handleInputChange}
                  readOnly // Add the readonly attribute
                />
              </div>

              <div className={styles.moneyInfield}>
  <p className={styles.moneyParagraph}>
    <NotificationOutlined className={styles.iconShow} />
    ড্রাইভারের জাতীয় পরিচয়পত্র নম্বর
  </p>
  <input
    className={`${styles.moneyInput} ${styles.readonly}`} // Add a custom CSS class for readonly style
    type="text"
    id="driver_nid"
    name="driver_nid"
    placeholder="ড্রাইভারের জাতীয় পরিচয়পত্র দিন"
    value={formData.driver_nid}
    onChange={handleInputChange}
    readOnly // Add the readonly attribute
  />
  {errors.driver_nid && (
    <span className={styles.moneyError}>
      {errors.driver_nid}
    </span>
  )}
</div>

              <div className={styles.moneyInfield}>
                <p className={styles.moneyParagraph}>
                  <PoundOutlined className={styles.iconShow} />
                  টাকার পরিমাণ
                </p>
                <input
                  className={styles.moneyInput}
                  type="number"
                  id="payment_amount"
                  name="payment_amount"
                  placeholder="টাকার পরিমাণ দিন"
                  value={formData.payment_amount}
                  onChange={handleInputChange}
                />
                {errors.payment_amount && (
                  <span className={styles.moneyError}>
                    {errors.payment_amount}
                  </span>
                )}
              </div>
              <button type="submit" className={styles.moneyButton}>
                জমা দিন
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Money;
