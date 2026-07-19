import type { LayoutServerLoad } from './$types';

// hooks.server.ts 에서 결정한 언어를 클라이언트(레이아웃)로 전달한다.
export const load: LayoutServerLoad = ({ locals }) => {
	return { lang: locals.lang };
};
