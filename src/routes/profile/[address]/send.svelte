<script lang="ts">
	import { onMount } from 'svelte';

	import Navbar from '$components/Navbar/Navbar.svelte';
	import ProfileNavigation from '$lib/Profile/ProfileNavigation.svelte';
	import Send from '$lib/Profile/Send/index.svelte';

	import TextSidebar from '$components/Profile/TextSidebar.svelte';
	import SendCurrency from '$lib/Profile/Send/Forms/SendCurrency.svelte';
	import CreateToken from '$lib/Profile/CreateToken/CreateToken.svelte';
	import { retrieveData } from '$utils/dataStorage';
	import { selectedWallet } from '$stores/user/wallets';

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
		// not an error, this makes my IDE shut up
		// @ts-ignore
		tokens = await (await fetch('/api/tokens/1')).json();

		// Retrieve the selected profile off the user
		user = (retrieveData('user') as IUser) || {
			name: 'Unknown User',
			avatar: '',
			email: '',
			wallets: [],
		};
		if ($selectedWallet) {
			user.wallets = [$selectedWallet];
		} else {
			user.wallets = [user.wallets[0]];
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
		@apply lg:h-screen;
	}
</style>
