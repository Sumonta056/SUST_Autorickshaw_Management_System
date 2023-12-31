const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cron = require("node-cron");

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sarms",
});

app.post("/signupss", (req, res) => {
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
  const sql = "SELECT * FROM user WHERE `username` = ? AND `password` = ?";

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    console.log(data);
    if (err) {
      return res.json(err);
    }
    if (data.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    console.log(data[0].id);
    const id = data[0].id;
    const token = jwt.sign({ id }, "screet-token", { expiresIn: "1d" });
    res.cookie("token", token);

    return res.json("success");
  });
});

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

    // Check if the trade license number already exists in the owner table
    const tradeLicenseCheckSql =
      "SELECT * FROM owner WHERE owner_tradeLicenseNo = ?";
    const tradeLicenseToCheck = req.body.owner_tradeLicenseNo;

    db.query(
      tradeLicenseCheckSql,
      [tradeLicenseToCheck],
      (tradeLicenseCheckErr, tradeLicenseCheckData) => {
        if (tradeLicenseCheckErr) {
          return res.json(tradeLicenseCheckErr); // Return an error response if there's a database error
        }

        // If there is an owner with the same trade license number, return a message
        if (tradeLicenseCheckData.length > 0) {
          console.log(
            "Owner with the same trade license number already exists"
          );
          return res.json("trade_license_exists");
        }

        // Check if the insurance number already exists in the owner table
        const insuranceCheckSql =
          "SELECT * FROM owner WHERE owner_insuranceNo = ?";
        const insuranceToCheck = req.body.owner_insuranceNo;

        db.query(
          insuranceCheckSql,
          [insuranceToCheck],
          (insuranceCheckErr, insuranceCheckData) => {
            if (insuranceCheckErr) {
              return res.json(insuranceCheckErr); // Return an error response if there's a database error
            }

            // If there is an owner with the same insurance number, return a message
            if (insuranceCheckData.length > 0) {
              console.log(
                "Owner with the same insurance number already exists"
              );
              return res.json("insurance_exists");
            }

            // If the NID, trade license, and insurance numbers are all unique, proceed with owner registration
            const ownerSql =
              "INSERT INTO owner (owner_nid, owner_firstName, owner_lastName, owner_date_of_birth, owner_houseNo, owner_postalCode, owner_address, owner_tradeLicenseNo, owner_insuranceNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const ownerValues = [
              req.body.owner_nid,
              req.body.owner_firstName,
              req.body.owner_lastName,
              req.body.owner_date_of_birth,
              req.body.owner_houseNo,
              req.body.owner_postalCode,
              req.body.owner_address,
              req.body.owner_tradeLicenseNo,
              req.body.owner_insuranceNo,
            ];

            // Insert owner data into the owner table
            db.query(ownerSql, ownerValues, (ownerErr, ownerData) => {
              if (ownerErr) {
                console.error(ownerErr); // Log the error to the console
                return res.json(ownerErr); // Return an error response
              }

              return res.json("owner_registration_success");
            });
          }
        );
      }
    );
  });
});

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
      "INSERT INTO manager (manager_nid, manager_firstName, manager_lastName, manager_date_of_birth, manager_houseNo, manager_postalCode, manager_address) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const managerValues = [
      req.body.manager_nid,
      req.body.manager_firstName,
      req.body.manager_lastName,
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

      console.log(managerValues);
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
          "INSERT INTO driver (driver_nid, driver_license_no, driver_firstName, driver_lastName, driver_date_of_birth, driver_houseNo, driver_postalCode, driver_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const driverValues = [
          req.body.driver_nid,
          req.body.driver_license_no,
          req.body.driver_firstName,
          req.body.driver_lastName,
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
    vehicle_registration_number,
    chassis_number,
    engine_number,
    autorickshaw_model,
    driver_nid,
    owner_nid,
  } = req.body;

  try {
    // Check if the driver's NID exists
    const driverNidCheckSql = "SELECT * FROM driver WHERE driver_nid = ?";
    db.query(
      driverNidCheckSql,
      [driver_nid],
      (driverNidCheckErr, driverNidCheckData) => {
        if (driverNidCheckErr) {
          console.error("Error checking driver NID:", driverNidCheckErr);
          return res.json("server_error");
        }

        // If the driver's NID is not found, return an error message
        if (driverNidCheckData.length === 0) {
          console.log("Driver with the specified NID does not exist");
          return res.json("driver_nid_not_found");
        }

        // If the driver's status is not 1, return an error message
        if (driverNidCheckData[0].driver_status !== 1) {
          console.log(
            "Driver with the specified NID has status not equal to 1"
          );
          return res.json("driver_status_not_1");
        }

        // Check if the owner's NID exists
        const ownerNidCheckSql = "SELECT * FROM owner WHERE owner_nid = ?";
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

            // If the owner's status is not 1, return an error message
            if (ownerNidCheckData[0].owner_status !== 1) {
              console.log(
                "Owner with the specified NID has status not equal to 1"
              );
              return res.json("owner_status_not_1");
            }

            // Check if the autorickshaw number is unique
            const autorickshawNumCheckSql =
              "SELECT * FROM autorickshaw WHERE autorickshaw_number = ?";
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
                  console.log(
                    "Autorickshaw with the same number already exists"
                  );
                  return res.json("autorickshaw_number_exists");
                }

                // Check if the chassis number is unique
                const chassisNumberCheckSql =
                  "SELECT * FROM autorickshaw WHERE chassis_number = ?";
                db.query(
                  chassisNumberCheckSql,
                  [chassis_number],
                  (chassisCheckErr, chassisCheckData) => {
                    if (chassisCheckErr) {
                      console.error(
                        "Error checking chassis number uniqueness:",
                        chassisCheckErr
                      );
                      return res.json("server_error");
                    }

                    // If an autorickshaw with the same chassis number exists, return an error message
                    if (chassisCheckData.length > 0) {
                      console.log(
                        "Autorickshaw with the same chassis number already exists"
                      );
                      return res.json("chassis_number_exists");
                    }

                    // Check if the engine number is unique
                    const engineNumberCheckSql =
                      "SELECT * FROM autorickshaw WHERE engine_number = ?";
                    db.query(
                      engineNumberCheckSql,
                      [engine_number],
                      (engineCheckErr, engineCheckData) => {
                        if (engineCheckErr) {
                          console.error(
                            "Error checking engine number uniqueness:",
                            engineCheckErr
                          );
                          return res.json("server_error");
                        }

                        // If an autorickshaw with the same engine number exists, return an error message
                        if (engineCheckData.length > 0) {
                          console.log(
                            "Autorickshaw with the same engine number already exists"
                          );
                          return res.json("engine_number_exists");
                        }

                        // Check if the vehicle registration number is unique
                        const vehicleRegNumCheckSql =
                          "SELECT * FROM autorickshaw WHERE vehicle_registration_number = ?";
                        db.query(
                          vehicleRegNumCheckSql,
                          [vehicle_registration_number],
                          (vehicleRegCheckErr, vehicleRegCheckData) => {
                            if (vehicleRegCheckErr) {
                              console.error(
                                "Error checking vehicle registration number uniqueness:",
                                vehicleRegCheckErr
                              );
                              return res.json("server_error");
                            }

                            // If an autorickshaw with the same vehicle registration number exists, return an error message
                            if (vehicleRegCheckData.length > 0) {
                              console.log(
                                "Autorickshaw with the same vehicle registration number already exists"
                              );
                              return res.json(
                                "vehicle_registration_number_exists"
                              );
                            }

                            // If all checks pass, proceed with autorickshaw registration
                            const autorickshawSql =
                              "INSERT INTO autorickshaw (autorickshaw_number, autorickshaw_company, vehicle_registration_number, chassis_number, engine_number, autorickshaw_model, driver_nid, owner_nid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                            const autorickshawValues = [
                              autorickshaw_number,
                              autorickshaw_company,
                              vehicle_registration_number,
                              chassis_number,
                              engine_number,
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

                                return res.json(
                                  "autorickshaw_registration_success"
                                );
                              }
                            );
                          }
                        );
                      }
                    );
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

// Getting Manager Database
app.get("/api/managers", async (req, res) => {
  // Execute the query
  db.query("SELECT * FROM manager", (queryErr, rows) => {
    if (queryErr) {
      console.error("Error fetching customer data: ", queryErr);
      return res.json({ error: "Internal server error" });
    }

    res.json({ users: rows });
  });
});

// Route to fetch manager data by manager_nid
app.get("/api/managers/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM manager WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error fetching manager data from MySQL:", err);
      res.json({ error: "Internal Server Error" });
    } else {
      if (result.length === 0) {
        res.json({ error: "Manager not found" });
      } else {
        const managerData = result[0]; // Assuming manager_nid is unique
        res.json(managerData);
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
    driver_firstName,
    driver_lastName,
    driver_nid,
    driver_date_of_birth,
    driver_houseNo,
    driver_postalCode,
    driver_address,
    driver_license_no,
  } = req.body;

  const sql =
    "UPDATE driver SET " +
    "`driver_firstName` = ?, " +
    "`driver_lastName` = ?, " +
    "`driver_date_of_birth` = ?, " +
    "`driver_houseNo` = ?, " +
    "`driver_postalCode` = ?, " +
    "`driver_address` = ?, " +
    "`driver_license_no` = ?, " +
    "`driver_nid` = ? " + // Add a + operator here
    "WHERE `id` = ?";

  const values = [
    driver_firstName,
    driver_lastName,
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

app.delete("/delete/autorickshaw/:id", (req, res) => {
  const autorickshawId = req.params.id;

  // Define the SQL query to delete from autorickshaw_schedule table
  const deleteScheduleSql =
    "DELETE FROM autorickshaw_schedule WHERE autorickshaw_number = ?";

  // Start by deleting from 'autorickshaw_schedule' table
  db.query(deleteScheduleSql, [autorickshawId], (err, result) => {
    if (err) {
      console.error("Error deleting from autorickshaw_schedule table:", err);
      return res.json({
        error: "Failed to delete from autorickshaw_schedule table",
      });
    }

    // After deleting from 'autorickshaw_schedule', proceed to delete the autorickshaw
    const deleteAutorickshawSql =
      "DELETE FROM autorickshaw WHERE autorickshaw_number = ?";
    db.query(deleteAutorickshawSql, [autorickshawId], (err, result) => {
      if (err) {
        console.error("Error deleting autorickshaw:", err);
        return res.json({ error: "Failed to delete autorickshaw" });
      }

      if (result.affectedRows === 0) {
        return res.json({
          error: `Autorickshaw with ID ${autorickshawId} not found`,
        });
      }
      console.log("Autorickshaw with ID ${autorickshawId} deleted successfull");
      return res.json({
        message: `Autorickshaw with ID ${autorickshawId} deleted successfully`,
      });
    });
  });
});

// Add a new route for deleting a manager by managerNID
app.delete("/delete/managers/:managerNID", (req, res) => {
  const managerNID = req.params.managerNID;

  // Define the SQL query to delete the manager based on managerNID
  const sql = "DELETE FROM manager WHERE manager_nid = ?";

  db.query(sql, [managerNID], (err, result) => {
    if (err) {
      console.error("Error deleting manager:", err);
      return res.status(500).json({ error: "Failed to delete manager" });
    }

    // Check if any rows were affected by the delete operation
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: `Manager with NID ${managerNID} not found` });
    }

    // If successful, send a success response
    return res.json({
      message: `Manager with NID ${managerNID} deleted successfully`,
    });
  });
});

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
    owner_tradeLicenseNo,
    owner_insuranceNo,
  } = req.body;

  // If both trade license and insurance numbers are unique, proceed with the update
  const sql =
    "UPDATE owner SET " +
    "`owner_firstName` = ?, " +
    "`owner_lastName` = ?, " +
    "`owner_date_of_birth` = ?, " +
    "`owner_houseNo` = ?, " +
    "`owner_postalCode` = ?, " +
    "`owner_address` = ?, " +
    "`owner_nid` = ?, " +
    "`owner_tradeLicenseNo` = ?, " +
    "`owner_insuranceNo` = ? " +
    "WHERE `id` = ?";

  const values = [
    owner_firstName,
    owner_lastName,
    owner_date_of_birth,
    owner_houseNo,
    owner_postalCode,
    owner_address,
    owner_nid,
    owner_tradeLicenseNo,
    owner_insuranceNo,
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

// Getting Owner Database
app.get("/api/autorickshaws", async (req, res) => {
  // Execute the query
  db.query("SELECT * FROM autorickshaw", (queryErr, rows) => {
    if (queryErr) {
      console.error("Error fetching autorickshaw data: ", queryErr);
      return res.json({ error: "Internal server error" });
    }

    res.json({ users: rows });
  });
});

// Route to fetch owner data by owner_nid
app.get("/api/autorickshaw/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM autorickshaw WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error fetching owner data from MySQL:", err);
      res.json({ error: "Internal Server Error" });
    } else {
      if (result.length === 0) {
        res.json({ error: "Autorickshaw not found" });
      } else {
        const Autorickshaw = result[0];

        console.log(Autorickshaw);
        // Assuming owner_nid is unique
        res.json(Autorickshaw);
      }
    }
  });
});

