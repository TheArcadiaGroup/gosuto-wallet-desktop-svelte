<script context="module">
	import { generateTransactions } from '$utils/historyDataSample';
	export const load = async () => {
		//Connect to history API here
		let data = generateTransactions();

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
	import ProfileNavigation from '$lib/profile/ProfileNavigation.svelte';

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
				name: 'Wallet 1',
				avalible: 5000,
				staked: 2500,
				unclaimed: 375,
			},
		],
	};

	const wallet = {
		name: 'Wallet 1',
		publicKey: '0x9f98e01d2...4ed7',
	};

	const stakeArray = Array(10).fill({
		name: wallet?.name,
		elapsedSeconds: 20,
		fullSeconds: 69,
		staked: 420,
		unlocked: 69,
	});
</script>

<GridLayout>
	<div slot="first" class="size-full">
		<ProfileNavigation {user} />
	</div>
	<div slot="mid">
		<HistoryPage historyArray={data} />
	</div>
</GridLayout>

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}
</style>
