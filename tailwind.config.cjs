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
					lightBlue: '#E1E3FF',
					gosutoDark: '#363B46',
					blue: '#313642',
				},
				light: {
					lighterGray: '#6C727F',
					grey: '#4F4F4F',
					purple: '#725DFF',
					blue: '#383B62',
					green: '#70CF98',
					red: '#FF6666',
					orange: '#FF8266',
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
