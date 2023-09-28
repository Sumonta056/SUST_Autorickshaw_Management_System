import { Table } from "antd";
import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import "./index.css";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/api/drivers") // Replace with your server's API endpoint
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customer data: ", error);
        setLoading(false);
      });
  }, []);
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
            columns={[
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
                
              },
            ]}
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
export default Customers;
