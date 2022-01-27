<script>
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import ProfileNavigation from '$lib/profile/ProfileNavigation.svelte';
	import { page } from '$app/stores';

	$: slug = $page.params.slug;
	// Show a specific profile page based on slug

	// wallet bind on profile navigation component
</script>

<GridLayout>
	<div slot="first" class="size-full">
		<ProfileNavigation />
	</div>
	<div slot="mid" class="w-full h-full">
		<!-- StakesFromWallet component -->
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
