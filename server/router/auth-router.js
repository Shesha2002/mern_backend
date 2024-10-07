const express=require("express");
const router=express.Router();
//this below can also be in one {}
//but it can become lengthy so use one function and use dot operator to asses
/**
 const {home}=require("../controllers/auth-controller");
const {register}=require("../controllers/auth-controller");
 */

//here we have given name authcontrolles to all entirties as home ,login,resister
const authcontrollers=require("../controllers/auth-controller");
const signupSchema=require("../validators/auth-validator");
const validate=require("../middlewares/validate-middleware");


/*
router.get("/",(req,res)=>{
res.status(200).send("this is via router methos")
})*/

//can also give as 
/**
 * router.route("/").get((req,res)=>{
res.status(200).send("this is via rote methos");
})
 */

//as we have used controllers we can write home as
router.route("/").get(authcontrollers.home);

//creating ressgistration page ruote
/**
 router.route("/register").get((req,res)=>{
    res.status(200).send("register here");
})
 */

//as we have created controlles we can write register as
//before server give message of registration completon need to validate data using Validate middleware
router
.route("/register")
.post(validate(signupSchema), authcontrollers.register);

router.route("/login").post(authcontrollers.login);


module.exports=router;