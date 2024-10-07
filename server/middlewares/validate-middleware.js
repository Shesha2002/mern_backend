//the schema we created in authvalidator will be validate  

//const { schema } = require("zod");

//using the middle ware
const validate=(schema)=> async (req,res,next)=>{
try{

    //this line find whether our parsed data is valid or not
    const parseBody=await schema.parseAsync(req.body);
    //if valid parsed data is stored in req.body
    req.body=parseBody;
    next();
}
catch(err){
    //two variables for error middleware that is status and message
     const status=422;
    const message="FILL THE INPUT PROPERLY";
    const extraDetails= err.errors[0].message;

     //create object const error
    const error={
        status,
        message,
        extraDetails,
    }
   
    console.log(error);
   // res.status(400).json({msg:message});
   next(error);
}
};

module.exports=validate;