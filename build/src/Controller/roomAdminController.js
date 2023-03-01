"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRoomAvailability = exports.updateRoom = exports.getRooms = exports.deleteRoom = exports.createRoom = void 0;
var _roomAdminModel = _interopRequireDefault(require("../model/roomAdminModel.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import { createError } from "../utils/error.js";

// ==================creation of availability room===========
const createRoom = async (req, res, next) => {
  const newRoom = new _roomAdminModel.default(req.body);
  try {
    const savedRoom = await newRoom.save();
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// ==================update room==========================
exports.createRoom = createRoom;
const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await _roomAdminModel.default.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    });
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

//   =======================update availability=========================
exports.updateRoom = updateRoom;
const updateRoomAvailability = async (req, res, next) => {
  try {
    await _roomAdminModel.default.updateOne({
      "roomNumbers._id": req.params.id
    }, {
      $push: {
        "roomNumbers.$.unavailableDates": req.body.dates
      }
    });
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

//   ==============================delete availability==========================
exports.updateRoomAvailability = updateRoomAvailability;
const deleteRoom = async (req, res, next) => {
  try {
    await _roomAdminModel.default.findByIdAndDelete(req.params.id);
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};
//   ==========================get rooms availability==========================
exports.deleteRoom = deleteRoom;
const getRooms = async (req, res, next) => {
  try {
    const rooms = await _roomAdminModel.default.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
exports.getRooms = getRooms;
//# sourceMappingURL=roomAdminController.js.map