import {json} from "@sveltejs/kit";

export async function POST({ cookies, locals }) {
    cookies.delete('sessionid', { path: '/' });
    locals.user = null;
    return json({success: true});
}