import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    email: string;
    full_name?: string;
    password: string;
    avatar_url?: string;
    createdAt: Date;
    updatedAt: Date;
}