import { INote } from './INote';

export interface INoteResolve extends INote {
    _id: string;
    createdAt: Date;
}
