import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    messages:[{type:Schema.Types.ObjectId,ref:'Message'}],
},{timestamps:true})

const roomModel = mongoose.model('Room' , roomSchema);
export default roomModel;
