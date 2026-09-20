import type { Metadata } from 'next';
import type { Media } from './content/types';

// A configured origin, never a request Host or forwarded header.
export const siteOrigin =
  process.env.SITE_URL || 'https://yangmalkr.servername.chatgpt.site';
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image?: Media,
): Metadata {
  const images = image?.src
    ? [{ url: new URL(image.src, siteOrigin).href, alt: image.alt.ko }]
    : [];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: new URL(path, siteOrigin).href,
      siteName: 'yangmal.kr — NINESOCKS',
      type: 'website',
      images,
    },
    twitter: {
      card: images.length ? 'summary_large_image' : 'summary',
      title,
      description,
      images: images.map((entry) => entry.url),
    },
  };
}
