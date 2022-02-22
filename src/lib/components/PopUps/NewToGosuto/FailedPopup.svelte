<script lang="ts">
	import Popup from '$lib/Components/Popup.svelte';
</script>

<Popup title="You didn’t copy your seed phrase!" on:confirm on:cancel goBack={true} />
