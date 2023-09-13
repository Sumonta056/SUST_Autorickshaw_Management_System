import React from "react";
import styles from "../Login/Login.module.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <div className={styles.container} id="container">
        <div
          className={`${styles["form-container"]} ${styles["sign-in-container"]}`}
        >
          <form action="">
            <h1>লগইন করুন</h1>
            <div className={styles.infield}>
              <input type="email" id="email" name="email" placeholder="ইমেইল" />
            </div>
            <div className={styles.infield}>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="পাসওয়ার্ড"
              />
            </div>
            <a href="#d" className={styles.forgot}>
              পাসওয়ার্ড ভুলে গিয়েছেন ?
            </a>
            <Link to="/" className={`${styles.button} ${styles.login}`}>
              লগইন
            </Link>
          </form>
        </div>
        <div className={styles["overlay-container"]} id="overlayCon">
          <div className={styles.overlay}>
            <div
              className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}
            >
              <div className={styles["background-image"]} />
              <h1>
                শাবিপ্রবি অটোরিকশা ম্যানেজমেন্ট সিস্টেম
                <br />
                <Link
                  to="/signup"
                  className={`${styles.button} ${styles.registration}`}
                >
                  রেজিস্ট্রেশন করুন
                </Link>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <mark>
          Learn more on
          <a href="https://github.com/Sumonta056/SUST-Autorickshaw-Management-System">
            Github
          </a>
        </mark>
      </footer>
    </div>
  );
}

export default Login;
