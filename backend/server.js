const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sarms",
});

app.post("/signup", (req, res) => {
  // First, check if the email already exists in the database
  const emailCheckSql = "SELECT * FROM user WHERE email = ?";
  const emailToCheck = req.body.email;

  db.query(emailCheckSql, [emailToCheck], (emailCheckErr, emailCheckData) => {
    if (emailCheckErr) {
      return res.json(emailCheckErr);
    }

    // If there is a user with the same email, return a message
    if (emailCheckData.length > 0) {
      console.log("Email already registered");
      return res.json("email");
    }

    // If the email is not found in the database, proceed with registration
    const sql = "INSERT INTO user (`name`, `email`, `password`) VALUES (?)";
    const values = [req.body.name, req.body.email, req.body.password];

    db.query(sql, [values], (err, data) => {
      if (err) {
        return res.json(err);
      }

      return res.json("success");
    });
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE `email` = ? AND `password` = ?";

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    console.log(data);

    if (err) {
      return res.json(err);
    }

    if (data.length > 0) {
      return res.json("success");
    } else {
      return res.json("error");
    }
  });
});

// Create a new endpoint for owner registration
app.post("/OwnerRegistration", (req, res) => {
  // Check if the owner's NID already exists in the owner table
  const nidCheckSql = "SELECT * FROM owner WHERE owner_nid = ?";
  const nidToCheck = req.body.owner_nid;

  // Check for existing NID in the owner table
  db.query(nidCheckSql, [nidToCheck], (nidCheckErr, nidCheckData) => {
    if (nidCheckErr) {
      return res.json(nidCheckErr); // Return an error response if there's a database error
    }

    // If there is an owner with the same NID, return a message
    if (nidCheckData.length > 0) {
      console.log("Owner with the same NID already exists");
      return res.json("nid_exists");
    }

    // If the NID is not found in the owner table, proceed with owner registration
    const ownerSql =
      "INSERT INTO owner (owner_nid, owner_firstName,owner_lastName, owner_date_of_birth, owner_houseNo, owner_postalCode, owner_address) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const ownerValues = [
      req.body.owner_nid,
      req.body.owner_firstName,
      req.body.owner_lastName,
      req.body.owner_date_of_birth,
      req.body.owner_houseNo,
      req.body.owner_postalCode,
      req.body.owner_address,
    ];

    // Insert owner data into the owner table
    db.query(ownerSql, ownerValues, (ownerErr, ownerData) => {
      if (ownerErr) {
        console.error(ownerErr); // Log the error to the console
        return res.json(ownerErr); // Return an error response
      }

      return res.json("owner_registration_success");
    });
  });
});

// Create a new endpoint for manager registration
app.post("/ManagerRegistration", (req, res) => {
  // Check if the manager's NID already exists in the manager table
  const nidCheckSql = "SELECT * FROM manager WHERE manager_nid = ?";
  const nidToCheck = req.body.manager_nid;

  // Check for existing NID in the manager table
  db.query(nidCheckSql, [nidToCheck], (nidCheckErr, nidCheckData) => {
    if (nidCheckErr) {
      return res.json(nidCheckErr); // Return an error response if there's a database error
    }

    // If there is a manager with the same NID, return a message
    if (nidCheckData.length > 0) {
      console.log("Manager with the same NID already exists");
      return res.json("nid_exists");
    }

    // If the NID is not found in the manager table, proceed with manager registration
    const managerSql =
      "INSERT INTO manager (manager_nid, manager_name, manager_date_of_birth, manager_houseNo, manager_postalCode, manager_address) VALUES (?, ?, ?, ?, ?, ?)";
    const managerValues = [
      req.body.manager_nid,
      req.body.manager_name,
      req.body.manager_date_of_birth,
      req.body.manager_houseNo,
      req.body.manager_postalCode,
      req.body.manager_address,
    ];

    // Insert manager data into the manager table
    db.query(managerSql, managerValues, (managerErr, managerData) => {
      if (managerErr) {
        console.error(managerErr); // Log the error to the console
        return res.json(managerErr); // Return an error response
      }

      return res.json("manager_registration_success");
    });
  });
});

