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
      console.log ("Email already registered");
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

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
