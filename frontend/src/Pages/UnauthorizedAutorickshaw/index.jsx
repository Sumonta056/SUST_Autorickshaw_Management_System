import { Table, Button } from "antd"; // Import Button from Ant Design
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import "./index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";

function Owner() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/api/autorickshaws")
      .then((response) => response.json())
      .then((data) => {
        const authorizedAutorickshaw = data.users.filter((autorickshaw) => autorickshaw.autorickshaw_status === 0);
        setDataSource(authorizedAutorickshaw);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching autorickshaw data: ", error);
        setLoading(false);
      });
  }, []);

  // Define a function to handle the "Edit" button click
  const handleEdit = (record) => {
    // Implement the edit functionality here
    navigate(`/editAutorickshaw/${record.id}`);
  };
  // Define a function to handle the "Edit" button click
  const handlePermission = (record) => {
    // Implement the edit functionality here
    navigate(`/PermitAutorickshaw/${record.id}`);
  };

  const handleDelete = (record) => {
    const autorickshawNID = record.id; // Ensure that `id` is the identifier in the dataSource
  
    axios
      .delete(`http://localhost:3001/delete/autorickshaw/${autorickshawNID}`)
      .then((response) => {
        console.log(`Autorickshaw with ID ${autorickshawNID} deleted successfully.`);
        alert("আপনি সফলভাবে অটোরিকশার তথ্য ডিলিট করেছেন");
  
        // Update the dataSource to reflect the deletion
        setDataSource((prevDataSource) =>
          prevDataSource.filter((item) => item.id !== autorickshawNID)
        );
      })
      .catch((error) => {
        console.error(`Error deleting autorickshaw with ID ${autorickshawNID}: `, error);
      });
  };

  const columns = [
    {
      title: "অটোরিকশা নাম্বার",
      dataIndex: "autorickshaw_number",
    },
    {
      title: "গাড়ির নিবন্ধন নাম্বার",
      dataIndex: "vehicle_registration_number",
    },
    {
      title: "মালিকের জাতীয় পরিচয়পত্র নম্বর",
      dataIndex: "owner_nid",
    },
    {
      title: "ড্রাইভারের জাতীয় পরিচয়পত্র নম্বর",
      dataIndex: "driver_nid",
    },

    {
      title: "কার্যক্রম",
      render: (text, record) => (
        <div className="autorickshawButton">
          <Button type="primary" onClick={() => handleEdit(record)}>
          আরও দেখুন
          </Button>
          <Button type="primary" style={{ background: "#1F8A70"}} onClick={() => handlePermission(record)}>
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
            অটোরিকশার তালিকা
          </h1>
          <Table
            className="TableOwner"
            loading={loading}
            columns={columns} // Use the modified columns configuration
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

export default Owner;
