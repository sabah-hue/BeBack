import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name:{
        firstName:{
            type:String,
            require:true
        },
        lastName:{
            type:String,
            require:true
        }
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }, 
    profilePic:{
        type:Object
    },
    role:{
        type:String,
        enum:['User','Admin'],
        default:'User',
        required:true
    },
    isConfirm:{
        type:Boolean,
        default:false,
    },
    status:{
        type:String,
        default:'offline',
        enum:['offline','online']
    },
    isLoggedIn:{
        type:Boolean,
        default:false  
    },
    newMessages:{
        type:Object,
        default:{}
    },
    username: String,
    rooms: {
        type: [String],
        default: []
    }
},{timestamps:true})

const userModel = mongoose.models.User || mongoose.model('User' , userSchema);
export default userModel;
