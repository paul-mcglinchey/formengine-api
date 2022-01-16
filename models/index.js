const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.form = require('./form.model.js');

module.exports = db;