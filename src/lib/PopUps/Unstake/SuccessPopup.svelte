<script lang="ts">
	import Popup from '$lib/Common/Popup.svelte';
</script>

<Popup title="Success!" on:confirm on:cancel>
	<p>Your Unstake was Successful!</p>
</Popup>

<style lang="postcss">
	p {
		@apply text-sm font-semibold;
	}
</style>
