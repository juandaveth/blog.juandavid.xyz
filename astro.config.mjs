// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://blog.juandavid.xyz',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Source Serif 4',
			cssVariable: '--font-serif',
			fallbacks: ['Georgia', 'serif'],
			weights: [300, 400, 600, 700],
			styles: ['normal', 'italic'],
		},
	],
});
