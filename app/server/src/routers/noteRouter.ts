import { Router } from "express";
import { NoteController } from "../controllers/noteController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { noteValidator } from "../middlewares/noteValidator";

export const noteRotuer = Router();

noteRotuer.get("/", authMiddleware, NoteController.getNotes);
noteRotuer.post("/", authMiddleware, noteValidator, NoteController.createNote);
noteRotuer.put(
    "/:noteId",
    authMiddleware,
    noteValidator,
    NoteController.editNote
);
noteRotuer.delete("/:noteId", authMiddleware, NoteController.deleteNote);
