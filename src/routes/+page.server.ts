import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch}) => {
	const res = await fetch(`https://fakestoreapi.com/products`);
	const products = await res.json();
	return {products};
};