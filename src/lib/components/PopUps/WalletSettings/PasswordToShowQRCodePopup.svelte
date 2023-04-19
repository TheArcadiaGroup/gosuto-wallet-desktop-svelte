<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { onDestroy } from 'svelte';

	export let password: string = '';
	export let okDisabled = true;

	onDestroy(() => {
		password = '';
		okDisabled = true;
	});
</script>

<Popup
	title="Enter wallet password to show QRCode private key"
	on:confirm
	on:cancel
	hasCancel={true}
	{okDisabled}
>
	<TextInput bind:value={password} label="Password" type="password" addTextBg={true} />
</Popup>
