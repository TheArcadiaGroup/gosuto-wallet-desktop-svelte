import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import path from 'path';

/** @type {import("@sveltejs/kit").Config} */
const config = {
	kit: {
		adapter: adapter({}),
		target: '#svelte',
		ssr: false,
		vite: {
			resolve: {
				alias: {
					$stores: path.resolve('./src/stores'),
					$styles: path.resolve('./src/styles'),
					$utils: path.resolve('./src/utils'),
				},
			},
		},
	},
	preprocess: sveltePreprocess({
		postcss: true,
	}),
};
export default config;
