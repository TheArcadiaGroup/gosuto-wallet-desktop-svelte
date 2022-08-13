<!-- @component 
	Describtion:
	> Component that fills the first column of the grid layout on /profile routes.
	
	Props:
	- `user` = Object with user's data such as name, profile picture url, etc. Also includes his wallets and data from the wallets (names, balance, etc.).
	- `forRoute` = Either `profile` OR `all-stakes`. Used for deciding what to show in the UI.
-->
<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ProfilePicture from '$lib/components/ProfilePicture.svelte';
	import CardCarousel from './CardCarousel/CardCarousel.svelte';
	import CarouselItem from './CardCarousel/CarouselItem.svelte';
	import CreditCard from './CreditCard.svelte';
	import ProfileMenu from './ProfileMenu.svelte';

	// MENU IMPORTS
	import Bookmark from '$icons/Bookmark.svelte';
	import Stake from '$icons/Stake.svelte';
	// import Swap from '$icons/Swap.svelte';
	import SendIcon from '$icons/SendIcon.svelte';
	import Wallet from '$icons/Wallet.svelte';
	import ChartPie from '$icons/ChartPie.svelte';
	import Checklist from '$icons/Checklist.svelte';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import pollyfillData from '$utils/pollyfillData';
	import { wallets } from '$stores/user/wallets';
	import { user } from '$stores/user';
	import { saveData } from '$utils/dataStorage';

	let forRoute: 'profile' | 'all-stakes';
	$: forRoute = $page.url.pathname.startsWith('/profile') ? 'profile' : 'all-stakes';
	$: publicKey = $page.params.publicKey;

	type MenuItems = {
		name: string;
		label: string;
		icon: any;
	}[];

	/**Options for the content of the menu. Either 'profile' or 'all-stakes'.*/
	const menuItemsOptions: {
		profile: MenuItems;
		'all-stakes': MenuItems;
	} = {
		profile: [
			{ name: 'history', label: 'History', icon: Bookmark },
			{ name: 'send', label: 'Send', icon: SendIcon },
			{ name: 'stake', label: 'Stakes', icon: Stake },
			{ name: 'settings', label: 'Wallet Settings', icon: Wallet },
			// { name: 'swap', label: 'Swap', icon: Swap },
		],
		'all-stakes': [
			{ name: 'all-positions', label: 'All positions', icon: ChartPie },
			{ name: 'validators', label: 'Validators', icon: Checklist },
		],
	};

	/**Array of objects that are displayed as menu items.*/
	let menuItems: MenuItems;
	$: menuItems = menuItemsOptions[forRoute];

	onMount(() => {
		pollyfillData();
	});

	// Handler for clicking on a menu item in the menu and redirectin to the corresponding subroute
	function menuSelect(e: CustomEvent) {
		const selection = e.detail.menu_item;
		if (menuItems == menuItemsOptions['all-stakes']) {
			goto(`/${forRoute}/${selection}`);
		} else {
			if (publicKey) {
				goto(`/${forRoute}/${publicKey}/${selection}`);
			} else if ($wallets.length > 0) {
				saveData('selectedWallet', $wallets.filter((wallet) => wallet.publicKey === publicKey)[0]);
				goto(`/${forRoute}/${publicKey}/${selection}`);
			} else {
				goto('/add-wallet');
			}
		}
	}

	/**Handler for clicking "Add wallet" button, that prompts user with add wallet UI flow.*/
	function addWallet() {
		// add wallet
		goto('/add-wallet');
	}
</script>

<div class="main">
	<div class="container">
		<div class="profile-picture-and-name">
			<div class="profile-picture">
				<ProfilePicture url={$user?.avatar || '/images/png/avatar.png'} />
			</div>
			<div class="username">
				{$user?.name || 'Unknown Name'}
			</div>
		</div>
		{#if forRoute === 'profile'}
			<div class="button-container not-on-mobile">
				<div class="w-full" on:click={addWallet}>
					<Button>
						<div slot="text" class="button">+ Add wallet</div>
					</Button>
				</div>
			</div>
			<div class="carousel-container">
				{#if $wallets.length > 0}
					<CardCarousel>
						{#each $wallets as wallet, _i}
							<CarouselItem>
								<CreditCard
									name={wallet.walletName || 'Unknown Name'}
									avatar={$user?.avatar || ''}
									{wallet}
								/>
							</CarouselItem>
						{/each}
					</CardCarousel>
				{/if}
			</div>
		{/if}
		<div class="hr not-on-mobile">
			<hr />
		</div>
		<div class="profile-menu">
			<ProfileMenu on:click={menuSelect} {menuItems} />
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply h-full w-full md:overflow-y-scroll overflow-x-hidden flex flex-col;
		@apply dark:bg-dark-blue;
	}

	:local(.container) {
		@apply w-full md:h-0 flex-grow flex flex-col items-center md:pt-14;
	}

	:local(.profile-picture-and-name) {
		@apply flex-col items-center gap-6 hidden md:flex md:px-4;
	}

	:local(.profile-picture) {
		@apply w-16 h-16 rounded-xl overflow-hidden border border-light-orangeShadeOne;
	}

	:local(.username) {
		@apply font-semibold dark:text-white mb-2;
	}

	:local(.button-container) {
		@apply mx-6 max-w-xs w-full md:px-4 mb-2;
	}

	:local(.carousel-container) {
		@apply w-full;
	}

	:local(.hr) {
		@apply w-full md:px-4 pt-6;
	}

	:local(.profile-menu) {
		@apply w-full md:max-w-xs md:px-4 md:py-4;
	}

	:local(.button) {
		@apply my-2 text-xs;
	}

	:local(.not-on-mobile) {
		@apply hidden md:block;
	}
</style>
