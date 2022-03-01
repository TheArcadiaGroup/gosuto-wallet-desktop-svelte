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
					$constants: path.resolve('./src/constants'),
					$styles: path.resolve('./src/styles'),
					$utils: path.resolve('./src/utils'),
					$icons: path.resolve('./src/icons'),
					$components: path.resolve('./src/lib/components'),
				},
			},
		},
	},
	preprocess: sveltePreprocess({
		postcss: true,
	}),
};
export default config;
