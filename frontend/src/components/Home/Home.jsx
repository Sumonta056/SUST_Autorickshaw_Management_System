import React from "react";
import styles from "./Home.module.css"; // Import your CSS module here
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className={styles.home}>
      <header>
        <div className={styles.wrapper}>
          <div className={styles.logo}>
            <img src={require("./Images/logo.png")} alt="Home" />
          </div>
          <ul className={styles["nav-area"]}>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/home">About</a>
            </li>
            <li>
              <a href="/home">Services</a>
            </li>
            <li>
              <a href="/home">Search</a>
            </li>
            <li>
              <a href="/home">Contact</a>
            </li>
            <li>
              <Link to="/login" className={styles["a"]}>
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles["welcome-text"]}>
          <h1>
            <span>SUST</span>
          </h1>
          <h2>
            <span>Auto-Rickshaw</span> Management <span>System</span>
          </h2>

          <div className={styles["buttons-reg"]}>
            <Link to="/driver" className={styles["a"]}>
              Register as Driver
            </Link>
            <Link to="/OwnerRegistration" className={styles["a"]}>
              Register as Owner
            </Link>
            <Link to="/login" className={styles["a"]}>
              Auto-Rickshaw Registration
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
