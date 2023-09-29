import { Table, Button } from "antd"; // Import Button from Ant Design
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import "./index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Driver() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/api/drivers")
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data: ", error);
        setLoading(false);
      });
  }, []);

  // Define a function to handle the "Edit" button click
  const handleEdit = (record) => {
    // Implement the edit functionality here
    navigate(`/editDriver/${record.driver_nid}`);
  };

  // Define a function to handle the "Delete" button click
  const handleDelete = (record) => {
    // Implement the delete functionality here
    const driverNID = record.driver_nid;

    // Assuming you are using Axios for API requests, send a DELETE request to the backend
    axios
      .delete(`http://localhost:3001/delete/drivers/${driverNID}`)
      .then((response) => {
        // Handle successful deletion (e.g., show a success message, update the data source, etc.)
        console.log(`Driver with NID ${driverNID} deleted successfully.`);

        alert("আপনি সফলভাবে ড্রাইভারের তথ্য ডিলিট করেছেন");
        // You may want to update the data source after deletion to reflect the changes
        // Here, you can filter out the deleted driver from the dataSource state
        setDataSource((prevDataSource) =>
          prevDataSource.filter((item) => item.driver_nid !== driverNID)
        );
      })
      .catch((error) => {
        // Handle any errors that occur during deletion (e.g., show an error message)
        console.error(`Error deleting driver with NID ${driverNID}: `, error);
      });
  };

  const columns = [
    {
      title: "Driver NID",
      dataIndex: "driver_nid",
    },
    {
      title: "Name",
      dataIndex: "driver_name",
    },
    {
      title: "Driving License",
      dataIndex: "driver_license_no",
    },
    {
      title: "Date of Birth",
      dataIndex: "driver_date_of_birth",
    },
    {
      title: "House No",
      dataIndex: "driver_houseNo",
    },
    {
      title: "Postal Code",
      dataIndex: "driver_postalCode",
    },
    {
      title: "District",
      dataIndex: "driver_address",
    },
    {
      title: "Update",
      render: (text, record) => (
        <div className="driverButton">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <span>Delete</span>
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
          <h1 className="PageHeader">Driver</h1>
          <Table
            className="TableDriver"
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

export default Driver;
