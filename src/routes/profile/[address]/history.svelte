<script context="module">
	export const load = async ({ fetch, page }) => {
		const address = page.params.address;
		const res = await fetch(`../../api/walletHistory.json/?address=${address}`);
		const data = await res.json();

		return {
			props: {
				address,
				data,
			},
		};
	};
</script>

<script lang="ts">
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import HistoryPage from '$lib/components/HistoryPage.svelte';
	import ProfileNavigation from '$lib/profile/ProfileNavigation.svelte';

	import { shortenAddress } from '$utils';

	export let data;
	export let address: string;

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

<GridLayout>
	<div slot="first" class="size-full">
		<ProfileNavigation {user} />
	</div>
	<div slot="mid">
		<HistoryPage
			historyArray={data.data}
			isInProfileRoute={true}
			address={shortenAddress(address)}
		/>
	</div>
</GridLayout>

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}
</style>
