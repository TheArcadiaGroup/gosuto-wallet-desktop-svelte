<script>
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import ProfileNavigation from '$components/ProfileNavigation/ProfileNavigation.svelte';
	import { page } from '$app/stores';

	$: slug = $page.params.slug;
	// Show a specific profile page based on slug
</script>

<GridLayout>
	<div slot="first" class="size-full">
		<ProfileNavigation />
	</div>
</GridLayout>

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}
</style>
