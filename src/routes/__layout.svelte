<script lang="ts">
	import '$styles/tailwind.css';

	import { onMount } from 'svelte';

	import { initializeTheme } from '$utils/themeSettings';
	import pollyfillData from '$utils/pollyfillData';
	import globalListeners from '$utils/globalListeners';
	import { wallets } from '$stores/user/wallets';
	import { getCsprBalance } from '$utils/balances';
	import { accountCsprBalance } from '$utils/casper/accountBalance';

	onMount(async () => {
		initializeTheme();

		// Global Listeners
		// globalListeners();
		console.log(
			await accountCsprBalance(
				'0154d4c09bcae885fdd3dc0bf8ac7fa23ae281baf60a5b352b1ff0b505a65e1285',
			),
		);

		// Fetch and add data to stores
		// pollyfillData();
	});

	$: $wallets.map((wallet) => {
		// getCsprBalance(wallet.walletAddress);
		return wallet;
	});
</script>

<main>
	<slot />
</main>
