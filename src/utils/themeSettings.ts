import { user } from '$stores/user';
import { saveData } from './dataStorage';
import { pollyFillUser } from './pollyfillData';

/**
 *  @function
 *  A function to toggle between dark mode and light mode
 */
export const toggleDarkMode = () => {
	/**  Check Local Storage for whether dark mode is enabled or not */
	const user: IUser = pollyFillUser();
	const isDarkModeEnabled =
		user.theme === 'dark' ||
		(!('theme' in user) && window.matchMedia('(prefers-color-scheme: dark)').matches);

	if (isDarkModeEnabled) {
		/** If dark mode is enabled change to light */
		document.documentElement.classList.remove('dark');
		user.theme = 'light';
	} else {
		/** Change to dark mode if light mode is selected */
		document.documentElement.classList.add('dark');
		user.theme = 'dark';
	}

	// Update and pollyfill user store
	saveData('user', JSON.stringify(user));
	pollyFillUser();
};

/** A function to initialize page theming */
export const initializeTheme = () => {
	const proxyUser: IUser = pollyFillUser();

	const isDarkModeEnabled =
		proxyUser.theme === 'dark' ||
		(!('theme' in proxyUser) && window.matchMedia('(prefers-color-scheme: dark)').matches);

	if (isDarkModeEnabled) {
		document.documentElement.classList.add('dark');
		proxyUser.theme = 'dark';
	} else {
		document.documentElement.classList.remove('dark');
		proxyUser.theme = 'light';
	}

	user.set(proxyUser);

	return proxyUser.theme;
};
