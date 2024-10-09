import chatModel from "../../../../DB/models/chat.model.js";


// create chat
export const createChat = async (req, res, next) => {
    const {firstId, secondId} = req.body;
    const chat = await chatModel.findOne({members: {$all: [firstId, secondId]}});
    if (chat) {
        return res.status(200).json({message: 'chat already exist', chat});
    }
    const newChat = await chatModel.create({members: [firstId, secondId]});

    return res.status(201).json({message: 'chat created', chat: newChat});
}

// getUserChats
export const getUserChat = async (req, res, next) => {
    const {userId} = req.params;
    const chats = await chatModel.find({members: {$in: [userId]}});
    return res.status(200).json({message: 'user chats', chats});
}

// findChat
export const findChat = async (req, res, next) => {
    const {firstId, secondId} = req.params;
    const chat = await chatModel.findOne({members: {$all: [firstId, secondId]}});
    return res.status(200).json({message: 'chat', chat});
}
