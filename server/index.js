const express=require("express");
const app=express()
const bodyparser=require("body-parser")
const morgan=require("morgan")
const cors=require("cors")
const { connect } = require("mongoose");

// import roytes 
const auth=require("./routers/auth")
// body parser 

// databse connextion 
const {DB}=require("./config/index")
connect(
  DB,
  { useFindAndModify: true, useUnifiedTopology: true, useNewUrlParser: true },
  (err, res) => {
    if (err) {
      throw err;
    }
    console.log("DB Connected");
  }
);

app.use(bodyparser.urlencoded({extended:false}))



app.use(morgan("dev"));
app.use(cors())

app.use("/api/v1/",auth)

app.use("/this",(req,res)=>{
   return res.json("amit ria")
})

console.log((process.env.NODE_ENV));

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{console.log(`App rinning on Port ${PORT}`)})