export const saveData = (key: string, data: string) => {
	localStorage.setItem(key, data);
	return true;
};

export const retrieveData = (key: string) => {
	if (localStorage.getItem(key)) {
		const data = JSON.parse(localStorage.getItem(key)!);
		return data;
	} else {
		return null;
	}
};
