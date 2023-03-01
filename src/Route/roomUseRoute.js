import express from "express";
const router = express.Router();
import {
  createRoom,
  deleteRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controller/roomUserController.js";
//CREATE
router.post("/createroom", createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", updateRoom);
//DELETE
router.delete("/:id/:hotelid", deleteRoom);
//GET ALL

router.get("/", getRooms);

export default router;