import React, { useState, useEffect } from "react";
import styles from "./UpdateOwnerInfo.module.css"; // Keep the import path as-is
import UpdateOwnerInfoValidation from "./UpdateOwnerInfoValidation";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateOwnerInfo() {
  console.log("Rendering UpdateOwnerInfo");
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    owner_nid: "",
    owner_firstName: "",
    owner_lastName: "",
    owner_date_of_birth: "",
    owner_houseNo: "",
    owner_postalCode: "",
    owner_address: "",
    owner_tradeLicenseNo:"",
    owner_insuranceNo:"",
  });

  const [errors, setErrors] = useState({
    owner_nid: "",
    owner_firstName: "",
    owner_lastName: "",
    owner_date_of_birth: "",
    owner_houseNo: "",
    owner_postalCode: "",
    owner_address: "",
    owner_tradeLicenseNo:"",
    owner_insuranceNo:"",
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
    const validationErrors = UpdateOwnerInfoValidation(formData);
    setErrors(validationErrors);

    console.log(validationErrors);

    // Use async/await to ensure state is updated

    // Check for specific error conditions
    if (
      validationErrors.owner_nid === "" &&
      validationErrors.owner_firstName === "" &&
      validationErrors.owner_lastName === "" &&
      validationErrors.owner_date_of_birth === "" &&
      validationErrors.owner_houseNo === "" &&
      validationErrors.owner_postalCode === "" &&
      validationErrors.owner_tradeLicenseNo === "" &&
      validationErrors.owner_insuranceNo === "" &&
      validationErrors.owner_address === ""
    ) {
      try {
        console.log(formData);
        console.log(id);
        axios
          .put(`http://localhost:3001/updateOwner/` + id, formData)
          .then((res) => {
            console.log(res);
            if (res.data === "success") {
              alert("আপনি সফলভাবে মালিকের তথ্য হালনাগাদ করেছেন");
              navigate("/owner");
            }
            // Redirect to the owner list page after successful update
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
    // Fetch data from MySQL using owner_nid
    axios
      .get(`http://localhost:3001/api/owners/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching owner data: ", error);
      });
  }, [id]);

  return (
    <div className={styles.RegistrationScreen}>
      <div className={styles.updateOwnerContainer} id="ownerContainer">
        <div
          className={`${styles["updateOwnerFormContainer"]} ${styles["updateOwnerSignUpContainer"]}`}
        >
          <form className={styles.updateOwnerForm} onSubmit={handleSubmit}>
            <h1>মালিকের তথ্য হালনাগাদ ফর্ম</h1>
            <div className={styles.updateOwnerInfield}>
              <p className={styles.updateOwnerParagraph}>মালিকের নাম : প্রথম অংশ</p>
              <input
                type="text"
                id="owner_firstName"
                name="owner_firstName"
                value={formData.owner_firstName}
                onChange={handleInputChange}
              />
              {errors.owner_firstName && (
                <span className={styles.ownerError}>
                  {errors.owner_firstName}
                </span>
              )}
            </div>
            <div className={styles.updateOwnerInfield}>
              <p className={styles.updateOwnerParagraph}>মালিকের নাম : শেষ অংশ</p>
              <input
                type="text"
                id="owner_lastName"
                name="owner_lastName"
                value={formData.owner_lastName}
                onChange={handleInputChange}
              />
              {errors.owner_lastName && (
                <span className={styles.ownerError}>
                  {errors.owner_lastName}
                </span>
              )}
            </div>
            <div className={styles.updateOwnerInfield}>
              <p className={styles.updateOwnerParagraph}>
                জাতীয় পরিচয়পত্র নম্বর
              </p>
              <input
                type="text"
                id="owner_nid"
                name="owner_nid"
                value={formData.owner_nid}
                onChange={handleInputChange}
              />
              {errors.owner_nid && (
                <span className={styles.updateOwnerError}>
                  {errors.owner_nid}
                </span>
              )}
            </div>
            <div className={styles.updateOwnerInfield}>
              <p className={styles.updateOwnerParagraph}>
                জন্ম তারিখ (YYYY-MM-DD)
              </p>
              <input
                type="text"
                id="owner_date_of_birth"
                name="owner_date_of_birth"
                pattern="\d{4}-\d{2}-\d{2}"
                value={formData.owner_date_of_birth}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={handleInputChange}
              />
              {errors.owner_date_of_birth && (
                <span className={styles.updateOwnerError}>
                  {errors.owner_date_of_birth}
                </span>
              )}
            </div>
            <div className={styles.updateOwnerInfield}>
              <p className={styles.updateOwnerParagraph}>
                বর্তমান ঠিকানা  
              </p>
              <input
                type="text"
                name="owner_houseNo"
                id="owner_houseNo"
                value={formData.owner_houseNo}
                onChange={handleInputChange}
              />
              {errors.owner_houseNo && (
                <span className={styles.updateOwnerError}>
                  {errors.owner_houseNo}
                </span>
              )}
            </div>
            <div className={styles.updateOwnerInfield}>
              <p className={styles.updateOwnerParagraph}>
             পোস্টাল কোড
              </p>
              <input
                type="text"
                id="owner_postalCode"
                name="owner_postalCode"
                value={formData.owner_postalCode}
                onChange={handleInputChange}
              />
              {errors.owner_postalCode && (
                <span className={styles.updateOwnerError}>
                  {errors.owner_postalCode}
                </span>
              )}
            </div>
            <div className={styles.updateOwnerInfield}>
              <p className={styles.updateOwnerParagraph}>
                 জেলা
              </p>
              <select
                className={styles.updateOwnerSelect}
                id="owner_address"
                name="owner_address"
                value={formData.owner_address}
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
              {errors.owner_address && (
                <span className={styles.updateOwnerError}>
                  {errors.owner_address}
                </span>
              )}
            </div>
            <div className={styles.ownerInfield}>
  <p className={styles.ownerParagraph}>
    ট্রেড লাইসেন্স নং  
  </p>
  <input
    type="text"
    id="owner_tradeLicenseNo"
    name="owner_tradeLicenseNo"
    value={formData.owner_tradeLicenseNo}
    onChange={handleInputChange}
  />
  {errors.owner_tradeLicenseNo && (
    <span className={styles.ownerError}>
      {errors.owner_tradeLicenseNo}
    </span>
  )}
</div>

<div className={styles.ownerInfield}>
  <p className={styles.ownerParagraph}>
    ইনস্যুরেন্স নং 
  </p>
  <input
    type="text"
    id="owner_insuranceNo"
    name="owner_insuranceNo"
    value={formData.owner_insuranceNo}
    onChange={handleInputChange}
  />
  {errors.owner_insuranceNo && (
    <span className={styles.ownerError}>
      {errors.owner_insuranceNo}
    </span>
  )}
</div>


            <button type="submit" className={styles.updateOwnerButton}>
              হালনাগাদ করুন
            </button>
          </form>
        </div>
        <div
          className={`${styles["updateOwnerOverlayContainer"]}`}
          id="overlayCon"
        >
          <div className={styles.updateOwnerOverlay}>
            <div
              className={`${styles["updateOwnerOverlayPanel"]} ${styles["updateOwnerOverlayRight"]}`}
            >
              <div className={styles["updateOwnerFormImage"]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateOwnerInfo;
