<script lang="ts">
	import GridLayout from '$lib/Common/GridLayout.svelte';

	import ProfileNavigation from '$lib/Profile/ProfileNavigation.svelte';
	import Settings from '$lib/WalletSettings/index.svelte';
</script>

<GridLayout>
	<div slot="first" class="size-full">
		<ProfileNavigation />
	</div>
	<div slot="mid">
		<Settings />
	</div>
</GridLayout>

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}
</style>
