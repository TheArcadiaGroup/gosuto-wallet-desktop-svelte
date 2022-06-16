export default () => {
	window.api.receive('deployErc20ContractResponse', async (response: string) => {
		console.log(response, JSON.parse(response));
	});
};
