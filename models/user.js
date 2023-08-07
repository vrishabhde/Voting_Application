import mongoose from "mongoose";
import { Schema } from "mongoose";


const newuser = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    voted:{
        type:Boolean,
        default:false
    },
    isadmin:{
        type:Boolean,
        default:false
    }

});

export default mongoose.model("Users", newuser);