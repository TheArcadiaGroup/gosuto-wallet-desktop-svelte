let profileSettings: ProfileSettings = {
	walletName: '',
	walletAddress: '',
	publicKey: '',
	privateKey: '',
	currentPassword: '',
};

/** Accepts settings data and saves them */
export async function post(params: any): Promise<any> {
	profileSettings = await JSON.parse(params.body);
	return {
		status: 200,
	};
}

/** returns settings data */
export async function get(params: any): Promise<any> {
	return {
		status: 200,
		body: JSON.stringify(profileSettings),
	};
}
