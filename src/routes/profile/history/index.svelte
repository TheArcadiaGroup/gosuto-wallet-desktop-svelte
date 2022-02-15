<script context="module">
	export const load = async () => {
		//Connect to history API here
		const res = await fetch('../api/history.json');
		const data = await res.json();

		return {
			props: {
				data,
			},
		};
	};
</script>

<script lang="ts">
	import GridLayout from '$lib/Common/GridLayout.svelte';

	import HistoryPage from '$lib/components/HistoryPage.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import ProfileNavigation from '$lib/Profile/ProfileNavigation.svelte';

	export let data;

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
				name: 'Wallet 2',
				avalible: 5000,
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
		<HistoryPage historyArray={data.data} isInProfileRoute={false} />
	</div>
</div>

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}
</style>
