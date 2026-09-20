import test from 'node:test';
import assert from 'node:assert/strict';
import { seedContent } from '../lib/content/seed.ts';
import { contentRepository } from '../lib/content/repository.ts';
import {
  publishedContent,
  filterProducts,
  sellingPrice,
  discountPercent,
  canPurchase,
  productPath,
} from '../lib/content/catalog.ts';

test('public content excludes drafts, archived products and dangling categories', () => {
  const data = structuredClone(seedContent);
  data.products[0].status = 'draft';
  data.products[1].status = 'archived';
  data.products[2].categoryId = 'missing';
  assert.deepEqual(
    publishedContent(data).products.map((product) => product.id),
    [data.products[3].id],
  );
});

test('category filtering and Korean/English searches compose', () => {
  assert.equal(
    filterProducts(seedContent.products, 'cat-hiking', '쿠셔닝', 'featured')
      .length,
    1,
  );
  assert.equal(
    filterProducts(seedContent.products, 'cat-men', '쿠셔닝', 'featured')
      .length,
    0,
  );
  assert.equal(
    filterProducts(seedContent.products, 'all', ' TREKKING ', 'featured')[0]
      .slug,
    'trekking-cushion-crew',
  );
  assert.equal(
    filterProducts(seedContent.products, 'all', 'unfindable', 'featured')
      .length,
    0,
  );
});

test('unknown prices sort last in both directions and sorting does not mutate input', () => {
  const before = seedContent.products.map((product) => product.id);
  for (const order of ['price-low', 'price-high'] as const) {
    const result = filterProducts(seedContent.products, 'all', '', order);
    assert.equal(sellingPrice(result.at(-1)!), null);
    assert.equal(sellingPrice(result[0]), order === 'price-low' ? 2900 : 4900);
  }
  assert.deepEqual(
    seedContent.products.map((product) => product.id),
    before,
  );
});

test('normal-price products and free products retain their prices without invalid discounts', () => {
  const product = { ...seedContent.products[0], price: 3500, salePrice: null };
  assert.equal(sellingPrice(product), 3500);
  assert.equal(discountPercent(product), 0);
  assert.equal(discountPercent({ ...product, price: 0, salePrice: 0 }), 0);
  assert.equal(sellingPrice({ ...product, salePrice: 0 }), 0);
});

test('purchasing depends on product status and a valid URL, never its category', () => {
  const product = {
    ...seedContent.products[2],
    availability: 'available' as const,
    purchaseUrl: 'https://smartstore.naver.com/yangmal_socks',
  };
  assert.equal(canPurchase(product), true);
  assert.equal(canPurchase({ ...product, availability: 'sold-out' }), false);
  assert.equal(canPurchase({ ...product, status: 'draft' }), false);
  assert.equal(
    canPurchase({ ...product, purchaseUrl: 'javascript:alert(1)' }),
    false,
  );
  assert.equal(canPurchase({ ...product, purchaseUrl: null }), false);
});

test('category reordering does not change product relationships or URLs', () => {
  const content = {
    ...seedContent,
    categories: [...seedContent.categories].reverse(),
  };
  assert.equal(
    productPath(content.products[0], content),
    '/product/hiking/trekking-cushion-crew',
  );
});

test('content adapter returns isolated content and every image is a placeholder', async () => {
  const content = await contentRepository.getPublishedContent();
  content.products[0].name.ko = 'changed';
  assert.notEqual(
    (await contentRepository.getPublishedContent()).products[0].name.ko,
    'changed',
  );
  const media = [
    content.home.hero,
    content.home.story,
    ...content.categories.map((category) => category.image),
    ...content.products.flatMap((product) => [
      ...product.images,
      ...product.detailImages,
    ]),
  ];
  assert.ok(media.every((asset) => asset.src === null));
  assert.equal(
    new Set(content.products.map((product) => product.id)).size,
    content.products.length,
  );
});
