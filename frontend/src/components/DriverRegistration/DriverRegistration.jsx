import React, { useState } from "react";
import styles from "./DriverRegistration.module.css"; // Keep the import path as-is
import driverRegistrationValidation from "./DriverRegistrationValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DriverRegistration() {
  console.log("Rendering driverRegistration");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    driver_nid: "",
    driver_name: "",
    driver_date_of_birth: "",
    driver_houseNo: "",
    driver_postalCode: "",
    driver_address: "",
    driver_license_no: "",
  });

  const [errors, setErrors] = useState({
    driver_nid: "",
    driver_name: "",
    driver_date_of_birth: "",
    driver_houseNo: "",
    driver_postalCode: "",
    driver_address: "",
    driver_license_no: "",
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
    const validationErrors = driverRegistrationValidation(formData);
    setErrors(validationErrors);

    console.log(validationErrors);

    // Use async/await to ensure state is updated

    // Check for specific error conditions
  if (
    validationErrors.driver_nid === "" &&
    validationErrors.driver_name === "" &&
    validationErrors.driver_date_of_birth === "" &&
    validationErrors.driver_houseNo === "" &&
    validationErrors.driver_postalCode === "" &&
    validationErrors.driver_address === "" &&
    validationErrors.driver_license_no === ""
  ) {
    try {
      axios
        .post("http://localhost:3001/DriverRegistration", formData)
        .then((res) => {
          if (res.data === "driver_registration_success") {
            navigate("/");
            alert("আপনি সফলভাবে ড্রাইভার নিবন্ধন করেছেন");
          } else if (res.data === "nid_exists") {
            alert("এই এনআইডি নাম্বারটি ইতিমধ্যে ব্যবহার করা হয়েছে");
            navigate("/DriverRegistration");
          } else if (res.data === "license_no_exists") {
            alert("ড্রাইভিং লাইসেন্স নাম্বারটি ইতিমধ্যে ব্যবহার করা হয়েছে");
            navigate("/DriverRegistration");
          } else {
            alert("নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
          }
        });
    } catch (error) {
      alert("ড্রাইভার নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
    }
  } else {
    // Display an error message based on the first encountered error
    const errorMessages = Object.values(validationErrors).filter((error) => error !== "");
    if (errorMessages.length > 0) {
      alert("ড্রাইভার নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
    } else {
      alert("ড্রাইভার নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
    }
  }
};

  return (
    <div className={styles.RegistrationScreen}>
      <div className={styles.driverContainer} id="driverContainer">
        <div
          className={`${styles["driverFormContainer"]} ${styles["driverSignUpContainer"]}`}
        >
          <form className={styles.driverForm} onSubmit={handleSubmit}>
            <h1 className={styles.driverHead}>ড্রাইভার নিবন্ধন ফর্ম</h1>
            
            <div className={styles.driverInfield}>
              <input className={styles.driverInput}
                type="text"
                placeholder="ড্রাইভারের নাম"
                id="driver_name"
                name="driver_name"
                value={formData.driver_name}
                onChange={handleInputChange}
              />
              {errors.driver_name && (
                <span className={styles.driverError}>{errors.driver_name}</span>
              )}
            </div>
            <div className={styles.driverInfield}>
              <input className={styles.driverInput}
                type="text"
                placeholder="জাতীয় পরিচয়পত্র নম্বর"
                id="driver_nid"
                name="driver_nid"
                value={formData.driver_nid}
                onChange={handleInputChange}
              />
              {errors.driver_nid && (
                <span className={styles.driverError}>{errors.driver_nid}</span>
              )}
            </div>
            <div className={styles.driverInfield}>
              <input className={styles.driverInput}
                type="text"
                placeholder="ড্রাইভিং লাইসেন্স নম্বর"
                id="driver_license_no"
                name="driver_license_no"
                value={formData.driver_license_no}
                onChange={handleInputChange}
              />
              {errors.driver_license_no && (
                <span className={styles.driverError}>{errors.driver_license_no}</span>
              )}
            </div>
            <div className={styles.driverInfield}>
              <input className={styles.driverInput}
                type="text"
                placeholder="জন্ম তারিখ (YYYY-MM-DD)"
                id="driver_date_of_birth"
                name="driver_date_of_birth"
                pattern="\d{4}-\d{2}-\d{2}"
                value={formData.driver_date_of_birth}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={handleInputChange}
              />
              {errors.driver_date_of_birth && (
                <span className={styles.driverError}>
                  {errors.driver_date_of_birth}
                </span>
              )}
            </div>
            <div className={styles.driverInfield}>
              <input className={styles.driverInput}
                type="text"
                placeholder="বর্তমান ঠিকানা : বাড়ি নং"
                name="driver_houseNo"
                id="driver_houseNo"
                value={formData.driver_houseNo}
                onChange={handleInputChange}
              />
              {errors.driver_houseNo && (
                <span className={styles.driverError}>
                  {errors.driver_houseNo}
                </span>
              )}
            </div>
            <div className={styles.driverInfield}>
              <input className={styles.driverInput}
                type="text"
                placeholder="বর্তমান ঠিকানা : পোস্টাল কোড"
                id="driver_postalCode"
                name="driver_postalCode"
                value={formData.driver_postalCode}
                onChange={handleInputChange}
              />
              {errors.driver_postalCode && (
                <span className={styles.driverError}>
                  {errors.driver_postalCode}
                </span>
              )}
            </div>
            <div className={styles.driverInfield}>
  <select className={styles.driverSelect}
    id="driver_address"
    name="driver_address"
    value={formData.driver_address}
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
  {errors.driver_address && (
    <span className={styles.driverError}>
      {errors.driver_address}
    </span>
  )}
</div>


            <button type="submit" className={styles.driverButton}>
              নিবন্ধন
            </button>
            <span className={styles.driverPrevReg}>
              পূর্বে রেজিস্ট্রেশন করেছেন?{" "}
              <a href="#d" className={styles.driverRegIgnore}>
                এড়িয়ে যান
              </a>
            </span>
          </form>
        </div>
        <div className={`${styles["driverOverlayContainer"]}`} id="overlayCon">
          <div className={styles.driverOverlay}>
            <div
              className={`${styles["driverOverlayPanel"]} ${styles["driverOverlayRight"]}`}
            >
              <div className={styles["driverFormImage"]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverRegistration;
