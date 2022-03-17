<script lang="ts">
	import { onMount } from 'svelte';

	import HistoryPage from '$lib/pages/History/HistoryPage.svelte';
	import ProfileNavigation from '$lib/pages/Profile/ProfileNavigation.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import Sidebar from '$lib/pages/History/HistoryComponent/Sidebar.svelte';

	import { shortenAddress } from '$utils';
	import { page } from '$app/stores';
	import { retrieveData } from '$utils/dataStorage';
	import { getSingleAccountHistory } from '$utils/getHistory';
	import { sidebarContent } from '$stores/HistoryStore';

	let data: HistoryObject[] = [];
	let user: IUser;
	let wallet: IWallet;
	$: walletAddress = $page.params.address;

	let currentPage = 1;
	let itemsPerPage = 10;

	onMount(() => {
		// Retrieve the selected profile off the user
		user = (retrieveData('user') as IUser) || {
			name: 'Unknown User',
			avatar: '',
			email: '',
			wallets: (retrieveData('wallets') as IWallet[]) || [],
		};

		// Can only be called once the user has been set
		getData();
	});

	const getData = async () => {
		wallet = user?.wallets?.filter((wallet) => wallet.walletAddress === walletAddress)[0];
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

	function creditCardClicked() {
		getData();
	}
</script>

{#if data}
	<div class="flex">
		<div class="global-grid-nav">
			<Navbar />
		</div>
		<div class="global-grid-left">
			<ProfileNavigation {user} on:cardClicked={creditCardClicked} />
		</div>
		<div class="global-grid-mid">
			<HistoryPage
				{data}
				isInProfileRoute={true}
				address={shortenAddress($page.params.address)}
				on:showMoreClicked={showMoreItems}
				walletName={wallet?.walletName || 'Unknown'}
			/>
		</div>
		<div class="global-grid-right">
			<Sidebar historyObject={$sidebarContent} />
		</div>
	</div>
{/if}

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}
</style>
