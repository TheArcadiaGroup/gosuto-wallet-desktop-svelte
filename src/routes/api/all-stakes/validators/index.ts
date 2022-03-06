let validatorData = Array(10).fill({
	validatorName: 'Arcadia',
	uptime: 1,
	validatorCommission: 0.05,
	votingPower: 1,
	selfDelegation: 1,
	delegationReturn: 0.405,
});

export async function get(params: any): Promise<any> {
	let data = validatorData;
	return {
		status: 200,
		body: JSON.stringify(data),
	};
}
