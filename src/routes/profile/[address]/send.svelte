<script lang="ts">
	import { onMount } from 'svelte';

	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import ProfileNavigation from '$lib/pages/Profile/ProfileNavigation.svelte';
	import Send from '$lib/pages/Profile/Send/index.svelte';

	import TextSidebar from '$lib/components/TextSidebar.svelte';
	import SendCurrency from '$lib/pages/Profile/Send/Forms/SendCurrency.svelte';
	import CreateToken from '$lib/pages/Profile/CreateToken/CreateToken.svelte';
	import { goto } from '$app/navigation';
	import { selectedWallet, wallets } from '$stores/user/wallets';
	import { tokens } from '$stores/user/tokens';
	import { pollyfillSelectedProfile, pollyFillTokens } from '$utils/pollyfillData';
	import { page } from '$app/stores';
	import { loadTokenBalance, receiveTokenBalance } from '$utils/tokens';

	/**
	 * This is the currently selected index of TokenCards.
	 * -1 = none
	 * -2 = create token
	 */
	let selectedToken: IToken | null = null;
	let _tokens = $tokens.filter((token) => token.walletAddress === $selectedWallet?.walletAddress);

	function selectToken(e: any): void {
		selectedToken = e.detail;
	}

	onMount(async () => {
		// If no wallets, navigate user to create them
		if ($wallets.length <= 0) {
			goto('/profile');
		}

		// load profile first
		if ($selectedWallet?.walletAddress.toLowerCase() !== $page.params['address'].toLowerCase()) {
			pollyfillSelectedProfile();
		}

		// If no tokens are present, load them
		if ($tokens.length <= 0) {
			pollyFillTokens();
		}

		receiveTokenBalance();
	});

	$: ((userTokens) => {
		// Load all token balances
		if ($selectedWallet) {
			userTokens.map((token) => loadTokenBalance(token, $selectedWallet!.walletAddress));
		}
	})(_tokens);
</script>

<div class="page-container">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<ProfileNavigation />
	</div>
	<div class="global-grid-mid">
		<Send on:selectToken={selectToken} bind:tokens={_tokens} bind:selectedToken />
	</div>
	<!-- TODO DISPATCH VALUE IS NOT RESET BUG -->
	<div class="global-grid-right sidebar">
		{#if selectedToken?.tokenName === 'AddToken'}
			<CreateToken on:selectToken={selectToken} />
		{:else if selectedToken}
			<SendCurrency {selectedToken} />
		{:else}
			<TextSidebar>Select a currency to send</TextSidebar>
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