app.put("/updateAutorickshaw/:id", (req, res) => {
  const id = req.params.id;
  console.log("Received PUT request for autorickshaw with ID: " + id);

  const {
    autorickshaw_number,
    autorickshaw_company,
    vehicle_registration_number,
    chassis_number,
    engine_number,
    autorickshaw_model,
    driver_nid,
    owner_nid,
    autorickshaw_status,
  } = req.body;

  // Check if driver_nid exists in the driver table and has driver_status set to 1
  const checkDriverSQL = "SELECT * FROM driver WHERE `driver_nid` = ? AND `driver_status` = 1";
  const checkDriverValues = [driver_nid];

  db.query(checkDriverSQL, checkDriverValues, (err, driverData) => {
    if (err) {
      console.error("Error checking driver information: ", err);
      return res.json({ status: "failed", message: "Error checking driver information" });
    }

    if (driverData.length === 0) {
      console.error("Driver with NID " + driver_nid + " does not exist or is not active.");
      return res.json({ status: "failed", message: "উক্ত ড্রাইভারকে নিবন্ধন বা অনুমতি দেয়া হয় নি" });
    }

    // Check if owner_nid exists in the owner table and has owner_status set to 1
    const checkOwnerSQL = "SELECT * FROM owner WHERE `owner_nid` = ? AND `owner_status` = 1";
    const checkOwnerValues = [owner_nid];

    db.query(checkOwnerSQL, checkOwnerValues, (err, ownerData) => {
      if (err) {
        console.error("Error checking owner information: ", err);
        return res.json({ status: "failed", message: "Error checking owner information" });
      }

      if (ownerData.length === 0) {
        console.error("Owner with NID " + owner_nid + " does not exist or is not active.");
        return res.json({ status: "failed", message: "উক্ত মালিককে নিবন্ধন বা অনুমতি দেয়া হয় নি" });
      }

      // Check if the autorickshaw number is unique
      const autorickshawNumCheckSql = "SELECT * FROM autorickshaw WHERE autorickshaw_number = ? AND `id` <> ?";
      db.query(
        autorickshawNumCheckSql,
        [autorickshaw_number, id],
        (numCheckErr, numCheckData) => {
          if (numCheckErr) {
            console.error("Error checking autorickshaw number uniqueness:", numCheckErr);
            return res.json({ status: "failed", message: "Error checking autorickshaw number uniqueness" });
          }

          // If an autorickshaw with the same number exists, return an error message
          if (numCheckData.length > 0) {
            console.log("Autorickshaw with the same number already exists");
            return res.json({ status: "failed", message: "Autorickshaw number already exists" });
          }

          // Check if the chassis number is unique
          const chassisNumberCheckSql = "SELECT * FROM autorickshaw WHERE chassis_number = ? AND `id` <> ?";
          db.query(
            chassisNumberCheckSql,
            [chassis_number, id],
            (chassisCheckErr, chassisCheckData) => {
              if (chassisCheckErr) {
                console.error("Error checking chassis number uniqueness:", chassisCheckErr);
                return res.json({ status: "failed", message: "Error checking chassis number uniqueness" });
              }

              // If an autorickshaw with the same chassis number exists, return an error message
              if (chassisCheckData.length > 0) {
                console.log("Autorickshaw with the same chassis number already exists");
                return res.json({ status: "failed", message: "উক্ত চেসিস নাম্বারটি পূর্বে ব্যবহৃত হয়েছে" });
              }

              // Check if the engine number is unique
              const engineNumberCheckSql = "SELECT * FROM autorickshaw WHERE engine_number = ? AND `id` <> ?";
              db.query(
                engineNumberCheckSql,
                [engine_number, id],
                (engineCheckErr, engineCheckData) => {
                  if (engineCheckErr) {
                    console.error("Error checking engine number uniqueness:", engineCheckErr);
                    return res.json({ status: "failed", message: "Error checking engine number uniqueness" });
                  }

                  // If an autorickshaw with the same engine number exists, return an error message
                  if (engineCheckData.length > 0) {
                    console.log("উক্ত ইঞ্জিন নাম্বারটি পূর্বে ব্যবহৃত হয়েছে");
                    return res.json({ status: "failed", message: "Engine number already exists" });
                  }

                  // Check if the vehicle registration number is unique
                  const vehicleRegNumCheckSql = "SELECT * FROM autorickshaw WHERE vehicle_registration_number = ? AND `id` <> ?";
                  db.query(
                    vehicleRegNumCheckSql,
                    [vehicle_registration_number, id],
                    (vehicleRegCheckErr, vehicleRegCheckData) => {
                      if (vehicleRegCheckErr) {
                        console.error("Error checking vehicle registration number uniqueness:", vehicleRegCheckErr);
                        return res.json({ status: "failed", message: "Error checking vehicle registration number uniqueness" });
                      }

                      // If an autorickshaw with the same vehicle registration number exists, return an error message
                      if (vehicleRegCheckData.length > 0) {
                        console.log("Autorickshaw with the same vehicle registration number already exists");
                        return res.json({ status: "failed", message: "উক্ত গাড়ি নিবন্ধন নাম্বারটি পূর্বে ব্যবহৃত হয়েছে" });
                      }

                      // If all checks pass, proceed with autorickshaw update
                      const updateAutorickshawSQL =
                        "UPDATE autorickshaw SET " +
                        "`autorickshaw_number` = ?, " +
                        "`autorickshaw_company` = ?, " +
                        "`vehicle_registration_number` = ?, " +
                        "`chassis_number` = ?, " +
                        "`engine_number` = ?, " +
                        "`autorickshaw_model` = ?, " +
                        "`driver_nid` = ?, " +
                        "`owner_nid` = ?, " +
                        "`autorickshaw_status` = ? " +
                        "WHERE `id` = ?";

                      const updateAutorickshawValues = [
                        autorickshaw_number,
                        autorickshaw_company,
                        vehicle_registration_number,
                        chassis_number,
                        engine_number,
                        autorickshaw_model,
                        driver_nid,
                        owner_nid,
                        autorickshaw_status,
                        id,
                      ];

                      db.query(updateAutorickshawSQL, updateAutorickshawValues, function (err, data) {
                        if (err) {
                          console.error("Error updating autorickshaw information: ", err);
                          return res.json({ status: "failed", message: "হালনাগাদ ব্যর্থ হয়েছে" });
                        }

                        console.log("Autorickshaw information updated successfully");
                        res.json({ status: "success", message: "অটোরিকশার তথ্য হালনাগাদ সফল হয়েছে" });
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
  });
});


// Getting Owner Database
app.get("/api/schedule", async (req, res) => {
  // Execute the query
  db.query("SELECT * FROM schedule", (queryErr, rows) => {
    if (queryErr) {
      console.error("Error fetching schedule data: ", queryErr);
      return res.json({ error: "Internal server error" });
    }

    res.json({ users: rows });
  });
});

// Getting Owner Database
app.get("/api/autorickshaw", async (req, res) => {
  // Execute the query
  db.query("SELECT autorickshaw_number FROM autorickshaw", (queryErr, rows) => {
    if (queryErr) {
      console.error("Error fetching owner data: ", queryErr);
      return res.json({ error: "Internal server error" });
    }

    res.json({ users: rows });
  });
});

app.delete("/deleteschedule/:id", (req, res) => {
  try {
    const scheduleId = req.params.id;
    const deleteAutorickshawQuery =
      "DELETE FROM autorickshaw_schedule WHERE schedule_id = ?";
    const deleteScheduleQuery = "DELETE FROM schedule WHERE id = ?";

    // Execute the SQL delete query for autorickshaw_schedule table
    db.query(
      deleteAutorickshawQuery,
      [scheduleId],
      (err, autorickshawResults) => {
        if (err) {
          console.error(
            "Error deleting associated autorickshaw_schedule records: ",
            err
          );
          return res.json(
            "Error deleting associated autorickshaw_schedule records"
          );
        }

        // Execute the SQL delete query for schedule table
        db.query(deleteScheduleQuery, [scheduleId], (err, scheduleResults) => {
          if (err) {
            console.error("Error deleting schedule: ", err);
            return res.json("Error deleting schedule");
          }
          res.json("success");
        });
      }
    );
  } catch (error) {
    console.error("Error deleting schedule: ", error);
    res.json("Error deleting schedule");
  }
});

app.put("/PermitAutorickshaw/:id", (req, res) => {
  const id = req.params.id;
  console.log("Received PUT request for autorickshaw with ID: " + id);

  // Set autorickshaw_status to 1
  const updateAutorickshawStatusSql =
    "UPDATE autorickshaw SET `autorickshaw_status` = 1 WHERE `id` = ?";

  const updateAutorickshawStatusValues = [id];

  console.log(
    "Updating autorickshaw status - SQL Query:",
    updateAutorickshawStatusSql
  );
  console.log(
    "Updating autorickshaw status - Values:",
    updateAutorickshawStatusValues
  );

  // Execute the update query
  db.query(
    updateAutorickshawStatusSql,
    updateAutorickshawStatusValues,
    (err, data) => {
      if (err) {
        console.error("Error updating autorickshaw status: ", err);
        return res.json("failed");
      }

      console.log("Autorickshaw status updated to 1 successfully");

      // Now, insert data into the permit table
      const permitData = {
        authority_name: req.body.authority_name,
        authority_position: req.body.authority_position,
        autorickshaw_number: req.body.autorickshaw_number,
        driver_name: req.body.driver_name,
        driver_nid: req.body.driver_nid,
        owner_name: req.body.owner_name,
        permit_endDate: req.body.permit_endDate,
        permit_startDate: req.body.permit_startDate,
      };

      const insertPermitSql = "INSERT INTO permit SET ?";

      console.log(
        "Inserting data into permit table - SQL Query:",
        insertPermitSql
      );
      console.log("Inserting data into permit table - Values:", permitData);

      // Execute the insert query
      db.query(insertPermitSql, permitData, (insertErr, insertData) => {
        if (insertErr) {
          console.error(
            "Error inserting data into the permit table: ",
            insertErr
          );
          return res.json("failed");
        }

        console.log(
          "Data inserted into the permit table successfully:",
          insertData
        );
        return res.json("permit_success");
      });
    }
  );
});

// Define a route to get the total number of drivers
app.get("/api/totalDrivers", (req, res) => {
  db.query(
    "SELECT COUNT(*) as total FROM driver WHERE driver_status = 1",
    (error, results) => {
      if (error) {
        console.error("Error querying MySQL: " + error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const totalDrivers = results[0].total;
        res.json({ totalDrivers });
      }
    }
  );
});

// Define a route to get the total number of drivers
app.get("/api/totalOwners", (req, res) => {
  db.query(
    "SELECT COUNT(*) as total FROM owner WHERE owner_status = 1",
    (error, results) => {
      if (error) {
        console.error("Error querying MySQL: " + error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const totalOwners = results[0].total;
        res.json({ totalOwners });
      }
    }
  );
});

// Define a route to get the total number of drivers
app.get("/api/totalautorickshaws", (req, res) => {
  db.query(
    "SELECT COUNT(*) as total FROM autorickshaw WHERE autorickshaw_status = 1",
    (error, results) => {
      if (error) {
        console.error("Error querying MySQL: " + error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const totalautorickshaws = results[0].total;
        res.json({ totalautorickshaws });
      }
    }
  );
});

app.put("/PermitDriver/:id", (req, res) => {
  const id = req.params.id;
  console.log("Received PUT request for driver with ID: " + id);

  // Get today's date
  const currentDate = new Date().toISOString().slice(0, 10); // Format: "YYYY-MM-DD"

  // Set driver_status to 1 and driver_permission_start_date to today's date
  const sql =
    "UPDATE driver SET `driver_status` = 1, `driver_permission_start_date` = ? WHERE `id` = ?";

  const values = [currentDate, id];

  console.log(values);
  console.log("SQL Query:", sql);
  console.log("Values:", values);

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error(
        "Error updating driver status and permission start date: ",
        err
      );
      return res.json("failed");
    }

    console.log(
      "Driver status updated to 1, and permission start date set to today's date"
    );
    return res.json("permit_success");
  });
});

app.put("/PermitOwner/:id", (req, res) => {
  const id = req.params.id;
  console.log("Received PUT request for owner with ID: " + id);

  // Set autorickshaw_status to 1
  const sql = "UPDATE owner SET `owner_status` = 1 WHERE `id` = ?";

  const values = [id];

  console.log(values);
  console.log("SQL Query:", sql);
  console.log("Values:", values);
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error updating owner status: ", err);
      return res.json("failed");
    }

    console.log("owner status updated to 1 successfully");
    return res.json("permit_success");
  });
});

app.put("/PermitManager/:id", (req, res) => {
  const id = req.params.id;
  console.log("Received PUT request for manager with ID: " + id);

  // Set autorickshaw_status to 1
  const sql = "UPDATE manager SET `manager_status` = 1 WHERE `id` = ?";

  const values = [id];

  console.log(values);
  console.log("SQL Query:", sql);
  console.log("Values:", values);
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error updating manager status: ", err);
      return res.json("failed");
    }

    console.log("manager status updated to 1 successfully");
    return res.json("permit_success");
  });
});

// Define a route to get driver information for a specific autorickshaw by NID
app.get("/api/driverInfoForAutorickshaw/:autorickshawNID", (req, res) => {
  const autorickshawNID = req.params.autorickshawNID;

  // Query the database to get the driver information based on the autorickshaw NID
  const query = `
    SELECT
      d.driver_nid,
      d.driver_date_of_birth,
      d.driver_houseNo,
      d.driver_postalCode,
      d.driver_address,
      d.driver_license_no,
      d.driver_firstName,
      d.driver_lastName,
      d.driver_status
    FROM
      driver AS d
    INNER JOIN
      autorickshaw AS a
    ON
      d.driver_nid = a.driver_nid
    WHERE
      a.autorickshaw_number = ? 
      AND a.autorickshaw_status = 1`;

  db.query(query, [autorickshawNID], (error, results) => {
    if (error) {
      console.error("Error querying MySQL: " + error);
      res.json({ error: "Internal Server Error" });
    } else {
      if (results.length === 0) {
        res.json({ error: "Driver not found for the selected autorickshaw." });
      } else {
        const driverInfo = results[0];
        res.json({ driverInfo });
      }
    }
  });
});
app.post("/insertmoney", (req, res) => {
  const { payment_date, driver_nid, payment_amount, autorickshaw_number } =
    req.body;

  // Parse payment_amount as a float
  const paymentAmountFloat = parseFloat(payment_amount);

  // Check if paymentAmountFloat is a valid number
  if (isNaN(paymentAmountFloat)) {
    // Handle the case where payment_amount is not a valid number
    console.error("Invalid payment_amount format");
    return res.json("failed");
  }

  // Fetch the driver's permission start date
  const fetchDriverPermissionStartDateSql =
    "SELECT driver_permission_start_date FROM driver WHERE driver_nid = ?";
  db.query(
    fetchDriverPermissionStartDateSql,
    [driver_nid],
    (fetchErr, fetchData) => {
      if (fetchErr) {
        console.error(
          "Error fetching driver_permission_start_date: ",
          fetchErr
        );
        return res.json("failed");
      }

      if (fetchData.length === 0) {
        console.error("Driver not found with driver_nid: ", driver_nid);
        return res.json("failed");
      }

      const driverPermissionStartDate =
        fetchData[0].driver_permission_start_date;

      // Calculate the number of days between today and driver_permission_start_date
      const currentDate = new Date();
      const permissionStartDate = new Date(driverPermissionStartDate);
      const daysDifference =
        Math.floor(
          (currentDate - permissionStartDate) / (1000 * 60 * 60 * 24)
        ) + 1;
      // Calculate the difference based on the new logic
      const difference = daysDifference * 25;

      if (difference < paymentAmountFloat) {
        console.error("Driver's payment due is less than the payment amount");
        return res.json({ status: "currentdueissmaller", difference });
      }

      // Insert payment information into the payment table
      const insertPaymentSql =
        "INSERT INTO payment (payment_date, driver_nid, payment_amount, autorickshaw_number) VALUES (?, ?, ?, ?)";
      const insertPaymentValues = [
        payment_date,
        driver_nid,
        paymentAmountFloat,
        autorickshaw_number,
      ];

      db.beginTransaction((err) => {
        if (err) {
          console.error("Transaction begin error: ", err);
          return res.json("failed");
        }

        db.query(
          insertPaymentSql,
          insertPaymentValues,
          (insertErr, insertData) => {
            if (insertErr) {
              // Rollback the transaction in case of an error
              db.rollback(() => {
                console.error(
                  "Error inserting payment information: ",
                  insertErr
                );
                return res.json("failed");
              });
            } else {
              // Commit the transaction on success
              db.commit((commitErr) => {
                if (commitErr) {
                  // Rollback the transaction in case of a commit error
                  db.rollback(() => {
                    console.error("Transaction commit error: ", commitErr);
                    return res.json("failed");
                  });
                } else {
                  // Recalculate the difference
                  const calculateTotalPaymentSql =
                    "SELECT SUM(payment.payment_amount) AS totalPayment " +
                    "FROM payment " +
                    "WHERE payment.driver_nid = ?";

                  db.query(
                    calculateTotalPaymentSql,
                    [driver_nid],
                    (calculationErr, calculationData) => {
                      if (calculationErr) {
                        console.error(
                          "Error calculating total payment: ",
                          calculationErr
                        );
                        return res.json("failed");
                      }

                      const totalPayment = calculationData[0].totalPayment;
                      const updatedDifference = difference - totalPayment;

                      console.log(
                        "Payment information inserted successfully",
                        updatedDifference,
                        totalPayment
                      );
                      return res.json({
                        status: "success",
                        difference: updatedDifference,
                      }); // Send the JSON response here
                    }
                  );
                }
              });
            }
          }
        );
      });
    }
  );
});

app.get("/api/permittedAutorickshaws", async (req, res) => {
  // Execute the query with a WHERE clause to filter by status
  db.query(
    "SELECT * FROM autorickshaw WHERE autorickshaw_status = 1",
    (queryErr, rows) => {
      if (queryErr) {
        console.error("Error fetching permitted autorickshaw data: ", queryErr);
        return res.json({ error: "Internal server error" });
      }

      res.json({ autorickshaws: rows });
    }
  );
});

// Getting Owner Database
app.get("/api/payment", async (req, res) => {
  // Execute the query
  db.query("SELECT * FROM payment", (queryErr, rows) => {
    if (queryErr) {
      console.error("Error fetching payment data: ", queryErr);
      return res.json({ error: "Internal server error" });
    }

    res.json({ users: rows });
  });
});

app.get("/api/autorickshawSchedule", async (req, res) => {
  // Execute a SQL query with a JOIN operation to retrieve all details
  const sqlQuery = `SELECT * FROM schedule`;

  db.query(sqlQuery, (queryErr, rows) => {
    if (queryErr) {
      console.error("Error fetching schedule data: ", queryErr);
      return res.json({ error: "Internal server error" });
    }

    res.json({ users: rows });
  });
});

app.get("/api/autorickshawSchedule/:id", async (req, res) => {
  const scheduleId = req.params.id;

  // Execute a SQL query with a JOIN operation to retrieve details for the specific schedule.id
  const sqlQuery = `
  SELECT
    sch.*,
    asch.* 
FROM autorickshaw_schedule as asch
INNER JOIN schedule as sch ON asch.schedule_id = sch.id
WHERE sch.id = ? AND asch.autorickshaw_status = 0;
`;

  db.query(sqlQuery, [scheduleId], (queryErr, rows) => {
    if (queryErr) {
      console.error("Error fetching schedule data: ", queryErr);
      return res.json({ error: "Internal server error" });
    }

    res.json({ data: rows });
  });
});
// Create a GET endpoint to retrieve all authority information
app.get("/api/authorityNID", (req, res) => {
  const query = "SELECT * FROM authority";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query: " + err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Send the retrieved authority data as a JSON response
      res.json(results);
    }
  });
});

// Create a GET endpoint to retrieve all authority information
app.get("/api/ManagerNID", (req, res) => {
  const query = "SELECT * FROM manager WHERE manager_status = 1";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query: " + err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Send the retrieved authority data as a JSON response
      res.json(results);
    }
  });
});

