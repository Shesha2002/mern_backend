//import schema with monggooose as we play wiht data of contact form
const {Schema,model,default:mongoose}=require("mongoose");


//create contact schema
const contactSchema=new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
   message:{type:String,required:true},
});

//create contact model/collection as we created User as model for registration

const Contact=new model("contact",contactSchema);

module.exports=Contact;