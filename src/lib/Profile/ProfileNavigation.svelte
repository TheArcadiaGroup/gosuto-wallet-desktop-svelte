<!-- @component 
	Describtion:
	> Component that fills the first column of the grid layout on /profile routes.
	
	Props:
	- `user` = Object with user's data such as name, profile picture url, etc. Also includes his wallets and data from the wallets (names, balance, etc.).
	- `forRoute` = Either `profile` OR `all-stakes`. Used for deciding what to show in the UI.
-->
<script lang="ts">
	import PlusIcon from '$icons/PlusIcon.svelte';
	import Button from '$lib/Common/Button.svelte';
	import ProfilePicture from '$lib/Common/ProfilePicture.svelte';
	import CardCarousel from './CardCarousel/CardCarousel.svelte';
	import CarouselItem from './CardCarousel/CarouselItem.svelte';
	import CreditCard from './CreditCard.svelte';
	import ProfileMenu from './ProfileMenu.svelte';

	// MENU IMPORTS
	import Bookmark from '$icons/Bookmark.svelte';
	import PaperAirplane from '$icons/PaperAirplane.svelte';
	import Stake from '$icons/Stake.svelte';
	import Swap from '$icons/Swap.svelte';
	import Wallet from '$icons/Wallet.svelte';
	import ChartPie from '$icons/ChartPie.svelte';
	import Checklist from '$icons/Checklist.svelte';

	import { goto } from '$app/navigation';

	export let forRoute: 'profile' | 'all-stakes' = 'profile';

	export let walletAddress: string = 'asidbashub';

	/**Options for the content of the menu. Either 'profile' or 'all-stakes'.*/
	const menuItemsOptions: {
		profile: typeof menuItems;
		'all-stakes': typeof menuItems;
	} = {
		profile: [
			{ name: 'history', label: 'History', icon: Bookmark },
			{ name: 'send', label: 'Send', icon: PaperAirplane },
			{ name: 'stake', label: 'Stakes', icon: Stake },
			{ name: 'settings', label: 'Wallet Settings', icon: Wallet },
			{ name: 'swap', label: 'Swap', icon: Swap },
		],
		'all-stakes': [
			{ name: 'all-positions', label: 'All positions', icon: ChartPie },
			{ name: 'validators', label: 'Validators', icon: Checklist },
		],
	};

	/**Array of objects that are displayed as menu items.*/
	let menuItems: {
		name: string;
		label: string;
		icon: any;
	}[];
	$: menuItems = menuItemsOptions[forRoute];

	export let user: {
		name: string;
		ppurl: string;
		wallets: {
			name: string;
			available: number;
			staked: number;
			unclaimed: number;
		}[];
	};

	/**Handler for clicking on a menu item in the menu and redirectin to the corresponding subroute.*/
	function menuSelect(e: CustomEvent) {
		const selection = e.detail.menu_item;
		goto(`/${forRoute}/${walletAddress}/${selection}`);
	}

	/**Handler for clicking "Add wallet" button, that prompts user with add wallet UI flow.*/
	function addWallet() {
		// add wallet
	}
</script>

<div class="main">
	<div class="container">
		<div class="pp-and-name">
			<div class="pp">
				<ProfilePicture url={user?.ppurl || ''} />
			</div>
			<div class="username">
				{user?.name || 'unknown name'}
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
				<div class="carousel">
					<CardCarousel numberOfCards={user?.wallets.length || 0}>
						{#each user?.wallets as wallet}
							<CarouselItem>
								<CreditCard
									name={user?.name || 'unknown name'}
									ppurl={user?.ppurl || ''}
									{wallet}
								/>
							</CarouselItem>
						{/each}
					</CardCarousel>
				</div>
				<div class="plus-container">
					<div class="plus" on:click={addWallet}>
						<PlusIcon />
					</div>
				</div>
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
		@apply dark:bg-dark-grey;
	}

	:local(.container) {
		@apply w-full md:h-0 flex-grow flex flex-col items-center gap-6 md:pt-10;
	}
	:local(.pp-and-name) {
		@apply flex-col items-center gap-6 hidden md:flex md:px-4;
	}

	:local(.pp) {
		@apply w-16 h-16 rounded-xl overflow-hidden;
	}

	:local(.username) {
		@apply font-semibold dark:text-white;
	}

	:local(.button-container) {
		@apply mx-6 max-w-xs w-full md:px-4;
	}

	:local(.carousel-container) {
		@apply w-full flex items-center justify-center relative;
	}

	:local(.carousel) {
		@apply w-full overflow-x-hidden px-6 md:px-4;
	}

	:local(.plus-container) {
		@apply absolute h-full aspect-[16/10] pointer-events-none;
	}

	:local(.plus) {
		@apply absolute z-10 w-12 h-12 -right-2 bg-light-orange grid place-items-center -bottom-2 md:hidden rounded-full pointer-events-auto cursor-pointer transition-all hover:scale-105;
	}

	:local(.hr) {
		@apply w-full md:px-4;
	}

	:local(.profile-menu) {
		@apply w-full md:max-w-xs md:px-4 md:pb-4;
	}

	:local(.button) {
		@apply my-2 text-xs;
	}

	:local(.not-on-mobile) {
		@apply hidden md:block;
	}
</style>
