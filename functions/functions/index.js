const functions = require('firebase-functions');
const admin = require('firebase-admin');
var serviceAccount = require("./healthjournalPermission.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://healthcare-cda23.firebaseio.com"
});
const express = require('express');
const garmin = express();
const db = admin.database();
const fs = admin.firestore();

const cors = require('cors');
garmin.use( cors( {origin:true} ) );


//Post

//Dailies
garmin.post('/api/dailies', (req, res) => {
    (async () => {
        try
        {
            const dataArray = req.body.dailies;
            
            for(let data of dataArray) {
                console.log('dailies', req.body.dailies);
                cred = db.ref(`users/${data.userId}/garmin/${data.calendarDate}`);
                cred.update({dailies: data});
            }

            return res.status(200).send();
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//activities
garmin.post('/api/activities', (req, res) => {

    (async () => {

        try
        {
            const dataArray = req.body.activities;
            for(let data of dataArray) {
                console.log('activities', req.body.activities);
                cred = db.ref(`users/${data.userId}/garmin/${data.calendarDate}`);
                cred.update({activities: data});
            }

            return res.status(200).send();
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//epochs
garmin.post('/api/epochs', (req, res) => {

    (async () => {

        try
        {
            const dataArray = req.body.epochs;
            for(let data of dataArray) {
                console.log('epochs', req.body.epochs);
                cred = db.ref(`users/${data.userId}/garmin/${data.calendarDate}`);
                cred.update({epoch: data});
            }

            return res.status(200).send();
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//sleep
garmin.post('/api/sleeps', (req, res) => {
    (async () => {
        try
        {
            const dataArray = req.body.sleeps;
            for(let data of dataArray) {
                console.log('sleeps', req.body.sleeps);
                cred = db.ref(`users/${data.userId}/garmin/${data.calendarDate}`);
                cred.update({sleeps: data});
            }

            return res.status(200).send();
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//bodyComps
garmin.post('/api/bodyComps', (req, res) => {
    (async () => {
        try
        {
            const dataArray = req.body.bodyComps;
            for(let data of dataArray) {
                console.log('bodyComps', req.body.bodyComps);
                cred = db.ref(`users/${data.userId}/garmin/${data.calendarDate}`);
                cred.update({bodyComps: data});
            }

            return res.status(200).send();
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//stressDetails
garmin.post('/api/stressDetails', (req, res) => {
    (async () => {
        try
        {
            const dataArray = req.body.stressDetails;
            for(let data of dataArray) {
                console.log('stressDetails', req.body.stressDetails);
                cred = db.ref(`users/${data.userId}/garmin/${data.calendarDate}`);
                cred.update({stressDetails: data});
            }

            return res.status(200).send();
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//userMetrics
garmin.post('/api/userMetrics', (req, res) => {
    (async () => {
        try
        {
            const dataArray = req.body.userMetrics;
            for(let data of dataArray) {
                console.log('userMetrics', req.body.userMetrics);
                cred = db.ref(`users/${data.userId}/garmin/${data.calendarDate}`);
                cred.update({userMetrics: data});
            }

            return res.status(200).send();
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//pulseOX
garmin.post('/api/pulseOX', (req, res) => {

    (async () => {

        try
        {
            const dataArray = req.body.pulseox;
            for(let data of dataArray) {
                console.log('dailies', req.body.pulseox);
                cred = db.ref(`users/${data.userId}/garmin/${data.calendarDate}`);
                cred.update({pulseox: data});
            }
            return res.status(200).send();
        }
        catch (error)
        {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});




//Get

garmin.get('/api/read/:id', (req,res) => {
    (async () =>{
        try {
            const document = fs.collection('users').doc(req.params.id).collection('garmin').doc(new Date().toDateString());
           // document = db.ref('users'+req.params.id);
            let users = await document.get();
            let response = users.data();
            console.log(response);

            return res.status(200).send(response);
        } catch (error){
            console.log(error);
            return res.status(500).send(error);
        }
    })();
})


//Export the api to Firebase Cloud Functions
exports.garmin = functions.https.onRequest(garmin);