app.get("/api/admins", (req, res) => {
  const query = "SELECT * FROM user";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query: " + err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Send the retrieved authority data as a JSON response
      res.json(results);
    }
  });
});

app.post("/signup", (req, res) => {
  const adminNIDToCheck = req.body.admin_NID;

  // First, check if the NID already exists in the database
  const nidCheckSql = "SELECT * FROM user WHERE admin_info = ?";
  db.query(nidCheckSql, [adminNIDToCheck], (nidCheckErr, nidCheckData) => {
    if (nidCheckErr) {
      console.error("NID check error:", nidCheckErr);
      return res.status(500).json({ message: "Database error" });
    }

    if (nidCheckData.length > 0) {
      return res.json("NID already registered");
    }

    // First, check if the email already exists in the database
    const usernameCheckSql = "SELECT * FROM user WHERE username = ?";
    const usernameToCheck = req.body.admin_username;

    db.query(
      usernameCheckSql,
      [usernameToCheck],
      (usernameCheckErr, usernameCheckData) => {
        if (usernameCheckErr) {
          return res.json(usernameCheckErr);
        }

        // If there is a user with the same username, return a message
        if (usernameCheckData.length > 0) {
          console.log("username already registered");
          return res.json("username");
        }

        const sql =
          "INSERT INTO user (`authority_adminType`, `admin_info`, `name`, `username`, `password`) VALUES (?, ?, ?, ?, ?)";
        const values = [
          req.body.authority_adminType,
          req.body.admin_NID,
          req.body.admin_name,
          req.body.admin_username,
          req.body.admin_password,
        ];

        db.query(sql, values, (err, data) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json("Database error");
          }

          return res.json("success");
        });
      }
    );
  });
});

