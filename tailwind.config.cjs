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
					blue: '#313642',
				},
				light: {
					grey: '#4F4F4F',
					purple: '#725DFF',
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