// Create a new endpoint for driver registration
app.post("/DriverRegistration", (req, res) => {
  // Check if the driver's NID and driver_license_no already exist in the driver table
  const nidCheckSql = "SELECT * FROM driver WHERE driver_nid = ?";
  const licenseNoCheckSql = "SELECT * FROM driver WHERE driver_license_no = ?";
  const nidToCheck = req.body.driver_nid;
  const licenseNoToCheck = req.body.driver_license_no;

  console.log(licenseNoToCheck);

  db.query(nidCheckSql, [nidToCheck], (nidCheckErr, nidCheckData) => {
    if (nidCheckErr) {
      return res.json(nidCheckErr); // Return an error response if there's a database error
    }

    // If there is a driver with the same NID, return a message
    if (nidCheckData.length > 0) {
      console.log("Driver with the same NID already exists");
      return res.json("nid_exists");
    }

    // Check for existing driver_license_no in the driver table
    db.query(
      licenseNoCheckSql,
      [licenseNoToCheck],
      (licenseNoCheckErr, licenseNoCheckData) => {
        if (licenseNoCheckErr) {
          return res.json(licenseNoCheckErr); // Return an error response if there's a database error
        }

        // If there is a driver with the same driver_license_no, return a message
        if (licenseNoCheckData.length > 0) {
          console.log("Driver with the same driver_license_no already exists");
          return res.json("license_no_exists");
        }

        // If the NID and driver_license_no are not found in the driver table, proceed with driver registration
        const driverSql =
          "INSERT INTO driver (driver_nid, driver_license_no, driver_name, driver_date_of_birth, driver_houseNo, driver_postalCode, driver_address) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const driverValues = [
          req.body.driver_nid,
          req.body.driver_license_no,
          req.body.driver_name,
          req.body.driver_date_of_birth,
          req.body.driver_houseNo,
          req.body.driver_postalCode,
          req.body.driver_address,
        ];

        // Insert driver data into the driver table
        db.query(driverSql, driverValues, (driverErr, driverData) => {
          if (driverErr) {
            console.error(driverErr); // Log the error to the console
            return res.json(driverErr); // Return an error response
          }
          return res.json("driver_registration_success");
        });
      }
    );
  });
});