app.get("/api/paymentdue", async (req, res) => {
  // Execute the query to select driver_nid, payment_due, and total payment from driver and payment tables
  db.query(
    `
  SELECT
  driver.driver_nid,
  COALESCE(SUM(payment.payment_amount), 0) as total_payment,
  autorickshaw.autorickshaw_number,
  driver.driver_permission_start_date as permission_start_date,
  MAX(payment.payment_date) as last_payment_date
FROM driver
LEFT JOIN payment ON driver.driver_nid = payment.driver_nid
LEFT JOIN autorickshaw ON driver.driver_nid = autorickshaw.driver_nid
WHERE driver.driver_status = 1 AND autorickshaw.autorickshaw_status = 1
GROUP BY driver.driver_nid, autorickshaw.autorickshaw_number;
  `,
    (queryErr, rows) => {
      if (queryErr) {
        console.error("Error fetching payment data: ", queryErr);
        return res.json({ error: "Internal server error" });
      }

      res.json({ payments: rows });
    }
  );
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("error");
  } else {
    jwt.verify(token, "screet-token", (err, decoded) => {
      if (err) {
        return res.json("error");
      } else {
        req.id = decoded.id;
        next();
      }
    });
  }
};

app.get("/api/profile", verifyUser, (req, res) => {
  return res.json({ statusbar: "success", id: req.id });
});

