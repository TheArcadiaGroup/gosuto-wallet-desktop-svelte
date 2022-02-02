<script>
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import ProfileNavigation from '$lib/Profile/ProfileNavigation.svelte';

	// Show a specific Profile page based global
</script>

<GridLayout>
	<div slot="first" class="size-full">
		<!-- feed the user Profile data to ProfileNavigation component -->
		<ProfileNavigation />
	</div>
</GridLayout>

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}
</style>
