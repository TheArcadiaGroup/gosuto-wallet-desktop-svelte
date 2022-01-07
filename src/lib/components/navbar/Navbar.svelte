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
	let dark = false;
</script>

<!-- [✔️] TODO: When creating navbar related components, its recommended to have these within a NavBar directory in the components folder -->

<div class="navbar">
	<div class="top">
		<!-- [✔️] TODO: I'd recommend having a NavItem component here -->
		<!-- Its easier to style and follow when working with your code -->
		<!-- Also, it can just take a prop `active` and you get to reduce the size of this file -->
		<!-- Especially the styles bundled in this single file -->
		<!-- <NavItem> {other elements/components} </NavItem> -->
		<NavItem><GosutoNavLogo /></NavItem>
		<NavItem><NavFlameIcon {dark} /></NavItem>
		<NavItem {active}><div class="avatar-img" /></NavItem>
		<NavItem><NavBookmarkIcon /></NavItem>
		<NavItem><NavStackIcon /></NavItem>
		<NavItem><NavActivityIcon {dark} /></NavItem>
	</div>

	<div class="bottom">
		<NavItem href="/settings"><NavSettingsIcon /></NavItem>

		<!-- [✔️] TODO: Not sure if this select would have been the best approach -->
		<!-- Explaination: Select can be styled to our needs, also it respect the HTML tag structure -->
		<!-- as it is not in line with the design when rendered -->
		<!-- Maybe build a custom select component that we control using js and can style freely -->
		<!-- Or explore ways of styling select components -->
		<SelectItems items={{ en: 'EN', de: 'DE' }} />
		<SelectItems items={{ usd: 'USD', eur: 'EUR', jpy: 'JPY' }} />
	</div>
</div>

<style lang="postcss">
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	div.navbar {
		@apply flex flex-col justify-between items-center;
		@apply fixed left-0;

		@apply bg-white dark:bg-dark-grey;
		@apply w-16 h-screen;

		box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
	}

	div.navbar div.top {
		@apply flex flex-col justify-evenly items-center;
		height: calc(100vh - 16.5em);
	}

	div.navbar div.bottom {
		@apply flex flex-col justify-evenly items-center;
		height: calc(100vh - 34.5em);
		@apply pb-6;
	}

	div.navbar div.top div.avatar-img {
		@apply w-12 h-12;

		background-image: url('/images/png/avatar.png');
		@apply bg-cover bg-center;
	}
</style>
