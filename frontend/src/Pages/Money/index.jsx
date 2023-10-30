import { Modal } from "antd"; // Import Button from Ant Design
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import "./index.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import scheduleRegistrationValidation from "./scheduleValidation";
import styles from "./money.module.css"; //
import {
  EditOutlined,
  CalendarOutlined,
  CarOutlined,
  HourglassOutlined,
  NotificationOutlined,
  PoundOutlined,
} from "@ant-design/icons";

function Schedule() {
  const [autorickshaws, setAutorickshaws] = useState([]);
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    schedule_date: "",
    schedule_round: "",
    schedule_serial: "",
    schedule_time: "",
    schedule_autorickshaw: "",
  });

  const [errors, setErrors] = useState({
    schedule_date: "",
    schedule_round: "",
    schedule_serial: "",
    schedule_time: "",
    schedule_autorickshaw: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formData);

    // Wait until the errors are set
    const validationErrors = scheduleRegistrationValidation(formData);
    setErrors(validationErrors);

    console.log(validationErrors);

    // Use async/await to ensure state is updated

    // Check for specific error conditions
    if (
      validationErrors.schedule_date === "" &&
      validationErrors.schedule_round === "" &&
      validationErrors.schedule_serial === "" &&
      validationErrors.schedule_time === "" &&
      validationErrors.schedule_autorickshaw === ""
    ) {
      try {
        console.log("herhr");
        axios
          .post(`http://localhost:3001/updateschedule`, formData)
          .then((res) => {
            console.log(res);
            if (res.data === "success") {
              // alert("আপনি সফলভাবে একটি শিডিউল তৈরি করেছেন");
              Modal.success({
                title: "Successful !",
                content: "আপনি সফলভাবে একটি শিডিউল তৈরি করেছেন",
                onOk: () => {},
              });
            }
            // Redirect to the owner list page after successful update
            else {
              alert("হালনাগাদ ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
            }
          })
          .catch((err) => {
            alert("হালনাগাদ ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
            // Handle errors, e.g., display an error message to the user
          });
      } catch (error) {
        alert("হালনাগাদ ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      }
    } else {
      // Display an error message based on the first encountered error
      const errorMessages = Object.values(validationErrors).filter(
        (error) => error !== ""
      );
      if (errorMessages.length > 0) {
        alert("হালনাগাদ ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      } else {
        alert("হালনাগাদ ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      }
    }
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/autorickshaw")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.users);
        setAutorickshaws(data.users);
        console.log(data.users);
      })
      .catch((error) => {
        console.error("Error fetching Schedule data: ", error);
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
            <form className={styles.scheduleForm} onSubmit={handleSubmit}>
              <div className={styles.scheduleInfield}>
                <p className={styles.scheduleParagraph}>
                  <CalendarOutlined className={styles.iconShow} />
                  তারিখ
                </p>
                <input
                  className={styles.scheduleInput}
                  type="text"
                  id="schedule_date"
                  name="schedule_date"
                  placeholder="তারিখ প্রদান করুন"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  value={formData.schedule_date}
                  onChange={handleInputChange}
                />
                {errors.schedule_date && (
                  <span className={styles.scheduleError}>
                    {errors.schedule_date}
                  </span>
                )}
              </div>

              <div className={styles.scheduleInfield}>
                <p className={styles.scheduleParagraph}>
                  <CarOutlined className={styles.iconShow} />
                  অটোরিকশা নাম্বার
                </p>
                <select
                  className={styles.scheduleSelect}
                  id="schedule_autorickshaw"
                  name="schedule_autorickshaw"
                  placeholder="অটোরিকশা নাম্বার নির্বাচন করুন"
                  value={formData.schedule_autorickshaw.autorickshaw_number} // Change this line
                  onChange={handleInputChange}
                >
                  <option value="">
                    {" "}
                    <span className={styles.first}>অটোরিকশা নির্বাচন করুন</span>
                  </option>
                  {autorickshaws.map((autorickshaw, index) => (
                    <option
                      key={index}
                      value={autorickshaw.autorickshaw_number}
                    >
                      {autorickshaw.autorickshaw_number}
                    </option>
                  ))}
                </select>

                {errors.schedule_autorickshaw && (
                  <span className={styles.scheduleError}>
                    {errors.schedule_autorickshaw}
                  </span>
                )}
              </div>

              <div className={styles.scheduleInfield}>
                <p className={styles.scheduleParagraph}>
                  <HourglassOutlined className={styles.iconShow} />
                  ড্রাইভারের নাম
                </p>
                <input
                  className={styles.scheduleInput}
                  type="text"
                  id="schedule_serial"
                  name="schedule_serial"
                  placeholder="ড্রাইভারের নাম দিন"
                  value={formData.schedule_serial}
                  onChange={handleInputChange}
                />
                {errors.schedule_serial && (
                  <span className={styles.scheduleError}>
                    {errors.schedule_serial}
                  </span>
                )}
              </div>
              <div className={styles.scheduleInfield}>
                <p className={styles.scheduleParagraph}>
                  <NotificationOutlined className={styles.iconShow} />
                  ড্রাইভারের জাতীয় পরিচয়পত্র নম্বর
                </p>
                <input
                  className={styles.scheduleInput}
                  type="text"
                  id="schedule_serial"
                  name="schedule_serial"
                  placeholder="ড্রাইভারের জাতীয় পরিচয়পত্র দিন"
                  value={formData.schedule_serial}
                  onChange={handleInputChange}
                />
                {errors.schedule_serial && (
                  <span className={styles.scheduleError}>
                    {errors.schedule_serial}
                  </span>
                )}
              </div>
              <div className={styles.scheduleInfield}>
                <p className={styles.scheduleParagraph}>
                  <PoundOutlined className={styles.iconShow} />
                  টাকার পরিমাণ
                </p>
                <input
                  className={styles.scheduleInput}
                  type="text"
                  id="schedule_round"
                  name="schedule_round"
                  placeholder="টাকার পরিমাণ দিন"
                  value={formData.schedule_round}
                  onChange={handleInputChange}
                />
                {errors.schedule_round && (
                  <span className={styles.scheduleError}>
                    {errors.schedule_round}
                  </span>
                )}
              </div>
              <button type="submit" className={styles.scheduleButton}>
                জমা দিন
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
