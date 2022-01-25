<script lang="ts">
	// Icons
	import NavActivityIcon from '$icons/NavActivityIcon.svelte';
	import NavBookmarkIcon from '$icons/NavBookmarkIcon.svelte';
	import NavSettingsIcon from '$icons/NavSettingsIcon.svelte';
	import NavFlameIcon from '$icons/NavFlameIcon.svelte';
	import NavStackIcon from '$icons/NavStackIcon.svelte';
	import GosutoNavLogo from '$icons/NavLogo.svelte';

	// Components
	import SelectItems from './SelectItems.svelte';
	import NavItem from './NavItem.svelte';

	// Variables
	let navItems: NavIcon[] = Array(7)
		.fill(0)
		.map((_, i) => ({ id: i, active: false } as NavIcon));

	let activateItem = (navItem: NavIcon) => {
		navItems.forEach((i) => (i.active = false));
		navItem.active = true;
		navItems = navItems;
	};
</script>

<div class="navbar">
	<div class="top">
		<NavItem href="/" navItem={navItems[0]} on:click={() => activateItem(navItems[0])}
			><GosutoNavLogo class="large-nav-icon" /></NavItem
		>
		<NavItem reverse={true} navItem={navItems[1]} on:click={() => activateItem(navItems[1])}
			><NavFlameIcon class="large-nav-icon" /></NavItem
		>
		<NavItem navItem={navItems[2]} on:click={() => activateItem(navItems[2])}
			><div class="avatar-img" /></NavItem
		>
		<NavItem navItem={navItems[3]} on:click={() => activateItem(navItems[3])}
			><NavBookmarkIcon class="nav-icon" /></NavItem
		>
		<NavItem navItem={navItems[4]} on:click={() => activateItem(navItems[4])}
			><NavStackIcon class="nav-icon" /></NavItem
		>
		<NavItem
			href="/currency-performance"
			navItem={navItems[5]}
			on:click={() => activateItem(navItems[5])}><NavActivityIcon class="nav-icon" /></NavItem
		>
	</div>

	<div class="bottom">
		<NavItem href="/settings" navItem={navItems[6]} on:click={() => activateItem(navItems[6])}
			><NavSettingsIcon class="nav-icon" /></NavItem
		>
		<SelectItems class="select-items" items={{ en: 'EN', de: 'DE' }} />
		<SelectItems class="select-items" items={{ usd: 'USD', eur: 'EUR', jpy: 'JPY' }} />
	</div>
</div>

<style lang="postcss" global>
	:local(div.navbar) {
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

	:local(div.top) {
		@apply flex md:flex-col justify-evenly items-center gap-x-2 md:gap-x-0;
		@apply ml-1 mr-4 md:mx-0;
		@apply w-full min-w-[32rem] md:min-w-fit md:h-3/5 md:min-h-[32rem];
	}

	:local(div.bottom) {
		@apply flex md:flex-col justify-evenly items-center md:gap-y-10;
		@apply w-[8%] min-w-[2rem] md:w-full md:h-[30%] md:min-h-[16rem];
		@apply mr-4 md:mr-0 md:pb-4;
	}

	:global(.select-items) {
		@apply hidden md:block;
	}

	.navbar :global(.nav-icon) {
		@apply w-6 h-6 4xl:w-16 4xl:h-16;
	}

	.navbar :global(.large-nav-icon) {
		@apply w-12 h-12 4xl:w-24 4xl:h-24;
	}

	:local(div.avatar-img) {
		@apply min-w-full w-full h-12 4xl:h-28;

		background-image: url('/images/png/avatar.png');
		@apply bg-cover bg-center;
	}
</style>
