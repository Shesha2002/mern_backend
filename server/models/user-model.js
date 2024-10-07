//here we play with data hence import of mongoose is required
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

//SCHEMA>> it defines structure of your collection or document means what parameters will it have
const userSchema=new mongoose.Schema({
username:{
    type:String,
    require:true,
},

email:{
    type:String,
    required:true,
},

phone:{
    type:String,
    required:true,
},

password:{
    type:String,
    required:true,
},

isAdmin:{
    type:Boolean,
    default:false,
},

});

//secure password is created insode user-model using pre-method

userSchema.pre('save',async function(next){
//console.log("pre method", this);
const user=this;

if(!user.isModified("password")){
    next();//next meaans if no modified new then save
}

try{
const saltRound=await bcrypt.genSalt(10);
const hash_password=await bcrypt.hash(user.password,saltRound);
user.password=hash_password;
}
catch(error){
    next(error);
}
})


//for comparing gpassword we will create function here
userSchema.methods.comparePassword=async function(password){
return  bcrypt.compare(password,this.password);
};


//json web token method instanc creation
//
userSchema.methods.generateToken= async function(){
try{
    //for signinng need to pass the data of payload
    return jwt.sign({
      userId:this.id.toString(),
      email:this.email,
      isAdmin:this.isAdmin,
    },
    //the secret key is declared in .env file here it will be called
    process.env.JWT_SECRET_KEY,
    {
        expiresIn:"30d",
    }
);

}
catch(error){
    console.error(error);
}
}


//MODEL >>schema ke basis per database ke sath operations perform karata he it is like object to perfoem operation on database


const User=new mongoose.model("User",userSchema);

module.exports=User;