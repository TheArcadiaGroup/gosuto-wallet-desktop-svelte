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
	let active = true;
</script>

<div class="navbar">
	<div class="top">
		<NavItem href="/"><GosutoNavLogo class="large-nav-icon" /></NavItem>
		<NavItem reverse={true}><NavFlameIcon class="large-nav-icon" /></NavItem>
		<NavItem><div class="avatar-img" /></NavItem>
		<NavItem><NavBookmarkIcon class="nav-icon" /></NavItem>
		<NavItem><NavStackIcon class="nav-icon" /></NavItem>
		<NavItem href="/currency-performance"><NavActivityIcon class="nav-icon" /></NavItem>
	</div>

	<div class="bottom">
		<NavItem href="/settings"><NavSettingsIcon class="nav-icon" /></NavItem>
		<SelectItems class="select-items" items={{ en: 'EN', de: 'DE' }} />
		<SelectItems class="select-items" items={{ usd: 'USD', eur: 'EUR', jpy: 'JPY' }} />
	</div>
</div>

<style lang="postcss" global>
	:local(div.navbar) {
		@apply flex md:flex-col justify-between items-center z-50;
		@apply sticky top-0;

		@apply bg-white dark:bg-dark-grey;
		@apply md:min-w-fit w-screen md:w-full py-4 md:py-0 md:h-screen;
		@apply overflow-x-scroll md:overflow-visible;

		box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.navbar::-webkit-scrollbar {
		@apply hidden;
	}

	:local(div.top) {
		@apply flex md:flex-col justify-evenly items-center gap-x-2 md:gap-x-0;
		@apply ml-1 md:ml-0;
		@apply w-full md:h-3/5;
	}

	:local(div.bottom) {
		@apply flex md:flex-col justify-evenly items-center md:gap-y-10;
		@apply w-[8%] md:w-full md:h-1/5;
		@apply md:pb-6;
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
