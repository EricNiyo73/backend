import express from "express";
import {createEvent,upload,findAll,getOne,deleteEvent,updateEvent} from '../controller/eventsController.js';
const router = express.Router();

router.post('/createE',upload.single("eventImage"), createEvent);
router.get('/getAll',findAll);
router.get('/getOne/:id',getOne);
router.delete('/delete/:id',deleteEvent);
router.put('/update/:id',updateEvent);
export default router;