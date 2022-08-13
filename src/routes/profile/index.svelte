<script lang="ts">
	import CreditCard from '$lib/pages/Profile/CreditCard.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import Button from '$lib/components/Button.svelte';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { user } from '$stores/user';
	import pollyfillData from '$utils/pollyfillData';
	import { selectedWallet, walletToUnlock, wallets } from '$stores/user/wallets';
	import { saveData } from '$utils/dataStorage';
	import { loadWalletData } from '$utils/dataLoaders';
	import { walletLoaders } from '$stores/dataLoaders';
	import { goto } from '$app/navigation';

	function switchWalletInternal(wallet: IWallet, path: string) {
		// Check whether wallet is locked yet
		if (
			wallet.lockStatus.isLocked ||
			(wallet.lockStatus.lastUnlocked + wallet.lockStatus.lockTimeout * 1000 < Date.now() &&
				!wallet.lockStatus.isLocked)
		) {
			// Trigger unlock popup
			selectedWallet.set(wallet);
			walletToUnlock.set({ wallet, path });
			return;
		}

		wallet.lockStatus = {
			...wallet.lockStatus,
			isLocked: false,
		};

		walletToUnlock.set(null);
		selectedWallet.set(wallet);
		saveData('selectedWallet', wallet);

		saveData(
			'wallets',
			$wallets.map((_wallet) => {
				if (_wallet.publicKey === wallet.publicKey) {
					return wallet;
				}
				return _wallet;
			}),
		);

		// There's a bug related to this and we don't want to break this until we find the culprit
		if ($page.params.publicKey && $page.params.publicKey !== wallet.publicKey) {
			const newUrl = $page.url.pathname.replace($page.params.publicKey, wallet.publicKey);

			// Only send load request when it is not currently loading
			if (!$walletLoaders[wallet.publicKey]) {
				loadWalletData(wallet.publicKey);
			}

			goto(newUrl);
			return;
		}

		if ($page.url.pathname === '/profile') {
			goto(`/profile/${$selectedWallet?.publicKey}/history`);
		}
	}

	onMount(() => {
		if ($wallets.length <= 0) {
			pollyfillData();
		}
	});
</script>

<div class="flex">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-mid">
		<div class="mid-content">
			<div class="content-header">
				<div class="content-header_content">
					<h1>Select Wallet</h1>
					<div class="button-wrapper" on:click={() => goto('/add-wallet')}>
						<Button>
							<div slot="text" class="button">+ Add wallet</div>
						</Button>
					</div>
				</div>
			</div>
			<div class="credit-card-wrapper">
				{#each $wallets as wallet}
					<div
						class="single-card-wrap"
						on:click={() =>
							switchWalletInternal(
								wallet,
								$page.params.publicKey && $page.params.publicKey !== wallet.publicKey
									? $page.url.pathname.replace($page.params.publicKey, wallet.publicKey)
									: `/profile/${wallet.publicKey}/history`,
							)}
					>
						<CreditCard name={wallet.walletName} {wallet} avatar={$user?.avatar} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.global-grid-mid) {
		@apply dark:bg-dark-background;
		@apply flex justify-center;
	}

	:local(.mid-content) {
		@apply h-full w-1/2;
		@apply flex flex-col align-middle items-center gap-10;
		/* @apply mt-20; */
	}

	:local(.content-header) {
		@apply flex justify-around gap-4;
		@apply w-full pt-20 pb-4;
		@apply sticky top-0 bg-white dark:bg-dark-background z-50;
	}

	.content-header_content {
		@apply flex justify-around gap-4;
		@apply w-1/2;
	}

	:local(h1) {
		@apply font-display font-bold text-2xl text-center dark:text-white;
	}

	:local(.button-wrapper) {
		@apply w-1/3 h-full;
		@apply font-display font-bold text-sm;
	}

	:local(.credit-card-wrapper) {
		@apply flex flex-col place-items-center gap-8 w-full lg:w-1/2;
		@apply mb-8 h-full overflow-y-scroll pr-3 lg:pr-0;
	}

	:local(.single-card-wrap) {
		@apply w-full;
		@apply flex justify-center;
	}
</style>
