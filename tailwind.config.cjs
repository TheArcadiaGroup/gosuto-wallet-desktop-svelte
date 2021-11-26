module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts,css}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				...require('tailwindcss/defaultTheme').colors,
				// Add other colors (theme here)
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
