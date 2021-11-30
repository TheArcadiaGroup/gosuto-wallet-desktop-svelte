module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts,css}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				...require('tailwindcss/defaultTheme').colors,
				// Add other colors (theme here)
				extralight: {
					gray: '#C4C4C459',
				},
				light: {
					gray: '#6C727F',
					orange: '#FF8266',
					purple: '#725DFF',
					green: '#45B26B',
					red: '#FF6666',
				},
				regular: {
					gray: '#4F4F4F',
				},
				dark: { blue: '#121826', gray: '#2A2F3C' },
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
