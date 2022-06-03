<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';

	export let copyMessage = 'Text Copied To Clipboard';
</script>

<Popup title={copyMessage} on:confirm on:cancel />
