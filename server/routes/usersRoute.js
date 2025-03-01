import express from 'express';
import { registerUser, loginUser, getUser, updateUser, removeUser, addMember, removeMember, updateMember, fetchMembers, fetchTicket } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router()

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/get-user-by-id',authMiddleware, getUser);
userRouter.put('/update/:id', updateUser);
userRouter.delete('/delete/id', removeUser);

userRouter.post('/:id/addmember', addMember);
userRouter.put('/:email/updatemember/:id', updateMember);
userRouter.delete('/:email/delete/:id', removeMember);
userRouter.get('/:email/getmember', fetchMembers);

userRouter.post('/get-ticket-by-id', fetchTicket);




export default userRouter;