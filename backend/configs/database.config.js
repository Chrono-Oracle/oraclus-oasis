const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI


const connect = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        return true;
    } catch (error) {
        console.error("Database connection error: ", error);
        return false;
    }
}

module.exports = { connect }