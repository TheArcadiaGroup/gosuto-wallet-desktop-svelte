module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts,css}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				...require('tailwindcss/defaultTheme').colors,
				// Add other colors (theme here)
				dark: {
					// Light Theme Colors
				},
				light: {
					// Dark Theme Colors
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
