<script lang="ts">
	import 'swiper/css';
	import 'swiper/css/navigation';
	import '$styles/tailwind.css';

	import momentScript from '$scripts/js/moment.js?url';
	import nodePackagesScript from '$scripts/js/nodePackages.js?url';

	import { onMount } from 'svelte';
	import LoginPopup from '$lib/components/PopUps/LoginPopup/index.svelte';

	import { initializeTheme } from '$utils/themeSettings';
	import pollyfillData from '$utils/pollyfillData';
	import globalListeners from '$utils/globalListeners';
	import { walletToUnlock } from '$stores/user/wallets';
	import NavigationHandlers from '$lib/components/NavigationHandlers.svelte';
	import { navigateToUrl } from '$utils/profiles';
	import { page } from '$app/stores';
	import { updaterMessage } from '$stores';
	import UpdaterPopup from '$lib/components/PopUps/Updater/UpdaterPopup.svelte';
	import LedgerComms from '$lib/components/Ledger/LedgerComms.svelte';

	onMount(async () => {
		initializeTheme();

		window.api.send('appUpdates', JSON.stringify({ action: 'APP_VERSION' }));

		// Global Listeners
		globalListeners();

		// Fetch and add data to stores
		// First Set
		// Might not be advisable here since the user might not know which wallet that is
		pollyfillData();

		navigateToUrl($page.url.pathname, () => {
			return;
		});
	});
</script>

<svelte:head>
	<title>Gosuto</title>
	<script src={momentScript}></script>
	<script src={nodePackagesScript}></script>
</svelte:head>

<NavigationHandlers />
<main>
	{#if $walletToUnlock}
		<LoginPopup unlockData={$walletToUnlock} />
	{/if}
	{#if $updaterMessage}
		<UpdaterPopup appUpdateComms={$updaterMessage} />
	{/if}

	<LedgerComms />
	<slot />
</main>
