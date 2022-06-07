<!-- @component 
	Describtion:
	> A credit card UI component that displays the data of the wallet (such as balance) on a visual credit card. This component is mainly visual - has no functionality.
	
	Props:
	- `ppurl` = URL of the profile picture.
	- `name` = Name of the wallet holder.
	- `wallet` = Object with data (like balance, staked, etc.) of the wallet.
-->
<script lang="ts">
	import { goto } from '$app/navigation';

	import CardGraphics from '$icons/CardGraphics.svelte';
	import PurpleTriangle from '$icons/PurpleTriangle.svelte';
	import ProfilePicture from '$lib/components/ProfilePicture.svelte';
	import { saveData } from '$utils/dataStorage';
	import { selectedWallet } from '$stores/user/wallets';
	import { walletLoaders } from '$stores/dataLoaders';
	import { loadWalletData } from '$utils/dataLoaders';
	import { user } from '$stores/user';
	import { csprPrice } from '$stores/tokens';
	import { page } from '$app/stores';

	export let avatar = '/images/png/avatar.png';
	export let name = 'Unknown Name';
	export let wallet: IWallet;

	function saveAddress() {
		console.log(wallet.walletName);
		selectedWallet.set(wallet);
		saveData('selectedWallet', wallet);

		// if (!$walletLoaders[wallet.publicKey]) {
		// 	loadWalletData(wallet.publicKey);
		// }
		// goto(`/profile/${$selectedWallet?.publicKey}/history`);

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

		return;
	}
</script>

<div class="credit-card-container" on:click={saveAddress}>
	<div class="data-column">
		<div class="pp-and-name">
			<div class="pp">
				<ProfilePicture url={avatar || '/images/png/avatar.png'} />
			</div>
			<div class="wallet_name">
				{name}
			</div>
		</div>
		<div class="grow-0">
			<div class="field-title">Available</div>
			<div class="acc-balance">
				<div class="balance-item">
					{#if !$walletLoaders[wallet.publicKey]}
						<span class="block mr-1">
							{parseFloat(wallet?.availableBalance.toFixed(4))}
						</span>
					{:else}
						<span class="skeleton-loader block mr-1 sm:mb-[2px]" />
					{/if}
					CSPR
				</div>

				<div class="balance-item">
					{#if !$walletLoaders[wallet.publicKey]}
						<span class="block mr-1">
							{parseFloat(
								(wallet?.availableBalance * $csprPrice.price[$user?.currency || 'usd']).toFixed(2),
							) || 0}
						</span>
					{:else}
						<span class="skeleton-loader block mr-1" />
					{/if}
					{$user?.currency.toUpperCase() || 'USD'}
				</div>
			</div>
		</div>
		<hr class="w-1/2" />
		<div class="grow-0">
			<div class="field-title">Staked</div>
			<div class="amount">
				{#if !$walletLoaders[wallet.publicKey]}
					<span class="block mr-1">
						{parseFloat(
							(wallet?.stakedBalance * $csprPrice.price[$user?.currency || 'usd']).toFixed(2),
						) || 0}
					</span>
				{:else}
					<span class="skeleton-loader block mr-1" />
				{/if}
				{$user?.currency.toUpperCase() || 'USD'}
			</div>
		</div>
		<div class="grow-0">
			<div class="field-title">unclaimed rewards</div>
			<div class="amount">
				{#if !$walletLoaders[wallet.publicKey]}
					<span class="block mr-1">
						{parseFloat(
							(wallet?.unclaimedRewards * $csprPrice.price[$user?.currency || 'usd']).toFixed(2),
						) || 0}
					</span>
				{:else}
					<span class="skeleton-loader block mr-1" />
				{/if}
				{$user?.currency.toUpperCase() || 'USD'}
			</div>
		</div>
	</div>
	<div class="grapics-column">
		<div class="purple-triangle">
			<PurpleTriangle />
		</div>
		<div class="z-10 w-3/4">
			<CardGraphics />
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.credit-card-container) {
		@apply lg:aspect-[16/10] rounded-xl w-full overflow-hidden transition-all;
		@apply border hover:border-light-purple border-white text-xs box-border relative shadow-md hover:shadow-lg aspect-[16/10] md:aspect-auto bg-white;
		@apply dark:border-dark-grey dark:bg-dark-grey dark:shadow-sm dark:hover:shadow-md  dark:shadow-light-purple dark:hover:shadow-light-purple max-w-xs;
		@apply cursor-pointer;
	}

	:local(.data-column) {
		@apply col-span-2 p-2 text-sm w-full h-full flex flex-col justify-evenly dark:text-white;
	}

	:local(.field-title) {
		@apply uppercase text-3xs xl:text-2xs text-light-gray font-semibold;
	}

	:local(.amount) {
		@apply text-2xs xl:text-xs font-semibold max-w-[33%] flex items-center;
	}

	:local(.acc-balance) {
		@apply text-2xs xl:text-xs font-semibold max-w-[40%] flex flex-col justify-between;
	}

	:local(.balance-item) {
		@apply w-full flex;
	}

	:local(.grapics-column) {
		@apply flex flex-col col-span-1 justify-center items-center h-full top-0 right-0 w-1/3 absolute py-4;
	}

	:local(.pp-and-name) {
		@apply flex flex-row items-center gap-1;
	}

	:local(.pp) {
		@apply w-6 h-6 rounded-md overflow-hidden mb-1;
	}

	:local(.wallet_name) {
		@apply text-xs font-bold text-light-purple;
	}
	/* 
	:local(.unclaimed) {
		@apply flex flex-row items-center gap-1;
	} */

	:local(.purple-triangle) {
		@apply w-full -mt-1 -mr-1 absolute right-0 top-0;
	}
</style>
