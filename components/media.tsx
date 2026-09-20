'use client';
import { useState } from 'react';
import type { Media as MediaData, MediaSlot } from '@/lib/content/types';
import { useLanguage } from './language-provider';

export const mediaDimensions: Record<
  MediaSlot,
  { width: number; height: number }
> = {
  hero: { width: 1440, height: 1200 },
  product: { width: 800, height: 800 },
  gallery: { width: 1200, height: 1200 },
  category: { width: 800, height: 600 },
  story: { width: 1000, height: 1200 },
  detail: { width: 1200, height: 900 },
};

export function Media({
  asset,
  slot,
  className = '',
  priority = false,
}: {
  asset?: MediaData;
  slot: MediaSlot;
  className?: string;
  priority?: boolean;
}) {
  const { pick, t } = useLanguage();
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const size = mediaDimensions[slot];
  const alt = asset ? pick(asset.alt) : t('상품 이미지', 'Product image');
  const available = asset?.src && failedSrc !== asset.src;
  const naturalDetail = slot === 'detail' && available;
  const sourceSize = asset?.width && asset?.height ? { width: asset.width, height: asset.height } : null;
  return (
    <div
      className={`media media-${slot} tone-${asset?.tone ?? 'sand'} ${available ? '' : 'placeholder'} ${naturalDetail ? 'media-natural-detail' : ''} ${className}`}
      style={{ aspectRatio: naturalDetail ? sourceSize ? `${sourceSize.width} / ${sourceSize.height}` : 'auto' : `${size.width} / ${size.height}` }}
    >
      {available ? (
        <img
          src={asset.src!}
          alt={alt}
          width={naturalDetail ? sourceSize?.width : size.width}
          height={naturalDetail ? sourceSize?.height : size.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          style={{
            ...(naturalDetail ? { display: 'block', width: '100%', height: 'auto' } : {}),
            objectFit: naturalDetail ? 'contain' : slot === 'product' ? 'cover' : asset.fit,
            objectPosition: asset.focalPoint
              ? `${asset.focalPoint.x * 100}% ${asset.focalPoint.y * 100}%`
              : '50% 50%',
          }}
          onError={() => setFailedSrc(asset.src)}
        />
      ) : (
        <div
          className="placeholder-content"
          role="img"
          aria-label={`${alt} · ${t('이미지 준비 중', 'Image coming soon')}`}
        >
          <span className="placeholder-brand">NINESOCKS</span>
          <span className="placeholder-label">
            {asset?.label ?? 'PRODUCT IMAGE'}
          </span>
          <span className="placeholder-size" aria-hidden="true">
            {size.width} × {size.height}
          </span>
        </div>
      )}
    </div>
  );
}
