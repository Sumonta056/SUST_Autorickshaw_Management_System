import React from "react";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import "./index.css";

function Dashboard() {


  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>

        <div className="PageContent">
          <div className="dashboard-home">
            Working Dashboard
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
