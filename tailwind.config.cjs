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
					blue: '#313642',
					lighterGray: ' #AEBBC4',
					backgroundgray: '#363B46',
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
					lineColor: '#E6E8EC',
					scrollBar: '#EAEAEA',
					white: '#FFFFFF',
					green: '#70CF98',
					red: '#FF6666',
					orange: '#FF8266',
					backgroundgray: '#FDFDDE',
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
	plugins: [require('@tailwindcss/forms')],
};
