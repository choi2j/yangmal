<script lang="ts">
	import { resolve } from '$app/paths';

	const year = new Date().getFullYear();

	const navLinks = [
		{ label: 'ABOUT', href: resolve('/about') },
		{ label: 'HIKING', href: resolve('/product/[category]', { category: 'hiking' }) },
		{ label: 'STUDENT', href: resolve('/product/[category]', { category: 'student' }) },
		{ label: 'MEN', href: resolve('/product/[category]', { category: 'men' }) },
		{ label: 'WOMEN', href: resolve('/product/[category]', { category: 'women' }) },
		{ label: 'CONTACT', href: resolve('/contact') }
	];
</script>

<footer class="footer">
	<div class="footer-inner">
		<div class="footer-content">
			<div class="footer-top">
				<a class="logo" href={resolve('/')}>
					<span class="logo-name">yangmal</span><span class="logo-tld">.kr</span>
				</a>

				<nav class="footer-nav" aria-label="푸터 메뉴">
					<ul>
						{#each navLinks as link (link.href)}
							<li><a href={link.href}>{link.label}</a></li>
						{/each}
					</ul>
				</nav>
			</div>

			<div class="footer-grid">
				<section class="footer-col">
					<p class="footer-col-label">COMPANY</p>
					<p class="footer-company">나인양말 NINESOCKS</p>
					<p class="footer-muted">경기도 포천시 소흘읍 한성길 106</p>
				</section>

				<section class="footer-col">
					<p class="footer-col-label">INQUIRY</p>
					<p>사업 문의 &nbsp;<a href="mailto:ninesocks@naver.com">ninesocks@naver.com</a></p>
					<p>사이트 관리자 &nbsp;<a href="mailto:choi2j20@gmail.com">choi2j20@gmail.com</a></p>
				</section>
			</div>

			<div class="footer-bottom">
				<p class="footer-copy">© {year} NINESOCKS. All rights reserved.</p>
				<p class="footer-meta">yangmal.kr — FUNCTIONAL SOCKS, SINCE 2019</p>
			</div>
		</div>
	</div>
</footer>
