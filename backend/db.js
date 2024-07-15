const mongoose = require('mongoose');
const scheduledFunctions = require('./scheduledFunctions/scheduleCoinData');

require('dotenv').config();

mongoose.connect(process.env.mongo_URL).then(
    () => {
        console.log('connected to database');
        scheduledFunctions.initScheduledJobs();
    }
)
.catch((error) => {
    console.log('Could not connect to database: ' + error)
})