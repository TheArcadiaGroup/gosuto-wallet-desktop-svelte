<script lang="ts">
	import { onMount } from 'svelte';

	import ProfileNavigation from '$lib/Profile/ProfileNavigation.svelte';
	import ValidatorPage from '$lib/ValidatorPage/index.svelte';
	import Navbar from '$components/Navbar/Navbar.svelte';

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

	let validatorData: IValidator[];

	onMount(() => {
		getData();
	});

	const getData = async () => {
		fetch('/api/all-stakes/validators')
			.then((response) => response.json())
			.then((response) => (validatorData = response))
			.catch((error) => {
				console.error('error:', error);
			});
	};
</script>

<div class="main flex">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<div class="size-full">
			<!-- feed the user profile data to ProfileNavigation component -->
			<ProfileNavigation forRoute={'all-stakes'} {user} />
		</div>
	</div>
	<div class="global-grid-mid size-full">
		<!-- TODO add validators -->
		<div class="validator-holder">
			<ValidatorPage {validatorData} />
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}

	:local(.validator-holder) {
		@apply flex flex-col items-center w-full h-full;
		@apply bg-dark-gosutoDark;
	}
</style>
