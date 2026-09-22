import { Db } from "mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as repositories from "./user.repository.ts";

export async function getUserByEmail (db: Db, email: string) {

    return repositories.findByEmail(db, email);
}

export async function login(db: Db, payload: { email: string; password: string }) {
    const user = await repositories.findByEmail(db, payload.email);

    if (!user) {
        const error = new Error("Invalid email or password.");
        (error as any).statusCode = 401;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordValid) {
        const error = new Error("Invalid email or password.");
        (error as any).statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        {
            id: user._id.toString(),
            email: user.email
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "7d"
        }
    );

    return {
        user: {
            id: user._id,
            email: user.email
        },
        token
    };
}

export async function getProfile(db: Db, id: string) {
    const user = await repositories.findById(db, id);

    if (!user) {
        const error = new Error("User not found.");
        (error as any).statusCode = 404;
        throw error;
    }

    return {
        id: user._id,
        email: user.email
    };
}

export async function createUser (db: Db, payload: { email: string, password: string }) {

    return repositories.create(db, payload);
}