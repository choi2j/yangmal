'use client';
import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale, Localized } from '@/lib/content/types';

const LanguageContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (ko: string, en: string) => string;
  pick: (value: Localized) => string;
} | null>(null);
export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, updateLocale] = useState(initialLocale);
  const router = useRouter();
  function setLocale(next: Locale) {
    updateLocale(next);
    document.cookie = `yangmal-language=${next};path=/;max-age=31536000;samesite=lax`;
    document.documentElement.lang = next;
    router.refresh();
  }
  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t: (ko, en) => (locale === 'ko' ? ko : en),
        pick: (value) => value[locale],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('LanguageProvider is required.');
  return value;
}
