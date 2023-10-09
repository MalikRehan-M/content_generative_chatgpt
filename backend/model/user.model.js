const mongoose=require("mongoose")

//user schema
const userSchema=mongoose.Schema({
    firtName: String,
    lastName: String,
    email: String,
    pass: String,
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}