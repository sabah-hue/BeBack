import mongoose, { Schema } from "mongoose";


const chatSchema = new Schema({
    members: Array,
},{timestamps:true})

const chatModel = mongoose.models.Chat || mongoose.model('Chat' , chatSchema);
export default chatModel;
