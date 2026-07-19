import { getContext, setContext } from 'svelte';
import { browser } from '$app/environment';
import { dict, LANG_COOKIE, type Lang, type Localized } from './dict';

const KEY = Symbol('i18n');

class I18n {
	lang = $state<Lang>('ko');

	constructor(initial: Lang) {
		this.lang = initial;
	}

	/** 현재 언어의 문구 사전. 템플릿에서 this.lang 을 읽으므로 언어 전환 시 자동 갱신된다. */
	get t() {
		return dict[this.lang];
	}

	/** {ko, en} 쌍에서 현재 언어 문구를 고른다. */
	pick = (value: Localized): string => value[this.lang];

	/** 사용자가 직접 언어를 바꾼다. 선택은 쿠키에 저장되어 다음 접속에도 유지된다. */
	set = (lang: Lang): void => {
		this.lang = lang;
		if (browser) {
			document.cookie = `${LANG_COOKIE}=${lang};path=/;max-age=31536000;samesite=lax`;
			document.documentElement.lang = lang;
		}
	};
}

export type { I18n };

export function initI18n(initial: Lang): I18n {
	return setContext(KEY, new I18n(initial));
}

export function useI18n(): I18n {
	return getContext(KEY) as I18n;
}
