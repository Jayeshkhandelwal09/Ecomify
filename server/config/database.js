const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async()=>{
    await mongoose.connect(process.env.MONGODB_URL)
    .then(()=> console.log("DB connected Successfully"))
    .catch((err)=> {
        console.log(err)
        console.error(err)
        process.exit(1)
    })
}

module.exports = connectDb;