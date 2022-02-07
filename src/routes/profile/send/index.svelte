<!--
@component
The wallet send route, this is where the layout is, the currently selected token index and list of tokens is.
@author marekvospel
-->
<script lang="ts">
	import { onMount } from 'svelte';

	import Navbar from '$components/Navbar/Navbar.svelte';
	/*import ProfileNavigation from '$lib/Profile/ProfileNavigation.svelte'*/
	import Send from '$lib/Profile/Send/index.svelte';

	import TextSidebar from '$components/Profile/TextSidebar.svelte';
	import SendCurrency from '$lib/Profile/Send/Forms/SendCurrency.svelte';
	import CreateToken from '$lib/Profile/CreateToken/CreateToken.svelte';

	/**
	 * This is an array of tokens, which will be shown in the main column of the app's grid. Values inside this array will be passed on to TokenCard components inside Send component
	 * @see Send
	 */
	let tokens = [];

	/**
	 * This is the currently selected index of TokenCards.
	 * @type {number}
	 * @see Send
	 */
	let selected = -2;

	/**
	 * A function changing the selected index value of this component.
	 * @param e selectToken event with the selected TokenCard index
	 */
	function selectToken(e: { detail: { id: number } }): void {
		selected = e.detail.id;
	}

	// Maybe could be server side rendered?
	onMount(async () => {
		// not an error, this makes my IDE shut up
		// @ts-ignore
		tokens = await (await fetch('/api/tokens/1')).json();
	});
</script>

<div class="page-container">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<!--<ProfileNavigation />-->
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
