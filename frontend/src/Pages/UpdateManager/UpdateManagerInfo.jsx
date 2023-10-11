import React, { useState, useEffect } from "react";
import styles from "./UpdateManagerInfo.module.css"; // Keep the import path as-is
import UpdateManagerInfoValidation from "./UpdateManagerInfoValidation";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateManagerInfo() {
  console.log("Rendering UpdateManagerInfo");
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    manager_nid: "",
    manager_firstName: "",
    manager_lastName: "",
    manager_date_of_birth: "",
    manager_houseNo: "",
    manager_postalCode: "",
    manager_address: "",
    manager_license_no: "",
  });

  const [errors, setErrors] = useState({
    manager_nid: "",
    manager_firstName: "",
    manager_lastName: "",
    manager_date_of_birth: "",
    manager_houseNo: "",
    manager_postalCode: "",
    manager_address: "",
    manager_license_no: "",
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
    const validationErrors = UpdateManagerInfoValidation(formData);
    setErrors(validationErrors);

    console.log(validationErrors);

    // Use async/await to ensure state is updated

    // Check for specific error conditions
    if (
      validationErrors.manager_nid === "" &&
      validationErrors.manager_firstName === "" &&
      validationErrors.manager_lastName === "" &&
      validationErrors.manager_date_of_birth === "" &&
      validationErrors.manager_houseNo === "" &&
      validationErrors.manager_postalCode === "" &&
      validationErrors.manager_address === "" &&
      validationErrors.manager_license_no === ""
    ) {
      try {
        console.log(formData);
        console.log(id);
        axios
          .put(`http://localhost:3001/updateManager/` + id, formData)
          .then((res) => {
            console.log(res);
            if (res.data === "success") {
              alert("আপনি সফলভাবে ম্যানেজারের তথ্য হালনাগাদ করেছেন");
              navigate("/manager");
            }
            // Redirect to the manager list page after successful update
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
    // Fetch data from MySQL using manager_nid
    axios
      .get(`http://localhost:3001/api/managers/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching manager data: ", error);
      });
  }, [id]);

  return (
    <div className={styles.RegistrationScreen}>
      <div className={styles.updateManagerContainer} id="managerContainer">
        <div
          className={`${styles["updateManagerFormContainer"]} ${styles["updateManagerSignUpContainer"]}`}
        >
          <form onSubmit={handleSubmit}>
            <h1>ম্যানেজারের তথ্য হালনাগাদ ফর্ম</h1>
            <div className={styles.updateManagerInfield}>
              <p className={styles.updateManagerParagraph}>
                ম্যানেজারের নাম : প্রথম অংশ
              </p>
              <input
                className={styles.updateManagerInput}
                type="text"
                id="manager_firstName"
                name="manager_firstName"
                value={formData.manager_firstName}
                onChange={handleInputChange}
              />
              {errors.manager_firstName && (
                <span className={styles.managerError}>
                  {errors.manager_firstName}
                </span>
              )}
            </div>
            <div className={styles.updateManagerInfield}>
              <p className={styles.updateManagerParagraph}>ম্যানেজারের নাম : শেষ অংশ</p>
              <input
                className={styles.updateManagerInput}
                type="text"
                id="manager_lastName"
                name="manager_lastName"
                value={formData.manager_lastName}
                onChange={handleInputChange}
              />
              {errors.manager_lastName && (
                <span className={styles.managerError}>
                  {errors.manager_lastName}
                </span>
              )}
            </div>
            <div className={styles.updateManagerInfield}>
              <p className={styles.updateManagerParagraph}>
                জাতীয় পরিচয়পত্র নম্বর
              </p>
              <input
                type="text"
                id="manager_nid"
                name="manager_nid"
                value={formData.manager_nid}
                onChange={handleInputChange}
              />
              {errors.manager_nid && (
                <span className={styles.updateManagerError}>
                  {errors.manager_nid}
                </span>
              )}
            </div>
            <div className={styles.updateManagerInfield}>
              <p className={styles.updateManagerParagraph}>
                ড্রাইভিং লাইসেন্স নম্বর
              </p>
              <input
                type="text"
                id="manager_license_no"
                name="manager_license_no"
                value={formData.manager_license_no}
                onChange={handleInputChange}
              />
              {errors.manager_license_no && (
                <span className={styles.updateManagerError}>
                  {errors.manager_license_no}
                </span>
              )}
            </div>
            <div className={styles.updateManagerInfield}>
              <p className={styles.updateManagerParagraph}>
                জন্ম তারিখ (YYYY-MM-DD)
              </p>
              <input
                type="text"
                id="manager_date_of_birth"
                name="manager_date_of_birth"
                pattern="\d{4}-\d{2}-\d{2}"
                value={formData.manager_date_of_birth}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={handleInputChange}
              />
              {errors.manager_date_of_birth && (
                <span className={styles.updateManagerError}>
                  {errors.manager_date_of_birth}
                </span>
              )}
            </div>
            <div className={styles.updateManagerInfield}>
              <p className={styles.updateManagerParagraph}>
                বর্তমান ঠিকানা 
              </p>
              <input
                type="text"
                name="manager_houseNo"
                id="manager_houseNo"
                value={formData.manager_houseNo}
                onChange={handleInputChange}
              />
              {errors.manager_houseNo && (
                <span className={styles.updateManagerError}>
                  {errors.manager_houseNo}
                </span>
              )}
            </div>
            <div className={styles.updateManagerInfield}>
              <p className={styles.updateManagerParagraph}>
               পোস্টাল কোড
              </p>
              <input
                type="text"
                id="manager_postalCode"
                name="manager_postalCode"
                value={formData.manager_postalCode}
                onChange={handleInputChange}
              />
              {errors.manager_postalCode && (
                <span className={styles.updateManagerError}>
                  {errors.manager_postalCode}
                </span>
              )}
            </div>
            <div className={styles.updateManagerInfield}>
              <p className={styles.updateManagerParagraph}>
                জেলা
              </p>
              <select className={styles.updateManagerSelect}
                id="manager_address"
                name="manager_address"
                value={formData.manager_address}
                onChange={handleInputChange}
              >
                <option value="">আপনার জেলা বাছাই করুন</option>
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
              {errors.manager_address && (
                <span className={styles.updateManagerError}>
                  {errors.manager_address}
                </span>
              )}
            </div>

            <button type="submit" className={styles.updateManagerButton}>
              হালনাগাদ করুন
            </button>
          </form>
        </div>
        <div
          className={`${styles["updateManagerOverlayContainer"]}`}
          id="overlayCon"
        >
          <div className={styles.updateManagerOverlay}>
            <div
              className={`${styles["updateManagerOverlayPanel"]} ${styles["updateManagerOverlayRight"]}`}
            >
              <div className={styles["updateManagerFormImage"]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateManagerInfo;
