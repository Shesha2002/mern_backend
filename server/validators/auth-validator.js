const { z }=require("zod");


//now we will create schema for registration

const signupSchema=z.object({
    username:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be at least of 3 chars"})
    .max(255,{message:"Nmae must not br more than 255 charatcter"}),

    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"email must be at least of 3 chars"})
    .max(255,{message:"email must not br more than 255 charatcter"}),

   phone:z
    .string({required_error:"phone is required"})
    .trim()
    .min(10,{message:"phone must be at least of 10 chars"})
    .max(20,{message:"phone must not be more than 20 charatcter"}),

  password:z
    .string({required_error:"password is required"})
    
    .min(7,{message:"password must be at least of 7 chars"})
    .max(1024,{message:"password must not be more than 1024 charatcter"}),
   
    

    
});

module.exports=signupSchema;