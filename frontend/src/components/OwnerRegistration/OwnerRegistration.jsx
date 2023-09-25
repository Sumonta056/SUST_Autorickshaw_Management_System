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
      validationErrors.owner_postalCode === "" &&
      validationErrors.owner_address === ""
    ) {
      try {
        axios
          .post("http://localhost:3001/OwnerRegistration", formData)
          .then((res) => {
            if (res.data === "owner_registration_success") {
              navigate("/");
              alert("আপনি সফলভাবে মালিক নিবন্ধন করেছেন");
            } else if (res.data === "nid_exists") {
              alert("আপনার এনআইডি নম্বরটি ইতিমধ্যে ব্যবহার করা হয়েছে");
              navigate("/OwnerRegistration");
            } else {
              alert("নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
            }
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
    <div className={styles.RegistrationScreen}>
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
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={handleInputChange}
              />
              {errors.owner_date_of_birth && (
                <span className={styles.ownerError}>
                  {errors.owner_date_of_birth}
                </span>
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
                <span className={styles.ownerError}>
                  {errors.owner_houseNo}
                </span>
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
                <span className={styles.ownerError}>
                  {errors.owner_postalCode}
                </span>
              )}
            </div>
            <div className={styles.ownerInfield}>
  <select
    id="owner_address"
    name="owner_address"
    value={formData.owner_address}
    onChange={handleInputChange}
  >
    <option value="">বর্তমান ঠিকানা : জেলা</option>
    <option value="Dhaka">Dhaka</option>
    <option value="Chattogram">Chattogram</option>
    <option value="Sylhet">Sylhet</option>
    <option value="Khulna">Khulna</option>
    <option value="Rajshahi">Rajshahi</option>
    <option value="Barishal">Barishal</option>
    <option value="Mymensingh">Mymensingh</option>
    <option value="Khagrachari">Khagrachari</option>
    <option value="Kishoreganj">Kishoreganj</option>
    <option value="Faridpur">Faridpur</option>
    <option value="Pabna">Pabna</option>
    <option value="Magura">Magura</option>
    <option value="Munshiganj">Munshiganj</option>
    <option value="Madaripur">Madaripur</option>
    <option value="Pirojpur">Pirojpur</option>
    <option value="Jhalokathi">Jhalokathi</option>
    <option value="Bhola">Bhola</option>
    <option value="Patuakhali">Patuakhali</option>
    <option value="Barguna">Barguna</option>
    <option value="Shariatpur">Shariatpur</option>
    <option value="Narayanganj">Narayanganj</option>
    <option value="Narail">Narail</option>
    <option value="Jhenaidah">Jhenaidah</option>
    <option value="Chuadanga">Chuadanga</option>
    <option value="Meherpur">Meherpur</option>
    <option value="Gopalganj">Gopalganj</option>
    <option value="Rajbari">Rajbari</option>
    <option value="Sherpur">Sherpur</option>
    <option value="Kushtia">Kushtia</option>
    <option value="Tangail">Tangail</option>
    <option value="Kurigram">Kurigram</option>
    <option value="Lalmonirhat">Lalmonirhat</option>
    <option value="Gaibandha">Gaibandha</option>
    <option value="Thakurgaon">Thakurgaon</option>
    <option value="Panchagarh">Panchagarh</option>
    <option value="Dinajpur">Dinajpur</option>
    <option value="Nilphamari">Nilphamari</option>
    <option value="Pattan">Pattan</option>
    <option value="Chapainawabganj">Chapainawabganj</option>
    <option value="Joypurhat">Joypurhat</option>
    <option value="Naogaon">Naogaon</option>
    <option value="Bogura">Bogura</option>
    <option value="Pabna">Pabna</option>
    <option value="Sirajganj">Sirajganj</option>
    <option value="Nowabganj">Nowabganj</option>
    <option value="Mymensingh">Mymensingh</option>
    <option value="Jamalpur">Jamalpur</option>
    <option value="Netrokona">Netrokona</option>
    <option value="Sherpur">Sherpur</option>
    <option value="Sunamganj">Sunamganj</option>
    <option value="Habiganj">Habiganj</option>
    <option value="Moulvibazar">Moulvibazar</option>
    <option value="Habiganj">Habiganj</option>
    <option value="Sylhet">Sylhet</option>
    <option value="Kushtia">Kushtia</option>
    <option value="Meherpur">Meherpur</option>
    <option value="Chuadanga">Chuadanga</option>
    <option value="Khulna">Khulna</option>
    <option value="Satkhira">Satkhira</option>
    <option value="Jessore">Jessore</option>
    <option value="Narail">Narail</option>
    <option value="Bagerhat">Bagerhat</option>
    <option value="Patuakhali">Patuakhali</option>
  </select>
  {errors.owner_address && (
    <span className={styles.ownerError}>
      {errors.owner_address}
    </span>
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
    </div>
  );
}

export default OwnerRegistration;
