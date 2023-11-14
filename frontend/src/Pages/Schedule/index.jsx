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
  EyeOutlined,
  HourglassOutlined,
  FieldTimeOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

function Schedule() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [dataSource3, setDataSource3] = useState([]);
  const [autorickshaws, setAutorickshaws] = useState([]);
  // const [selectedSchedule, setSelectedSchedule] = useState(null);

  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    schedule_date: "",
    schedule_round: "",
    schedule_place: "",
    schedule_time: "",
    autorickshaw_number: "",
  });

  const [errors, setErrors] = useState({
    schedule_date: "",
    schedule_round: "",
    schedule_place: "",
    schedule_time: "",
    autorickshaw_number: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  function ScheduleData() {
    setLoading(true);
    fetch("http://localhost:3001/api/autorickshawSchedule")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.users.sort((a, b) => {
          const dateA = new Date(a.schedule_date);
          const dateB = new Date(b.schedule_date);
          return dateB - dateA; 
        });        
        setDataSource(sortedData);
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
      validationErrors.schedule_place === "" &&
      validationErrors.schedule_time === "" 
    ) {
      try {
        console.log("here");
        const response = await axios.post(`http://localhost:3001/updateschedule`, formData);
  
        if (response.status === 200) { // Check if the response status is in the 200 range
          // Check the response data or message in a flexible way
          if (response.data === "success") {
            Modal.success({
              title: "Successful !",
              content: "আপনি সফলভাবে একটি শিডিউল তৈরি করেছেন",
              onOk: () => {
                ScheduleData();
                window.location.reload();
              },
            });
          } else {
            alert("শিডিউল তৈরি ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
          }
        } else {
          alert("শিডিউল তৈরি ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
        }
      } catch (error) {
        alert("শিডিউল তৈরি ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      }
    } else {
      // Display an error message based on the first encountered error
      const errorMessages = Object.values(validationErrors).filter(
        (error) => error !== ""
      );
      if (errorMessages.length > 0) {
        alert("শিডিউল তৈরি ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      } else {
        alert("শিডিউল তৈরি ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      }
    }
  };
  

  useEffect(() => {
    ScheduleData();
  }, []);

  useEffect(() => {
    setLoading2(true);
    fetch("http://localhost:3001/api/permittedAutorickshawsForSchedule")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); 
        setDataSource2(data.availableAutorickshaws); 
        setAutorickshaws(data.availableAutorickshaws); 
        setLoading2(false);
      })
      .catch((error) => {
        console.error("Error fetching Schedule data: ", error);
        setLoading2(false);
      });
  }, []);
  
  useEffect(() => {
    setLoading3(true);
    fetch("http://localhost:3001/api/latestSchedule")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); 
        const latestSchedule = data.schedule[0];
setDataSource3([latestSchedule]);
        setAutorickshaws(data.schedule); 
        setLoading3(false);
      })
      .catch((error) => {
        console.error("Error fetching Schedule data: ", error);
        setLoading3(false);
      });
  }, []);


  const handleAddToLatestSchedule = (record) => {
    const autorickshawNumber = record.autorickshaw_number;
  
    axios.post('http://localhost:3001/associateAutorickshawToLatestSchedule', { autorickshaw_number: autorickshawNumber })
      .then(response => {
        if (response.data.status === 'success') {
          // Handle success
          Modal.success({
            title: 'Success',
            content:<div>
            <p>{autorickshawNumber} নং অটোরিকশাটি {response.data.latestScheduleDetails.schedule_round} নং রাউন্ডে যুক্ত করা হয়েছে </p>
            <p>তারিখ: {response.data.latestScheduleDetails.schedule_date}</p>
            <p>সময়: {response.data.latestScheduleDetails.schedule_time}</p>
            <p>গন্তব্য: {response.data.latestScheduleDetails.schedule_place}</p>
          </div>,
            onOk: () => {
              console.log('Autorickshaw added to latest schedule!');
              window.location.reload();
            },
          });
        } else if (response.data.error === 'Duplicate autorickshaw schedule entry.') {
          // Handle duplicate entry error
          Modal.error({
            title: 'Error',
            content: 'Duplicate entry: Autorickshaw already added to this schedule.',
            onOk: () => {
              console.error('Duplicate entry: Autorickshaw already added to this schedule.');
            },
          });
        } else {
          // Handle other errors
          Modal.error({
            title: 'Error',
            content: 'Failed to add autorickshaw to the latest schedule.',
            onOk: () => {
              console.error('Failed to add autorickshaw to the latest schedule.');
            },
          });
        }
      })
      .catch(error => {
        // Handle API call error
        Modal.error({
          title: 'Error',
          content: 'An error occurred while adding autorickshaw to the latest schedule.',
          onOk: () => {
            console.error('Error:', error);
          },
        });
      });
  };
  
  const handleStatus = async (record) => {
    const { autorickshaw_number, id } = record;
  
    try {
      const response = await axios.post("http://localhost:3001/handlestatus", {
        autorickshaw_number,
        schedule_id: id,
        autorickshaw_status: 1, // Set the desired status value
      });
  
      if (response.data.status === "success") {
        Modal.success({
          title: "Success",
          content: (
            <div>
              <p>{` ${autorickshaw_number} নং অটোরিকশাটি অনুপস্থিত`}</p>
            </div>
          ),
          onOk: () => {
            window.location.reload();
          },
        });
      } else {
        console.log( autorickshaw_number + id);
        Modal.error({
          title: "Error",
          content: "Failed to update autorickshaw status.",
        });
        
      }
    } catch (error) {
      console.error("Error updating autorickshaw status:", error);
      Modal.error({
        title: "Error",
        content: "An error occurred while updating autorickshaw status.",
      });
    }
  };
  

  const columns2 = [
    {
      title: "অটোরিকশা নাম্বার",
      dataIndex: "autorickshaw_number",
    },
    {
      title: "কার্যক্রম",
      render: (text, record) => (
        <div className="ScheduleButton">
         <Button type="primary" onClick={() => handleAddToLatestSchedule(record)}>
  <span>এড করুন</span>
</Button>
         <Button type="primary" danger onClick={() => handleStatus(record)}>
            <span>অনুপস্থিত</span>
          </Button>
        </div>
      ),
    },
  ];

  const columns3 = [
    {
      title: "তারিখ",
      dataIndex: "schedule_date",
     
    },
    {
      title: "রাউন্ড",
      dataIndex: "schedule_round",
    },
    {
      title: "গন্তব্য",
      dataIndex: "schedule_place",
    },
    {
      title: "সময়",
      dataIndex: "schedule_time",
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
    গন্তব্য{" "}
  </p>
  <select
    className={styles.scheduleSelect}
    id="schedule_place"
    name="schedule_place"
    value={formData.schedule_place}
    onChange={handleInputChange}
  >
    <option key="default" value="">গন্তব্য নির্বাচন করুন</option>
    <option value="E Building">E Building</option>
    <option value="Boys Hall">Boys Hall</option>
    <option value="Ladies Hall">Ladies Hall</option>
  </select>
  {errors.schedule_place && (
    <span className={styles.scheduleError}>
      {errors.schedule_place}
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
                  placeholder="প্রস্থান সময় নির্বাচন করুন"
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
              <button type="submit" className={styles.scheduleButton}>
                ADD
              </button>
            </form>
          </div>
          <div className="PageContentQ">
            <div className="Pagecenter">
              <h1 className="PageHeader">
                <EyeOutlined className="icon" />
               সর্বশেষ শিডিউল 
              </h1>
            
              <Table
                className="TableSchedule"
                loading={loading3}
                columns={columns3} // Use the modified columns configuration
                dataSource={dataSource3}
                pagination={false} 
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