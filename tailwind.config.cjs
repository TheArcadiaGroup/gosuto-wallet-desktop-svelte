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
					black: '#2A2F3C',
					grey: '#4F4F4F',
					orange: '#FF8266',
					green: '#70CF98',
				},
				light: {
					black: '#363B46',
					purple: '#725dff',
					orange: '#FECE80',
					grey: '#A9A9A9',
				},
			},
			fontFamily: {
				display: 'Manrope',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
