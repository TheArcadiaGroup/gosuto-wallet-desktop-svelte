<script lang="ts">
	import '$styles/tailwind.css';

	import { onMount } from 'svelte';

	import { initializeTheme } from '$utils/themeSettings';
	import pollyfillData from '$utils/pollyfillData';
	import globalListeners from '$utils/globalListeners';
	import { wallets } from '$stores/user/wallets';
	import { getCsprBalance } from '$utils/balances';

	onMount(async () => {
		initializeTheme();

		// Global Listeners
		// globalListeners();

		// Fetch and add data to stores
		pollyfillData();
	});

	$: $wallets.map((wallet) => {
		// getCsprBalance(wallet.walletAddress);
		return wallet;
	});
</script>

<main>
	<slot />
</main>
