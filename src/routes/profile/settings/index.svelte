<script lang="ts">
	import GridLayout from '$lib/Common/GridLayout.svelte';

	import ProfileNavigation from '$lib/Profile/ProfileNavigation.svelte';
	import Settings from '$lib/WalletSettings/index.svelte';

	const user = {
		name: 'Jake Waterson',
		ppurl: 'https://miro.medium.com/fit/c/262/262/2*-cdwKPXyVI0ejgxpWkKBeA.jpeg',
		wallets: [
			{
				name: 'Wallet 1',
				available: 5000,
				staked: 2500,
				unclaimed: 375,
			},
			{
				name: 'Wallet 1',
				available: 5000,
				staked: 2500,
				unclaimed: 375,
			},
		],
	};
</script>

<GridLayout>
	<div slot="first" class="size-full">
		<ProfileNavigation {user} />
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
