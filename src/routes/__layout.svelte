<script lang="ts">
	import '$styles/tailwind.css';

	import { onMount } from 'svelte';

	import { initializeTheme } from '$utils/themeSettings';

	onMount(() => {
		initializeTheme();

		// Sending messages to and from the renderer process to the main electron process
		window.api.send('toMain', 'This is the data I love men');

		window.api.receive('fromMain', (data: string) => {
			console.log(`Received ${data} from main process`);
		});

		// Receive wallet creation response
		window.api.receive('createWalletResponse', (data: any) => {
			console.log('Wallet Successfully Created: ', data);
		});

		// Customize commands that you send in this way
		window.api.send(
			'createWallet',
			'south twice ketchup hat squirrel prison lumber loud inherit bright autumn crucial',
		);

		// Receive wallet creation response
		window.api.receive('createWalletFromFileResponse', (data: any) => {
			console.log('Wallet Successfully Created from File: ', data);
		});

		window.api.send(
			'createWalletFromFile',
			'-----BEGIN PRIVATE KEY-----\
				MC4CAQAwBQYDK2VwBCIEIFFJPMA//nqjCVOFb8lVgj0qS1WK4JFWfqZ9cb5Uj1BU\
				-----END PRIVATE KEY-----',
		);
	});
</script>

<main>
	<slot />
</main>
