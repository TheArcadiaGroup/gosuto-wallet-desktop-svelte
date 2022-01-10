<script lang="ts">
	import Popup from '$lib/Common/Popup.svelte';
	import TextInput from '$lib/Common/TextInput.svelte';
	let password: string;
</script>

<Popup title="Enter wallet password to copy private key" on:confirm on:cancel hasCancel={true}>
	<TextInput bind:value={password} label="New Password" type="password" />
</Popup>
