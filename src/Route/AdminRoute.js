import express from "express";
const router = express.Router();
import {
  createbook,
  deletebook,
  getbooks,
  updatebook,
  upload,
} from "../Controller/AdminController.js";


//CREATE
router.post("/createbook",upload.single("image"), createbook);

//UPDATE
// router.put("/availability/:id", updatebookAvailability);
router.put("/:id", updatebook);
//DELETE
router.delete("/:id/:hotelid", deletebook);
//GET ALL

router.get("/", getbooks);

export default router;