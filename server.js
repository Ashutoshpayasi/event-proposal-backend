require('dotenv').config();

const express= require("express")
const cors = require("cors");
//const app = express();
var path = require('path');
const mongoose= require("mongoose")
const app =express();
//app.use(express.static("public"));
const signingRoutes = require("./Routes/signing");
const proposalRoutes = require('./Routes/proposal')
const userRoutes = require('./Routes/user')

//const multer = require('multer');
//const bodyParser = require('body-parser');
//const upload = multer();
app.use(cors({
    origin: "*"
}))
app.use(express.json())

//app.use(express.urlencoded({extended:true}))
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended : false}))
app.use('/',express.json(),signingRoutes);
app.use('/',proposalRoutes);
app.use('/', userRoutes)



const PORT = 5000;
const URL = process.env.DB_URL

mongoose.connect(URL).then(()=>console.log("Database connected successfullly"))
.catch((err)=>console.log("connection failed",err.message))
   
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
  })

 // console.log("****")
  
  






