import { Table, Button } from "antd"; // Import Button from Ant Design
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import "./index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {
  UserOutlined  
} from "@ant-design/icons";

function Manager() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/api/managers")
      .then((response) => response.json())
      .then((data) => {
        const unauthorizedManager = data.users.filter((manager) => manager.manager_status === 0);
        setDataSource(unauthorizedManager);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching manager data: ", error);
        setLoading(false);
      });
  }, []);

  // Define a function to handle the "Edit" button click
  const handleEdit = (record) => {
    // Implement the edit functionality here
    navigate(`/editManager/${record.id}`);
  };

  // Define a function to handle the "Delete" button click
  const handleDelete = (record) => {
    // Implement the delete functionality here
    const managerNID = record.manager_nid;

    console.log("i am here");
    // Assuming you are using Axios for API requests, send a DELETE request to the backend
    axios
      .delete(`http://localhost:3001/delete/managers/${managerNID}`)
      .then((response) => {
        console.log("i am here");
        // Handle successful deletion (e.g., show a success message, update the data source, etc.)
        console.log(`Manager with NID ${managerNID} deleted successfully.`);

        alert("আপনি সফলভাবে ম্যানেজারের তথ্য ডিলিট করেছেন");
        // You may want to update the data source after deletion to reflect the changes
        // Here, you can filter out the deleted manager from the dataSource state
        setDataSource((prevDataSource) =>
          prevDataSource.filter((item) => item.manager_nid !== managerNID)
        );
      })
      .catch((error) => {
        // Handle any errors that occur during deletion (e.g., show an error message)
        console.error(`Error deleting manager with NID ${managerNID}: `, error);
      });
  };

  const columns = [
    {
      title: "প্রথম নাম",
      dataIndex: "manager_firstName",
    },
    {
      title: "শেষ নাম",
      dataIndex: "manager_lastName",
    },
    {
      title: "জাতীয় পরিচয়পত্র নম্বর",
      dataIndex: "manager_nid",
    },
    
    {
      title: "জন্ম তারিখ",
      dataIndex: "manager_date_of_birth",
      render: (date) => moment(date).format("YYYY-MM-DD"), 
    },
    {
      title: "বর্তমান ঠিকানা",
      dataIndex: "manager_houseNo",
    },
    {
      title: "জেলা",
      dataIndex: "manager_address",
    },
    {
      title: "কার্যক্রম",
      render: (text, record) => (
        <div className="managerButton">
          <Button type="primary" onClick={() => handleEdit(record)}>
          আরও দেখুন
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
          <h1 className="PageHeader"> <UserOutlined className="icon" />ম্যানেজারের তালিকা</h1>
          <Table
            className="TableManager"
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

export default Manager;
