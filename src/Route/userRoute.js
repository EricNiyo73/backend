import express from "express";
import { createUser,login,getAll,updateUser ,deleteUser} from "../controller/userController.js";
const router = express.Router();

router.post('/signup', createUser);
router.post('/login',login);
router.get('/',getAll);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
export default router;