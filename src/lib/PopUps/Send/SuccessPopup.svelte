<script lang="ts">
	import Popup from '$lib/Common/Popup.svelte';

	export let amount: number = 50;
	export let address: string = '4e32r8932hdi32hurh8hri3hior2io3r32rj3iofj';
</script>

<Popup title="Success" on:confirm on:cancel>
	<p>
		You sent <span class="highlights">{amount} CSPR</span>
		to
		<span class="highlights">{address}</span>
	</p>
</Popup>

<style lang="postcss">
	p {
		@apply text-sm font-semibold;
	}

	.highlights {
		@apply text-light-appPurple break-words;
	}
</style>
