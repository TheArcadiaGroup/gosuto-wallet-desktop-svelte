<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';
	import Loading from '$components/Loading.svelte';
	import { connectingToLedger } from '$stores/ledger';

	// export let checkConnection = false;
</script>

{#if $connectingToLedger}
	<Popup title="Send CSPR" on:confirm on:cancel hasCancel={true}>
		<p>Connecting to your Ledger Device</p>
		<Loading useFirework={false} />
	</Popup>
{/if}

<style lang="postcss">
	p {
		@apply text-sm font-semibold;
	}

	.highlights {
		@apply text-light-purple break-words;
	}
</style>
