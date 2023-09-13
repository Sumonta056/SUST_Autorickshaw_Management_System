const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sarms'

});

app.post('/signup', (req, res) => {

    const sql = 'INSERT INTO user (`name`, `email`, `password`) VALUES (?)';
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    
    db.query(sql, [values], (err, data) => {

        console.log(values);

        if(err) return res.json(err);

        return res.json(data);

        
    })
});


app.listen(3001 , ()=>{
    console.log("Server is running on port 8081");
}) 