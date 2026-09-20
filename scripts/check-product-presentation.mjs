import assert from 'node:assert/strict';

// Run with the website running: node scripts/check-product-presentation.mjs
const origin = process.env.CHECK_ORIGIN ?? 'http://127.0.0.1:3000';
const response = await fetch(`${origin}/product/men/daily-gentleman`);
assert.equal(response.status, 200);
const html = await response.text();
const stylesheets = [...html.matchAll(/<link\b[^>]*>/g)]
  .map(([tag]) => tag.includes('rel="stylesheet"') && tag.match(/href="([^"]+)"/)?.[1])
  .filter(Boolean);
assert.ok(stylesheets.length, 'The product page must load its stylesheet.');
const css = (await Promise.all(stylesheets.map(async href => {
  const stylesheet = await fetch(new URL(href.replaceAll('&amp;', '&'), origin));
  assert.equal(stylesheet.status, 200);
  return stylesheet.text();
}))).join('\n');
for (const [selector, color] of [
  ['.product-price:has(.discount) strong', '#c62828'],
  ['.product-price .discount', 'var(--foreground)'],
]) {
  assert.ok([...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].some(([, selectors, declarations]) =>
    selectors.split(',').some(value => value.trim() === selector) &&
    declarations.match(/(?:^|;)\s*color:\s*([^;{}]+)/)?.[1].trim() === color),
  `The served CSS must color ${selector} ${color}.`);
}

const gallery = [...html.matchAll(/<div class="media media-gallery[^>]*>\s*(<img\b[^>]*>)/g)];
assert.ok(gallery.length >= 2, 'Check both the main image and thumbnail.');
for (const [, image] of gallery) assert.match(image, /object-fit:\s*cover/);
for (const [, image] of html.matchAll(/<div class="media media-detail[^>]*>\s*(<img\b[^>]*>)/g)) {
  assert.match(image, /height:\s*auto/, 'Long product descriptions must retain their natural height.');
}
console.log('PASS: only the sale price is red; the discount rate uses the normal text color; gallery and thumbnails use cover; detail images retain natural height.');
