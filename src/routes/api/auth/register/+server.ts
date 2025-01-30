import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'supersecretkey';
const users = new Map(); // Symulacja bazy danych

export async function POST({ request }) {
    const { username, password } = await request.json();

    if (users.has(username)) {
        return json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.set(username, hashedPassword);

    return json({ message: 'User registered' });
}