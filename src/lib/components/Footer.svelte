<script lang="ts">
	import { resolve } from '$app/paths';
	import { useI18n } from '$lib/i18n/context.svelte';

	const i18n = useI18n();

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

				<nav class="footer-nav" aria-label={i18n.t.footer.menuAlt}>
					<ul>
						{#each navLinks as link (link.href)}
							<li><a href={link.href}>{link.label}</a></li>
						{/each}
					</ul>
				</nav>
			</div>

			<div class="footer-grid">
				<section class="footer-col">
					<p class="footer-col-label">{i18n.t.footer.labelCompany}</p>
					<p class="footer-company">{i18n.t.footer.company}</p>
					<p class="footer-muted">{i18n.t.footer.address}</p>
				</section>

				<section class="footer-col">
					<p class="footer-col-label">{i18n.t.footer.labelInquiry}</p>
					<p>
						{i18n.t.footer.inquiryBusiness} &nbsp;<a href="mailto:ninesocks@naver.com"
							>ninesocks@naver.com</a
						>
					</p>
					<p>
						{i18n.t.footer.inquiryAdmin} &nbsp;<a href="mailto:choi2j20@gmail.com"
							>choi2j20@gmail.com</a
						>
					</p>
				</section>
			</div>

			<div class="footer-bottom">
				<p class="footer-copy">© {year} NINESOCKS. All rights reserved.</p>
				<p class="footer-meta">yangmal.kr — FUNCTIONAL SOCKS, SINCE 2019</p>
			</div>
		</div>
	</div>
</footer>
