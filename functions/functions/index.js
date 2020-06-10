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
            console.log('dailies', {dataArray}); // req.body.dailies[0].userId);
            
            for(let data of dataArray) {
                cred = db.ref(`users/${data.userId}/garmin/${data.calendarDate}`);
                cred.set({dailies: data}, {merge: true});
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

//stress
garmin.post('/api/epoch', (req, res) => {

    (async () => {

        try
        {
            const dataArray = req.body.epoch;
            console.log('epoch', {dataArray});
            for(let data of dataArray) {
                cred = db.ref(`users/${data.userId}/garmin/${data.calendarDate}`);
                cred.set({epoch: data}, {merge: true});
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
            console.log('sleeps', {dataArray});
            for(let data of dataArray) {
                cred = db.ref(`users/${data.userId}/garmin/${data.calendarDate}`);
                cred.set({sleeps: data}, {merge: true});
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
            console.log('pulseOX', {dataArray});
            for(let data of dataArray) {
                cred = db.ref(`users/${data.userId}/garmin/${data.calendarDate}`);
                cred.set({pulseox: data}, {merge: true});
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
