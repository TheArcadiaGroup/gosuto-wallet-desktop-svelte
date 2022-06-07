<script lang="ts">
	import NavActivityIcon from '$icons/NavActivityIcon.svelte';
	import NavBookmarkIcon from '$icons/NavBookmarkIcon.svelte';
	import NavSettingsIcon from '$icons/NavSettingsIcon.svelte';
	import NavFlameIcon from '$icons/NavFlameIcon.svelte';
	import NavStackIcon from '$icons/NavStackIcon.svelte';
	import GosutoNavLogo from '$icons/NavLogo.svelte';

	import SelectItems from './SelectItems.svelte';
	import NavItem from './NavItem.svelte';

	import { goto } from '$app/navigation';
	import { selectedWallet } from '$stores/user/wallets';
	import { user } from '$stores/user';
	import { saveData } from '$utils/dataStorage';
	import { loadWalletData } from '$utils/dataLoaders';

	const updateUniversalToken = (e: any) => {
		if ($user) {
			const prevUser = $user;
			prevUser.currency = e.target.value.toLowerCase() as SupportedCurrencies;
			user.set(prevUser);
			saveData('user', JSON.stringify(prevUser));
			if ($selectedWallet) {
				loadWalletData($selectedWallet.publicKey);
			}
		}
	};

	let selectedCurrency = $user?.currency.toLowerCase() || 'usd';
</script>

<div class="navbar">
	<div class="navbar-top">
		<NavItem><GosutoNavLogo class="large-nav-icon" /></NavItem>
		<NavItem reverse={true}>
			<NavFlameIcon class="large-nav-icon" />
		</NavItem>
		<NavItem
			baseUrl={'/profile'}
			on:click={() => goto(`/profile/${$selectedWallet?.publicKey}/history`)}
		>
			<div class="navbar-avatar-img" />
		</NavItem>
		<NavItem baseUrl={'/history'} on:click={() => goto('/history')}>
			<NavBookmarkIcon class="nav-icon" />
		</NavItem>
		<NavItem baseUrl={'/all-stakes'} on:click={() => goto('/all-stakes')}>
			<NavStackIcon class="nav-icon" />
		</NavItem>
		<NavItem baseUrl={'/performance'} on:click={() => goto('/performance')}>
			<NavActivityIcon class="nav-icon" />
		</NavItem>
	</div>

	<div class="navbar-bottom">
		<NavItem baseUrl={'/settings'} on:click={() => goto('/settings')}>
			<NavSettingsIcon class="nav-icon" />
		</NavItem>
		<SelectItems
			on:change={updateUniversalToken}
			selectedItem={selectedCurrency}
			class="navbar-select-items"
			items={{ usd: 'USD', eur: 'EUR', jpy: 'JPY' }}
		/>
		<!-- <SelectItems
			class="navbar-select-items -rotate-90 -ml-3"
			items={{ testnet: 'Testnet', mainnet: 'Mainnet' }}
		/> -->
	</div>
</div>

<style lang="postcss" global>
	div.navbar {
		@apply flex md:flex-col justify-between items-center z-50;
		@apply sticky top-0;

		@apply bg-white dark:bg-dark-grey;
		@apply md:min-w-fit w-screen md:w-full py-4 md:py-0 md:h-screen min-h-fit;
		@apply overflow-x-scroll md:overflow-auto;

		box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.navbar::-webkit-scrollbar {
		@apply w-0 h-0;
	}

	.navbar-top {
		@apply max-w-[5rem];

		@apply flex md:flex-col justify-evenly items-center gap-x-2 md:gap-x-0;
		@apply ml-1 mr-4 md:mx-0;
		@apply w-full min-w-[32rem] md:min-w-fit md:h-3/5 md:min-h-[32rem];
	}

	.navbar-bottom {
		@apply max-w-[5rem];
		@apply flex md:flex-col justify-evenly items-center md:gap-y-10;
		@apply w-[8%] min-w-[2rem] md:w-full md:h-[30%] md:min-h-[16rem];
		@apply mr-4 md:mr-0 md:pb-4;
	}

	.navbar-select-items {
		@apply hidden md:block;
	}

	.navbar :global(.nav-icon) {
		@apply w-6 h-6 4xl:w-16 4xl:h-16;
	}

	.navbar :global(.large-nav-icon) {
		@apply w-12 h-12 4xl:w-24 4xl:h-24;
	}

	.navbar-avatar-img {
		@apply min-w-full w-full h-12 4xl:h-28;

		background-image: url('/images/png/avatar.png');
		@apply bg-cover bg-center;
	}
</style>
