import React, { useState, useEffect } from "react";
import styles from "./OwnerRegistration.module.css"; // Keep the import path as-is
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function OwnerRegistration() {
  console.log("Rendering ownerRegistration");
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
    owner_tradeLicenseNo: "",
    owner_insuranceNo: "",
  });



  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

   
      try {
        console.log("herhr");
        // Use owner_number as the parameter name
        axios.put(`http://localhost:3001/PermitOwner/${id}`, formData)
          .then((res) => {
            console.log(res);
            if (res.data === "permit_success") {
              alert("আপনি সফলভাবে মালিক অনুমোদন করেছেন");
              navigate("/owner");
            }
            // Redirect to the owner list page after successful update
            else {
              alert("অনুমোদন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
            }
          })
          .catch((err) => {
            alert("অনুমোদন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
            // Handle errors, e.g., display an error message to the user
          });
      } catch (error) {
        alert("অনুমোদন ব্যর্থ হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন");
      }
    
  };
  const handleReject = () => {
    // Add logic to navigate to the UnauthorizedOwner route
   navigate('/UnauthorizedOwner'); // Navigate to the desired route
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

  const [formImage, setFormImage] = useState(null);

  const captureFormAsImage = () => {
    const element = document.getElementById("ownerContainer");

    html2canvas(element).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      setFormImage(dataURL);
    });
  };

  const convertImageToPDF = () => {
    if (formImage) {
      // Define a custom page size (e.g., 50x50)
      const customPageSize = {
        width: 80,
        height: 80,
      };

      const pdf = new jsPDF({
        orientation: "landscape", // Set PDF orientation to landscape
        unit: "mm", // Use millimeters as units
        format: [customPageSize.width, customPageSize.height], // Set the custom page size
      });

      // Calculate the X and Y coordinates to center the image
      const imgWidth = 70; // Adjust the image width as needed
      const imgHeight = (imgWidth * customPageSize.height) / customPageSize.width;
      const x = (customPageSize.width - imgWidth) / 2;
      const y = (customPageSize.height - imgHeight) / 2;

      pdf.addImage(formImage, "JPEG", x, y, imgWidth, imgHeight);

      pdf.save("owner_form.pdf");
    }
  };
  const handleCaptureAndConvert = () => {
    captureFormAsImage();
    convertImageToPDF();
  };
  return (
    <div className={styles.RegistrationScreen}>
      <div className={styles.ownerContainer} id="ownerContainer">
        <div
          className={`${styles["ownerFormContainer"]} ${styles["ownerSignUpContainer"]}`}
        >
          <form className={styles.ownerForm}>
          <div className={styles.permitButtonContainer}>
          <h1 className={styles.ownerHead}>মালিক অনুমোদন ফর্ম</h1>
          
                  <button type="button" className={styles.printOwnerButton} onClick={handleCaptureAndConvert}>
                  অনুমোদন দিন
                </button>
          </div>
            
  
          <div className={styles.ownerContent} id="ownerContent">
             <div className={styles.ownerInfield}>
              <div className={styles.ownerPair}>
                <p className={styles.ownerParagraph}>মালিকের নাম : প্রথম অংশ</p>
                <input
                  className={styles.ownerInput}
                  type="text"
                  id="owner_firstName"
                  name="owner_firstName"
                  value={formData.owner_firstName}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
  
              <div className={styles.ownerPair}>
                <p className={styles.ownerParagraph}>মালিকের নাম : শেষ অংশ</p>
                <input
                  className={styles.ownerInput}
                  type="text"
                  id="owner_lastName"
                  name="owner_lastName"
                  value={formData.owner_lastName}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
            </div>

            <div className={styles.ownerInfield}>
              <div className={styles.ownerPair}>
                <p className={styles.ownerParagraph}>জাতীয় পরিচয়পত্র নম্বর</p>
                <input
                  className={styles.ownerInput}
                  type="text"
                  id="owner_nid"
                  name="owner_nid"
                  value={formData.owner_nid}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className={styles.ownerPair}>
                <p className={styles.ownerParagraph}>ট্রেড লাইসেন্স নং</p>
                <input
                  className={styles.ownerInput}
                  type="text"
                  id="owner_tradeLicenseNo"
                  name="owner_tradeLicenseNo"
                  value={formData.owner_tradeLicenseNo}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
             
            
            </div>

            <div className={styles.ownerInfield}>
              
            <div className={styles.ownerPair}>
                <p className={styles.ownerParagraph}>ইনস্যুরেন্স নং</p>
                <input
                  className={styles.ownerInput}
                  type="text"
                  id="owner_insuranceNo"
                  name="owner_insuranceNo"
                  value={formData.owner_insuranceNo}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className={styles.ownerPair}>
                <p className={styles.ownerParagraph}>জন্ম তারিখ (YYYY-MM-DD)</p>
                <input
                  className={styles.ownerInput}
                  type="text"
                  id="owner_date_of_birth"
                  name="owner_date_of_birth"
                  value={formData.owner_date_of_birth}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              
            </div>

            <div className={styles.ownerInfield}>
            <div className={styles.ownerPair}>
                <p className={styles.ownerParagraph}>বর্তমান ঠিকানা</p>
                <input
                  className={styles.ownerInput}
                  type="text"
                  id="owner_houseNo"
                  name="owner_houseNo"
                  value={formData.owner_houseNo}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
            <div className={styles.ownerPair}>
                <p className={styles.ownerParagraph}>পোস্টাল কোড</p>
                <input
                  className={styles.ownerInput}
                  type="text"
                  id="owner_postalCode"
                  name="owner_postalCode"
                  value={formData.owner_postalCode}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
             
            </div>
            <div className={styles.ownerInfield}>
             
             
               <div className={styles.ownerPair}>
                 <p className={styles.ownerParagraph}>জেলা</p>
                 <input
                   className={styles.ownerInput}
                   type="text"
                   id="owner_address"
                   name="owner_address"
                   value={formData.owner_address}
                   onChange={handleInputChange}
                   readOnly
                 />
               </div>
             </div>
            </div>

          <div className={styles.permitButtonContainer}>
            <button type="submit" className={styles.permitOwnerButton} onClick={handleSubmit}>
              অনুমোদন দিন
            </button>
            <button type="submit" className={styles.notpermitOwnerButton} onClick={handleReject}>
              এড়িয়ে যান
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

}


export default OwnerRegistration;