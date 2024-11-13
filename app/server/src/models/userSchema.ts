import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    /*     username: { type: String, required: true }, */
    /*  refreshToken: { type: String, required: true }, */
});

export const UserModel = model('User', userSchema);
