const mongoose=require("mongoose");


//do not give space inside " "quotes
const URI=process.env.MONGODB_URI;
//mongoose.connect(URI);


//we connected the database in form of promise
const connectDb=async()=>{
    try{
await mongoose.connect(URI);
console.log("connecction succesful to database")
    }
 
catch(error){
    console.error("database connection failed");
    process.exit(0);
}
};

module.exports=connectDb;