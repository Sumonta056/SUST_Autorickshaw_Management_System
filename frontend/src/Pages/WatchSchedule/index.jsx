import { Table, Button, Modal } from "antd"; // Import Button from Ant Design
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import "./index.css";
import axios from "axios";

import { Steps, Space, Tag } from "antd";

import { EyeOutlined } from "@ant-design/icons";

function Schedule() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  function ScheduleData() {
    setLoading(true);
    fetch("http://localhost:3001/api/autorickshawSchedule")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.users.sort((a, b) => {
          const dateA = new Date(`${a.schedule_date} ${a.schedule_time}`);
          const dateB = new Date(`${b.schedule_date} ${b.schedule_time}`);
          return dateB - dateA;
        });
        console.log(sortedData);
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
      dataIndex: "schedule_date",
    },
    {
      title: "গন্তব্য",
      dataIndex: "schedule_place",
    },
    {
      title: "রাউন্ড",
      dataIndex: "schedule_round",
    },
    {
      title: "সময়",
      dataIndex: "schedule_time",
    },
    {
      title: "কার্যক্রম",
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleViewAutorickshaws(record)}
            style={{ marginRight: "8px" }}
          >
            দেখুন{" "}
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            মুছুন
          </Button>
        </div>
      ),
    },
  ];



  const handleViewAutorickshaws = (schedule) => {
    // Fetch autorickshaw numbers from the API using the schedule ID
    fetch(`http://localhost:3001/api/autorickshawSchedule/${schedule.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data.data) && data.data.length > 0) {
          const autorickshawNumbers = data.data.map(
            (item) => item.autorickshaw_number
          ); // Extract all autorickshaw numbers
          console.log(autorickshawNumbers);
  
          const itemsWithAutorickshawNumbers = autorickshawNumbers.map(
            (number, index) => {
              const autorickshawData = data.data.find((item) => item.autorickshaw_number === number);
              if (autorickshawData) {
                const formattedDate = new Date(schedule.schedule_date).toLocaleDateString();
                const formattedTime = autorickshawData.autorickshaw_schedule_time;
                console.log(formattedDate, autorickshawData.autorickshaw_schedule_time);
                return {
                  title: `${number} নং অটোরিকশা`,
                  description: ` তারিখ: ${formattedDate}, সময়: ${formattedTime}`,
                };
              } 
            }
          );
          
          
          // Display the autorickshaw numbers in a list
          Modal.info({
            title: `রাউন্ড ডিটেইলস`,
            content: (
              <div>
                <Space size={[0, 10]} wrap>
                  <Tag color="#f50">{`তারিখ : ${schedule.schedule_date}`}</Tag>
                  <Tag color="#2db7f5">{`গন্তব্য : ${schedule.schedule_place}`}</Tag>
                  <Tag color="#87d06f">{`রাউন্ড নং : ${schedule.schedule_round}`}</Tag>
                </Space>
  
                <Steps
                  progressDot
                  current={20}
                  direction="vertical"
                  items={itemsWithAutorickshawNumbers}
                  style={{ paddingTop: "20px" }}
                />
              </div>
            ),
          });
        } else {
          Modal.info({
            title: `${schedule.schedule_date} - ${schedule.schedule_place} - ${schedule.schedule_round}`,
            content: (
              <div>
                <p>কোনো অটোরিকশা যুক্ত হয় নি</p>
              </div>
            ),
          });
          console.error(
            "No autorickshaw data found or it's not in the expected format."
          );
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
                  pageSize: 10,
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
