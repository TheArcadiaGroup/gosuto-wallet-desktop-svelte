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
			wallets: [
				{
					walletName: 'Wallet 1',
					walletPassword: 'password2',
					walletImage: 'https://images.pexels.com/photos/11347811/pexels-photo-11347811.jpeg',
					seedPhrase: [],
					availableBalanceUSD: 100,
					stakedBalance: 200,
					unclaimedRewards: 300,
					walletTokens: [],
					walletStakes: [],
					walletHistory: [],
					walletAddress: '0x9f98e01d2gj92ngn2g7gn24ed7',
					accountHash: '0x9f98e01d2gj92ngn2g7gn24ed7',
					privateKey: '0x9f98e01d2gj92ngn2g7gn24ed7',
				},
				{
					walletName: 'Wallet 2',
					walletPassword: 'password2',
					walletImage: 'https://images.pexels.com/photos/3155586/pexels-photo-3155586.jpeg',
					seedPhrase: [],
					availableBalanceUSD: 400,
					stakedBalance: 500,
					unclaimedRewards: 600,
					walletTokens: [],
					walletStakes: [],
					walletHistory: [],
					walletAddress: '0x9f98e01d2gj92ngn2g7gn24ed7',
					accountHash: '0x9f98e01d2gj92ngn2g7gn24ed7',
					privateKey: '0x9f98e01d2gj92ngn2g7gn24ed7',
				},
				{
					walletName: 'Wallet 3',
					walletPassword: 'password2',
					walletImage: 'https://images.pexels.com/photos/11347811/pexels-photo-11347811.jpeg',
					seedPhrase: [],
					availableBalanceUSD: 700,
					stakedBalance: 800,
					unclaimedRewards: 900,
					walletTokens: [],
					walletStakes: [],
					walletHistory: [],
					walletAddress: '0x9f98e01d2gj92ngn2g7gn24ed7',
					accountHash: '0x9f98e01d2gj92ngn2g7gn24ed7',
					privateKey: '0x9f98e01d2gj92ngn2g7gn24ed7',
				},
				{
					walletName: 'Wallet 4',
					walletPassword: 'password2',
					walletImage: 'https://images.pexels.com/photos/3535468/pexels-photo-3535468.jpeg',
					seedPhrase: [],
					availableBalanceUSD: 1000,
					stakedBalance: 1100,
					unclaimedRewards: 1200,
					walletTokens: [],
					walletStakes: [],
					walletHistory: [],
					walletAddress: '0x9f98e01d2gj92ngn2g7gn24ed7',
					accountHash: '0x9f98e01d2gj92ngn2g7gn24ed7',
					privateKey: '0x9f98e01d2gj92ngn2g7gn24ed7',
				},
			],
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
				walletName={wallet?.walletName || 'Unknown'}
			/>
		</div>
	</div>
{/if}

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}
</style>
