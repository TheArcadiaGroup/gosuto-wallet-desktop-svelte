let appSettings: AppSettings = {
	name: '',
	email: '',
	pictureUrl: '',
};

/** Accepts settings data and saves them */
export async function post(params: any): Promise<any> {
	appSettings = await JSON.parse(params.body);
	console.log(appSettings);
	return {
		status: 200,
	};
}

/** returns settings data */
export async function get(params: any): Promise<any> {
	return {
		status: 200,
		body: JSON.stringify(appSettings),
	};
}