app.get("/api/profileInfo/:id", (req, res) => {
  const id = req.params.id; // Get the id from the request parameters
  const query = "SELECT * FROM user WHERE id = ?"; // Modify the SQL query to fetch user data based on id

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error executing SQL query: " + err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.length === 0) {
        // If no user with the specified id is found, return a 404 Not Found response
        res.status(404).json({ error: "User not found" });
      } else {
        // Send the retrieved user data as a JSON response
        console.log(results[0]);
        res.json(results[0]); // Assuming you expect only one user with the given id
      }
    }
  });
});

// Create an API endpoint to update the user's password
app.post("/api/updatePassword/:id", (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  // Update the user's password in the database
  const query = "UPDATE user SET password = ? WHERE id = ?";

  db.query(query, [password, id], (err, result) => {
    if (err) {
      console.error("Error updating password: " + err.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows === 1) {
        // Password updated successfully
        res.json("success");
      } else {
        // No user with the provided ID found
        res.status(404).json({ error: "User not found" });
      }
    }
  });
});
app.get("/api/totalPayment", (req, res) => {
  // SQL query to calculate the total payment amount
  const sqlQuery = "SELECT SUM(payment_amount) as totalPayment FROM payment";

  // Execute the SQL query
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error executing SQL query: ", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    // Extract the total payment amount from the query result
    const totalPayment = result[0].totalPayment;

    // Send the total payment amount as a response
    res.json({ totalPayment });
  });
});
app.post("/associateAutorickshawToLatestSchedule", (req, res) => {
  const { autorickshaw_number } = req.body;

  // Set the time zone to Bangladesh
  const timeZone = "Asia/Dhaka";
  const currentTime = new Date().toLocaleTimeString("en-US", { timeZone });

  // Fetch the latest schedule ID from the schedule table
  const getLatestScheduleIDSql =
    "SELECT id FROM schedule ORDER BY id DESC LIMIT 1";

  db.query(getLatestScheduleIDSql, (err, results) => {
    if (err) {
      console.error("Error fetching latest schedule ID: ", err);
      return res.json({
        error: "Failed to associate autorickshaw to the schedule.",
      });
    }

    if (results.length === 0) {
      return res.json({ error: "No schedules found." });
    }

    const scheduleID = results[0].id;

    // Entry doesn't exist, insert it into the autorickshaw_schedule table
    const insertAutorickshawToScheduleSql =
      "INSERT INTO autorickshaw_schedule (schedule_id, autorickshaw_number, autorickshaw_schedule_time) VALUES (?, ?, ?)";
    const insertAutorickshawToScheduleValues = [
      scheduleID,
      autorickshaw_number,
      currentTime, // Add the current time here
    ];

    db.query(
      insertAutorickshawToScheduleSql,
      insertAutorickshawToScheduleValues,
      (insertErr, insertResults) => {
        if (insertErr) {
          console.error(
            "Error inserting autorickshaw to schedule: ",
            insertErr
          );
          return res.json({
            error: "Failed to associate autorickshaw to the schedule.",
          });
        }
        // Retrieve details of the latest schedule
        const getLatestScheduleDetailsSql =
          "SELECT * FROM schedule WHERE id = ?";
        const getLatestScheduleDetailsValues = [scheduleID];

        db.query(
          getLatestScheduleDetailsSql,
          getLatestScheduleDetailsValues,
          (detailsErr, detailsResults) => {
            if (detailsErr) {
              console.error(
                "Error fetching latest schedule details: ",
                detailsErr
              );
              return res.json({
                error: "Failed to retrieve schedule details.",
              });
            }

            if (detailsResults.length === 0) {
              return res.json({
                error: "No details found for the latest schedule.",
              });
            }

            // Details of the latest schedule
            const latestScheduleDetails = detailsResults[0];

            return res.json({ status: "success", latestScheduleDetails });
          }
        );
      }
    );
  });
});

