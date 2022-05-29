<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';

	export let amount = 0;
</script>

<Popup title="Stake Failed!" on:confirm on:cancel>
	<p>
		Failed to delegate <span class="amount">
			{amount}
		</span>
		CSPR.
	</p>
</Popup>

<style lang="postcss">
	p {
		@apply text-xs mb-1;
	}

	.amount {
		@apply text-lg font-bold text-light-purple;
	}
</style>
