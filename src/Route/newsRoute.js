import express from "express";
import {createNews,upload,findAll,getOne,deleteNews,updateNews} from '../controller/newsController.js';
const router = express.Router();

router.post('/createNews',upload.single("newsImage"), createNews);
router.get('/getAll',findAll);
router.get('/getOne/:id',getOne);
router.delete('/delete/:id',deleteNews);
router.put('/update/:id',updateNews);
export default router;