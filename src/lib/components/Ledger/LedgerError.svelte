<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';
	import { ledgerError } from '$stores/ledger';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

{#if $ledgerError}
	<Popup
		title={$ledgerError}
		confirmText="Will Do"
		on:confirm={() => {
			ledgerError.set(null);
			dispatch('confirm');
		}}
		on:cancel
		hasCancel={false}
	/>
{/if}
