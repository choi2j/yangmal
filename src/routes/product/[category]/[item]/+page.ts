import { error } from '@sveltejs/kit';
import { findItem, isCategorySlug } from '$lib/categories';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (!isCategorySlug(params.category)) {
		error(404, 'Category not found');
	}
	const result = findItem(params.category, params.item);
	if (!result) {
		error(404, 'Product not found');
	}
	return result;
};
