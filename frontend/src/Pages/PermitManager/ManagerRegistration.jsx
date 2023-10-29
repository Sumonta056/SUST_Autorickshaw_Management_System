import React, { useState, useEffect } from "react";
import styles from "./ManagerRegistration.module.css"; // Keep the import path as-is
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ManagerRegistration() {
  console.log("Rendering managerRegistration");
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
        // Use manager_number as the parameter name
        axios.put(`http://localhost:3001/PermitManager/${id}`, formData)
          .then((res) => {
            console.log(res);
            if (res.data === "permit_success") {
              alert("আপনি সফলভাবে ম্যানেজার অনুমোদন করেছেন");
              navigate("/manager");
            }
            // Redirect to the manager list page after successful update
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
    // Add logic to navigate to the UnauthorizedManager route
   navigate('/UnauthorizedManager'); // Navigate to the desired route
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

  const [formImage, setFormImage] = useState(null);

  const captureFormAsImage = () => {
    const element = document.getElementById("managerContainer");

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

      pdf.save("manager_form.pdf");
    }
  };
  const handleCaptureAndConvert = () => {
    captureFormAsImage();
    convertImageToPDF();
  };
  return (
    <div className={styles.RegistrationScreen}>
      <div className={styles.managerContainer} id="managerContainer">
        <div
          className={`${styles["managerFormContainer"]} ${styles["managerSignUpContainer"]}`}
        >
          <form className={styles.managerForm}>
          <div className={styles.permitButtonContainer}>
          <h1 className={styles.managerHead}>ম্যানেজার অনুমোদন ফর্ম</h1>
          
                  <button type="button" className={styles.printManagerButton} onClick={handleCaptureAndConvert}>
                  অনুমোদন দিন
                </button>
          </div>
            
  
          <div className={styles.managerContent} id="managerContent">
             <div className={styles.managerInfield}>
              <div className={styles.managerPair}>
                <p className={styles.managerParagraph}>ম্যানেজারের নাম : প্রথম অংশ</p>
                <input
                  className={styles.managerInput}
                  type="text"
                  id="manager_firstName"
                  name="manager_firstName"
                  value={formData.manager_firstName}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
  
              <div className={styles.managerPair}>
                <p className={styles.managerParagraph}>ম্যানেজারের নাম : শেষ অংশ</p>
                <input
                  className={styles.managerInput}
                  type="text"
                  id="manager_lastName"
                  name="manager_lastName"
                  value={formData.manager_lastName}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
            </div>

            <div className={styles.managerInfield}>
              <div className={styles.managerPair}>
                <p className={styles.managerParagraph}>জাতীয় পরিচয়পত্র নম্বর</p>
                <input
                  className={styles.managerInput}
                  type="text"
                  id="manager_nid"
                  name="manager_nid"
                  value={formData.manager_nid}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
              <div className={styles.managerPair}>
                <p className={styles.managerParagraph}>জন্ম তারিখ (YYYY-MM-DD)</p>
                <input
                  className={styles.managerInput}
                  type="text"
                  id="manager_date_of_birth"
                  name="manager_date_of_birth"
                  value={formData.manager_date_of_birth}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
             
            
            </div>

            <div className={styles.managerInfield}>
              
            
              
              
            </div>

            <div className={styles.managerInfield}>
            <div className={styles.managerPair}>
                <p className={styles.managerParagraph}>বর্তমান ঠিকানা</p>
                <input
                  className={styles.managerInput}
                  type="text"
                  id="manager_houseNo"
                  name="manager_houseNo"
                  value={formData.manager_houseNo}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
            <div className={styles.managerPair}>
                <p className={styles.managerParagraph}>পোস্টাল কোড</p>
                <input
                  className={styles.managerInput}
                  type="text"
                  id="manager_postalCode"
                  name="manager_postalCode"
                  value={formData.manager_postalCode}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
             
            </div>
            <div className={styles.managerInfield}>
             
             
               <div className={styles.managerPair}>
                 <p className={styles.managerParagraph}>জেলা</p>
                 <input
                   className={styles.managerInput}
                   type="text"
                   id="manager_address"
                   name="manager_address"
                   value={formData.manager_address}
                   onChange={handleInputChange}
                   readOnly
                 />
               </div>
             </div>
            </div>

          <div className={styles.permitButtonContainer}>
            <button type="submit" className={styles.permitManagerButton} onClick={handleSubmit}>
              অনুমোদন দিন
            </button>
            <button type="submit" className={styles.notpermitManagerButton} onClick={handleReject}>
              এড়িয়ে যান
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

}


export default ManagerRegistration;