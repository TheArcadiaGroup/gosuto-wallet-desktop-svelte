<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';

	export let tokenName: string = 'TestToken';
	export let price: number = 30;
</script>

<Popup title="Send CSPR" on:confirm on:cancel hasCancel={true}>
	<p>
		You are about to create <span class="highlights">{tokenName}</span>
		that is worth
		<span class="highlights">${price}</span>
		on the CSPR network.
	</p>
</Popup>

<style lang="postcss">
	p {
		@apply text-sm font-semibold;
	}

	.highlights {
		@apply text-light-purple break-words;
	}
</style>
