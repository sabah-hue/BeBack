import mongoose, { Schema } from "mongoose";


/**
 * Defines the schema for a Message document in the MongoDB database.
 * 
 * The Message schema includes the following fields:
 * - `room`: name of chat room.
 * - `content`: The text content of the message.
 * - `username`: The ID of the user who sent the message, referenced to the User model.
 * 
 * The schema also includes timestamps for when the message was created and updated.
 */
const messageSchema = new Schema({
    room:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    username:{
        type:String,
        require:true
    }
},{timestamps:true})

// virtual populate to get chatPic
messageSchema.virtual('userProfile', {
    ref: 'User',
    localField: 'username',
    foreignField: 'username',
    justOne: true
});

messageSchema.set('toObject', {virtuals: true});
messageSchema.set('toJSON', {virtuals: true});

const messageModel = mongoose.models.Message || mongoose.model('Message' , messageSchema);
export default messageModel;
