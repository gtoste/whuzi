import type { Product } from '$lib/types/Product';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params}) => {
    const res = await fetch(`https://fakestoreapi.com/products/`+params.product_id);
    const product : Product = await res.json();
    return {product};
};