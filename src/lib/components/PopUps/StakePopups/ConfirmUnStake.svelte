<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';

	export let amount: number = 0;
</script>

<Popup title={'Are you sure you want to unstake?'} on:confirm on:cancel hasCancel={true}>
	<p class="amount">{amount} CSPR</p>
	<p class="warning">
		Please Note! <br />
		There is a 7 era delay to undelegate. Era duration is approximately 120 minutes. Once done, the undelegated
		funds will appear in your wallet.
	</p>
</Popup>

<style lang="postcss">
	p {
		@apply text-sm mb-1;
	}

	.amount {
		@apply text-lg font-bold text-light-purple;
	}

	.warning {
		@apply text-xs text-light-orange text-center mt-2;
	}
</style>
