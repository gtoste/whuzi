import type { PageServerLoad } from './$types';
import {getProduct} from "$lib/server/database/productsDB";
import {error} from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch, params, locals}) => {
    try{
        const id : number = parseInt(params.product_id);
        const res = await getProduct(id);
        if(res === undefined) {
            error(404, `Product ${id} not found`);
        }

        return {product : res, user : locals.user};
    }catch(err){
            error(404, `Product ${params.product_id} not found`);
    }

};