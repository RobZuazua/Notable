/*
Author: Robbie Zuazua
Date: 10/16/18
Info: Notable Calendar Challenge Backend
*/
const express = require('express');
const path = require('path');
const app = express();

// Simple Datastore 
const physicians = ["Robbie","Jannet"];
const patients = [
    {
        "physician":"Robbie",
        "patients": [{"patient":"nick","time":"8:00AM","Kind":"New Patient"},
                    {"patient":"mario","time":"9:00AM","Kind":"Follow-Up"},
                    {"patient":"castro","time":"10:00AM","Kind":"New Patient"}],
    },
    {
        "physician":"Jannet",
        "patients": [{"patient":"leslie","time":"8:00AM","Kind":"New Patient"},
                    {"patient":"milena","time":"9:00AM","Kind":"New Patient"}],
    },
]

// Middleware for CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Get List of Physicians
app.get('/api/getPhysicians', (req,res) =>{ 
    console.log("Sent physcian list");
    res.json(physicians);
});

// Get List of Patients for Specific Physician
app.get('/api/getPatients/:physician', (req,res) =>{ 
    let curPhysician = req.params.physician;
    let curPatients = patients.filter(patient => patient.physician === curPhysician);
    res.json(curPatients);
});

app.get('/', (req,res) =>{ 
   res.send('api for notable calendar challenge');
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);