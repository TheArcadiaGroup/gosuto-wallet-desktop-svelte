<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	let password: string;
</script>

<Popup title="Enter wallet password to export wallet file" on:confirm on:cancel hasCancel={true}>
	<TextInput bind:value={password} label="Password" type="password" />
</Popup>
