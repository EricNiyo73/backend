import Room from "../model/roomAdminModel.js";
// import { createError } from "../utils/error.js";

// ==================creation of availability room===========
export const createRoom = async (req, res, next) => {
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// ==================update room==========================

export const updateRoom = async (req, res, next) => {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedRoom);
    } catch (err) {
      next(err);
    }
  };

//   =======================update availability=========================

export const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };

//   ==============================delete availability==========================

export const deleteRoom = async (req, res, next) => {
    try {
      await Room.findByIdAndDelete(req.params.id);
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(err);
    }
  };
//   ==========================get rooms availability==========================
export const getRooms = async (req, res, next) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (err) {
      next(err);
    }
  };