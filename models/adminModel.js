import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
 name : String,
 emailId : {type : String,
    unique :true,
    required :true
 },
 password : {
    type : String,
    required :true,
    min :8
 },
 contactNumber : {
    type :String,
    required:true,
    max :10
 },
 profileImg : {
  type : String,
 },
 
 isActive :{
    type :Boolean,
    default:true
 },
 role :{
     type : String,
     enum : ["admin" , "theatre_admin"],
     default : "theatre_admin"
  }
})

export const Admin = mongoose.model('Admin', adminSchema);


