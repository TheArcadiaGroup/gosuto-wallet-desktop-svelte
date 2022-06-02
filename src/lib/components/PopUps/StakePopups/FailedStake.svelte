<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';

	export let amount = 0;
	export let isUnstaking = false;
	export let error = '';
</script>

<Popup title={isUnstaking ? 'Unstaking Failed!' : 'Staking Failed'} on:confirm on:cancel>
	<p>
		Failed to stake <span class="amount">
			{amount}
		</span>
		CSPR.
	</p>
	{#if error.length > 0}
		<p class="error">
			{error}
		</p>
	{/if}
</Popup>

<style lang="postcss">
	p {
		@apply text-sm mb-1;
	}

	.amount {
		@apply text-lg font-bold text-light-purple;
	}

	.error {
		@apply text-xs text-light-orange text-center mt-2;
	}
</style>
