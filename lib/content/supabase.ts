import { parseContent, mapMedia } from './schema.ts';
import { publishedContent } from './catalog.ts';
import type { SiteContent } from './types.ts';

export type PublicSupabaseConfig = { url: string; key: string };
export function publicSupabaseConfig(url?: string, key?: string): PublicSupabaseConfig | null {
  if (!url && !key) return null;
  if (!url || !key) throw new Error('Set both SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.');
  const base = url.replace(/\/$/, '');
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(base)) throw new Error('Invalid Supabase project URL.');
  if (!key.startsWith('sb_publishable_')) {
    // Accept only the legacy anon JWT. Never accept service_role/secret keys.
    try {
      const payload = JSON.parse(atob(key.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      if (payload.role !== 'anon') throw new Error('Wrong role');
    } catch { throw new Error('The website requires a publishable key or anon key, never a secret key.'); }
  }
  return { url: base, key };
}
export async function readSupabaseContent(config: PublicSupabaseConfig): Promise<SiteContent | null> {
  const headers: Record<string,string> = { apikey: config.key };
  if (!config.key.startsWith('sb_publishable_')) headers.Authorization = `Bearer ${config.key}`;
  const response = await fetch(`${config.url}/rest/v1/yangmal_content?id=eq.main&select=content`, { headers, cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(7000) });
  if (!response.ok) throw new Error(`Published content request failed (${response.status}).`);
  // Limit untrusted responses before parsing, including servers without Content-Length.
  const reader = response.body?.getReader();
  if (!reader) throw new Error('Empty content response.');
  let size = 0; const chunks: Uint8Array[] = [];
  while (true) { const { done, value } = await reader.read(); if (done) break; size += value.byteLength; if (size > 3 * 1024 * 1024) { await reader.cancel(); throw new Error('Content response is too large.'); } chunks.push(value); }
  const buffer = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { buffer.set(chunk, offset); offset += chunk.length; }
  const rows: unknown = JSON.parse(new TextDecoder().decode(buffer));
  if (!Array.isArray(rows)) throw new Error('Invalid content response.');
  if (!rows.length) return null;
  const content = publishedContent(parseContent(rows[0].content));
  mapMedia(content, media => {
    if (media.src && !media.src.startsWith('https://')) throw new Error('Published images must use online HTTPS URLs.');
    return media;
  });
  return content;
}
