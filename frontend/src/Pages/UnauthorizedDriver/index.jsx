import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import "./index.css";

function Driver() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/api/drivers")
      .then((response) => response.json())
      .then((data) => {
        const unauthorizedDrivers = data.users.filter((driver) => driver.driver_status === 0);
        setDataSource(unauthorizedDrivers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data: ", error);
        setLoading(false);
      });
  }, []);

  // Define a function to handle the "Edit" button click
  const handleEdit = (record) => {
    navigate(`/editDriver/${record.id}`);
  };
  const handlePermission = (record) => {
    // Implement the edit functionality here
    navigate(`/PermitDriver/${record.id}`);
  };
  // Define a function to handle the "Delete" button click
  const handleDelete = (record) => {
    const driverNID = record.driver_nid;
    axios
      .delete(`http://localhost:3001/delete/drivers/${driverNID}`)
      .then((response) => {
        console.log(`Driver with NID ${driverNID} deleted successfully.`);
        alert("আপনি সফলভাবে ড্রাইভারের তথ্য ডিলিট করেছেন");
        setDataSource((prevDataSource) =>
          prevDataSource.filter((item) => item.driver_nid !== driverNID)
        );
      })
      .catch((error) => {
        console.error(`Error deleting driver with NID ${driverNID}: `, error);
      });
  };

  const columns = [
    {
      title: "প্রথম নাম",
      dataIndex: "driver_firstName",
    },
    {
      title: "শেষ নাম",
      dataIndex: "driver_lastName",
    },
    {
      title: "জাতীয় পরিচয়পত্র নম্বর",
      dataIndex: "driver_nid",
    },
    {
      title: "ড্রাইভিং লাইসেন্স নম্বর",
      dataIndex: "driver_license_no",
    },
    {
      title: "জন্ম তারিখ",
      dataIndex: "driver_date_of_birth",
    },
    {
      title: "জেলা",
      dataIndex: "driver_address",
    },
    {
      title: "কার্যক্রম",
      render: (text, record) => (
        <div className="driverButton">
          <Button type="primary" onClick={() => handleEdit(record)}>
            <span>আরও দেখুন</span>
          </Button>
          <Button type="primary" className="driverPermitButton" onClick={() => handlePermission(record)}>
          অনুমোদন দিন
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
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
        <div className="PageContent">
          <h1 className="PageHeader">
            {" "}
            <UserOutlined className="icon" />
            ড্রাইভারের তালিকা
          </h1>
          <Table
            className="TableDriver"
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            pagination={{
              pageSize: 7,
            }}
          ></Table>
        </div>
      </div>
    </div>
  );
}

export default Driver;
