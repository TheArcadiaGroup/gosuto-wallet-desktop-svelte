const { borderRadius } = require('tailwindcss/defaultTheme');

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
					background: '#363b46',
					grey: '#2A2F3C',
					brown: '#FECE80',
					lightBlue: '#E1E3FF',
					gosutoDark: '#363B46',
					gosutoIconGrey: '#BDBDBE',
					blue: '#313642',
					lighterGray: ' #AEBBC4',
				},
				light: {
					gray: '#A9A9A9',
					grayShadeOne: '#AEBBC5',
					grayShadeTwo: '#C1C1C1',
					grayShadeThree: '#C4C4C4',
					green: '#70CF98',
					red: '#FF6666',
					orange: '#FF8266',
					orangeShadeOne: '#FFCB66',
					lighterOrange: '#FF7A28',
					lighterGray: '#6C727F',
					grey: '#4F4F4F',
					gardenText: '#4B4B4B',
					purple: '#725DFF',
					blue: '#383B62',
					lineColor: '#E6E8EC',
					scrollBar: '#EAEAEA',
					white: '#FFFFFF',
					backgroundgray: '#FDFDDE',
					neutrals1: '#E6E8EC',
					neutrals2: '#23262F',
					neutrals4: '#777E90',
				},
			},
			fill: {
				grey: '#4F4F4F',
				white: '#FFFFFF',
			},
			fontFamily: { display: "'Manrope', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'" },
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
};
