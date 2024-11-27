const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    age:{
        type:Number
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    gender:{
        type:String
    },
})
 
module.exports = mongoose.model("User",userSchema)