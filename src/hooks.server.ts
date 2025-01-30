import * as db from '$lib/server/database/database';


const SECRET_KEY = 'supersecretkey';

export async function handle({ event, resolve }) {
    let cookie = event.cookies.get('sessionid');
    if(cookie === undefined) {
        event.locals.user = null;
    }
    event.locals.user = await db.verifyUser(cookie as string);
    return await resolve(event);
}