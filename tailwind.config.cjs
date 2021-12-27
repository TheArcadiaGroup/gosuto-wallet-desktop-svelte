module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts,css}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				...require('tailwindcss/defaultTheme').colors,
				dark: {
					grey: '#2A2F3C',
					brown: '#FECE80',
					blue: '#E1E3FF',
					gosutoDark: '#363B46',
				},
				light: {
					grey: '#4F4F4F',
					purple: '#725DFF',
					orange: '#FF8266',
					blue: '#383B62',
				},
			},
			fill: {
				white: '#FFFFFF',
				grey: '#4F4F4F',
			},
			fontFamily: { display: 'Manrope' },
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
