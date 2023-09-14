import React, { useState } from "react";
import styles from "../Registration/Registration.module.css";
import RegistrationValidation from "./RegistrationValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(RegistrationValidation(values));

    // if (errors.name === "" && errors.email === "" && errors.password === "") {
    //   axios.post("http://localhost:3001/signup", values).then((res) => {
    //     navigate("/");
    //   });
    // }
    
    if (Object.keys(errors).length === 0) {
      axios.post("http://localhost:3001/signup", values).then((res) => {
        navigate("/");
        alert("Registration Successful");
      });
    }
  };

 
  return (
    <div>
      <div className={styles.container} id="container">
        <div
          className={`${styles["form-container"]} ${styles["sign-up-container"]}`}
        >
          <form action="" onSubmit={handleSubmit}>
            <h1>নতুন একাউন্ট তৈরি করুন</h1>
            <div className={styles.infield}>
              <input
                type="text"
                placeholder="নাম"
                id="name"
                name="name"
                onChange={handleInput}
              />
              {errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </div>
            <div className={styles.infield}>
              <input
                type="email"
                placeholder="ইমেইল"
                id="email"
                name="email"
                onChange={handleInput}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>
            <div className={styles.infield}>
              <input
                type="password"
                placeholder="পাসওয়ার্ড"
                id="password"
                name="password"
                onChange={handleInput}
              />
              {errors.password && (
                <span className={styles.error}>{errors.password}</span>
              )}
            </div>
            {/* <div className={styles.infield}>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                placeholder="পুনরায় পাসওয়ার্ড দিন"
                onChange={handleInput}
              />
              {errors.password_confirmation && (
                <span className={styles.error}>
                  {errors.password_confirmation}
                </span>
              )}
            </div> */}
            <button type="submit" className={styles.button}>
              রেজিস্ট্রেশন
            </button>
          </form>
        </div>
        <div className={`${styles["overlay-container"]}`} id="overlayCon">
          <div className={styles.overlay}>
            <div
              className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}
            >
              <div className={styles["background-image"]} />
              <h1>শাবিপ্রবি অটোরিকশা ম্যানেজমেন্ট সিস্টেম</h1>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <mark>
          Learn more on{" "}
          <a href="https://github.com/Sumonta056/SUST-Autorickshaw-Management-System">
            Github
          </a>
        </mark>
      </footer>
    </div>
  );
}

export default Registration;
