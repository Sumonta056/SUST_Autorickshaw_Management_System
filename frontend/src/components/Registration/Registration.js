import React from "react";
import styles from "../Registration/Registration.module.css"; // Import the CSS module

function Registration() {
  return (
    <div>
      <div className={styles.container} id="container">
        <div className={`${styles["form-container"]} ${styles["sign-up-container"]}`}>
          <form>
            <h1>নতুন একাউন্ট তৈরি করুন</h1>
            <div className={styles.infield}>
              <input type="text" placeholder="নাম" id="name" name="name" />
            </div>
            <div className={styles.infield}>
              <input type="email" placeholder="ইমেইল" id="email" name="email" />
            </div>
            <div className={styles.infield}>
              <input
                type="password"
                placeholder="পাসওয়ার্ড"
                id="password"
                name="password"
              />
            </div>
            <div className={styles.infield}>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                placeholder="পুনরায় পাসওয়ার্ড দিন"
              />
            </div>
            <button className={styles.button}>রেজিস্ট্রেশন</button>
          </form>
        </div>
        <div className={`${styles["overlay-container"]}`} id="overlayCon">
          <div className={styles.overlay}>
            <div className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}>
              <div className={styles["background-image"]} />
              <h1>শাবিপ্রবি অটোরিকশা ম্যানেজমেন্ট সিস্টেম</h1>
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

export default Registration;
