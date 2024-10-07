
require("dotenv").config();
const express =require("express");
const app=express();
const authRoute=require("./router/auth-router");
const contactRoute=require("./router/contact-router");
const connectDb=require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const contactForm = require("./controllers/contact-controller");


app.use(express.json());


app.use("/api/auth",authRoute);
app.use("/api/form/",contactRoute);

app.use(errorMiddleware);



 //request for home page route page
/**
 * 
 * app.get("/",(req,res)=>{
    res.status(200).send("welcome to mern");
})

//creating another route
app.get("/register",(req,res)=>{
    res.status(200).send("register here");
})
 */

//THIS Can also be replaced with routes  in our route file





//creating port to listen request
const PORT=5000;

//we connected to databse in form of promise
connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on the port:${PORT}`);
    })
})