app.get("/api/authority/:userId", (req, res) => {
  const userId = req.params.userId;

  console.log(userId);

  // Fetch the nid from the user table using the provided user ID
  const getUserNidQuery = "SELECT admin_info FROM user WHERE id = ?";

  db.query(getUserNidQuery, [userId], (getUserNidErr, userNidResults) => {
    if (getUserNidErr) {
      console.log("Error fetching user Nid: " + getUserNidErr.message);
      res
        .status(500)
        .json({ status: "error", message: "Internal Server Error" });
      return;
    }

    if (userNidResults.length === 0) {
      res.status(404).json({ status: "error", message: "User not found" });
      return;
    }

    const userNid = userNidResults[0].admin_info;

    console.log(userNid);

    // Fetch authority information using the nid from the authority table
    const getAuthorityInfoQuery =
      "SELECT * FROM authority WHERE authority_email = ?";

    db.query(
      getAuthorityInfoQuery,
      [userNid],
      (getAuthorityErr, authorityResults) => {
        if (getAuthorityErr) {
          console.log(
            "Error fetching authority information: " + getAuthorityErr.message
          );
          res
            .status(500)
            .json({ status: "error", message: "Internal Server Error" });
          return;
        }

        if (authorityResults.length === 0) {
          res.status(404).json({
            status: "error",
            message: "Authority information not found",
          });
          return;
        }

        console.log(authorityResults[0]);

        // Return authority information to the frontend
        res.json({ status: "success", authority: authorityResults[0] });
      }
    );
  });
});

