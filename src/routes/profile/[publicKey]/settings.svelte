<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import Navbar from '$lib/components/Navbar/Navbar.svelte';

	import ProfileNavigation from '$lib/pages/Profile/ProfileNavigation.svelte';
	import Settings from '$lib/pages/Profile/WalletSettings/index.svelte';
	import { selectedWallet, wallets } from '$stores/user/wallets';
	import { pollyfillSelectedWallet, pollyFillUser } from '$utils/pollyfillData';

	onMount(() => {
		// If no wallets, navigate user to create them
		if ($wallets.length <= 0) {
			goto('/profile');
		}

		// load profile first
		if ($selectedWallet?.publicKey.toLowerCase() !== $page.params['publicKey'].toLowerCase()) {
			pollyfillSelectedWallet();
		}

		// Retrieve the selected profile off the user
		pollyFillUser();
	});
</script>

<div class="flex">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<ProfileNavigation />
	</div>
	<div class="global-grid-mid">
		<Settings />
	</div>
</div>

<style lang="postcss" global>
	/* :local(.size-full) {
		@apply w-full h-full;
	} */

	:local(.global-grid-mid) {
		@apply w-full max-h-screen flex-[4];
		@apply overflow-y-auto;
		@apply dark:border-0;

		@apply dark:bg-dark-background;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.global-grid-mid::-webkit-scrollbar {
		@apply w-0 h-0;
	}
</style>
