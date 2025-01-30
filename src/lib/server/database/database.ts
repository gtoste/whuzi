import fs from 'fs/promises';
import path from 'path';
import type {User} from '$lib/types/User.ts';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


export async function verifyUser(token: string) : Promise< User | null> {
    try {
        return jwt.verify(token, SECRET_KEY) as User;
    }catch(err) {
        return null;
    }

}


const SECRET_KEY = 'supersecretkey'; // Zmień na bezpieczny klucz!

export async function createSession(user: User) : Promise<string> {
    return jwt.sign(user, SECRET_KEY, {expiresIn: '1h'});
}

export function hash(password : string): string {
    return bcrypt.hashSync(password, 10);
}


const DB_FILE = path.resolve('users.json');

async function readDB(): Promise<User[]> {
    try {
        const data = await fs.readFile(DB_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function writeDB(users: User[]): Promise<void> {
    await fs.writeFile(DB_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

export async function checkCredentials(inputPassword : string, storedHash : string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, storedHash);
}

export async function getUser(email: string): Promise<User | null> {
    const users = await readDB();
    return users.find(user => user.email === email) || null;
}

export async function addUser(email: string, password: string): Promise<User> {
    const users = await readDB();

    if (users.some(user => user.email === email)) {
        throw new Error('User already exists');
    }

    const newUser: User = {email, password};
    users.push(newUser);
    await writeDB(users);

    return newUser;
}

export async function deleteUser(email: string): Promise<boolean> {
    let users = await readDB();
    const originalLength = users.length;

    users = users.filter(user => user.email !== email);

    if (users.length === originalLength) {
        return false; // Użytkownik nie znaleziony
    }

    await writeDB(users);
    return true;
}

export async function getAllUsers(): Promise<User[]> {
    return await readDB();
}
