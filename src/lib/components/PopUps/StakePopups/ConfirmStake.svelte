<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';

	export let amount: number = 0;
</script>

<Popup title={'Are you sure you want to stake?'} on:confirm on:cancel hasCancel={true}>
	<p class="amount">{amount} CSPR</p>
</Popup>

<style lang="postcss">
	p {
		@apply text-sm mb-1;
	}

	.amount {
		@apply text-lg font-bold text-light-purple;
	}
</style>
