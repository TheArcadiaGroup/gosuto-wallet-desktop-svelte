import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$stores: path.resolve('./src/stores'),
			$constants: path.resolve('./src/constants'),
			$styles: path.resolve('./src/styles'),
			$utils: path.resolve('./src/utils'),
			$icons: path.resolve('./src/icons'),
			$components: path.resolve('./src/lib/components'),
			$pages: path.resolve('./src/lib/pages'),
			$scripts: path.resolve('./src/scripts'),
		},
	},
	// define: {
	// 	'process.env': process.env
	// },
	optimizeDeps: {
		// entries: ['chart.js'],
		// exclude: ['@zerodevx/svelte-toast']
	},
	ssr: {
		noExternal: ['chart.js'],
	},
};

export default config;
