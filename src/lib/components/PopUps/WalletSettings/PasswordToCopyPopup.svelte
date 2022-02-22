<script lang="ts">
	import Popup from '$lib/Components/Popup.svelte';
	import TextInput from '$lib/Components/TextInput.svelte';
	let password: string;
</script>

<Popup title="Enter wallet password to copy private key" on:confirm on:cancel hasCancel={true}>
	<TextInput bind:value={password} label="Password" type="password" />
</Popup>
