const User=require("../models/user-model");
//bcrypt package for secure passwords
const bcrypt=require("bcryptjs");
//this home page need to be routed by /api/auth/register
const home=async (req,res)=>{
    try{
res.status(200)
.send("this is home page");

    }
    catch(error){
 console.log(error);
    }
}

//registration logic

//steps for user registration

/*
1.get registration data 
2.check whether email exist or not
3.hash the password
4.create userschema
5.save to database 
6.respond by registration succesful 
*/
const register=async (req,res)=>{
    try{
        //req.body fetches data from body section here it its written in postman section
       console.log(req.body);

       //use data from userschema to for post request
       const{username,email,phone,password}=req.body;
 

       //here below first email is the field and second is actual email
       const userExist=await User.findOne({ email });

       if(userExist){
       return  res.status(400).json({msg:"email already exists"});
       }

       //if it is new entry of user save its password by hashing

      /**
        const saltRound=10;//it defines complexity of hashed password and adds more randomness 
       
       const hash_password=await bcrypt.hash(password,saltRound);

      const userCreated=await User.create({username,email,phone,password:hash_password,});
       res.status(200).json({msg:userCreated});
       */

       //above can repalced by using pre method in user-model

       //when user is created token is created
       const userCreated=await User.create({
        username,
        email,
        phone,
        password,
    });
       res.status(201).json({
        msg:"registration succesful",
        token: await userCreated.generateToken(),
        userId:userCreated._id.toString(),
    });
    }
    catch(error){
        res.status(500).json("internal server error");
    }
}


//user Login logic
const login=async (req,res)=>{
    try{
const {email,password}=req.body;

const userExist=await User.findOne({email});
console.log(userExist);

if(!userExist){
    return res.status(400).json({message:"Invalid Credentials"});
}

//instead of comparing pass word in controlle r we can create function in model and acces it here
// const user=await bcrypt.compare(password,userExist.password);
const user=await userExist.comparePassword(password);
//this method of compare password will be created in usermodel 


if(user){
    res.status(200).json({
        msg:"Login  succesful",
        token: await userExist.generateToken(),
        userId:userExist._id.toString(),
    });
}
else{
    res.status(401).json({message:"INVALID CREDENTIALS"});
}
    }
    catch(error){
       // res.status(500).json("internal server error")
       next(error);//as a part of error middleware
    }
};
module.exports={home,register,login};
