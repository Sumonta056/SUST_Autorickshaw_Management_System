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
              alert("আপনার ইমেইল টি ইতিমধ্যে ব্যবহার করা হয়েছে");
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
                <option value="ঢাকা">ঢাকা (Dhaka)</option>
                <option value="চট্টগ্রাম">চট্টগ্রাম (Chattogram)</option>
                <option value="সিলেট">সিলেট (Sylhet)</option>
                <option value="খুলনা">খুলনা (Khulna)</option>
                <option value="রাজশাহী">রাজশাহী (Rajshahi)</option>
                <option value="বরিশাল">বরিশাল (Barishal)</option>
                <option value="ময়মনসিংহ">ময়মনসিংহ (Mymensingh)</option>
                <option value="খাগড়াছড়ি">খাগড়াছড়ি (Khagrachari)</option>
                <option value="কিশোরগঞ্জ">কিশোরগঞ্জ (Kishoreganj)</option>
                <option value="ফরিদপুর">ফরিদপুর (Faridpur)</option>
                <option value="পাবনা">পাবনা (Pabna)</option>
                <option value="মাগুরা">মাগুরা (Magura)</option>
                <option value="মুন্সিগঞ্জ">মুন্সিগঞ্জ (Munshiganj)</option>
                <option value="মাদারীপুর">মাদারীপুর (Madaripur)</option>
                <option value="পিরোজপুর">পিরোজপুর (Pirojpur)</option>
                <option value="ঝালকাঠি">ঝালকাঠি (Jhalokathi)</option>
                <option value="ভোলা">ভোলা (Bhola)</option>
                <option value="পটুয়াখালী">পটুয়াখালী (Patuakhali)</option>
                <option value="বরগুনা">বরগুনা (Barguna)</option>
                <option value="শরিয়তপুর">শরিয়তপুর (Shariatpur)</option>
                <option value="নরায়ণগঞ্জ">নরায়ণগঞ্জ (Narayanganj)</option>
                <option value="নারাইল">নারাইল (Narail)</option>
                <option value="ঝিনাইদহ">ঝিনাইদহ (Jhenaidah)</option>
                <option value="চুয়াডঙ্গা">চুয়াডঙ্গা (Chuadanga)</option>
                <option value="মেহেরপুর">মেহেরপুর (Meherpur)</option>
                <option value="গোপালগঞ্জ">গোপালগঞ্জ (Gopalganj)</option>
                <option value="রাজবাড়ী">রাজবাড়ী (Rajbari)</option>
                <option value="শেরপুর">শেরপুর (Sherpur)</option>
                <option value="কুষ্টিয়া">কুষ্টিয়া (Kushtia)</option>
                <option value="মাগুরা">মাগুরা (Magura)</option>
                <option value="টাঙ্গাইল">টাঙ্গাইল (Tangail)</option>
                <option value="কুড়িগ্রাম">কুড়িগ্রাম (Kurigram)</option>
                <option value="লালমনিরহাট">লালমনিরহাট (Lalmonirhat)</option>
                <option value="গাইবান্ধা">গাইবান্ধা (Gaibandha)</option>
                <option value="ঠাকুরগাঁও">ঠাকুরগাঁও (Thakurgaon)</option>
                <option value="পঞ্চগড়">পঞ্চগড় (Panchagarh)</option>
                <option value="দিনাজপুর">দিনাজপুর (Dinajpur)</option>
                <option value="নীলফামারী">নীলফামারী (Nilphamari)</option>
                <option value="পত্তন">পত্তন (Pattan)</option>
                <option value="চাপাইনবাব্য">
                  চাপাইনবাব্য (Chapainawabganj)
                </option>
                <option value="জয়পুরহাট">জয়পুরহাট (Joypurhat)</option>
                <option value="নাটোর">নাটোর (Naogaon)</option>
                <option value="বগুড়া">বগুড়া (Bogura)</option>
                <option value="পাবনা">পাবনা (Pabna)</option>
                <option value="সিরাজগঞ্জ">সিরাজগঞ্জ (Sirajganj)</option>
                <option value="নওগাঁ">নওগাঁ (Nowabganj)</option>
                <option value="ময়মনসিংহ">ময়মনসিংহ (Mymensingh)</option>
                <option value="জামালপুর">জামালপুর (Jamalpur)</option>
                <option value="নেত্রকোণা">নেত্রকোণা (Netrokona)</option>
                <option value="শেরপুর">শেরপুর (Sherpur)</option>
                <option value="সুনামগঞ্জ">সুনামগঞ্জ (Sunamganj)</option>
                <option value="হবিগঞ্জ">হবিগঞ্জ (Habiganj)</option>
                <option value="মৌলভীবাজার">মৌলভীবাজার (Moulvibazar)</option>
                <option value="হবিগঞ্জ">হবিগঞ্জ (Habiganj)</option>
                <option value="সিলেট">সিলেট (Sylhet)</option>
                <option value="কুষ্টিয়া">কুষ্টিয়া (Kushtia)</option>
                <option value="মেহেরপুর">মেহেরপুর (Meherpur)</option>
                <option value="চুয়াডঙ্গা">চুয়াডঙ্গা (Chuadanga)</option>
                <option value="খুলনা">খুলনা (Khulna)</option>
                <option value="সাতক্ষীরা">সাতক্ষীরা (Satkhira)</option>
                <option value="জেসোর">জেসোর (Jessore)</option>
                <option value="নড়াইল">নড়াইল (Narail)</option>
                <option value="বাগেরহাট">বাগেরহাট (Bagerhat)</option>
                <option value="পটুয়াখালী">পটুয়াখালী (Patuakhali)</option>
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
