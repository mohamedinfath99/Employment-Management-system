import express from "express"; 
import { createUser, getAllUsers, getUser, updateUser, deleteUser } from "../controllers/userControllers.js"


const router = express.Router();


// Create
router.post('/register', createUser)


// Read
router.get('/', getAllUsers)

router.get('/:id', getUser)


// Upadte
router.patch('/:id', updateUser)


// Delete
router.delete('/:id', deleteUser)


export default router;