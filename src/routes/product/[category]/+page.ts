import { error } from '@sveltejs/kit';
import { getCategory } from '$lib/categories';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const category = getCategory(params.category);

	if (!category) {
		error(404, 'Category not found');
	}

	return { category };
};
