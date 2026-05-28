import { error } from '@sveltejs/kit';
import { getCategory } from '$lib/categories';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const category = getCategory(params.category);

	if (!category) {
		error(404, '존재하지 않는 카테고리입니다.');
	}

	return { category };
};
