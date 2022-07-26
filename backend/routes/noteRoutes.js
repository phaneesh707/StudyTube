import express from 'express'
import { createNote, deleteNote, getNoteById, getNotes, updateNote } from '../controllers/noteControllers.js';
import {protect} from '../middlewares/authMiddleware.js';


const notesRouter = express.Router()
notesRouter.get('/',protect,getNotes);
notesRouter.post('/create',protect,createNote);
notesRouter.get('/:id',getNoteById);
notesRouter.put('/:id',protect,updateNote);//updating notes
notesRouter.delete('/:id',protect,deleteNote);
export default notesRouter;