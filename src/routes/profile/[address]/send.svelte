<script lang="ts">
	import { onMount } from 'svelte';

	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import ProfileNavigation from '$lib/pages/Profile/ProfileNavigation.svelte';
	import Send from '$lib/pages/Profile/Send/index.svelte';

	import TextSidebar from '$lib/components/TextSidebar.svelte';
	import SendCurrency from '$lib/pages/Profile/Send/Forms/SendCurrency.svelte';
	import CreateToken from '$lib/pages/Profile/CreateToken/CreateToken.svelte';
	import { goto } from '$app/navigation';
	import { wallets } from '$stores/user/wallets';
	import { tokens } from '$stores/user/tokens';
	import pollyfillData from '$utils/pollyfillData';

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
		pollyfillData();

		if ($wallets.length <= 0) {
			goto('/profile');
		}
	});

	$: console.log($tokens);
</script>

<div class="page-container">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<ProfileNavigation />
	</div>
	<div class="global-grid-mid">
		<Send on:selectToken={selectToken} bind:tokens={$tokens} bind:selected />
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
