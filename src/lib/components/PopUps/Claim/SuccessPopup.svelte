<script lang="ts">
	import Popup from '$lib/Components/Popup.svelte';

	export let amount: number = 15;
</script>

<Popup title="Success!" on:confirm on:cancel>
	<p>
		<span class="highlights">{amount} CSPR</span>
		Claimed
	</p>
</Popup>

<style lang="postcss">
	p {
		@apply font-semibold;
	}

	.highlights {
		@apply text-light-purple break-words;
	}
</style>
