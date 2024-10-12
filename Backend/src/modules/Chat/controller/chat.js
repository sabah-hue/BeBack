import roomModel from "../../../../DB/models/room.model.js"
import userModel from "../../../../DB/models/user.model.js"


// get room
export const getRoom = async (req, res, next) => {
    const roomId = req.params.roomId;
    const room = await roomModel.findOne({_id:roomId})
    if (room)
        return res.status(200).json({message: 'your room', room});

    return res.status(404).json({message: 'no room found'});
}

// create room
export const createRoom = async (req, res, next) => {
    const {name} = req.body;
    if (await roomModel.findOne({name}))
        return res.status(400).json({message: 'room already exist'});

    const room = await roomModel.create({name});
    return res.status(201).json({message: 'created successfully', room});
}

// get all rooms
export const getAllRooms = async (req, res, next) => {
    const rooms = await roomModel.find();
    if (rooms) {
        return res.status(200).json({message: 'Available rooms', rooms});
    }
    return res.status(400).json({message: 'No available rooms'});
}

// update room
export const updateRoom = async (req, res, next) => {
    const {name, _id} = req.body;
    const room = await roomModel.findOneAndUpdate({_id}, {name});
    if (room) {
        return res.status(200).json({message: 'updated successfully', room});
    }
    return res.status(400).json({message: 'fail to update'});
}

// delete room
export const deleteRoom = async (req, res, next) => {
    const {_id} = req.body;
    const room = await roomModel.findOneAndDelete({_id});
    if (room) {
        return res.status(200).json({message: 'deleted successfully'});
    }
    return res.status(400).json({message: 'fail to delete'});
}
// join room
export const joinRoom = async (req, res, next) => {
    const { username, room, id } = req.body;
    const joinRoom = await roomModel.findOne({name: room});
    if (!joinRoom) {
        return res.status(400).json({message: 'no rooms available by this name'});
    }
    const user = await userModel.findOneAndUpdate({_id: id}, {$addToSet: { rooms: room }, username});
    if (user) {
        return res.status(200).json({message: 'join successfully', username});
    }
    return res.status(400).json({message: 'fail to join room'});
}
