import { model, Schema } from 'mongoose';

const noteSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const NoteModel = model('Note', noteSchema);
