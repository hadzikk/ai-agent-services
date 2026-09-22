import { type Db, ObjectId } from "mongodb";
import type { User } from "../../shared/types/user.type";
import { env } from "../../config/index.ts";

const collection = (db: Db) => {
    return db.collection<User>("users");
};

export const create = async (db: Db, payload: Omit<User, "_id" | "full_name" | "avatar_url" | "createdAt" | "updatedAt">) => {
    const users = collection(db);

    return await users.insertOne({
        ...payload, 
        createdAt: new Date,
        updatedAt: new Date
    });
}

export const findById = async (db: Db, id: string) => {
    const users = collection(db);

    return await users.findOne({ _id: new ObjectId(id) });
}

export const findByEmail = async (db: Db, email: string) => {
    const users = collection(db);

    return await users.findOne({ email });      
}

export const update = async (db: Db, id: string, payload: Omit<User, "_id" | "createdAt" | "updatedAt">) => {
    const users = collection(db);

    const filter = { 
        _id: new ObjectId(id)
    };

    return await users.updateOne(filter, {
        $set: {
            ...payload,
            updatedAt: new Date()
        }
    });
}