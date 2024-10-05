import mongoose, { Schema } from "mongoose";


/**
 * Defines the schema for a Message document in the MongoDB database.
 * 
 * The Message schema includes the following fields:
 * - `content`: The text content of the message.
 * - `userId`: The ID of the user who sent the message, referenced to the User model.
 * - `image`: An object representing an image attached to the message.
 * - `isDeleted`: A boolean indicating whether the message has been deleted.
 * - `ReactOnPost`: An array of objects representing reactions to the message, including the user ID and the type of reaction.
 * - `like`: An array of user IDs who have liked the message.
 * - `unlike`: An array of user IDs who have unliked the message.
 * - `message`: An array of message IDs that are related to this message.
 * 
 * The schema also includes timestamps for when the message was created and updated.
 */
const messageSchema = new Schema({
    content:{
        type:String,
        required: true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    image:{
        type:Object,
        require:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    ReactOnMessage:[
        {
            userId:{
                type:Schema.Types.ObjectId,
                ref:'User'
            },
            react:{
                type:String,
                enum:['like','unlike','love','notReacted'],
                default:'notReacted'
            }
        }
    ],
    like:[{type:Schema.Types.ObjectId,ref:'User'}],
    unlike:[{ type:Schema.Types.ObjectId, ref:'User'}],
    message:[{type:Schema.Types.ObjectId,ref:'Message'}]
},{timestamps:true})

const messageModel = mongoose.models.Message || mongoose.model('Message' , messageSchema);
export default messageModel;