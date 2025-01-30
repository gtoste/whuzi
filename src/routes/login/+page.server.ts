import {fail, redirect} from '@sveltejs/kit';
import type { Actions } from './$types';
import * as db from '$lib/server/database/database';
import type {PageServerLoad} from "../../../.svelte-kit/types/src/routes/$types";


export const load: PageServerLoad = async ({ cookies, locals}) => {
    if(cookies.get('sessionid') !== undefined) {
        redirect(303, '/');
    }
};

export const actions = {
    login: async ({request, cookies}) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email) {
            return fail(400, { email, missing: true });
        }

        const user = await db.getUser(email as string);

        if (!user || ! await db.checkCredentials(password as string, user.password)) {
            return fail(400, { email, incorrect: true });
        }
        cookies.set('sessionid', await db.createSession(user), { path: '/' });
        redirect(302, '/');

    },
    register: async ({request}) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        if (!email) {
            return fail(400, { email, missing: true });
        }

        const user = await db.getUser(<string>email);
        if(user !== null) {
            return fail(400, { email, taken: true });
        }

        const newUser = await db.addUser(email as string, db.hash(password as string));
        return { success: true };
    }
} satisfies Actions;