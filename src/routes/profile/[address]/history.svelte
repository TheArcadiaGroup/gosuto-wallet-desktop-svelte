<script context="module">
	export const load = async ({ _, page }) => {
		const address = page.params.address;
		return {
			props: {
				address,
			},
		};
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import GridLayout from '$lib/Common/GridLayout.svelte';
	import HistoryPage from '$lib/components/HistoryPage.svelte';
	import ProfileNavigation from '$lib/profile/ProfileNavigation.svelte';

	import { shortenAddress } from '$utils';

	let data: HistoryObject[];
	export let address: string;

	onMount(() => {
		getData(address);
	});

	const getData = async (address: string) => {
		fetch(`../../api/profile/[address]/history/?address=${address}`)
			.then((response) => response.json())
			.then((response) => (data = response))
			.catch((error) => {
				console.error('error:', error);
			});
	};

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

{#if data}
	<GridLayout>
		<div slot="first" class="size-full">
			<ProfileNavigation {user} />
		</div>
		<div slot="mid">
			<HistoryPage historyArray={data} isInProfileRoute={true} address={shortenAddress(address)} />
		</div>
	</GridLayout>
{/if}

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}
</style>
