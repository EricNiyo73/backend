import express from "express";
const router = express.Router();
import {
  createfacility,
  deletefacility,
  getfacility,
  getfacilit ,
  updatefacility,
  upload,
  bookrequest
} from "../Controller/AdminController.js";


//CREATE
router.post("/create",upload.single("image"), createfacility);

//UPDATE
router.put("/:id", updatefacility);
//DELETE
router.delete("/:id", deletefacility);
//GET ALL
router.get("/:id", getfacilit);
router.get("/", getfacility);
// appove
router.patch('/booking-requests/:id',bookrequest)

export default router;