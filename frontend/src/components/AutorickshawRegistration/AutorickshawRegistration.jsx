import React, { useState } from "react";
import styles from "./AutorickshawRegistration.module.css"; // Keep the import path as-is
import AutorickshawRegistrationValidation from "./AutorickshawRegistrationValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AutorickshawRegistration() {
  console.log("Rendering autorickshawRegistration");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    autorickshaw_number: "",
    autorickshaw_company: "",
    autorickshaw_model: "",
    driver_nid: "",
    owner_nid: "",
  });

  const [errors, setErrors] = useState({
    autorickshaw_number: "",
    autorickshaw_company: "",
    autorickshaw_model: "",
    driver_nid: "",
    owner_nid: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Wait until the errors are set
    const validationErrors = AutorickshawRegistrationValidation(formData);
    setErrors(validationErrors);

    // Use async/await to ensure state is updated

    // Check for specific error conditions
    if (
      validationErrors.autorickshaw_number === "" &&
      validationErrors.autorickshaw_company === "" &&
      validationErrors.autorickshaw_model === "" &&
      validationErrors.owner_nid === "" &&
      validationErrors.driver_nid === ""
    ) {
      try {
        axios
          .post("http://localhost:3001/AutorickshawRegistration", formData)
          .then((res) => {
            console.log("Server response:", res.data);
            if (res.data === "autorickshaw_registration_success") {
              navigate("/");
              alert("আপনি সফলভাবে অটোরিকশা নিবন্ধন করেছেন");
            } else if (res.data === "owner_nid_not_found") {
              alert("উক্ত মালিকের নাম নিবন্ধন করা হয় নি-");
            } else if (res.data === "driver_nid_not_found") {
              alert("উক্ত ড্রাইভারের নাম নিবন্ধন করা হয় নি");
            } else if (res.data === "autorickshaw_number_exists") {
              alert("উক্ত অটোরিকশা পূর্বে নিবন্ধন করা হয়েছে");
            } else {
              alert(
                "অটোরিকশা নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন"
              );
            }
          })
          .catch((error) => {
            console.error("Server error:", error);
            if (error === "driver_nid_not_found") {
              alert("উক্ত মালিকের নাম নিবন্ধন করা হয় নি-");
            } else
              alert(
                "অটোরিকশা নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন"
              );
          });
      } catch (error) {
        console.error("Error:", error);

        alert("অটোরিকশা নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      }
    } else {
      // Display an error message based on the first encountered error
      const errorMessages = Object.values(validationErrors).filter(
        (error) => error !== ""
      );
      if (errorMessages.length > 0) {
        alert("অটোরিকশা নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      } else {
        alert("অটোরিকশা নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      }
    }
  };

  return (
    <div className={styles.RegistrationScreen}>
      <div className={styles.autorickshawContainer} id="autorickshawContainer">
        <div
          className={`${styles["autorickshawFormContainer"]} ${styles["autorickshawSignUpContainer"]}`}
        >
          <form onSubmit={handleSubmit}>
            <h1>অটোরিকশা নিবন্ধন ফর্ম</h1>
            <div className={styles.autorickshawInfield}>
              <input
                type="text"
                placeholder="অটোরিকশা নাম্বার"
                id="autorickshaw_number"
                name="autorickshaw_number"
                value={formData.autorickshaw_number}
                onChange={handleInputChange}
              />
              {errors.autorickshaw_number && (
                <span className={styles.autorickshawError}>
                  {errors.autorickshaw_number}
                </span>
              )}
            </div>
            <div className={styles.autorickshawInfield}>
              <input
                type="text"
                placeholder="অটোরিকশা কোম্পানি"
                id="autorickshaw_company"
                name="autorickshaw_company"
                value={formData.autorickshaw_company}
                onChange={handleInputChange}
              />
              {errors.autorickshaw_company && (
                <span className={styles.autorickshawError}>
                  {errors.autorickshaw_company}
                </span>
              )}
            </div>
            <div className={styles.autorickshawInfield}>
              <input
                type="text"
                placeholder="অটোরিকশা মডেল"
                id="autorickshaw_model"
                name="autorickshaw_model"
                value={formData.autorickshaw_model}
                onChange={handleInputChange}
              />
              {errors.autorickshaw_model && (
                <span className={styles.autorickshawError}>
                  {errors.autorickshaw_model}
                </span>
              )}
            </div>
            <div className={styles.autorickshawInfield}>
              <input
                type="text"
                placeholder="মালিকের জাতীয় পরিচয়পত্র নম্বর"
                id="owner_nid"
                name="owner_nid"
                value={formData.owner_nid}
                onChange={handleInputChange}
              />
              {errors.owner_nid && (
                <span className={styles.autorickshawError}>
                  {errors.owner_nid}
                </span>
              )}
            </div>
            <div className={styles.autorickshawInfield}>
              <input
                type="text"
                placeholder="ড্রাইভারের জাতীয় পরিচয়পত্র নম্বর"
                id="driver_nid"
                name="driver_nid"
                value={formData.driver_nid}
                onChange={handleInputChange}
              />
              {errors.driver_nid && (
                <span className={styles.autorickshawError}>
                  {errors.driver_nid}
                </span>
              )}
            </div>

            <button type="submit" className={styles.autorickshawButton}>
              নিবন্ধন
            </button>
            <span className={styles.autorickshawPrevReg}>
              পূর্বে রেজিস্ট্রেশন করেছেন?{" "}
              <a href="#d" className={styles.autorickshawRegIgnore}>
                এড়িয়ে যান
              </a>
            </span>
          </form>
        </div>
        <div
          className={`${styles["autorickshawOverlayContainer"]}`}
          id="overlayCon"
        >
          <div className={styles.autorickshawOverlay}>
            <div
              className={`${styles["autorickshawOverlayPanel"]} ${styles["autorickshawOverlayRight"]}`}
            >
              <div className={styles["autorickshawFormImage"]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AutorickshawRegistration;
