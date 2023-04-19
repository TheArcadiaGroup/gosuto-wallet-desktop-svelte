<script lang="js">
	import Popup from '$lib/components/Popup.svelte';
	import { onDestroy } from 'svelte';

	export let privateKey = '';
	export let okDisabled = false;

	onDestroy(() => {
		privateKey = '';
		okDisabled = false;
	});
</script>

<Popup
	title="Scan QRCode on Gosuto Mobile to import private key"
	on:confirm
	confirmText="Dismiss"
	{okDisabled}
>
	<h2>{privateKey}</h2>
</Popup>
