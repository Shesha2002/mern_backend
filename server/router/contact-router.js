const express=require("express");
const router=express.Router();
const contactForm=require("../controllers/contact-controller");

//create route
router.route("/contact").post(contactForm);

module.exports=router;