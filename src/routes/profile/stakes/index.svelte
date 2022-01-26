<script>
	import { page } from '$app/stores';
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import StakesFromWallet from '$lib/profile/stake/StakesFromWallet.svelte';
	import ProfileNavigation from '$lib/profile/ProfileNavigation.svelte';

	// wallet bind on profile navigation component
</script>

<GridLayout>
	<div slot="first" class="size-full">
		<ProfileNavigation />
	</div>
	<div slot="mid" class="w-full h-full">
		<!-- passing wallet to stakes component -->
		<StakesFromWallet />
	</div>
	<div slot="last" class="last-column">Select a stake for more information</div>
</GridLayout>

<style lang="postcss" global>
	:local(.last-column) {
		@apply w-full h-full grid place-content-center text-light-grey text-xs;
	}

	:local(.size-full) {
		@apply w-full h-full;
	}
</style>
