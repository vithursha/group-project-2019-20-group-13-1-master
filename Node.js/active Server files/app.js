const express = require('express');
const mysql1 = require('../mongodbtest/database');
const mysql = require('mysql');


// Create connection
var db = mysql1.con;


const app = express();


app.get('/destinations', (req, res) => {
// get all destinations
    let sql = 'SELECT * FROM destinations';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);


    });

});

app.get('/destinations/:id', (req, res) => {
// Get specific dest_ID from the database
    let sql = `SELECT * FROM destinations WHERE dest_id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) console.log('Please enter the correct id');
        res.send(result);
        console.log("User searched" + " " + req.params.id);

    });

});
app.get('/Search/:keyword1/:keyword2/:keyword3', (req, res) => {
// Search for the keywords where keyword 1 or 2 or 3 = parameter 1, 2 and 3
    let sql = `SELECT * FROM Countries WHERE Keyword1 ="${req.params.keyword1}" OR Keyword2 = "${req.params.keyword1}" OR Keyword3 = "${req.params.keyword1}" AND  Keyword1 = "${req.params.keyword2}" OR Keyword2 = "${req.params.keyword2}" OR Keyword3 = "${req.params.keyword2}" AND Keyword1 = "${req.params.keyword3}" OR Keyword2 = "${req.params.keyword3}" OR Keyword3 = "${req.params.keyword3}" ORDER BY RAND() `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
        console.log("User searched" + " " + req.params.keyword1 + " " + req.params.keyword2 + " " + req.params.keyword3);

    });

});

app.get('/Search/:keyword1/:keyword2', (req, res) => {
   // Two keywords search
    let sql = `SELECT * FROM Countries WHERE Keyword1 ="${req.params.keyword1}" OR Keyword2 = "${req.params.keyword1}" OR Keyword3 = "${req.params.keyword1}" AND Keyword1 = "${req.params.keyword2}" OR Keyword2 = "${req.params.keyword2}" OR Keyword3 = "${req.params.keyword2}" ORDER BY RAND() `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
        console.log("User searched" + " " + req.params.keyword1 + " " + req.params.keyword2 );

    });

});
app.get('/Search/:keyword1', (req, res) => {
    // One keyword search
     let sql = `SELECT * FROM Countries WHERE Keyword1 ="${req.params.keyword1}" OR Keyword2 = "${req.params.keyword1}" OR Keyword3 = "${req.params.keyword1}" ORDER BY RAND() `;
     db.query(sql, (err, result) => {
         if (err) throw err;
         res.send(result);
         console.log("User searched" + " " + req.params.keyword1);

     });

 });
 app.get('/Weather/:country1', (req, res) => {
    // Search for a specific country's weather
     let sql = `SELECT weather FROM Countries WHERE Country = "${req.params.country}" `;
     db.query(sql, (err, result) => {
         if (err) throw err;
         res.send(result);
         console.log("User searched" + " " + req.params.country);
     });

 });

 app.get('/Summary/:country1', (req, res) => {
    // Search for a specific country summary
     let sql = `SELECT Summary FROM Countries WHERE Country = "${req.params.country1}" `;
     db.query(sql, (err, result) => {
         if (err) throw err;
         res.send(result);
         console.log("User searched" + " " + req.params.country1);

     });

 });
 app.get('/Attractions/:country1', (req, res) => {
    // Search for attractions for a specific country
     let sql = `SELECT Attractions FROM Countries WHERE Country = "${req.params.country1}" `;
     db.query(sql, (err, result) => {
         if (err) throw err;
         res.send(result);
         console.log("User searched" + " " + req.params.country1);

     });

 });

 app.post('/Rating/:rating/:comment', (req, res) => { // rating_id , ratingvalue , comments, pk: rating_id
    // Search for attractions for a specific country
     let sql = `INSERT INTO rating(ratingvalue, comments) VALUES (${req.params.rating} , "${req.params.comment}") `;
     db.query(sql, (err, result) => {
         if (err) throw err;
         res.send(result);
         console.log("User rated" + " " + req.params.rating + " " + req.params.comment);

     });

 });







const port = process.env.PORT || 3000;

app.listen(port, () => {

console.log(`Server started on port ${port}`);
});

