const express=require("express")
const app=express()
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();
app.use(bodyParser.json());
app.use(express.json());
const studentRoute = require("./routes/student");
const userRoute=require("./routes/user");





const MONGODB_URI = process.env.MONGO_URL||"mongodb+srv://chubinidzekhatia6:chubinidzekhatia@cluster0.jpfmufi.mongodb.net/journal?retryWrites=true&w=majority" 
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

  app.use(bodyParser.json({limit: '50mb'}));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 50000,
  }),
);

  app.use("/", studentRoute);
  app.use("/", userRoute);

  app.get('/', (req, res) => {
    res.status(200).send("get request")
  });
  app.get('/favicon.ico', (req, res) => {
    res.send("get favicon")
  });


app.listen(5002,()=>{
    console.log("backend server is running");
})