import type { Handle } from '@sveltejs/kit';
import { isLang, LANG_COOKIE, type Lang } from '$lib/i18n/dict';

/**
 * 초기 언어 결정 우선순위
 * 1) 사용자가 직접 고른 언어(lang 쿠키)
 * 2) 접속 위치(Vercel 의 x-vercel-ip-country 헤더) — 한국(KR)이 아니면 영어
 * 3) 헤더가 없을 때(로컬 개발 등)는 브라우저 언어로 폴백
 */
function resolveLang(event: Parameters<Handle>[0]['event']): Lang {
	const cookie = event.cookies.get(LANG_COOKIE);
	if (isLang(cookie)) return cookie;

	const country = event.request.headers.get('x-vercel-ip-country');
	if (country) return country === 'KR' ? 'ko' : 'en';

	const accept = event.request.headers.get('accept-language') ?? '';
	return accept.toLowerCase().startsWith('ko') ? 'ko' : 'en';
}

export const handle: Handle = async ({ event, resolve }) => {
	const lang = resolveLang(event);
	event.locals.lang = lang;

	return resolve(event, {
		// app.html 의 <html lang="%lang%"> 를 실제 언어로 치환
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
