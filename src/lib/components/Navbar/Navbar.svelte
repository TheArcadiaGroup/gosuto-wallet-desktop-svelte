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
	import { navItems } from '$stores/NavbarActive';

	/** An array representing the values of navItems */
	let navItemsValues: NavIcon[];

	navItems.subscribe((value) => {
		navItemsValues = value;
	});

	/** A function for updating the navItems array*/
	let activateItem = (navItem: NavIcon, route: string) => {
		navItems.update((n) => {
			n.forEach((e) => (e.active = false));
			return n;
		});
		navItem.active = true;
		if (route != '') goto(route);
	};
</script>

<div class="navbar">
	<div class="navbar-top">
		<NavItem navItem={navItemsValues[0]}><GosutoNavLogo class="large-nav-icon" /></NavItem>
		<NavItem reverse={true} navItem={navItemsValues[1]}
			><NavFlameIcon class="large-nav-icon" /></NavItem
		>
		<NavItem navItem={navItemsValues[2]} on:click={() => activateItem(navItemsValues[2], '')}
			><div class="navbar-avatar-img" /></NavItem
		>
		<NavItem navItem={navItemsValues[3]} on:click={() => activateItem(navItemsValues[3], '')}
			><NavBookmarkIcon class="nav-icon" /></NavItem
		>
		<NavItem navItem={navItemsValues[4]} on:click={() => activateItem(navItemsValues[4], '')}
			><NavStackIcon class="nav-icon" /></NavItem
		>
		<NavItem
			navItem={navItemsValues[5]}
			on:click={() => activateItem(navItemsValues[5], '/currency-performance')}
			><NavActivityIcon class="nav-icon" /></NavItem
		>
	</div>

	<div class="navbar-bottom">
		<NavItem
			navItem={navItemsValues[6]}
			on:click={() => activateItem(navItemsValues[6], '/settings')}
			><NavSettingsIcon class="nav-icon" /></NavItem
		>
		<SelectItems class="navbar-select-items" items={{ en: 'EN', de: 'DE' }} />
		<SelectItems class="navbar-select-items" items={{ usd: 'USD', eur: 'EUR', jpy: 'JPY' }} />
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
