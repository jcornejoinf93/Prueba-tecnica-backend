import { Router } from 'express';
import { getUsers, createUsers, getUsersById, updateUser, deleteUser } from '../controllers/user.controller';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users', createUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);




export default router;