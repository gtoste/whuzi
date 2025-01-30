import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';

const SECRET_KEY = 'supersecretkey'; // Powinno być w zmiennych środowiskowych
const users = new Map(); // Symulacja bazy danych

export async function POST({ request }) {
    const { username, password } = await request.json();

    if (!users.has(username)) {
        return json({ error: 'User not found' }, { status: 404 });
    }

    const hashedPassword = users.get(username);
    const validPassword = await bcrypt.compare(password, hashedPassword);

    if (!validPassword) {
        return json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    return json(
        { message: 'Login successful' },
        {
            headers: {
                'Set-Cookie': serialize('jwt', token, {
                    httpOnly: true,
                    path: '/',
                    maxAge: 3600
                })
            }
        }
    );
}
