<script lang="ts">
	const address = '경기도 포천시 소흘읍 한성길 106';
	const mapUrl = `https://map.naver.com/p/search/${encodeURIComponent(address)}`;
</script>

<svelte:head>
	<title>CONTACT | yangmal.kr — NINESOCKS</title>
</svelte:head>

<section class="hero">
	<div class="hero-inner">
		<p class="eyebrow">CONTACT</p>
		<h1>
			<span class="line">언제든</span>
			<span class="line">연락주세요.</span>
		</h1>
		<p class="lead">
			제품 문의, OEM 주문, 협업 제안 등 무엇이든 편하게 연락 주세요.
		</p>
	</div>
</section>

<section class="info">
	<div class="info-inner">
		<dl class="info-list">
			<div class="row">
				<dt>회사명</dt>
				<dd>나인양말</dd>
			</div>
			<div class="row">
				<dt>대표자</dt>
				<dd>최준규</dd>
			</div>
			<div class="row">
				<dt>주소</dt>
				<dd>
					<span>{address}</span>
					<a class="map-link" href={mapUrl} target="_blank" rel="noopener noreferrer">
						지도에서 보기 →
					</a>
				</dd>
			</div>
			<div class="row">
				<dt>전화</dt>
				<dd>
					<a href="tel:031-543-4193">031-543-4193</a>
					<span class="sep">/</span>
					<a href="tel:031-543-4194">031-543-4194</a>
				</dd>
			</div>
			<div class="row">
				<dt>팩스</dt>
				<dd>031-543-4249</dd>
			</div>
			<div class="row">
				<dt>이메일</dt>
				<dd>
					<a href="mailto:ninesocks@naver.com">ninesocks@naver.com</a>
				</dd>
			</div>
		</dl>
	</div>
</section>

<style>
	/* ───────── 공통: 골드 라벨 (main lineup-eyebrow / about 와 동일) ───────── */
	.eyebrow {
		display: block;
		margin-bottom: 1rem;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.22em;
		color: #a6845a;
	}

	/* ───────── HERO (about hero 와 동일 톤) ───────── */
	.hero {
		max-width: 70%;
		margin: 6rem auto;
		text-align: center;
	}

	.hero h1 {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		line-height: 1.25;
	}

	.hero h1 .line {
		display: block;
	}

	.hero .lead {
		max-width: 44rem;
		margin: 1.75rem auto 0;
		font-size: clamp(1rem, 1.6vw, 1.2rem);
		line-height: 1.9;
		color: #555;
	}

	/* ───────── 회사 정보 (dt/dd 정의 목록) ───────── */
	.info {
		max-width: 70%;
		margin: 6rem auto 7rem;
	}

	.info-list {
		max-width: 46rem;
		margin: 0 auto;
		border-bottom: 1px solid #eee;
	}

	.info-list .row {
		display: grid;
		grid-template-columns: 7rem 1fr;
		gap: 1.5rem;
		align-items: baseline;
		padding: 1.35rem 0;
		border-top: 1px solid #eee;
	}

	.info-list dt {
		font-size: 0.9rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: #999;
	}

	.info-list dd {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.4rem 0.85rem;
		font-size: clamp(1rem, 1.5vw, 1.1rem);
		color: #1a1a1a;
	}

	/* 전화·이메일 링크: footer 링크와 동일한 밑줄 + hover */
	.info-list dd a:not(.map-link) {
		text-decoration: underline;
		text-underline-offset: 3px;
		transition: opacity 0.15s ease;
	}

	.info-list dd a:not(.map-link):hover {
		opacity: 0.55;
	}

	/* 전화번호 구분 "/" */
	.info-list .sep {
		color: #ccc;
	}

	/* 지도 링크: 골드 텍스트 + hover 시 화살표 느낌으로 살짝 이동 */
	.map-link {
		font-size: 0.9rem;
		font-weight: 600;
		color: #a6845a;
		transition: opacity 0.15s ease;
	}

	.map-link:hover {
		opacity: 0.7;
	}

	/* ───────── 반응형 ───────── */
	@media (max-width: 768px) {
		.hero,
		.info {
			max-width: 85%;
		}

		.info-list .row {
			grid-template-columns: 1fr;
			gap: 0.4rem;
		}
	}
</style>
