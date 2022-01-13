export const toggleDarkMode = () => {
	// Check Local Storage for whether dark mode is enabled or not
	const isDarkModeEnabled =
		localStorage.theme === 'dark' ||
		(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

	if (isDarkModeEnabled) {
		// If dark mode is enabled change to light
		document.documentElement.classList.remove('dark');
		localStorage.theme = 'light';
	} else {
		// Change to dark mode if light mode is selected
		document.documentElement.classList.add('dark');
		localStorage.theme = 'dark';
	}
};

export const initializeTheme = () => {
	const isDarkModeEnabled =
		localStorage.theme === 'dark' ||
		(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

	if (isDarkModeEnabled) {
		document.documentElement.classList.add('dark');
		localStorage.theme = 'dark';
	} else {
		document.documentElement.classList.remove('dark');
		localStorage.theme = 'light';
	}
};
