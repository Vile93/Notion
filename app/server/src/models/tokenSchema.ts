import { model, Schema } from 'mongoose';

const tokenSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
});

export const TokenModel = model('Token', tokenSchema);
