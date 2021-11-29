<script>
	import Wallet from '$lib/Wallet.svelte';

	export let wallets = [{}, {}];
</script>

<main class="wallet-section">
	{#each wallets as wallet}
		<Wallet />
	{/each}
	<button class="btn">
		<div>
			<p>+ Add Wallet</p>
		</div>
	</button>
</main>

<style>
	.wallet-section {
		@apply box-border rounded-xl px-3 py-3 min-w-max mr-4 mt-4 flex flex-col items-center;
		border: 0.5px solid rgba(243, 243, 243, 1);
		box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
	}

	.btn {
		@apply text-white py-3 px-7 rounded-2xl mt-4;
		background: #ff8266;
	}
</style>