// Autorickshaw registration route
app.post("/AutorickshawRegistration", async (req, res) => {
  const {
    autorickshaw_number,
    autorickshaw_company,
    autorickshaw_model,
    driver_nid,
    owner_nid,
  } = req.body;

  try {
    // Check if the autorickshaw number is unique
    const autorickshawNumCheckSql =
      "SELECT * FROM autorickshaw WHERE autorickshaw_number = ?";

    // Check for existing autorickshaw number in the autorickshaw table
    db.query(
      autorickshawNumCheckSql,
      [autorickshaw_number],
      (numCheckErr, numCheckData) => {
        if (numCheckErr) {
          console.error(
            "Error checking autorickshaw number uniqueness:",
            numCheckErr
          );
          return res.json("server_error");
        }

        // If an autorickshaw with the same number exists, return an error message
        if (numCheckData.length > 0) {
          console.log("Autorickshaw with the same number already exists");
          return res.json("autorickshaw_number_exists");
        }

        // Check if the owner's NID exists in the owner table
        const ownerNidCheckSql = "SELECT * FROM owner WHERE owner_nid = ?";

        // Check for existing owner NID in the owner table
        db.query(
          ownerNidCheckSql,
          [owner_nid],
          (ownerNidCheckErr, ownerNidCheckData) => {
            if (ownerNidCheckErr) {
              console.error("Error checking owner NID:", ownerNidCheckErr);
              return res.json("server_error");
            }

            // If the owner's NID is not found, return an error message
            if (ownerNidCheckData.length === 0) {
              console.log("Owner with the specified NID does not exist");
              return res.json("owner_nid_not_found");
            }

            // Check if the driver's NID exists
            const driverNidCheckSql =
              "SELECT * FROM driver WHERE driver_nid = ?";

            // Check for existing driver NID in the driver table
            db.query(
              driverNidCheckSql,
              [driver_nid],
              (driverNidCheckErr, driverNidCheckData) => {
                if (driverNidCheckErr) {
                  console.error(
                    "Error checking driver NID:",
                    driverNidCheckErr
                  );
                  return res.json("server_error");
                }

                // If the driver's NID is not found, return an error message
                if (driverNidCheckData.length === 0) {
                  console.log("Driver with the specified NID does not exist");
                  return res.json("driver_nid_not_found");
                }

                // If all checks pass, proceed with autorickshaw registration
                const autorickshawSql =
                  "INSERT INTO autorickshaw (autorickshaw_number, autorickshaw_company, autorickshaw_model, driver_nid, owner_nid) VALUES (?, ?, ?, ?, ?)";
                const autorickshawValues = [
                  autorickshaw_number,
                  autorickshaw_company,
                  autorickshaw_model,
                  driver_nid,
                  owner_nid,
                ];

                // Insert autorickshaw data into the autorickshaw table
                db.query(
                  autorickshawSql,
                  autorickshawValues,
                  (autorickshawErr, autorickshawData) => {
                    if (autorickshawErr) {
                      console.error(
                        "Error registering autorickshaw:",
                        autorickshawErr
                      );
                      return res.json("server_error");
                    }

                    return res.json("autorickshaw_registration_success");
                  }
                );
              }
            );
          }
        );
      }
    );
  } catch (error) {
    console.error("Autorickshaw registration failed:", error);
    return res.json("server_error");
  }
});

// Experimenti

app.get("/student", (req, res) => {
  const sql = "SELECT * FROM serial";

  db.query(sql, (err, data) => {
    console.log(data);
    if (err) return app.json("Error");
    return res.json(data);
  });
});

app.post("/create", (req, res) => {
  // If the email is not found in the database, proceed with registration
  const sql = "INSERT INTO serial (`name`, `email`) VALUES (?)";
  const values = [req.body.name, req.body.email];

  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("failed");
    }

    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const sql = "UPDATE serial SET `name` = ?, `email` = ? WHERE id = ?";
  const values = [req.body.name, req.body.email];
  const id = req.params.id;

  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      return res.json("failed");
    }

    return res.json(data);
  });
});

app.delete("/student/:id", (req, res) => {
  const sql = "DELETE from serial WHERE id = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.json("failed");
    }

    return res.json(data);
  });
});

// Getting Driver Database
app.get("/api/drivers", async (req, res) => {
  // Execute the query
  db.query("SELECT * FROM driver", (queryErr, rows) => {
    if (queryErr) {
      console.error("Error fetching customer data: ", queryErr);
      return res.json({ error: "Internal server error" });
    }

    res.json({ users: rows });
  });
});

// Route to fetch driver data by driver_nid
app.get("/api/drivers/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM driver WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error fetching driver data from MySQL:", err);
      res.json({ error: "Internal Server Error" });
    } else {
      if (result.length === 0) {
        res.json({ error: "Driver not found" });
      } else {
        const driverData = result[0]; // Assuming driver_nid is unique
        res.json(driverData);
      }
    }
  });
});

// Getting Owner Database
app.get("/api/owners", async (req, res) => {
  // Execute the query
  db.query("SELECT * FROM owner", (queryErr, rows) => {
    if (queryErr) {
      console.error("Error fetching owner data: ", queryErr);
      return res.json({ error: "Internal server error" });
    }

    res.json({ users: rows });
  });
});

