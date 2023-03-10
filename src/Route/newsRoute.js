import express from "express";
import {createNews,upload,findAll,getOne,deleteNews,updateNews} from '../controller/newsController.js';
const router = express.Router();


router.post('/create',upload.single("newsImage"), createNews);
router.get('/',findAll);
router.get('/:id',getOne);
router.delete('/:id',deleteNews);
router.put('/:id',updateNews);
export default router;