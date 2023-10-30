import { useEffect, useState } from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import "./index.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Dashboard() {
  const [driver, setDataSource] = useState([]);
  const [owner, setDataSource2] = useState([]);
  const [autorickshaw, setDataSource3] = useState([]);

  function driverData() {
    fetch("http://localhost:3001/api/totalDrivers")
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data.totalDrivers);
        console.log("Success fetching Schedule data: ", driver);
      })
      .catch((error) => {
        console.error("Error fetching Schedule data: ", error);
      });
  }

  function ownerData() {
    fetch("http://localhost:3001/api/totalOwners")
      .then((response) => response.json())
      .then((data) => {
        setDataSource2(data.totalOwners);
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
    ownerData();
    autorickshawData();
  });

  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
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

          <div className="dashboard-home">
            <div style={{ width: 150, height: 150 }}>
              <CircularProgressbar
                value={owner}
                text={`${owner}`}
                styles={{
                  // Customize the root svg element
                  root: {},
                  // Customize the path, i.e. the "completed progress"
                  path: {
                    // Path color
                    stroke: `rgba(86, 120, 244, 0.8)`,
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
                    fill: "rgba(0, 0, 0, 0.758)",
                    // Text size
                    fontSize: "36px",
                  },
                  // Customize background - only used when the `background` prop is true
                  background: {
                    fill: "#3e98c7",
                  },
                }}
              />
            </div>
            <h1 className="circularHeader">মালিকের সংখ্যা</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
