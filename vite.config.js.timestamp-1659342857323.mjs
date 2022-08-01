// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
var config = {
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
	optimizeDeps: {
		entries: ['chart.js'],
	},
	ssr: {
		noExternal: ['chart.js'],
	},
};
var vite_config_default = config;
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZ2ljaGFydS9pZHMvcHJvamVjdHMvZ29zdXRvL2dvc3V0by13YWxsZXQtZGVza3RvcC1zdmVsdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9naWNoYXJ1L2lkcy9wcm9qZWN0cy9nb3N1dG8vZ29zdXRvLXdhbGxldC1kZXNrdG9wLXN2ZWx0ZS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZ2ljaGFydS9pZHMvcHJvamVjdHMvZ29zdXRvL2dvc3V0by13YWxsZXQtZGVza3RvcC1zdmVsdGUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCd2aXRlJykuVXNlckNvbmZpZ30gKi9cbmNvbnN0IGNvbmZpZyA9IHtcblx0cGx1Z2luczogW3N2ZWx0ZWtpdCgpXSxcblx0cmVzb2x2ZToge1xuXHRcdGFsaWFzOiB7XG5cdFx0XHQkc3RvcmVzOiBwYXRoLnJlc29sdmUoJy4vc3JjL3N0b3JlcycpLFxuXHRcdFx0JGNvbnN0YW50czogcGF0aC5yZXNvbHZlKCcuL3NyYy9jb25zdGFudHMnKSxcblx0XHRcdCRzdHlsZXM6IHBhdGgucmVzb2x2ZSgnLi9zcmMvc3R5bGVzJyksXG5cdFx0XHQkdXRpbHM6IHBhdGgucmVzb2x2ZSgnLi9zcmMvdXRpbHMnKSxcblx0XHRcdCRpY29uczogcGF0aC5yZXNvbHZlKCcuL3NyYy9pY29ucycpLFxuXHRcdFx0JGNvbXBvbmVudHM6IHBhdGgucmVzb2x2ZSgnLi9zcmMvbGliL2NvbXBvbmVudHMnKSxcblx0XHRcdCRwYWdlczogcGF0aC5yZXNvbHZlKCcuL3NyYy9saWIvcGFnZXMnKSxcblx0XHRcdCRzY3JpcHRzOiBwYXRoLnJlc29sdmUoJy4vc3JjL3NjcmlwdHMnKSxcblx0XHR9LFxuXHR9LFxuXHQvLyBkZWZpbmU6IHtcblx0Ly8gXHQncHJvY2Vzcy5lbnYnOiBwcm9jZXNzLmVudlxuXHQvLyB9LFxuXHRvcHRpbWl6ZURlcHM6IHtcblx0XHRlbnRyaWVzOiBbJ2NoYXJ0LmpzJ10sXG5cdFx0Ly8gZXhjbHVkZTogWydAemVyb2Rldngvc3ZlbHRlLXRvYXN0J11cblx0fSxcblx0c3NyOiB7XG5cdFx0bm9FeHRlcm5hbDogWydjaGFydC5qcyddLFxuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErVyxTQUFTLGlCQUFpQjtBQUN6WSxPQUFPLFVBQVU7QUFHakIsSUFBTSxTQUFTO0FBQUEsRUFDZCxTQUFTLENBQUMsVUFBVSxDQUFDO0FBQUEsRUFDckIsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sU0FBUyxLQUFLLFFBQVEsY0FBYztBQUFBLE1BQ3BDLFlBQVksS0FBSyxRQUFRLGlCQUFpQjtBQUFBLE1BQzFDLFNBQVMsS0FBSyxRQUFRLGNBQWM7QUFBQSxNQUNwQyxRQUFRLEtBQUssUUFBUSxhQUFhO0FBQUEsTUFDbEMsUUFBUSxLQUFLLFFBQVEsYUFBYTtBQUFBLE1BQ2xDLGFBQWEsS0FBSyxRQUFRLHNCQUFzQjtBQUFBLE1BQ2hELFFBQVEsS0FBSyxRQUFRLGlCQUFpQjtBQUFBLE1BQ3RDLFVBQVUsS0FBSyxRQUFRLGVBQWU7QUFBQSxJQUN2QztBQUFBLEVBQ0Q7QUFBQSxFQUlBLGNBQWM7QUFBQSxJQUNiLFNBQVMsQ0FBQyxVQUFVO0FBQUEsRUFFckI7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNKLFlBQVksQ0FBQyxVQUFVO0FBQUEsRUFDeEI7QUFDRDtBQUVBLElBQU8sc0JBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==
