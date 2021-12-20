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
					gray: '#4F4F4F',
					blue: '#313642',
				},
				light: {
					gray: '#A9A9A9',
					green: '#70CF98',
					red: '#FF6666',
					orange: '#FF8266',
					appPurple: '#725DFF',
				},
			},
			fontFamily: { display: 'Manrope' },
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
