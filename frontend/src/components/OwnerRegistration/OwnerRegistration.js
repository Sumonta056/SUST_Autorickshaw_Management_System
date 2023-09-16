import React, { useState } from "react";
import styles from "../OwnerRegistration/OwnerRegistration.module.css"; // Keep the import path as-is
import OwnerRegistrationValidation from "./OwnerRegistrationValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OwnerRegistration() {
  console.log("Rendering OwnerRegistration");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    owner_nid: "",
    owner_name: "",
    owner_date_of_birth: "",
    owner_houseNo: "",
    owner_postalCode: "",
    owner_address: "",
  });

  const [errors, setErrors] = useState({
    owner_nid: "",
    owner_name: "",
    owner_date_of_birth: "",
    owner_houseNo: "",
    owner_postalCode: "",
    owner_address: "",
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
    const validationErrors = OwnerRegistrationValidation(formData);
    setErrors(validationErrors);

    console.log(validationErrors);

    // Use async/await to ensure state is updated

    if (
      validationErrors.owner_nid === "" &&
      validationErrors.owner_name === "" &&
      validationErrors.owner_date_of_birth === "" &&
      validationErrors.owner_houseNo === "" &&
      validationErrors.owner_postalCode === ""&&
      validationErrors.owner_address === ""
    ) {
      try {
        axios.post("http://localhost:3001/OwnerRegistration", formData).then((res) => {
            navigate("/");
            alert("আপনি সফলভাবে মালিক নিবন্ধন করেছেন");
        });
      } catch (error) {
          alert("মালিক নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      }
    } else {
      // Display an error message to the user
      alert("নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
    }
  };

  return (
    <div className={styles.ownerContainer} id="ownerContainer">
      <div
        className={`${styles["ownerFormContainer"]} ${styles["ownerSignUpContainer"]}`}
      >
        <form onSubmit={handleSubmit}>
          <h1>মালিক নিবন্ধন ফর্ম</h1>
          <div className={styles.ownerInfield}>
            <input
              type="text"
              placeholder="জাতীয় পরিচয়পত্র নম্বর"
              id="owner_nid"
              name="owner_nid"
              value={formData.owner_nid}
              onChange={handleInputChange}
            />
            {errors.owner_nid && (
              <span className={styles.ownerError}>{errors.owner_nid}</span>
            )}
          </div>
          <div className={styles.ownerInfield}>
            <input
              type="text"
              placeholder="মালিকের নাম"
              id="owner_name"
              name="owner_name"
              value={formData.owner_name}
              onChange={handleInputChange}
            />
            {errors.owner_name && (
              <span className={styles.ownerError}>{errors.owner_name}</span>
            )}
          </div>
          <div className={styles.ownerInfield}>
            <input
              type="text"
              placeholder="জন্ম তারিখ (YYYY-MM-DD)"
              id="owner_date_of_birth"
              name="owner_date_of_birth"
              pattern="\d{4}-\d{2}-\d{2}"
              value={formData.owner_date_of_birth}
              onChange={handleInputChange}
            />
            {errors.owner_date_of_birth && (
              <span className={styles.ownerError}>{errors.owner_date_of_birth}</span>
            )}
          </div>
          <div className={styles.ownerInfield}>
            <input
              type="text"
              placeholder="বর্তমান ঠিকানা : বাড়ি নং"
              name="owner_houseNo"
              id="owner_houseNo"
              value={formData.owner_houseNo}
              onChange={handleInputChange}
            />
            {errors.owner_houseNo && (
              <span className={styles.ownerError}>{errors.owner_houseNo}</span>
            )}
          </div>
          <div className={styles.ownerInfield}>
            <input
              type="text"
              placeholder="বর্তমান ঠিকানা : পোস্টাল কোড"
              id="owner_postalCode"
              name="owner_postalCode"
              value={formData.owner_postalCode}
              onChange={handleInputChange}
            />
            {errors.owner_postalCode && (
              <span className={styles.ownerError}>{errors.owner_postalCode}</span>
            )}
          </div>
          <div className={styles.ownerInfield}>
            <input
              type="text"
              placeholder="বর্তমান ঠিকানা : জেলা"
              id="owner_address"
              name="owner_address"
              value={formData.owner_address}
              onChange={handleInputChange}
            />
            {errors.owner_address && (
              <span className={styles.ownerError}>{errors.owner_address}</span>
            )}
          </div>
          {/* Add more input fields here as needed */}
          <button type="submit" className={styles.ownerButton}>
            নিবন্ধন
          </button>
          <span className={styles.ownerPrevReg}>
            পূর্বে রেজিস্ট্রেশন করেছেন?{" "}
            <a href="#d" className={styles.ownerRegIgnore}>
              এড়িয়ে যান
            </a>
          </span>
        </form>
      </div>
      <div className={`${styles["ownerOverlayContainer"]}`} id="overlayCon">
        <div className={styles.ownerOverlay}>
          <div
            className={`${styles["ownerOverlayPanel"]} ${styles["ownerOverlayRight"]}`}
          >
            <div className={styles["ownerFormImage"]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerRegistration;