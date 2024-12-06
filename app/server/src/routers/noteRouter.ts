import { Router } from 'express';
import { NoteController } from '../controllers/noteController';
import { noteValidator } from '../middlewares/noteValidator';

export const noteRotuer = Router();

noteRotuer.get('/', NoteController.getNotes);
noteRotuer.post('/', noteValidator, NoteController.createNote);
noteRotuer.put('/:noteId', noteValidator, NoteController.editNote);
noteRotuer.delete('/:noteId', NoteController.deleteNote);
