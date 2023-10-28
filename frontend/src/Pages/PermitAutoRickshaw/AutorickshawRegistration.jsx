import React, { useState, useEffect } from "react";
import styles from "./AutorickshawRegistration.module.css"; // Keep the import path as-is
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function AutorickshawRegistration() {
  console.log("Rendering autorickshawRegistration");
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    autorickshaw_number: "",
    autorickshaw_company: "",
    vehicle_registration_number: "",
    chassis_number: "",
    engine_number: "",
    autorickshaw_model: "",
    driver_nid: "",
    owner_nid: "",
    autorickshaw_status:"",
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
        // Use autorickshaw_number as the parameter name
        axios.put(`http://localhost:3001/PermitAutorickshaw/${id}`, formData)
          .then((res) => {
            console.log(res);
            if (res.data === "permit_success") {
              alert("আপনি সফলভাবে অটোরিকশাটি অনুমোদন  করেছেন");
              navigate("/autorickshaw");
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
    // Add logic to navigate to the UnauthorizedAutorickshaw route
   navigate('/UnauthorizedAutorickshaw'); // Navigate to the desired route
  };
   

  useEffect(() => {
    // Fetch data from MySQL using driver_nid
    axios
      .get(`http://localhost:3001/api/autorickshaw/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching driver data: ", error);
      });
  }, [id]);

  const [formImage, setFormImage] = useState(null);

  const captureFormAsImage = () => {
    const element = document.getElementById("autorickshawContainer");

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

      pdf.save("autorickshaw_form.pdf");
    }
  };
  const handleCaptureAndConvert = () => {
    captureFormAsImage();
    convertImageToPDF();
  };
  return (
    <div className={styles.RegistrationScreen}>
      <div className={styles.autorickshawContainer} id="autorickshawContainer">
        <div
          className={`${styles["autorickshawFormContainer"]} ${styles["autorickshawSignUpContainer"]}`}
        >
          <form className={styles.autorickshawForm}>
          <div className={styles.permitButtonContainer}>
          <h1 className={styles.autorickshawHead}>অটোরিকশা অনুমোদন ফর্ম</h1>
          
                  <button type="button" className={styles.printAutorickshawButton} onClick={handleCaptureAndConvert}>
                  অনুমোদন দিন
                </button>
          </div>
            
  
          <div className={styles.autorickshawContent} id="autorickshawContent">
             <div className={styles.autorickshawInfield}>
              <div className={styles.autorickshawPair}>
                <p className={styles.autorickshawParagraph}>অটোরিকশা নাম্বার</p>
                <input
                  className={styles.autorickshawInput}
                  type="text"
                  id="autorickshaw_number"
                  name="autorickshaw_number"
                  value={formData.autorickshaw_number}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
  
              <div className={styles.autorickshawPair}>
                <p className={styles.autorickshawParagraph}>অটোরিকশা কোম্পানি</p>
                <input
                  className={styles.autorickshawInput}
                  type="text"
                  id="autorickshaw_company"
                  name="autorickshaw_company"
                  value={formData.autorickshaw_company}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
            </div>
  
        
          
        
          <div className={styles.autorickshawInfield}>
              <div className={styles.autorickshawPair}>
                <p className={styles.autorickshawParagraph}>
                  গাড়ির নিবন্ধন নাম্বার
                </p>
                <input
                  className={styles.autorickshawInput}
                  type="text"
                  id="vehicle_registration_number"
                  name="vehicle_registration_number"
                  value={formData.vehicle_registration_number}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
  
              <div className={styles.autorickshawPair}>
                <p className={styles.autorickshawParagraph}>চেসিস নাম্বার</p>
              <input
                className={styles.autorickshawInput}
                type="text"
                id="chassis_number"
                name="chassis_number"
                value={formData.chassis_number}
                onChange={handleInputChange}
                readOnly
              />
            </div>
          </div>

          <div className={styles.autorickshawInfield}>
            <div className={styles.autorickshawPair}>
              <p className={styles.autorickshawParagraph}>ইঞ্জিন নাম্বার</p>
              <input
                className={styles.autorickshawInput}
                type="text"
                id="engine_number"
                name="engine_number"
                value={formData.engine_number}
                onChange={handleInputChange}
                readOnly
              />
            </div>

            <div className={styles.autorickshawPair}>
              <p className={styles.autorickshawParagraph}>অটোরিকশা মডেল</p>
              <input
                className={styles.autorickshawInput}
                type="text"
                id="autorickshaw_model"
                name="autorickshaw_model"
                value={formData.autorickshaw_model}
                onChange={handleInputChange}
                readOnly
              />
            </div>
          </div>

          <div className={styles.autorickshawInfield}>
            <div className={styles.autorickshawPair}>
              <p className={styles.autorickshawParagraph}>
                মালিকের জাতীয় পরিচয়পত্র নম্বর
              </p>
              <input
                className={styles.autorickshawInput}
                type="text"
                id="owner_nid"
                name="owner_nid"
                value={formData.owner_nid}
                onChange={handleInputChange}
                readOnly
              />
            </div>

            <div className={styles.autorickshawPair}>
              <p className={styles.autorickshawParagraph}>
                ড্রাইভারের জাতীয় পরিচয়পত্র নম্বর
              </p>
              <input
                className={styles.autorickshawInput}
                type="text"
                id="driver_nid"
                name="driver_nid"
                value={formData.driver_nid}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            </div>
            </div>

          <div className={styles.permitButtonContainer}>
            <button type="submit" className={styles.permitAutorickshawButton} onClick={handleSubmit}>
              অনুমোদন দিন
            </button>
            <button type="submit" className={styles.notpermitAutorickshawButton} onClick={handleReject}>
              এড়িয়ে যান
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

}


export default AutorickshawRegistration;