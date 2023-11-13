import React, { useState, useEffect } from "react";
import { Modal } from "antd";
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

  // Declare a state variable to control the button's visibility
  const [showButton, setShowButton] = useState(false);

  // Function to toggle the button's visibility
  const toggleButton = () => {
    setShowButton(true);
  };

  const [formData, setFormData] = useState({
    autorickshaw_number: "",
    autorickshaw_company: "",
    vehicle_registration_number: "",
    chassis_number: "",
    engine_number: "",
    autorickshaw_model: "",
    driver_name: "",
    owner_name: "",
    autorickshaw_status: "",
    authority_name: "",
    authority_position: "",
    permit_startDate: "",
    permit_endDate: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formData);
    try {
      console.log("herhr");
      // Use autorickshaw_number as the parameter name
      axios
        .put(`http://localhost:3001/PermitAutorickshaw/${id}`, formData)
        .then((res) => {
          console.log(res);
          if (res.data === "permit_success") {
            // alert("আপনি সফলভাবে অটোরিকশাটি অনুমোদন  করেছেন");
            // navigate("/autorickshaw");
            Modal.success({
              title: "Successful !",
              content: "আপনি সফলভাবে অটোরিকশাটি অনুমোদন  করেছেন",
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
    // Add logic to navigate to the UnauthorizedAutorickshaw route
    navigate("/UnauthorizedAutorickshaw"); // Navigate to the desired route
  };

  useEffect(() => {
    // Fetch data from MySQL using driver_nid
    axios
      .get(`http://localhost:3001/api/autorickshaw/${id}`)
      .then((response) => {
        setFormData((prevData) => ({
          ...prevData,
          ...response.data,
        }));
        console.log(response.data.driver_nid);
        const nid1 = response.data.driver_nid;
        axios
          .get(`http://localhost:3001/api/drivers/${nid1}/name`)
          .then((nameResponse) => {
            console.log(nameResponse.data.driver_firstName);
            setFormData((prevData) => ({
              ...prevData,
              driver_name:
                nameResponse.data.driver_firstName +
                " " +
                nameResponse.data.driver_lastName,
            }));
          })
          .catch((nameError) => {
            console.error("Error fetching driver's name: ", nameError);
          });

        const nid2 = response.data.owner_nid;
        console.log(nid2);
        axios
          .get(`http://localhost:3001/api/owners/${nid2}/name`)
          .then((nameResponse) => {
            console.log(nameResponse.data.owner_firstName);
            setFormData((prevData) => ({
              ...prevData,
              owner_name:
                nameResponse.data.owner_firstName +
                " " +
                nameResponse.data.owner_lastName,
            }));
          })
          .catch((nameError) => {
            console.error("Error fetching driver's name: ", nameError);
          });
      })
      .catch((error) => {
        console.error("Error fetching driver data: ", error);
      });
  }, [id]);

  const [formImage, setFormImage] = useState(null);

  const captureFormAsImage = () => {
    const element = document.getElementById("printAuto");

    html2canvas(element).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      setFormImage(dataURL);
    });
  };

  const convertImageToPDF = () => {
    if (formImage) {
      // Define a custom page size (e.g., 50x50)
      const customPageSize = {
        width: 245,
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

      pdf.save("autorickshaw_form.pdf");
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

  function generateDateStringOneYearLater() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentDate = new Date();

    // Add one year to the current date
    const oneYearLater = new Date(currentDate);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    const oneYearLaterString = `${oneYearLater.getDate()} ${
      months[oneYearLater.getMonth()]
    }, ${oneYearLater.getFullYear()}`;

    return `${oneYearLaterString}`;
  }

  function generateDateStringOneYearLater1() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentDate = new Date();

    // Format the dates
    const currentDateString = `${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }, ${currentDate.getFullYear()}`;

    return `${currentDateString}`;
  }

  useEffect(() => {
    // Fetch the user ID
    axios
      .get("http://localhost:3001/api/profile", { withCredentials: true })
      .then((res) => {
        if (res.data.statusbar === "success") {
          console.log(res.data.id);
          const result = generateDateStringOneYearLater();
          const result1 = generateDateStringOneYearLater1();
          const fetchedUserId = res.data.id;
          axios
            .get(`http://localhost:3001/api/authority/${fetchedUserId}`)
            .then((authorityRes) => {
              if (authorityRes.data.status === "success") {
                console.log(authorityRes.data.authority.authority_name);
                setFormData((prevData) => ({
                  ...prevData,
                  authority_name: authorityRes.data.authority.authority_name,
                  authority_position:
                    authorityRes.data.authority.authority_position,
                  permit_startDate: result1,
                  permit_endDate: result,
                }));
              } else {
                console.log("Error fetching authority information");
              }
            })
            .catch((authorityErr) => {
              console.log("Error fetching authority information");
            });
        } else {
          console.log("error");
        }
      });
  }, []);
  return (
    <div className={styles.RegistrationScreen}>
      <div className={styles.autorickshawContainer} id="autorickshawContainer">
        <div
          className={`${styles["autorickshawFormContainer"]} ${styles["autorickshawSignUpContainer"]}`}
        >
          <form className={styles.autorickshawForm}>
            <div className={styles.autoprint} id="printAuto">
              <div className={styles.permitButtonContainer}>
                <h1 className={styles.autorickshawHead}>
                  অটোরিকশা অনুমোদন ফর্ম
                </h1>
              </div>

              <div
                className={styles.autorickshawContent}
                id="autorickshawContent"
              >
                <div className={styles.autorickshawInfield}>
                  <div className={styles.autorickshawPair}>
                    <p className={styles.autorickshawParagraph}>
                      অটোরিকশা নাম্বার
                    </p>
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
                    <p className={styles.autorickshawParagraph}>
                      অটোরিকশা কোম্পানি
                    </p>
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

                  <div className={styles.autorickshawPair}>
                    <p className={styles.autorickshawParagraph}>
                      অটোরিকশা মডেল
                    </p>
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
                    <p className={styles.autorickshawParagraph}>
                      চেসিস নাম্বার
                    </p>
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

                  <div className={styles.autorickshawPair}>
                    <p className={styles.autorickshawParagraph}>
                      ইঞ্জিন নাম্বার
                    </p>
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
                </div>

                <div className={styles.autorickshawInfield}>
                  <div className={styles.autorickshawPair}>
                    <p className={styles.autorickshawParagraph}>মালিকের নাম</p>
                    <input
                      className={styles.autorickshawInput}
                      type="text"
                      id="owner_name"
                      name="owner_name"
                      value={formData.owner_name}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>

                  <div className={styles.autorickshawPair}>
                    <p className={styles.autorickshawParagraph}>
                      ড্রাইভারের নাম
                    </p>
                    <input
                      className={styles.autorickshawInput}
                      type="text"
                      id="driver_name"
                      name="driver_name"
                      value={formData.driver_name}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>
                  {showButton && (
                    <div className={styles.autorickshawPair}>
                      <p className={styles.autorickshawParagraph}>
                        অনুমতি প্রদানের তারিখ
                      </p>
                      <input
                        className={styles.autorickshawInput}
                        type="text"
                        id="permit_startDate"
                        name="permit_startDate"
                        value={formData.permit_startDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>

                {showButton && (
                  <div className={styles.autorickshawInfield}>
                    <div className={styles.autorickshawPair}>
                      <p className={styles.autorickshawParagraph}>
                        কর্তৃপক্ষের নাম
                      </p>
                      <input
                        className={styles.autorickshawInput}
                        type="text"
                        id="authority_name"
                        name="authority_name"
                        value={formData.authority_name}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className={styles.autorickshawPair}>
                      <p className={styles.autorickshawParagraph}>
                        কর্তৃপক্ষের পজিশন
                      </p>
                      <input
                        className={styles.autorickshawInput}
                        type="text"
                        id="authority_position"
                        name="authority_position"
                        value={formData.authority_position}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className={styles.autorickshawPair}>
                      <p className={styles.autorickshawParagraph}>
                        মেয়াদ উত্তীর্ণের তারিখ
                      </p>
                      <input
                        className={styles.autorickshawInput}
                        type="text"
                        id="permit_endDate"
                        name="permit_endDate"
                        value={formData.permit_endDate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.permitButtonContainer}>
              {!showButton && (
                <button
                  type="submit"
                  className={styles.permitAutorickshawButton}
                  onClick={handleSubmit}
                >
                  অনুমোদন দিন
                </button>
              )}
              <button
                type="submit"
                className={styles.notpermitAutorickshawButton}
                onClick={handleReject}
              >
                এড়িয়ে যান
              </button>
              {showButton && (
                <button
                  type="button"
                  className={styles.printAutorickshawButton}
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

export default AutorickshawRegistration;
