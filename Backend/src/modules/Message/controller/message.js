import messageModel from "../../../../DB/models/message.model.js";


// create message
export const createMessage = async (req, res) => {
    const { senderId, chatId, content } = req.body;
    const message = await messageModel.create({
        senderId,
        chatId,
        content
    });
    res.status(201).json({ message: "message created successfully", message });
}

// get all messages for certain chat
export const getAllMessages = async (req, res) => {
    const {chatId} = req.params;
    const messages = await messageModel.find({chatId});
    res.status(200).json({ message: "messages retrieved successfully", messages });
}
