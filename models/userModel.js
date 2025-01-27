import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
 name : String,
 emailId : {type : String,
    unique :true,
    required :true
 },
 password : {
    type : String,
    required :true,
    minLength :8
 },
 
 contactNumber : {
    type :String,
    required:true,
    minLength :10,
    maxLength :10
 },
 location : String,
 
 profileImg : {
  type : String,
 },
 
 isActive :{
    type :Boolean,
    default:true
 }
})

export const User = mongoose.model('User', userSchema);


