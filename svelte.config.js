import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import("@sveltejs/kit").Config} */
const config = {
	kit: {
		adapter: adapter({ fallback: 'index.html' }),
	},
	preprocess: sveltePreprocess({
		postcss: true,
	}),
};
export default config;
