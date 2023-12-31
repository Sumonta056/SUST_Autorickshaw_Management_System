import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import axios from "axios";
import styles from "./AdminPermit.module.css";
import "./index.css";
import {
  SecurityScanOutlined,
  SafetyOutlined,
  ProfileOutlined,
  IdcardOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

function AdminPermit() {
  axios.defaults.withCredentials = true;
  const [type, setType] = useState([]);
  const [adminNIDs, setadminNIDs] = useState([]);
  const [authorityData, setAuthorityData] = useState([]);
  const [check, setCheck] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3001/api/admins")
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data: ", error);
        setLoading(false);
      });
  }, []);

  const [formData, setFormData] = useState({
    authority_adminType: "",
    admin_NID: "",
    admin_name: "",
    admin_username: "",
    admin_password: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAdminChange = async (event) => {
    const value = event.target.value;
    const adminType = value;

    setFormData({
      ...formData,
      authority_adminType: adminType,
    });

    if (value === "কর্তৃপক্ষ") {
      setCheck(true);
      setType("authority");
      console.log(adminType);
      try {
        const response = await axios.get(
          `http://localhost:3001/api/authorityNID`
        );

        console.log(response.data);
        setAuthorityData(response.data);

        const nidNumbers = authorityData.map(
          (authority) => authority.authority_email
        );
        console.log(nidNumbers);

        console.log(authorityData.authority_email);
        setadminNIDs(nidNumbers);

        console.log(adminNIDs);
      } catch (error) {
        console.error("Error fetching authority data: ", error);
      }
    } else {
      setType("manager");
      setCheck(false);
      console.log(adminType);
      try {
        const response = await axios.get(
          `http://localhost:3001/api/ManagerNID`
        );

        console.log(response.data);
        setAuthorityData(response.data);

        const nidNumbers = authorityData.map(
          (authority) => authority.manager_nid
        );
        console.log(nidNumbers);

        console.log(authorityData.manager_nid);
        setadminNIDs(nidNumbers);

        console.log(adminNIDs);
      } catch (error) {
        console.error("Error fetching authority data: ", error);
      }
    }
  };

  function findLongestWord(sentence) {
    // Split the sentence into words
    const words = sentence.split(" ");

    // Initialize variables to track the longest word and its length
    let longestWord = "";
    let maxLength = 0;

    // Iterate through the words to find the longest one
    for (const word of words) {
      // Remove punctuation and whitespace from the word
      const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

      if (cleanWord.length > maxLength) {
        maxLength = cleanWord.length;
        longestWord = cleanWord;
      }
    }

    return longestWord;
  }

  // Function to generate a random username
  function generateRandomUsername(length) {
    const charset = "0123456789@";
    let username = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      username += charset.charAt(randomIndex);
    }
    return username;
  }

  const handleNIDChange = async (event) => {
    const value = event.target.value;

    console.log("handleNIDChange", value);

    if (type === "authority") {
      // Find the authority data based on the selected NID
      const selectedAuthority = authorityData.find(
        (authority) => authority.authority_email === value
      );

      const name = findLongestWord(selectedAuthority.authority_name);
      const username = name + generateRandomUsername(4);

      setFormData({
        ...formData,
        admin_NID: value,
        admin_name: selectedAuthority.authority_name,
        admin_username: username,
        admin_password: username,
      });
    } else if (type === "manager") {
      // Find the authority data based on the selected NID
      const selectedAuthority = authorityData.find(
        (authority) => authority.manager_nid === value
      );

      const name = findLongestWord(
        selectedAuthority.manager_firstName +
          " " +
          selectedAuthority.manager_lastName
      );
      const username = name + generateRandomUsername(4);

      setFormData({
        ...formData,
        admin_NID: value,
        admin_name:
          selectedAuthority.manager_firstName +
          " " +
          selectedAuthority.manager_lastName,
        admin_username: username,
        admin_password: username,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:3001/signup",
        formData
      );
      if (response.data === "success") {
        Modal.success({
          title: "Successful!",
          content: "সফলভাবে অনুমতি দেওয়া হয়েছে",
          onOk: () => {
            setLoading(true);
            fetch("http://localhost:3001/api/admins")
              .then((response) => response.json())
              .then((data) => {
                setFormData({
                  ...formData,
                  authority_adminType: "",
                  admin_NID: "",
                  admin_name: "",
                  admin_username: "",
                  admin_password: "",
                });
                setDataSource(data);
                setLoading(false);
              })
              .catch((error) => {
                console.error("Error fetching driver data: ", error);
                setLoading(false);
              });
          },
        });
      } else if (response.data === "NID already registered") {
        Modal.error({
          title: "Successful!",
          content: "অ্যাডমিন ইতিমধ্যেই বিদ্যমান",
          onOk: () => {},
        });
      } else {
        Modal.error({
          title: "Error",
          content: "অনুগ্রহ করে আবার চেষ্টা করুন",
          onOk: () => {
            // Handle error, e.g., allow the user to retry
          },
        });
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      Modal.error({
        title: "Error",
        content: "অনুগ্রহ করে আবার চেষ্টা করুন",
        onOk: () => {
          // Handle error, e.g., allow the user to retry
        },
      });
    }
  };

  const columns = [
    {
      title: "অ্যাডমিন টাইপ",
      dataIndex: "authority_adminType",
    },
    // {
    //   title: "জাতীয় পরিচয়পত্র নম্বর",
    //   dataIndex: "admin_NID",
    // },
    {
      title: "অ্যাডমিনের নাম",
      dataIndex: "name",
    },
  ];
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <div className="SetPageContent">
          <div className="PageContents">
            <h1 className="PageHeader">
              <SecurityScanOutlined className="icon" />
              অ্যাডমিন অনুমতি ফর্ম
            </h1>
            <form className={styles.AdminPermitForm} onSubmit={handleSubmit}>
              <div className={styles.AdminPermitInfield}>
                <p className={styles.AdminPermitParagraph}>
                  <ProfileOutlined className={styles.iconShow} />
                  অ্যাডমিন টাইপ
                </p>
                <select
                  className={styles.AdminPermitSelect}
                  id="authority_adminType"
                  name="authority_adminType"
                  value={formData.authority_adminType}
                  onChange={handleAdminChange}
                >
                  <option value="">
                    <span className={styles.first}>
                      অ্যাডমিন টাইপ নির্বাচন করুন
                    </span>
                  </option>
                  <option value="কর্তৃপক্ষ">কর্তৃপক্ষ</option>
                  <option value="ম্যানেজার">ম্যানেজার</option>
                </select>
              </div>

              <div className={styles.AdminPermitInfield}>
                <p className={styles.AdminPermitParagraph}>
                  <IdcardOutlined className={styles.iconShow} />
                  {check
                    ? "অ্যাডমিনের ইমেইল এড্রেস"
                    : "অ্যাডমিনের জাতীয় পরিচয়পত্র নম্বর"}
                </p>
                <select
                  className={styles.AdminPermitSelect}
                  type="text"
                  id="admin_NID"
                  name="admin_NID"
                  placeholder={`অ্যাডমিনের ${
                    check ? "ইমেইল এড্রেস" : "ইমেইল এড্রেস"
                  } নির্বাচন করুন`}
                  value={formData.admin_NID}
                  onChange={handleNIDChange}
                >
                  <option value="">
                    <span className={styles.first}>
                      {`অ্যাডমিনের ${
                        check ? "ইমেইল এড্রেস" : "জাতীয় পরিচয়পত্র নম্বর"
                      } নির্বাচন করুন`}
                    </span>
                  </option>

                  {authorityData.map((authority) => (
                    <option
                      key={
                        type === "authority"
                          ? authority.authority_email
                          : authority.manager_nid
                      }
                      value={
                        type === "authority"
                          ? authority.authority_email
                          : authority.manager_nid
                      }
                    >
                      {type === "authority"
                        ? authority.authority_email
                        : authority.manager_nid}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.AdminPermitInfield}>
                <p className={styles.AdminPermitParagraph}>
                  <NotificationOutlined className={styles.iconShow} />
                  অ্যাডমিনের নাম
                </p>
                <input
                  className={`${styles.AdminPermitInput} ${styles.readonly}`} // Add a custom CSS class for readonly style
                  type="text"
                  id="admin_name"
                  name="admin_name"
                  placeholder="অ্যাডমিনের নাম দিন"
                  value={formData.admin_name}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.AdminPermitInfield}>
                <p className={styles.AdminPermitParagraph}>
                  <UserOutlined className={styles.iconShow} />
                  অ্যাডমিন ইউজারনেম
                </p>
                <input
                  className={`${styles.AdminPermitInput} ${styles.readonly}`}
                  type="text"
                  id="admin_username"
                  name="admin_username"
                  placeholder="অ্যাডমিন ইউজারনেম দিন"
                  value={formData.admin_username}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.AdminPermitInfield}>
                <p className={styles.AdminPermitParagraph}>
                  <SafetyOutlined className={styles.iconShow} />
                  পাসওয়ার্ড
                </p>
                <input
                  className={`${styles.AdminPermitInput} ${styles.readonly}`} // Add a custom CSS class for readonly style
                  type="text"
                  id="admin_password"
                  name="admin_password"
                  placeholder="পাসওয়ার্ড প্রদান করুন"
                  value={formData.admin_password}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className={styles.AdminPermitButton}>
                অনুমতি দিন
              </button>
            </form>
          </div>

          <div className="PageFooterM7">
            <h1 className="PageHeader">
              {" "}
              <UserOutlined className="icon" />
              অ্যাডমিনের তালিকা
            </h1>
            <Table
              className="TableDriverA"
              loading={loading}
              columns={columns}
              dataSource={dataSource}
              pagination={{
                pageSize: 7,
              }}
            ></Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPermit;
