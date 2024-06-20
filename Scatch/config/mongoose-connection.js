const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');

// connect to database
mongoose
    .connect(`${config.get("MONGODB_URI")}/scatch`)
    .then(() => {
        dbgr('Connected to database');
    })
    .catch((err) => {
        dbgr('Error connecting to database', err);
    })

module.exports = mongoose.connection;