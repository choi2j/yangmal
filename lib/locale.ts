import { cookies } from 'next/headers';
import type { Locale } from './content/types';

export async function getLocale(): Promise<Locale> {
  return (await cookies()).get('yangmal-language')?.value === 'en'
    ? 'en'
    : 'ko';
}
