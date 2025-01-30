import type { PageServerLoad } from './$types';
import {getProducts} from "$lib/server/database/productsDB";

export const load: PageServerLoad = async ({ fetch, locals}) => {
	const products = await getProducts();
	return {products : products};
};

