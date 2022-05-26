export default function () {
	// Delegate Response
	window.api.receive('delegateResponse', (response: any) => {
		console.log(JSON.parse(response));
	});

	// Delegate Response
	window.api.receive('undelegateResponse', (response: any) => {
		console.log(JSON.parse(response));
	});
}
