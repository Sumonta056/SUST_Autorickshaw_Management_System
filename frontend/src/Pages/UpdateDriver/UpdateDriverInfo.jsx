import React, { useState, useEffect } from "react";
import styles from "./UpdateDriverInfo.module.css"; // Keep the import path as-is
import UpdateDriverInfoValidation from "./UpdateDriverInfoValidation";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateDriverInfo() {
  console.log("Rendering UpdateDriverInfo");
  const navigate = useNavigate();
  const { id } = useParams();

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
    const validationErrors = UpdateDriverInfoValidation(formData);
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
        console.log(formData);
        console.log(id);
        axios
          .put(`http://localhost:3001/updateDriver/` + id, formData)
          .then((res) => {
            console.log(res);
            if (res.data === "success") {
              alert("আপনি সফলভাবে ড্রাইভারের তথ্য হালনাগাদ করেছেন");
              navigate("/driver");
            }
            // Redirect to the driver list page after successful update
            else {
              alert("হালনাগাদ ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
            }
          })
          .catch((err) => {
            alert("হালনাগাদ ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
            // Handle errors, e.g., display an error message to the user
          });
      } catch (error) {
        alert("হালনাগাদ ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      }
    } else {
      // Display an error message based on the first encountered error
      const errorMessages = Object.values(validationErrors).filter(
        (error) => error !== ""
      );
      if (errorMessages.length > 0) {
        alert("হালনাগাদ ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      } else {
        alert("হালনাগাদ ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      }
    }
  };

  useEffect(() => {
    // Fetch data from MySQL using driver_nid
    axios
      .get(`http://localhost:3001/api/drivers/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching driver data: ", error);
      });
  }, [id]);

  return (
    <div className={styles.RegistrationScreen}>
      <div className={styles.updateDriverContainer} id="driverContainer">
        <div
          className={`${styles["updateDriverFormContainer"]} ${styles["updateDriverSignUpContainer"]}`}
        >
          <form onSubmit={handleSubmit}>

            <div className={styles.updateDriverInfield}>
              <p className={styles.updateDriverParagraph}>ড্রাইভারের নাম</p>
              <input
                type="text"
                
                id="driver_name"
                name="driver_name"
                value={formData.driver_name}
                onChange={handleInputChange}
              />
              {errors.driver_name && (
                <span className={styles.updateDriverError}>{errors.driver_name}</span>
              )}
            </div>
            <div className={styles.updateDriverInfield}>
            <p className={styles.updateDriverParagraph}>জাতীয় পরিচয়পত্র নম্বর</p>
              <input
                type="text"
                
                id="driver_nid"
                name="driver_nid"
                value={formData.driver_nid}
                onChange={handleInputChange}
              />
              {errors.driver_nid && (
                <span className={styles.updateDriverError}>{errors.driver_nid}</span>
              )}
            </div>
            <div className={styles.updateDriverInfield}>
               <p className={styles.updateDriverParagraph}>ড্রাইভিং লাইসেন্স নম্বর</p>
              <input
                type="text"
                
                id="driver_license_no"
                name="driver_license_no"
                value={formData.driver_license_no}
                onChange={handleInputChange}
              />
              {errors.driver_license_no && (
                <span className={styles.updateDriverError}>
                  {errors.driver_license_no}
                </span>
              )}
            </div>
            <div className={styles.updateDriverInfield}>
              <p className={styles.updateDriverParagraph}>জন্ম তারিখ (YYYY-MM-DD)</p>
              <input
                type="text"
                
                id="driver_date_of_birth"
                name="driver_date_of_birth"
                pattern="\d{4}-\d{2}-\d{2}"
                value={formData.driver_date_of_birth}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={handleInputChange}
              />
              {errors.driver_date_of_birth && (
                <span className={styles.updateDriverError}>
                  {errors.driver_date_of_birth}
                </span>
              )}
            </div>
            <div className={styles.updateDriverInfield}>
              <p className={styles.updateDriverParagraph}>বর্তমান ঠিকানা : বাড়ি নং</p>
              <input
                type="text"
                
                name="driver_houseNo"
                id="driver_houseNo"
                value={formData.driver_houseNo}
                onChange={handleInputChange}
              />
              {errors.driver_houseNo && (
                <span className={styles.updateDriverError}>
                  {errors.driver_houseNo}
                </span>
              )}
            </div>
            <div className={styles.updateDriverInfield}>
              <p className={styles.updateDriverParagraph}>বর্তমান ঠিকানা : পোস্টাল কোড</p>
              <input
                type="text"
                
                id="driver_postalCode"
                name="driver_postalCode"
                value={formData.driver_postalCode}
                onChange={handleInputChange}
              />
              {errors.driver_postalCode && (
                <span className={styles.updateDriverError}>
                  {errors.driver_postalCode}
                </span>
              )}
            </div>
            <div className={styles.updateDriverInfield}>
              <p className={styles.updateDriverParagraph}>বর্তমান ঠিকানা : জেলা</p>
              <select
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
                <span className={styles.updateDriverError}>
                  {errors.driver_address}
                </span>
              )}
            </div>

            <button type="submit" className={styles.updateDriverButton}>
             হালনাগাদ করুন 
            </button>
            
          </form>
        </div>
        <div className={`${styles["updateDriverOverlayContainer"]}`} id="overlayCon">
          <div className={styles.updateDriverOverlay}>
            <div
              className={`${styles["updateDriverOverlayPanel"]} ${styles["updateDriverOverlayRight"]}`}
            ><h1>ড্রাইভারের তথ্য হালনাগাদ ফর্ম</h1>
              <div className={styles["updateDriverFormImage"]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateDriverInfo;