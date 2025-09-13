require('dotenv').config();
const app = require("./src/App");
const connectDB = require('./src/DB/db');

connectDB();


app.listen(3000,()=>{
    console.log("server running on port 3000")
})