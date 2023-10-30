import React, { useState, useEffect } from "react";
import styles from "./DriverRegistration.module.css"; // Keep the import path as-is
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Modal } from "antd";

function DriverRegistration() {
  console.log("Rendering driverRegistration");
  const navigate = useNavigate();
  const { id } = useParams();

  // Declare a state variable to control the button's visibility
  const [showButton, setShowButton] = useState(false);

  // Function to toggle the button's visibility
  const toggleButton = () => {
    setShowButton(true);
  };

  const [formData, setFormData] = useState({
    driver_nid: "",
    driver_firstName: "",
    driver_lastName: "",
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

    try {
      console.log("herhr");
      // Use driver_number as the parameter name
      axios
        .put(`http://localhost:3001/PermitDriver/${id}`, formData)
        .then((res) => {
          console.log(res);
          if (res.data === "permit_success") {
            // alert("আপনি সফলভাবে ড্রাইভার অনুমোদন  করেছেন");
            // navigate("/driver");

            Modal.success({
              title: "Successful!",
              content: "আপনি সফলভাবে ড্রাইভার অনুমোদন করেছেন",
              onOk: () => {
                toggleButton();
              },
            });
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
    // Add logic to navigate to the UnauthorizedDriver route
    navigate("/UnauthorizedDriver"); // Navigate to the desired route
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

  const [formImage, setFormImage] = useState(null);

  const captureFormAsImage = () => {
    const element = document.getElementById("driverContainer");

    html2canvas(element).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      setFormImage(dataURL);
    });
  };

  const convertImageToPDF = () => {
    if (formImage) {
      // Define a custom page size (e.g., 50x50)
      const customPageSize = {
        width: 250,
        height: 180,
      };

      const pdf = new jsPDF({
        orientation: "landscape", // Set PDF orientation to landscape
        unit: "mm", // Use millimeters as units
        format: [customPageSize.width, customPageSize.height], // Set the custom page size
      });

      // Calculate the X and Y coordinates to center the image
      const imgWidth = 250; // Adjust the image width as needed
      const imgHeight = 180;
      // (imgWidth * customPageSize.height) / customPageSize.width;
      const x = 0;
      const y = 0;
      // const x = (customPageSize.width - imgWidth) / 2;
      // const y = (customPageSize.height - imgHeight) / 2;

      pdf.addImage(formImage, "JPEG", x, y, imgWidth, imgHeight);

      pdf.save("driver_form.pdf");
    }
  };
  const handleCaptureAndConvert = () => {
    Modal.success({
      title: "Loading !",
      content: "অনুমোদনপত্র লোডিং হচ্ছে",
      onOk: () => {
        captureFormAsImage();
        convertImageToPDF();
      },
    });
  };
  return (
    <div className={styles.RegistrationScreen}>
      <div className={styles.driverContainer} id="driverContainer">
        <div
          className={`${styles["driverFormContainer"]} ${styles["driverSignUpContainer"]}`}
        >
          <form className={styles.driverForm}>
            <div className={styles.permitButtonContainer}>
              <h1 className={styles.driverHead}>ড্রাইভার অনুমোদন ফর্ম</h1>
            </div>

            <div className={styles.driverContent} id="driverContent">
              <div className={styles.driverInfield}>
                <div className={styles.driverPair}>
                  <p className={styles.driverParagraph}>
                    ড্রাইভারের নাম : প্রথম অংশ
                  </p>
                  <input
                    className={styles.driverInput}
                    type="text"
                    id="driver_firstName"
                    name="driver_firstName"
                    value={formData.driver_firstName}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>

                <div className={styles.driverPair}>
                  <p className={styles.driverParagraph}>
                    ড্রাইভারের নাম : শেষ অংশ
                  </p>
                  <input
                    className={styles.driverInput}
                    type="text"
                    id="driver_lastName"
                    name="driver_lastName"
                    value={formData.driver_lastName}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>

                <div className={styles.driverPair}>
                  <p className={styles.driverParagraph}>
                    জন্ম তারিখ (YYYY-MM-DD)
                  </p>
                  <input
                    className={styles.driverInput}
                    type="text"
                    id="driver_date_of_birth"
                    name="driver_date_of_birth"
                    value={formData.driver_date_of_birth}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>
              </div>

              <div className={styles.driverInfield}>
                <div className={styles.driverPair}>
                  <p className={styles.driverParagraph}>
                    জাতীয় পরিচয়পত্র নম্বর
                  </p>
                  <input
                    className={styles.driverInput}
                    type="text"
                    id="driver_nid"
                    name="driver_nid"
                    value={formData.driver_nid}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>

                <div className={styles.driverPair}>
                  <p className={styles.driverParagraph}>
                    ড্রাইভিং লাইসেন্স নম্বর
                  </p>
                  <input
                    className={styles.driverInput}
                    type="text"
                    id="driver_license_no"
                    name="driver_license_no"
                    value={formData.driver_license_no}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>
                <div className={styles.driverPair}>
                  <p className={styles.driverParagraph}>বর্তমান ঠিকানা</p>
                  <input
                    className={styles.driverInput}
                    type="text"
                    id="driver_houseNo"
                    name="driver_houseNo"
                    value={formData.driver_houseNo}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>
              </div>

              <div className={styles.driverInfield}>
                
                <div className={styles.driverPair}>
                  <p className={styles.driverParagraph}>পোস্টাল কোড</p>
                  <input
                    className={styles.driverInput}
                    type="text"
                    id="driver_postalCode"
                    name="driver_postalCode"
                    value={formData.driver_postalCode}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>

                <div className={styles.driverPair}>
                  <p className={styles.driverParagraph}>জেলা</p>
                  <input
                    className={styles.driverInput}
                    type="text"
                    id="driver_address"
                    name="driver_address"
                    value={formData.driver_address}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className={styles.permitButtonContainer}>
              <button
                type="submit"
                className={styles.permitDriverButton}
                onClick={handleSubmit}
              >
                অনুমোদন দিন
              </button>
              <button
                type="submit"
                className={styles.notpermitDriverButton}
                onClick={handleReject}
              >
                এড়িয়ে যান
              </button>
              {showButton && (
                <button
                  type="button"
                  className={styles.printDriverButton}
                  onClick={handleCaptureAndConvert}
                >
                  প্রিন্ট করুন
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DriverRegistration;
