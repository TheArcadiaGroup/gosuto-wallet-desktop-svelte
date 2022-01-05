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
					background: '#363b46',
					grey: '#2A2F3C',
					brown: '#FECE80',
					lightBlue: '#E1E3FF',
					gosutoDark: '#363B46',
					blue: '#313642',
				},
				light: {
					gray: '#A9A9A9',
					green: '#70CF98',
					red: '#FF6666',
					orange: '#FF8266',
					lighterGray: '#6C727F',
					grey: '#4F4F4F',
					green: '#70CF98',
					red: '#FF6666',
					orange: '#FF8266',
					purple: '#725DFF',
					blue: '#383B62',
					lineColor: '#E6E8EC',
					scrollBar: '#EAEAEA',
					white: '#FFFFFF',
				},
			},
			fill: {
				grey: '#4F4F4F',
				white: '#FFFFFF',
			},
			fontFamily: { display: 'Manrope' },
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
