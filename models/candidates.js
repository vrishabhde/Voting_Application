import mongoose from "mongoose";
import { Schema } from "mongoose";


const newcandidate = new Schema({
    candidate_name:{
        type: String,
        required: true        
    },
    users_voted:{
        type: Array,
        required: true,
        unique: true
    }
});

mongoose.model("Candidates", newcandidate)