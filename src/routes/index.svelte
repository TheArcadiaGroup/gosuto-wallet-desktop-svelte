<script lang="ts">
	import SplashScreen from '$lib/components/SplashScreen.svelte';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { selectedWallet, wallets } from '$stores/user/wallets';
	import pollyfillData from '$utils/pollyfillData';

	onMount(async () => {
		// Data should already be pollyfilled from the __layouts file
		pollyfillData();

		if ($selectedWallet) {
			// by the time the function is in here, the selectedWallet will have a value
			setTimeout(() => goto(`/profile/${$selectedWallet!.walletAddress}`), 1000);
		} else {
			if ($wallets?.length > 0) {
				setTimeout(() => goto(`/profile`), 1000);
			} else {
				// If the user has no wallets/profile, redirect them to the onboarding screen
				setTimeout(() => goto('/onboarding'), 1000);
			}
		}
	});
</script>

<SplashScreen />