// Endpoint to get driver info by driver_nid
app.get("/api/drivers/:driver_nid/name", (req, res) => {
  const driverNid = req.params.driver_nid;

  console.log(driverNid);

  // Query to retrieve driver info based on driver_nid
  const sql = "SELECT * FROM driver WHERE driver_nid = ?";

  db.query(sql, [driverNid], (error, results) => {
    if (error) {
      console.error("Error executing query: ", error);
      res.send("Internal Server Error");
    } else {
      if (results.length > 0) {
        console.log(results[0]);
        // Driver found
        return res.json(results[0]);
      } else {
        // Driver not found
        res.status(404).send("Driver not found");
      }
    }
  });
});

app.get("/api/permittedAutorickshawsForSchedule", (req, res) => {
  const getLatestScheduleIdSql =
    "SELECT MAX(id) AS latestScheduleId FROM schedule";

  db.query(getLatestScheduleIdSql, (err, rows) => {
    if (err) {
      console.error("Error fetching the latest schedule ID: ", err);
      return res.json({ error: "Failed to fetch the latest schedule ID." });
    }

    const latestScheduleId = rows[0].latestScheduleId;
    const getAvailableAutorickshawsSql =
      "SELECT * FROM autorickshaw " +
      "WHERE autorickshaw_status = 1 " +
      "AND (" +
      "    NOT EXISTS (" +
      "        SELECT * FROM autorickshaw_schedule " +
      "        WHERE autorickshaw_schedule.schedule_id = ? " +
      "        AND autorickshaw_schedule.autorickshaw_number = autorickshaw.autorickshaw_number" +
      "    )" +
      ")";

    db.query(
      getAvailableAutorickshawsSql,
      [latestScheduleId, latestScheduleId], // Pass the parameter twice
      (error, autorickshawRows) => {
        if (error) {
          console.error("Error fetching available autorickshaw data: ", error);
          return res.json({
            error: "Failed to fetch available autorickshaws.",
          });
        }
        res.json({ availableAutorickshaws: autorickshawRows });
      }
    );
  });
});

