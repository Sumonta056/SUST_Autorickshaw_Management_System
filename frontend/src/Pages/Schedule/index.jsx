import { Table, Button, Modal } from "antd"; // Import Button from Ant Design
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import "./index.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import scheduleRegistrationValidation from "./scheduleValidation";
import styles from "./schedule.module.css"; //
import {
  EditOutlined,
  CalendarOutlined,
  CarOutlined,
  EyeOutlined,
  HourglassOutlined,
  FieldTimeOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

function Schedule() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
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

  function ScheduleData() {
    setLoading(true);
    fetch("http://localhost:3001/api/schedule")
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Schedule data: ", error);
        setLoading(false);
      });
  }

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
                onOk: () => {
                  ScheduleData();
                },
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
    ScheduleData();
  }, []);

  useEffect(() => {
    setLoading2(true);
    fetch("http://localhost:3001/api/autorickshaw")
      .then((response) => response.json())
      .then((data) => {
        setDataSource2(data.users);
        setLoading2(false);
      })
      .catch((error) => {
        console.error("Error fetching Schedule data: ", error);
        setLoading2(false);
      });
  }, []);

  const handleDelete = (record) => {
    // Display a confirmation modal before deleting
    Modal.confirm({
      title: "Confirm Deletion",
      content: "আপনি কি নিশ্চিত যে আপনি এই সময়সূচি মুছতে চান ?",
      onOk: () => {
        console.log(record);
        axios
          .delete(`http://localhost:3001/deleteschedule/${record.id}`)
          .then((res) => {
            if (res.data === "success") {
              Modal.success({
                title: "Successful !",
                content: "আপনি সফলভাবে একটি সময়সূচি মুছে ফেলেছেন",
                onOk: () => {
                  ScheduleData();
                },
              }); // Refresh the schedule data after deletion
            } else {
              alert("Failed to delete the schedule. Please try again.");
            }
          })
          .catch((err) => {
            alert(
              "An error occurred while deleting the schedule. Please try again."
            );
          });
      },
    });
  };

  const columns = [
    {
      title: "তারিখ",
      dataIndex: "schedule_date",
    },
    {
      title: "রাউন্ড",
      dataIndex: "schedule_round",
    },
    {
      title: "সিরিয়াল নম্বর ",
      dataIndex: "schedule_serial",
    },
    {
      title: "প্রস্থান সময়",
      dataIndex: "schedule_time",
    },
    {
      title: "অটোরিকশা নাম্বার",
      dataIndex: "schedule_autorickshaw",
    },
    {
      title: "কার্যক্রম",
      render: (text, record) => (
        <div className="ScheduleButton">
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <span>মুছুন</span>
          </Button>
        </div>
      ),
    },
  ];

  const columns2 = [
    {
      title: "অটোরিকশা নাম্বার",
      dataIndex: "autorickshaw_number",
    },
    {
      title: "কার্যক্রম",
      render: (text, record) => (
        <div className="ScheduleButton">
          <Button type="primary" danger>
            <span>মুছুন</span>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <div className="SetPageContent">
          <div className="PageContents">
            <h1 className="PageHeader">
              <EditOutlined className="icon" />
              শিডিউল তৈরি করুন
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
                  <NotificationOutlined className={styles.iconShow} />
                  রাউন্ড
                </p>
                <input
                  className={styles.scheduleInput}
                  type="text"
                  id="schedule_round"
                  name="schedule_round"
                  placeholder="রাউন্ড নম্বর নির্বাচন করুন"
                  value={formData.schedule_round}
                  onChange={handleInputChange}
                />
                {errors.schedule_round && (
                  <span className={styles.scheduleError}>
                    {errors.schedule_round}
                  </span>
                )}
              </div>
              <div className={styles.scheduleInfield}>
                <p className={styles.scheduleParagraph}>
                  <HourglassOutlined className={styles.iconShow} />
                  সিরিয়াল নম্বর{" "}
                </p>
                <input
                  className={styles.scheduleInput}
                  type="text"
                  id="schedule_serial"
                  name="schedule_serial"
                  placeholder="সিরিয়াল নম্বর নির্বাচন করুন"
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
                  <FieldTimeOutlined className={styles.iconShow} />
                  সময়
                </p>
                <input
                  className={styles.scheduleInput}
                  type="text"
                  id="schedule_time"
                  name="schedule_time"
                  placeholder="প্রস্থান সময় নির্বাচন করুনr"
                  onFocus={(e) => (e.target.type = "time")}
                  onBlur={(e) => (e.target.type = "text")}
                  value={formData.schedule_time}
                  onChange={handleInputChange}
                />
                {errors.schedule_time && (
                  <span className={styles.scheduleError}>
                    {errors.schedule_time}
                  </span>
                )}
              </div>
              <div className={styles.scheduleInfield}>
                <p className={styles.scheduleParagraph}>
                  <CarOutlined className={styles.iconShow} />
                  অটোরিকশা নাম্বার
                </p>
                <input
                  className={styles.scheduleInput}
                  type="text"
                  id="schedule_autorickshaw"
                  name="schedule_autorickshaw"
                  placeholder="অটোরিকশা নাম্বার নির্বাচন করুন"
                  value={formData.schedule_autorickshaw}
                  onChange={handleInputChange}
                />
                {errors.schedule_autorickshaw && (
                  <span className={styles.scheduleError}>
                    {errors.schedule_autorickshaw}
                  </span>
                )}
              </div>

              <button type="submit" className={styles.scheduleButton}>
                ADD
              </button>
            </form>
          </div>
          <div className="PageContent">
            <div className="Pagecenter">
              <h1 className="PageHeader">
                <EyeOutlined className="icon" />
                শিডিউল দেখুন
              </h1>

              <Table
                className="TableSchedule"
                loading={loading}
                columns={columns} // Use the modified columns configuration
                dataSource={dataSource}
                pagination={{
                  pageSize: 4,
                }}
              ></Table>
            </div>

            <div className="PageFooter">
              <h1 className="PageHeader">
                <EyeOutlined className="icon" />
                অটোরিকশার তালিকা
              </h1>

              <Table
                className="TableSchedule"
                loading={loading2}
                columns={columns2} // Use the modified columns configuration
                dataSource={dataSource2}
                pagination={{
                  pageSize: 4,
                }}
              ></Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
