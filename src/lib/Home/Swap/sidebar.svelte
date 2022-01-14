<script lang="ts">
	import TextInput from '$lib/Common/TextInput.svelte';
	import ToggleSwitch from '$lib/Common/ToggleSwitch.svelte';
	import Button from '$lib/Common/Button.svelte';
	import ConfirmPopup from '$lib/PopUps/CreateToken/ConfirmPopup.svelte';
	import FailedPopup from '$lib/PopUps/CreateToken/FailedPopup.svelte';
	import SuccessPopup from '$lib/PopUps/CreateToken/SuccessPopup.svelte';
	import { toggleDarkMode } from '$utils/themeSettings';
	import { fly, slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	export let active: boolean = false;

	const dispatch = createEventDispatcher();

	let creatingToken: boolean = true;

	let tokenName: string;
	let tokenTicker: string;
	let contractString: string;
	let price: number;
	let limitedSupplyChecked: boolean;
	let mintableSupplyChecked: boolean;

	let showConfirmPopup: boolean = false;
	let showSuccessPopup: boolean = false;
	let showFailedPopup: boolean = false;

	//Pass whether the creation is successful or not to this Variable below.
	let successfulTokenCreation: boolean = true;
</script>

<div class={!active ? 'main h-screen justify-center' : 'main'}>
	<!-- Popups -->
	{#if showConfirmPopup}
		<ConfirmPopup
			{tokenName}
			{price}
			on:confirm={() => {
				showConfirmPopup = false;
				if (successfulTokenCreation) {
					// Add code to copy private key Here
					showSuccessPopup = true;
				} else {
					showFailedPopup = true;
				}
			}}
			on:cancel={() => {
				showConfirmPopup = false;
			}}
		/>
	{/if}
	{#if showSuccessPopup}
		<SuccessPopup
			on:confirm={() => {
				showSuccessPopup = false;
			}}
		/>
	{/if}
	{#if showFailedPopup}
		<FailedPopup
			on:confirm={() => {
				showFailedPopup = false;
			}}
		/>
	{/if}

	{#if active}
		<div
			class="sidebar-holder"
			in:fly={{ x: 200, duration: 500 }}
			out:fly={{ x: 200, duration: 500 }}
		>
			<h4 on:click={toggleDarkMode}>Create Token</h4>
			<div class="button-holder">
				<button
					class={creatingToken ? 'btn orange-btn' : 'btn white-btn'}
					on:click={() => {
						if (!creatingToken) {
							creatingToken = true;
						}
					}}
				>
					Create Token
				</button>
				<button
					class={creatingToken ? 'btn white-btn' : 'btn orange-btn'}
					on:click={() => {
						if (creatingToken) {
							creatingToken = false;
						}
					}}
				>
					Import Token
				</button>
			</div>

			{#if creatingToken}
				<div class="create-token" transition:slide>
					<TextInput bind:value={tokenName} label="Token Name" type="text" />
					<br />
					<TextInput bind:value={tokenTicker} label="Token Ticker" type="text" />
					<br />
					<TextInput bind:value={contractString} label="Contract String" type="text" />
					<br />
					<TextInput bind:value={price} label="Price (USD)" type="number" />
					<div class="switch-holder">
						<p>Limited supply</p>
						<ToggleSwitch bind:checked={limitedSupplyChecked} />
					</div>
					<div class="switch-holder">
						<p>Mintable supply</p>
						<ToggleSwitch bind:checked={mintableSupplyChecked} />
					</div>
					<div class="lower-button-holder">
						<Button
							on:click={() => {
								if (tokenName && tokenTicker && contractString && price) {
									showConfirmPopup = true;
								} else {
									// What happens when user doesn't enter values
								}
							}}
						>
							<p class="lower-btn-text" slot="text">Create</p>
						</Button>
					</div>
					<div
						class="cancel-holder"
						on:click={() => {
							dispatch('closeSidebar');
						}}
					>
						<p>Cancel</p>
					</div>
				</div>
			{:else}
				<div class="import-token" transition:slide>Import</div>
			{/if}
		</div>
	{:else}
		<p class="inactive-text">Select a currency to send</p>
	{/if}
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply flex flex-col items-center pt-10 md:pt-20 px-4 h-screen;
	}

	:local(.inactive-text) {
		@apply text-lg text-light-inactiveText;
	}

	:local(h4) {
		@apply font-bold text-xl md:mb-4 2xl:mb-12 dark:text-white;
	}

	:local(.btn) {
		@apply flex flex-col md:flex-row items-center justify-center;
		@apply font-semibold text-sm 2xl:text-lg;
		@apply rounded-3xl h-full;
		@apply md:py-2 md:px-3 2xl:px-7;
		@apply transition duration-300;
	}

	:local(.orange-btn) {
		@apply bg-light-orange text-white;
		box-shadow: 0px 2px 15px #ff826688;
	}

	:local(.white-btn) {
		@apply text-light-grey dark:text-white;
		box-shadow: 0px 2px 15px #0000001a;
	}

	:local(.button-holder) {
		@apply flex justify-center md:mb-4 2xl:mb-20 w-full gap-4;
	}

	:local(.sidebar-holder) {
		@apply flex flex-col items-center h-full w-full;
	}

	:local(.create-token) {
		@apply w-full;
	}

	:local(.switch-holder) {
		@apply flex justify-between text-light-grey dark:text-white mt-4;
	}

	:local(.lower-button-holder) {
		@apply w-full mt-12;
	}

	:local(.cancel-holder) {
		@apply flex justify-center items-center w-full cursor-pointer mt-4;
		@apply text-lg font-semibold text-light-grey dark:text-white;
	}

	:local(.lower-btn-text) {
		@apply text-lg;
		@apply md:py-2;
	}
</style>
