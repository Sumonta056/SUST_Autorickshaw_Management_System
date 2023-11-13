import { Table, Button, Modal } from "antd"; // Import Button from Ant Design
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import "./index.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [loading3, setLoading3] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [dataSource3, setDataSource3] = useState([]);
  const [autorickshaws, setAutorickshaws] = useState([]);
  // const [selectedSchedule, setSelectedSchedule] = useState(null);



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
  


  

  useEffect(() => {
    ScheduleData();
  }, []);


  const handleDelete = (record) => {
    // Display a confirmation modal before deleting
    Modal.confirm({
      title: "Confirm Deletion",
      content: "আপনি কি নিশ্চিত যে আপনি এই সময়সূচি মুছতে চান?",
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
      dataIndex: "combined_info",
      render: (text, record, index) =>
        index === dataSource.findIndex((item) => item.id === record.id) ? (
          <span>{record.schedule_date}</span>
        ) : null,
    },
    {
      title: "গন্তব্য",
      dataIndex: "combined_info",
      render: (text, record, index) =>
        index === dataSource.findIndex((item) => item.id === record.id) ? (
          <span>{record.schedule_place}</span>
        ) : null,
    },
    {
      title: "রাউন্ড",
      dataIndex: "combined_info",
      render: (text, record, index) =>
        index === dataSource.findIndex((item) => item.id === record.id) ? (
          <span>{record.schedule_round}</span>
        ) : null,
    },
    {
      title: "সময়",
      dataIndex: "combined_info",
      render: (text, record, index) =>
        index === dataSource.findIndex((item) => item.id === record.id) ? (
          <span>{record.schedule_time}</span>
        ) : null,
    },
    {
      title: "কার্যক্রম",
      render: (text, record, index) => {
        if (index === 0) {
          return (
            <div>
              <Button type="primary" onClick={() => handleViewAutorickshaws(record)} style={{ marginRight: '8px' }} >
                দেখুন                </Button>
              <Button type="primary" danger onClick={() => handleDelete(record)}>
                মুছুন
              </Button>
            </div>
          );
        }
        return null;
      },
    },
    
    
  ];
  


    // Define a state variable to track the currently open schedule ID
const [openScheduleID, setOpenScheduleID] = useState(null);

const handleViewAutorickshaws = (schedule) => {
    // Fetch autorickshaw numbers from the API using the schedule ID
    fetch(`http://localhost:3001/api/autorickshawSchedule/${schedule.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data.data) && data.data.length > 0) {
          const autorickshawNumbers = data.data.map((item) => item.autorickshaw_number); // Extract all autorickshaw numbers
          console.log(autorickshawNumbers);
  
          // Display the autorickshaw numbers in a list
          Modal.info({
            title: `${schedule.schedule_date} - ${schedule.schedule_place} - ${schedule.schedule_round}`,
            content: (
              <div>
                <p>অটোরিক্শা নাম্বারঃ</p>
                <ul>
                  {autorickshawNumbers.map((number, index) => (
                    <li key={index}>{number}</li> 
                  ))}
                </ul>
              </div>
            ),
            width: "60%",
          });
        } else {
          // Handle the case when data is not in the expected format or is empty
          console.error("No autorickshaw data found or it's not in the expected format.");
          // You can display an error message or take appropriate action here
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during fetching autorickshaw data
        console.error("Error fetching autorickshaw data: ", error);
        // You can display an error message or take appropriate action here
      });
  };
  
  
  
  
  

  

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <div className="SetPageContent">
         
          <div className="PageFooter">
              
             

            </div>
            <div className="PageFooter">
              
            </div>
          <div className="PageContentQ">
            <div className="Pagecenter">
              <h1 className="PageHeader">
                <EyeOutlined className="icon" />
                শিডিউল দেখুন
              </h1>
            
              <Table
                className="TableSchedule"
                loading={loading}
                columns={columns} 
                dataSource={dataSource}
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