<script lang="ts">
	import { onMount } from 'svelte';

	import Navbar from '$lib/Components/Navbar/Navbar.svelte';
	import ProfileNavigation from '$lib/Pages/Profile/ProfileNavigation.svelte';
	import Send from '$lib/Pages/Profile/Send/index.svelte';

	import TextSidebar from '$lib/Components/TextSidebar.svelte';
	import SendCurrency from '$lib/Pages/Profile/Send/Forms/SendCurrency.svelte';
	import CreateToken from '$lib/Pages/Profile/CreateToken/CreateToken.svelte';
	import { retrieveData } from '$utils/dataStorage';
	import { goto } from '$app/navigation';

	let tokens: IToken[] = [];
	let user: IUser;

	/**
	 * This is the currently selected index of TokenCards.
	 * -1 = none
	 * -2 = create token
	 */
	let selected = -1;

	function selectToken(e: any): void {
		selected = e.detail.id;
	}

	onMount(async () => {
		console.log('Selected Send');
		// not an error, this makes my IDE shut up
		// @ts-ignore
		tokens = await (await fetch('/api/tokens/1')).json();

		// Retrieve the selected profile off the user
		user = (retrieveData('user') as IUser) || {
			name: 'Unknown User',
			avatar: '',
			email: '',
			wallets: (retrieveData('wallets') as IWallet[]) || [],
		};

		console.log(user);

		if (user.wallets.length <= 0) {
			goto('/add-wallet/create');
		}
	});
</script>

<div class="page-container">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<ProfileNavigation {user} />
	</div>
	<div class="global-grid-mid">
		<Send on:selectToken={selectToken} bind:tokens bind:selected />
	</div>
	<div class="global-grid-right sidebar">
		{#if selected === -2}
			<CreateToken on:selectToken={selectToken} />
		{:else if selected === -1}
			<TextSidebar>Select a currency to send</TextSidebar>
		{:else}
			<SendCurrency />
		{/if}
	</div>
</div>

<style lang="postcss" global>
	:local(.page-container) {
		@apply flex flex-row;
	}

	:local(.sidebar) {
		@apply h-full w-full;
		@apply md:h-screen;
	}
</style>
