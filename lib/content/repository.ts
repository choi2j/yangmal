import { seedContent } from './seed.ts';
import { publishedContent } from './catalog.ts';
import type { ContentRepository } from './types.ts';

/** Replace this adapter with the future yangmalkr_cms published-content API. */
export const contentRepository: ContentRepository = {
  async getPublishedContent() {
    return publishedContent(structuredClone(seedContent));
  },
};
