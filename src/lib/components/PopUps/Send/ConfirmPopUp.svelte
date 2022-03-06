<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';

	export let amount: number = 50;
	export let address: string = '4e32r8932hdi32hurh8hri3hior2io3r32rj3iofj';
</script>

<Popup title="Send CSPR" on:confirm on:cancel hasCancel={true}>
	<p>
		You are about to send <span class="highlights">{amount} CSPR</span>
		to
		<span class="highlights">{address}</span>
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
