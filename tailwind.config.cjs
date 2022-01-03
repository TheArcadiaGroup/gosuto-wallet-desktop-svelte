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
				},
			},
			fill: {
				white: '#FFFFFF',
				grey: '#4F4F4F',
			},
			fontFamily: { display: 'Manrope' },
			boxShadow: {
				'light-stake-position': '0px 4px 9px rgba(0, 0, 0, 0.05)',
				'dark-stake-position': '0px 4px 12px rgba(0, 0, 0, 0.05)',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
