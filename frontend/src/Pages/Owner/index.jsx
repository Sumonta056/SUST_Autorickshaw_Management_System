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

function Owner() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/api/owners")
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching owner data: ", error);
        setLoading(false);
      });
  }, []);

  // Define a function to handle the "Edit" button click
  const handleEdit = (record) => {
    // Implement the edit functionality here
    navigate(`/editOwner/${record.id}`);
  };

  // Define a function to handle the "Delete" button click
  const handleDelete = (record) => {
    // Implement the delete functionality here
    const ownerNID = record.owner_nid;

    // Assuming you are using Axios for API requests, send a DELETE request to the backend
    axios
      .delete(`http://localhost:3001/delete/owners/${ownerNID}`)
      .then((response) => {
        // Handle successful deletion (e.g., show a success message, update the data source, etc.)
        console.log(`Owner with NID ${ownerNID} deleted successfully.`);

        alert("আপনি সফলভাবে ড্রাইভারের তথ্য ডিলিট করেছেন");
        // You may want to update the data source after deletion to reflect the changes
        // Here, you can filter out the deleted owner from the dataSource state
        setDataSource((prevDataSource) =>
          prevDataSource.filter((item) => item.owner_nid !== ownerNID)
        );
      })
      .catch((error) => {
        // Handle any errors that occur during deletion (e.g., show an error message)
        console.error(`Error deleting owner with NID ${ownerNID}: `, error);
      });
  };

  const columns = [
    {
      title: "প্রথম নাম",
      dataIndex: "owner_firstName",
    },
    {
      title: "শেষ নাম",
      dataIndex: "owner_lastName",
    },
    {
      title: "জাতীয় পরিচয়পত্র নম্বর",
      dataIndex: "owner_nid",
    },
    
    {
      title: "জন্ম তারিখ",
      dataIndex: "owner_date_of_birth",
      render: (date) => moment(date).format("YYYY-MM-DD"), 
    },
    {
      title: "বাড়ি নং",
      dataIndex: "owner_houseNo",
    },
    {
      title: "পোস্টাল কোড",
      dataIndex: "owner_postalCode",
    },
    {
      title: "জেলা",
      dataIndex: "owner_address",
    },
    {
      title: "কার্যক্রম",
      render: (text, record) => (
        <div className="ownerButton">
          <Button type="primary" onClick={() => handleEdit(record)}>
          আপডেট
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
          <h1 className="PageHeader"> <UserOutlined className="icon" />মালিকের তালিকা</h1>
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
