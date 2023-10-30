import { Table, Button, Modal } from "antd"; // Import Button from Ant Design
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import "./index.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

import { EditOutlined, EyeOutlined } from "@ant-design/icons";

function Schedule() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);

  const [driver, setDataSource23] = useState([]);
  const [autorickshaw, setDataSource3] = useState([]);

  function driverData() {
    fetch("http://localhost:3001/api/totalDrivers")
      .then((response) => response.json())
      .then((data) => {
        setDataSource23(data.totalDrivers);
        console.log("Success fetching Schedule data: ", driver);
      })
      .catch((error) => {
        console.error("Error fetching Schedule data: ", error);
      });
  }

  

  function autorickshawData() {
    fetch("http://localhost:3001/api/totalautorickshaws")
      .then((response) => response.json())
      .then((data) => {
        setDataSource3(data.totalautorickshaws);
      })
      .catch((error) => {
        console.error("Error fetching Schedule data: ", error);
      });
  }

  useEffect(() => {
    driverData();
    autorickshawData();
  });

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

  useEffect(() => {
    ScheduleData();
  }, []);

  useEffect(() => {
    setLoading2(true);
    fetch("http://localhost:3001/api/autorickshaw")
      .then((response) => response.json())
      .then((data) => {
        setDataSource2(data.users);
        console.log(data.users);
        console.log(data.users);
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
      title: "অটোরিকশা নাম্বার",
      dataIndex: "schedule_autorickshaw",
    },
    {
      title: "টাকার পরিমাণ",
      dataIndex: "schedule_time",
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
      title: "প্রদত্ত টাকার পরিমাণ",
      dataIndex: "autorickshaw_number",
    },
    {
      title: "বাকি টাকার পরিমাণ",
      dataIndex: "autorickshaw_number",
    },

    {
      title: "কার্যক্রম",
      render: (text, record) => (
        <div className="ScheduleButton">
          <Button type="primary" onClick={() => handleDelete(record)}>
            <span>আপডেট</span>
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
              ড্রাইভারের পেমেন্ট বিবরণ এন্ট্রি ফর্ম
            </h1>
            <div className="PageContentDash">
              <div className="dashboard-home">
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar
                    value={driver}
                    text={`${driver}`}
                    styles={{
                      // Customize the root svg element
                      root: {},
                      // Customize the path, i.e. the "completed progress"
                      path: {
                        // Path color
                        stroke: `rgba(86, 244, 138, 0.8)`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        // Customize transition animation
                        transition: "stroke-dashoffset 0.5s ease 0s",
                        // Rotate the path
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                      },
                      // Customize the circle behind the path, i.e. the "total progress"
                      trail: {
                        // Trail color
                        stroke: "#d6d6d6",
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        // Rotate the trail
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                      },
                      // Customize the text
                      text: {
                        // Text color
                        fill: "rgba(0, 0, 0, 0.758)",
                        // Text size
                        fontSize: "36px",
                      },
                      // Customize background - only used when the `background` prop is true
                      background: {
                        fill: "#8a9a6",
                      },
                    }}
                  />
                </div>
                <h1 className="circularHeader">ড্রাইভারের সংখ্যা</h1>
              </div>

              <div className="dashboard-home">
                <div style={{ width: 150, height: 150 }}>
                  <CircularProgressbar
                    value={autorickshaw}
                    text={`${autorickshaw}`}
                    styles={{
                      // Customize the root svg element
                      root: {},
                      // Customize the path, i.e. the "completed progress"
                      path: {
                        // Path color
                        stroke: `rgba(232, 244, 86, 0.8)`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        // Customize transition animation
                        transition: "stroke-dashoffset 0.5s ease 0s",
                        // Rotate the path
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                      },
                      // Customize the circle behind the path, i.e. the "total progress"
                      trail: {
                        // Trail color
                        stroke: "#d6d6d6",
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "butt",
                        // Rotate the trail
                        transform: "rotate(0.25turn)",
                        transformOrigin: "center center",
                      },
                      // Customize the text
                      text: {
                        // Text color
                        fill: "rgba(0, 0, 0, 0.758)",
                        // Text size
                        fontSize: "36px",
                      },
                      // Customize background - only used when the `background` prop is true
                      background: {
                        fill: "rgba(0, 0, 0, 0.758)",
                      },
                    }}
                  />
                </div>
                <h1 className="circularHeader">অটোরিক্সা সংখ্যা</h1>
              </div>
            </div>
          </div>
          <div className="PageContentQM">
            <div className="PagecenterM">
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
                  pageSize: 7,
                }}
              ></Table>
            </div>

            <div className="PageFooterM">
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
                  pageSize: 7,
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
