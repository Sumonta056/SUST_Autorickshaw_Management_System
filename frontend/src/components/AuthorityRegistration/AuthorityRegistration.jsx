import React, { useState } from "react";
import styles from "../AuthorityRegistration/AuthorityRegistration.module.css"; // Keep the import path as-is
import AuthorityRegistrationValidation from "./AuthorityRegistrationValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthorityRegistration() {
  console.log("Rendering AuthorityRegistration");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Authority_nid: "",
    Authority_firstName: "",
    Authority_lastName: "",
    Authority_date_of_birth: "",
    Authority_houseNo: "",
    Authority_postalCode: "",
    Authority_address: "",
  });

  const [errors, setErrors] = useState({
    Authority_nid: "",
    Authority_firstName: "",
    Authority_lastName: "",
    Authority_date_of_birth: "",
    Authority_houseNo: "",
    Authority_postalCode: "",
    Authority_address: "",
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
    const validationErrors = AuthorityRegistrationValidation(formData);
    setErrors(validationErrors);

    console.log(validationErrors);

    // Use async/await to ensure state is updated

    if (
      validationErrors.Authority_nid === "" &&
      validationErrors.Authority_firstName === "" &&
      validationErrors.Authority_lastName === "" &&
      validationErrors.Authority_date_of_birth === "" &&
      validationErrors.Authority_houseNo === "" &&
      validationErrors.Authority_postalCode === "" &&
      validationErrors.Authority_address === ""
    ) {
      try {
        console.log(formData.Authority_houseNo);
        axios
          .post("http://localhost:3001/AuthorityRegistration", formData)
          .then((res) => {
            if (res.data === "Authority_registration_success") {
              navigate("/");
              alert("আপনি সফলভাবে ম্যানেজার নিবন্ধন করেছেন");
            } else if (res.data === "nid_exists") {
              alert("আপনার এনআইডি নম্বরটি ইতিমধ্যে ব্যবহার করা হয়েছে");
              navigate("/AuthorityRegistration");
            } else {
              alert("নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
            }
          });
      } catch (error) {
        alert("ম্যানেজার নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      }
    } else {
      // Display an error message to the user
      alert("নিবন্ধন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
    }
  };

  return (
    <div className={styles.RegistrationScreen}>
      <div className={styles.AuthorityContainer}>
        <div className={styles.AuthorityFormContainer} id="AuthorityFormContainer">
          <form className={styles.AuthorityForm} onSubmit={handleSubmit}>
            <h1 className={styles.AuthorityHead}>ম্যানেজারের নিবন্ধন ফর্ম</h1>
            <div className={styles.AuthorityInfield}>
              <p className={styles.AuthorityParagraph}>
                ম্যানেজারের নাম : প্রথম অংশ
              </p>
              <input
                type="text"
                id="Authority_firstName"
                name="Authority_firstName"
                value={formData.Authority_firstName}
                onChange={handleInputChange}
              />
              {errors.Authority_firstName && (
                <span className={styles.AuthorityError}>
                  {errors.Authority_firstName}
                </span>
              )}
            </div>
            <div className={styles.AuthorityInfield}>
              <p className={styles.AuthorityParagraph}>
                ম্যানেজারের নাম : শেষ অংশ
              </p>
              <input
                type="text"
                id="Authority_lastName"
                name="Authority_lastName"
                value={formData.Authority_lastName}
                onChange={handleInputChange}
              />
              {errors.Authority_lastName && (
                <span className={styles.AuthorityError}>
                  {errors.Authority_lastName}
                </span>
              )}
            </div>
            <div className={styles.AuthorityInfield}>
              <p className={styles.AuthorityParagraph}>জাতীয় পরিচয়পত্র নম্বর</p>
              <input
                type="text"
                id="Authority_nid"
                name="Authority_nid"
                value={formData.Authority_nid}
                onChange={handleInputChange}
              />
              {errors.Authority_nid && (
                <span className={styles.AuthorityError}>
                  {errors.Authority_nid}
                </span>
              )}
            </div>
            <div className={styles.AuthorityInfield}>
              <p className={styles.AuthorityParagraph}>জন্ম তারিখ (YYYY-MM-DD)</p>
              <input
                type="text"
                id="Authority_date_of_birth"
                name="Authority_date_of_birth"
                pattern="\d{4}-\d{2}-\d{2}"
                value={formData.Authority_date_of_birth}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={handleInputChange}
              />
              {errors.Authority_date_of_birth && (
                <span className={styles.AuthorityError}>
                  {errors.Authority_date_of_birth}
                </span>
              )}
            </div>
            <div className={styles.AuthorityInfield}>
              <p className={styles.AuthorityParagraph}>
                বর্তমান ঠিকানা
              </p>
              <input
                type="text"
                name="Authority_houseNo"
                id="Authority_houseNo"
                value={formData.Authority_houseNo}
                onChange={handleInputChange}
              />
              {errors.Authority_houseNo && (
                <span className={styles.AuthorityError}>
                  {errors.Authority_houseNo}
                </span>
              )}
            </div>
            <div className={styles.AuthorityInfield}>
              <p className={styles.AuthorityParagraph}>
                পোস্টাল কোড
              </p>
              <input
                type="text"
                id="Authority_postalCode"
                name="Authority_postalCode"
                value={formData.Authority_postalCode}
                onChange={handleInputChange}
              />
              {errors.Authority_postalCode && (
                <span className={styles.AuthorityError}>
                  {errors.Authority_postalCode}
                </span>
              )}
            </div>
            <div className={styles.AuthorityInfield}>
              <p className={styles.AuthorityParagraph}> জেলা</p>
              <select
                className={styles.AuthoritySelect}
                id="Authority_address"
                name="Authority_address"
                value={formData.Authority_address}
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
              {errors.Authority_address && (
                <span className={styles.AuthorityError}>
                  {errors.Authority_address}
                </span>
              )}
            </div>

            <button type="submit" className={styles.AuthorityButton}>
              নিবন্ধন
            </button>
          </form>
        </div>
        <div className={styles.AuthorityOverlayContainer} id="overlayCon">
          <div className={styles.AuthorityOverlay}>
            <div
              className={`${styles.AuthorityOverlayPanel} ${styles.AuthorityOverlayRight}`}
            >
              <div className={styles.AuthorityFormImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorityRegistration;
