<script lang="ts">
	import { onMount } from 'svelte';

	import HistoryPage from '$lib/pages/History/HistoryPage.svelte';
	import ProfileNavigation from '$lib/pages/Profile/ProfileNavigation.svelte';

	import { shortenAddress } from '$utils';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import { page } from '$app/stores';
	import { retrieveData } from '$utils/dataStorage';
	import { getSingleAccountHistory } from '$utils/getHistory';

	let data: HistoryObject[] = [];
	let user: IUser;
	$: walletAddress = $page.params.address;

	let currentPage = 1;
	let itemsPerPage = 10;

	onMount(() => {
		getData();

		// Retrieve the selected profile off the user
		user = (retrieveData('user') as IUser) || {
			name: 'Unknown User',
			avatar: '',
			email: '',
			wallets: (retrieveData('wallets') as IWallet[]) || [],
		};
	});

	const getData = async () => {
		const wallet = user.wallets.filter((wallet) => wallet.walletAddress === walletAddress)[0];
		if (wallet) {
			const historyObj = await getSingleAccountHistory(
				wallet.accountHash,
				currentPage,
				itemsPerPage,
			);
			data = [...data, historyObj.data];
		} else {
			// Better UI Based Error Needed
			throw Error('Wallet Not Loaded');
		}
	};

	function showMoreItems() {
		currentPage++;
		getData();
	}
</script>

{#if data}
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
			<HistoryPage
				{data}
				isInProfileRoute={true}
				address={shortenAddress($page.params.address)}
				on:showMoreClicked={showMoreItems}
			/>
		</div>
	</div>
{/if}

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}
</style>
