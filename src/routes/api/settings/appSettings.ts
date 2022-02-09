/** Accepts profile data and saves them */
export async function post(params: any): Promise<any> {
	profileData = await JSON.parse(params.body);

	return {
		status: 200,
		body: JSON.stringify(''),
	};
}

export async function get(params: any): Promise<any> {
	return {
		status: 200,
		body: JSON.stringify(profileData),
	};
}
