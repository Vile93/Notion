import bcrypt from 'bcrypt';
import { SALT } from '../constants';

export const BcryptService = {
    createEncryptedValue: async (value: string) => {
        return await bcrypt.hash(value, SALT);
    },
    validateValues: async (
        encryptedValue: string,
        unEncryptedValue: string
    ) => {
        try {
            return await bcrypt.compare(unEncryptedValue, encryptedValue);
        } catch {
            return false;
        }
    },
};
