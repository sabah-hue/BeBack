import mongoose, { Schema } from "mongoose";

const interviewSchema = new mongoose.Schema({
    interviewee: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    interviewer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {type: Date, required: true},
    contactEmail: {type: String, required: true},
    technology: {type: String, required: true},
},{timestamps:true});

const interviewModel = mongoose.model('Interview' , interviewSchema);
export default interviewModel;
