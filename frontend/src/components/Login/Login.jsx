import React, { useState } from "react";
import { Modal } from "antd";
import styles from "../Login/Login.module.css";
import { useNavigate } from "react-router-dom";
import LoginValidation from "./LoginValidation";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  // Collecting the login Values
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // Collecting the login Errors
  const [errors, setErrors] = useState({});

  // taking values from form email and pass
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  // Submitting the form and checking the form values validation and return the errors
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(LoginValidation(values));

    if (Object.keys(errors).length === 0) {
      console.log(values);
      axios
        .post("http://localhost:3001/login", values)
        .then((res) => {
          if (res.data === "success") {
            Modal.success({
              title: "Successful!",
              content: "আপনি সফলভাবে লগইন করেছেন",
              onOk: () => {
                navigate("/dashboard");
              },
            });
          } else {
            Modal.error({
              title: "Not Found",
              content: "কোন তথ্য পাওয়া যায়নি",
              onOk: () => {
               
              },
            });
          }
        })
        .catch((error) => {
          console.error("Error while logging in:", error);
        });
    }
  };

  return (
    <div className={styles.loginScreen}>
      <div className={styles.container} id="container">
        <div
          className={`${styles["form-container"]} ${styles["sign-in-container"]}`}
        >
          <form action="" onSubmit={handleSubmit}>
            <h1>লগইন করুন</h1>
            <div className={styles.infield}>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="অ্যাডমিন ইউজারনেম"
                onChange={handleInput}
              />

              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>
            <div className={styles.infield}>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="পাসওয়ার্ড"
                onChange={handleInput}
              />

              {errors.password && (
                <span className={styles.error}>{errors.password}</span>
              )}
            </div>
            {/* <a href="#d" className={styles.forgot}>
              পাসওয়ার্ড ভুলে গিয়েছেন ?
            </a> */}
            <button
              type="submit"
              className={`${styles.button} ${styles.login}`}
            >
              লগইন
            </button>
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
                {/* <Link
                  to="/signup"
                  className={`${styles.button} ${styles.registration}`}
                >
                  রেজিস্ট্রেশন করুন
                </Link> */}
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/* <footer>
        <mark>
          Learn more on{" "}
          <a href="https://github.com/Sumonta056/SUST-Autorickshaw-Management-System">
            Github
          </a>
        </mark>
      </footer> */}
    </div>
  );
}

export default Login;
