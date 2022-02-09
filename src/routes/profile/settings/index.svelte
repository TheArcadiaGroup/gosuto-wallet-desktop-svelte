<script lang="ts">
	import Navbar from '$lib/components/Navbar/Navbar.svelte';

	import ProfileNavigation from '$lib/profile/ProfileNavigation.svelte';
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

<div class="flex">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<div class="size-full">
			<ProfileNavigation {user} />
		</div>
	</div>
	<div class="global-grid-mid">
		<Settings />
	</div>
</div>

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}

	:local(.global-grid-mid) {
		@apply dark:bg-dark-background;
	}
</style>
