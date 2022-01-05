module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts,css}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				...require('tailwindcss/defaultTheme').colors,
				dark: {
					gray: '#4F4F4F',
					blue: '#313642',
					grey: '#2A2F3C',
					blue: '#313642',
					darkerBlue: '#363B46',
				},
				light: {
					gray: '#A9A9A9',
					green: '#70CF98',
					red: '#FF6666',
					orange: '#FF8266',
					lighterGray: '#6C727F',
					grey: '#4F4F4F',
					purple: '#725DFF',
					lineColor: '#E6E8EC',
					scrollBar: '#EAEAEA',
					green: '#70CF98',
					red: '#FF6666',
					orange: '#FF8266',
					gardenText: '#4B4B4B',
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