// Route to fetch owner data by owner_nid
app.get("/api/owners/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM owner WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error fetching owner data from MySQL:", err);
      res.json({ error: "Internal Server Error" });
    } else {
      if (result.length === 0) {
        res.json({ error: "Owner not found" });
      } else {
        const ownerData = result[0];

        console.log(ownerData);
         // Assuming owner_nid is unique
        res.json(ownerData);
      }
    }
  });
});
// Update driver information
app.put("/updateDriver/:id", (req, res) => {
  const id = req.params.id;
  console.log("Received PUT request for driver with ID: " + id);
  const {
    driver_name,
    driver_nid,
    driver_date_of_birth,
    driver_houseNo,
    driver_postalCode,
    driver_address,
    driver_license_no,
  } = req.body;

  const sql =
    "UPDATE driver SET " +
    "`driver_name` = ?, " +
    "`driver_date_of_birth` = ?, " +
    "`driver_houseNo` = ?, " +
    "`driver_postalCode` = ?, " +
    "`driver_address` = ?, " +
    "`driver_license_no` = ?, " +
    "`driver_nid` = ? " + // Add a + operator here
    "WHERE `id` = ?";

  const values = [
    driver_name,
    driver_date_of_birth,
    driver_houseNo,
    driver_postalCode,
    driver_address,
    driver_license_no,
    driver_nid,
    id,
  ];

  console.log(values);

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error updating driver information: ", err);
      return res.json("failed");
    }
    console.log("Driver information updated successfully");
    return res.json("success");
  });
});



app.delete("/delete/drivers/:driver_nid", (req, res) => {
  const driverNID = req.params.driver_nid;

  // Define the SQL query to delete the driver based on driver_nid
  const sql = "DELETE FROM driver WHERE driver_nid = ?";

  db.query(sql, [driverNID], (err, result) => {
    if (err) {
      console.error("Error deleting driver:", err);
      return res.status(500).json({ error: "Failed to delete driver" });
    }

    // Check if any rows were affected by the delete operation
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: `Driver with NID ${driverNID} not found` });
    }

    // If successful, send a success response
    return res.json({
      message: `Driver with NID ${driverNID} deleted successfully`,
    });
  });
});

// Update owner information
app.put("/updateOwner/:id", (req, res) => {
  const id = req.params.id;
  console.log("Received PUT request for owner with ID: " + id);
  const {
    owner_firstName,
    owner_lastName,
    owner_nid,
    owner_date_of_birth,
    owner_houseNo,
    owner_postalCode,
    owner_address,
  } = req.body;

  const sql =
    "UPDATE owner SET " +
    "`owner_firstName` = ?, " +
    "`owner_lastName` = ?, " +
    "`owner_date_of_birth` = ?, " +
    "`owner_houseNo` = ?, " +
    "`owner_postalCode` = ?, " +
    "`owner_address` = ?, " +
    "`owner_nid` = ? " + 
    "WHERE `id` = ?";

  const values = [
    owner_firstName,
    owner_lastName,
    owner_date_of_birth,
    owner_houseNo,
    owner_postalCode,
    owner_address,
    owner_nid,
    id,
  ];

  console.log(values);

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error updating owner information: ", err);
      return res.json("failed");
    }
    console.log("Owner information updated successfully");
    return res.json("success");
  });
});
app.delete("/delete/owners/:owner_nid", (req, res) => {
  const ownerNID = req.params.owner_nid;

  // Define the SQL query to delete the owner based on owner_nid
  const sql = "DELETE FROM owner WHERE owner_nid = ?";

  db.query(sql, [ownerNID], (err, result) => {
    if (err) {
      console.error("Error deleting owner:", err);
      return res.status(500).json({ error: "Failed to delete owner" });
    }

    // Check if any rows were affected by the delete operation
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: `Owner with NID ${ownerNID} not found` });
    }

    // If successful, send a success response
    return res.json({
      message: `Owner with NID ${ownerNID} deleted successfully`,
    });
  });
});



const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
