const Patient = require("../models/patient");
const fs = require('fs');
const _ = require('lodash');

let rawData = fs.readFileSync('C:/Users/Akshaypratap/Downloads/data-LkyqKWXDL8HOcOrPjAdy9.json');
let patientData = JSON.parse(rawData);

async function savePatientData(data) {
    let uniquePatientData = _.uniqBy(data, 'name');

    for (let patient of uniquePatientData) {
        patient.jwtInfo = {};
        patient.jwtInfo.jwtId = req.body.jwtInfo.jwtId;
        await Patient.addPatient(patient);
    }
}

savePatientData(patientData);

