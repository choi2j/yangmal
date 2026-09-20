import { seedContent } from './seed.ts';
import { publishedContent } from './catalog.ts';
import type { ContentRepository } from './types.ts';
import { publicSupabaseConfig, readSupabaseContent } from './supabase.ts';
import { cache } from 'react';

/** Only public, read-only credentials belong to the website. Drafts stay in the CMS. */
export const contentRepository: ContentRepository = {
  getPublishedContent: cache(async () => {
    const config = publicSupabaseConfig(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY);
    if (config) {
      const content = await readSupabaseContent(config);
      if (content) return content;
      // A connected but empty project must not silently resurrect seed products.
      const fallback = publishedContent(structuredClone(seedContent));
      return { ...fallback, products: [] };
    }
    return publishedContent(structuredClone(seedContent));
  }),
};
