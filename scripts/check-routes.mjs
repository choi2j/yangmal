import assert from 'node:assert/strict';

const origin = process.env.CHECK_ORIGIN ?? 'http://localhost:3000';
const cases = [
  ['/', 200, 'NINESOCKS'],
  ['/products', 200, '모든 양말'],
  ['/about', 200, '우리의 이야기'],
  ['/contact', 200, '문의하기'],
  ['/product/hiking', 200, '등산양말'],
  ['/product/student', 200, '학생양말'],
  ['/product/men', 200, '남성양말'],
  ['/product/women', 200, '여성양말'],
  ['/product/hiking/trekking-cushion-crew', 200, '스페셜쿨트레킹양말'],
  ['/product/men/daily-gentleman', 200, '데일리신사중목양말'],
  ['/product/student/daily-basic-3pack', 200, '데일리 베이직 3팩'],
  ['/product/women/pattern-fashion', 200, '패턴 패션 삭스'],
  ['/product/missing', 404, null],
  ['/product/hiking/daily-gentleman', 404, null],
  ['/not-a-page', 404, null],
];
for (const [path, status, title] of cases) {
  const response = await fetch(origin + path);
  const html = await response.text();
  assert.equal(response.status, status, path);
  if (title) {
    assert.ok(html.match(/<title>(.*?)<\/title>/s)?.[1].includes(title), path + ' title');
    assert.ok(!html.includes('페이지를 불러오지 못했습니다.'), path + ' error fallback');
  }
  assert.ok(!html.includes('/images/'), path + ' must use fillers');
  console.log(`${response.status} ${path}`);
}
for (const [path, title] of [
  ['/', 'Everyday comfort'],
  ['/product/hiking/trekking-cushion-crew', 'Special Cool Trekking Socks'],
  ['/product/men/daily-gentleman', 'Daily Gentleman Mid-Calf Socks'],
]) {
  const response = await fetch(origin + path, { headers: { cookie: 'yangmal-language=en' } });
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.ok(html.includes('lang="en"'));
  assert.ok(html.match(/<title>(.*?)<\/title>/s)?.[1].includes(title));
  assert.ok(html.includes('property="og:title"'));
  assert.ok(html.includes('name="twitter:title"'));
  assert.ok(!html.includes('property="og:image"'));
  console.log(`EN metadata OK ${path}`);
}
for (const path of ['/robots.txt', '/sitemap.xml', '/favicon.svg', '/fonts/PretendardVariable.woff2']) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 200, path);
  console.log(`${response.status} ${path}`);
}
