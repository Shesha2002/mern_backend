//import model created incontact-model
const Contact=require("../models/contact-model");

//create contactfrom with its main logic

const contactForm=async(req,res)=>{
    try{
        //the response we get by post req stored in body
const response=req.body;
await Contact.create(response);
return res.status(200).json({message:"message send succesfully"})
    }
    catch(error){
return res.status(500).json({message :"message not delivered"})
    }
}

module.exports=contactForm;