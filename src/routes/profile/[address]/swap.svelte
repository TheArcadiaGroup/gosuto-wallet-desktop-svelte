<script lang="ts">
	import { onMount } from 'svelte';

	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import ProfileNavigation from '$lib/Pages/Profile/ProfileNavigation.svelte';

	import Swap from '$lib/Pages/Profile/Swap/index.svelte';

	import TextSidebar from '$lib/components/TextSidebar.svelte';
	import SwapCurrency from '$lib/Pages/Profile/Swap/Forms/SwapCurrency.svelte';
	import CreateToken from '$lib/Pages/Profile/CreateToken/CreateToken.svelte';
	import { retrieveData } from '$utils/dataStorage';
	import { selectedWallet } from '$stores/user/wallets';

	let tokens: IToken[] = [];

	/**
	 * This is the currently selected index of TokenCards.
	 * -1 = none
	 * -2 = create token
	 */
	let selected = -1;
	let user: IUser;

	function selectToken(e: { detail: { id: number } }): void {
		selected = e.detail.id;
	}

	onMount(async () => {
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
	});
</script>

<div class="swap-page-container">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<ProfileNavigation {user} />
	</div>
	<div class="global-grid-mid">
		<Swap on:selectToken={selectToken} bind:tokens bind:selected />
	</div>
	<div class="global-grid-right swap-sidebar">
		{#if selected === -2}
			<CreateToken on:selectToken={selectToken} />
		{:else if selected === -1}
			<TextSidebar>Select currency you want to swap</TextSidebar>
		{:else}
			<SwapCurrency />
		{/if}
	</div>
</div>

<style lang="postcss" global>
	.swap-page-container {
		@apply flex flex-row;
	}

	.swap-sidebar {
		@apply h-full w-full;
		@apply md:h-screen;
	}
</style>
