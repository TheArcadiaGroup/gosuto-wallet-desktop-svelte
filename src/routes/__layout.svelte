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
		window.api.receive('createWalletResponse', (data: string) => {
			console.log('Wallet Successfully Created: ', data);
		});

		// Customize commands that you send in this way
		window.api.send('createWallet', 'Initialize New Wallet');
	});
</script>

<main>
	<slot />
</main>
