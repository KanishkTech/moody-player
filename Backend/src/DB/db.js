const mongoose = require('mongoose')

function connectDB(){

        try {
            mongoose.connect(process.env.MONGODB_URI).then(()=>{
                console.log("Connected to Server")
            })
        } catch (error) {
            console.log("Something went wrong",error)
        }
}

module.exports = connectDB;