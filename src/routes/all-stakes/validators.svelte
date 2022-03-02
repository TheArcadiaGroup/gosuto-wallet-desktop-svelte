<script>
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import ProfileNavigation from '$lib/Profile/ProfileNavigation.svelte';
	import ValidatorPage from '$lib/ValidatorPage/index.svelte';

	// DEV
	const user = {
		name: 'Jake Waterson',
		ppurl: 'https://miro.medium.com/fit/c/262/262/2*-cdwKPXyVI0ejgxpWkKBeA.jpeg',
		wallets: [
			{
				name: 'Wallet 1',
				avalible: 5000,
				staked: 2500,
				unclaimed: 375,
			},
			{
				name: 'Wallet 1',
				avalible: 5000,
				staked: 2500,
				unclaimed: 375,
			},
		],
	};
</script>

<GridLayout>
	<div slot="first" class="size-full">
		<!-- feed the user profile data to ProfileNavigation component -->
		<ProfileNavigation forRoute={'all-stakes'} {user} />
	</div>
	<div slot="mid" class="size-full">
		<!-- TODO add validators -->
		<div class="validator-holder">
			<ValidatorPage />
		</div>
	</div>
</GridLayout>

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}

	:local(.validator-holder) {
		@apply flex flex-col items-center w-full;
	}
</style>
