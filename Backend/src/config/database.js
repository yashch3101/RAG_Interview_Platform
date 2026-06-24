const mongoose = require("mongoose");

async function connectToDB() {

    try { 
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Connected to MongoDB")
    }
    catch (err) {
        console.error(err);
    }
}

module.exports = connectToDB;