app.get("/api/latestSchedule", async (req, res) => {
  try {
    const scheduleData = await new Promise((resolve, reject) => {
      db.query(
        `
        SELECT s.*, a.*
        FROM schedule s
        LEFT JOIN autorickshaw_schedule a ON s.id = a.schedule_id
        WHERE s.id = (SELECT MAX(id) FROM schedule)
      `,
        (queryErr, rows) => {
          if (queryErr) {
            console.error("Error fetching latest schedule data: ", queryErr);
            reject("Internal server error");
          }
          resolve(rows);
        }
      );
    });

    res.json({ schedule: scheduleData });
  } catch (error) {
    res.json({ error });
  }
});

// Endpoint to get driver info by driver_nid
app.get("/api/owners/:owner_nid/name", (req, res) => {
  const driverNid = req.params.owner_nid;

  console.log(driverNid);

  // Query to retrieve driver info based on owner_nid
  const sql = "SELECT * FROM owner WHERE owner_nid = ?";

  db.query(sql, [driverNid], (error, results) => {
    if (error) {
      console.error("Error executing query: ", error);
      res.status(500).send("Internal Server Error");
    } else {
      if (results.length > 0) {
        console.log(results[0]);
        // Driver found
        return res.json(results[0]);
      } else {
        // Driver not found
        res.status(404).send("Driver not found");
      }
    }
  });
});

// Create a GET endpoint to retrieve all authority information
app.get("/api/permission", (req, res) => {
  const query = "SELECT * FROM permit";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing SQL query: " + err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Send the retrieved authority data as a JSON response
      res.json(results);
    }
  });
});

app.post("/updateschedule", (req, res) => {
  const { schedule_date, schedule_round, schedule_place, schedule_time } =
    req.body;

  db.beginTransaction((beginErr) => {
    if (beginErr) {
      console.error(beginErr);
      return res.json({ error: "Failed to update schedule." });
    }

    // Check if the data already exists in the "schedule" table
    const checkScheduleSql =
      "SELECT id FROM schedule WHERE schedule_date = ? AND schedule_round = ? AND schedule_place = ? AND schedule_time = ?";
    const checkScheduleValues = [
      schedule_date,
      schedule_round,
      schedule_place,
      schedule_time,
    ];

    db.query(
      checkScheduleSql,
      checkScheduleValues,
      (checkErr, checkResults) => {
        if (checkErr) {
          console.error(checkErr);
          return db.rollback(() =>
            res.json({ error: "Failed to update schedule." })
          );
        }

        if (checkResults.length > 0) {
          // Entry already exists, return an error
          db.rollback(() => res.json({ error: "Duplicate schedule entry." }));
        } else {
          // Data does not exist in the "schedule" table, so insert it
          const insertScheduleSql =
            "INSERT INTO schedule (schedule_date, schedule_round, schedule_place, schedule_time) VALUES (?, ?, ?, ?)";
          const insertScheduleValues = [
            schedule_date,
            schedule_round,
            schedule_place,
            schedule_time,
          ];

          db.query(
            insertScheduleSql,
            insertScheduleValues,
            (insertErr, insertData) => {
              if (insertErr) {
                console.error(insertErr);
                return db.rollback(() =>
                  res.json({ error: "Failed to update schedule." })
                );
              }

              db.commit((commitErr) => {
                if (commitErr) {
                  console.error(commitErr);
                  return db.rollback(() =>
                    res.json({ error: "Failed to update schedule." })
                  );
                }

                return res.json("success");
              });
            }
          );
        }
      }
    );
  });
});
app.post("/handlestatus", (req, res) => {
  const { autorickshaw_number } = req.body;

  // Fetch the latest schedule ID from the schedule table
  const getLatestScheduleIDSql =
    "SELECT id FROM schedule ORDER BY id DESC LIMIT 1";

  db.query(getLatestScheduleIDSql, (err, results) => {
    if (err) {
      console.error("Error fetching latest schedule ID: ", err);
      return res.json({
        error: "Failed to associate autorickshaw to the schedule.",
      });
    }

    if (results.length === 0) {
      return res.json({ error: "No schedules found." });
    }

    const scheduleID = results[0].id;

    // Entry doesn't exist, insert it into the autorickshaw_schedule table
    const insertAutorickshawToScheduleSql =
      "INSERT INTO autorickshaw_schedule (schedule_id, autorickshaw_number, autorickshaw_status) VALUES (?, ?, 1)";
    // Add autorickshaw_status value of 1 to the query
    const insertAutorickshawToScheduleValues = [
      scheduleID,
      autorickshaw_number,
    ];

    db.query(
      insertAutorickshawToScheduleSql,
      insertAutorickshawToScheduleValues,
      (insertErr, insertResults) => {
        if (insertErr) {
          console.error(
            "Error inserting autorickshaw to schedule: ",
            insertErr
          );
          return res.json({
            error: "Failed to associate autorickshaw to the schedule.",
          });
        }

        // Retrieve details of the latest schedule
        const getLatestScheduleDetailsSql =
          "SELECT * FROM schedule WHERE id = ?";
        const getLatestScheduleDetailsValues = [scheduleID];

        db.query(
          getLatestScheduleDetailsSql,
          getLatestScheduleDetailsValues,
          (detailsErr, detailsResults) => {
            if (detailsErr) {
              console.error(
                "Error fetching latest schedule details: ",
                detailsErr
              );
              return res.json({
                error: "Failed to retrieve schedule details.",
              });
            }

            if (detailsResults.length === 0) {
              return res.json({
                error: "No details found for the latest schedule.",
              });
            }

            // Details of the latest schedule
            const latestScheduleDetails = detailsResults[0];

            return res.json({ status: "success", latestScheduleDetails });
          }
        );
      }
    );
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
