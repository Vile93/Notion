import { Request, Response } from 'express';
import { NoteModel } from '../models/noteSchema';
import { errorHandler } from '../utils/errorHandler';

export const NoteController = {
    getNotes: async (req: Request, res: Response) => {
        //TODO
        try {
            const { userId } = req.body;
            const notes = await NoteModel.find({ userId });
            res.status(200).json(notes);
        } catch {
            errorHandler(res);
        }
    },
    createNote: async (req: Request, res: Response) => {
        try {
            const { title, text, userId } = req.body;
            const newNote = await NoteModel.create({
                title,
                text,
                userId,
            });
            res.status(201).json(newNote);
        } catch {
            errorHandler(res);
        }
    },
    editNote: async (req: Request, res: Response) => {
        try {
            const { title, text } = req.body;
            const { noteId } = req.params;
            const updatedNote = await NoteModel.findByIdAndUpdate(
                {
                    _id: noteId,
                },
                { title, text },
                { new: true }
            );

            res.status(200).json(updatedNote);
        } catch {
            errorHandler(res);
        }
    },
    deleteNote: async (req: Request, res: Response) => {
        try {
            const { noteId } = req.params;
            const deletedNote = await NoteModel.findByIdAndDelete({
                _id: noteId,
            });
            res.status(200).json(deletedNote);
        } catch {
            errorHandler(res);
        }
    },
};
