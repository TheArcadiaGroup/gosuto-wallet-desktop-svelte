<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';

	import ChoiceCard from '$lib/pages/AddWallet/Landing/ChoiceCard.svelte';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { retrieveData, saveData } from '$utils/dataStorage';

	/** A variable for the currently selected choice card */
	let selected: choiceCard;

	/** An array of all of the choice cards */
	let choiceCards: choiceCard[] = [
		{
			id: 0,
			header: 'Add New Wallet',
			description: 'Add new wallet to your account',
			route: '/add-wallet/create',
			isSelected: false,
		},
		{
			id: 1,
			header: 'Import From Seed',
			description: 'Import wallet from seed phrase',
			route: '/add-wallet/import/from-seed-phrase',
			isSelected: false,
		},
		{
			id: 2,
			header: 'Import From File',
			description: 'Import wallet from file',
			route: '/add-wallet/import/from-file',
			isSelected: false,
		},
	];

	/**
	 * @function
	 * A function that handles the user's click on a choice card
	 *
	 * @param choiceCard - the object representation of the card that gets clicked on
	 */
	let selectCard = (choiceCard: choiceCard) => {
		if (selected != undefined) {
			if (selected.id === choiceCard.id) return;
			selected.isSelected = false;
		}
		choiceCard.isSelected = true;
		selected = choiceCard;
		choiceCards = choiceCards;
	};
	let checked: boolean = false;

	let wallets: IWallet[];

	onMount(() => {
		wallets = retrieveData('wallets');
		checked = retrieveData('hasAgreedToToS');
	});
</script>

<div class="addWallet-wrapper">
	<GosutoLogoAndText class="addWallet-gosuto-logo" />
	<div class="addWallet-content">
		<div class="addWallet-page-header">
			<h1 class="header-text-main">Add Wallet</h1>
			<span class="header-text-small">Hello there, connect or create a wallet to continue!</span>
		</div>
		<div class="choice-cards">
			{#each choiceCards as choiceCard}
				<ChoiceCard {choiceCard} {selectCard} />
			{/each}
		</div>

		<div class="createWallet-use-terms">
			<input class="createWallet-checkbox" type="checkbox" name="terms of use" bind:checked />
			<label class="createWallet-checkbox-label" for="terms of use">
				I have read and agree to the
				<span
					on:click={() => {
						window.api.send('openUrl', 'https://www.arcadiamgroup.com/');
					}}
					class="text-light-orange cursor-pointer"
				>
					terms of service
				</span>
			</label>
		</div>

		<div class="addWallet-bt next-bt">
			<Button
				class="h-12 4xl:h-28"
				isDisabled={selected === undefined || !checked}
				on:click={() => {
					saveData('hasAgreedToToS', true);
					goto(selected.route);
				}}
			>
				<span slot="text" class="addWallet-bt-text">Next</span>
			</Button>
			{#if wallets?.length > 0}
				<Button class="addWallet-cancel-bt" isTransparent={true} on:click={() => goto('/profile')}>
					<span slot="text" class="addWallet-bt-text">Cancel</span>
				</Button>
			{/if}
		</div>
	</div>
</div>

<style type="postcss" global>
	.addWallet-wrapper {
		@apply absolute inset-0 overflow-auto;
		@apply grid place-items-center h-screen w-screen;
		@apply bg-white dark:bg-dark-gosutoDark;
	}

	.addWallet-wrapper .addWallet-gosuto-logo {
		@apply w-36 h-12 md:w-32 md:h-10 3xl:w-40 3xl:h-14 4xl:w-72 4xl:h-28;
		@apply relative md:absolute top-6 md:left-16;
		@apply place-self-center;
	}

	.addWallet-content {
		@apply flex flex-col items-center justify-between;
		/* @apply mt-0 md:mt-20; */
		/* @apply w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4; */
	}

	.addWallet-page-header {
		@apply text-center;
		@apply mb-8 4xl:mb-20;
	}

	.header-text-main {
		@apply text-xl md:text-2xl 3xl:text-4xl 4xl:text-7xl font-display font-bold;
		@apply mb-4 4xl:mb-8;
		@apply text-dark-gray dark:text-white;
	}

	.header-text-small {
		@apply text-xs md:text-sm 3xl:text-lg 4xl:text-[2rem] font-display;
		@apply text-light-lighterGray dark:text-white dark:opacity-80;
	}

	.choice-cards {
		@apply w-full;
		@apply flex flex-col gap-6 4xl:gap-12;
	}

	.addWallet-bt {
		@apply w-11/12 max-w-2xl;
		@apply h-12 4xl:h-28;
		@apply rounded-3xl;
	}

	.addWallet-bt:disabled {
		@apply opacity-50;
	}

	.addWallet-bt-text {
		@apply text-base md:text-lg 3xl:text-2xl 4xl:text-5xl font-display font-bold;
	}

	.addWallet-cancel-bt {
		@apply mt-5;
		/* @apply mt-10 4xl:mt-16; */
	}

	.createWallet-use-terms {
		@apply w-5/6;
		@apply translate-x-2;
		@apply mt-14 4xl:mt-32;
		@apply mb-5;
	}

	.createWallet-checkbox {
		@apply focus:ring-0;
		@apply dark:bg-dark-background;
		@apply rounded-[0.3rem] 4xl:rounded-xl;
		@apply border-light-fadedText dark:border-white;
		@apply 4xl:p-5 4xl:-translate-y-9 4xl:mt-16;
	}

	.createWallet-checkbox-label {
		@apply text-light-lighterGray dark:text-white;
		@apply text-xs 4xl:text-2xl font-display;
		@apply ml-px 4xl:ml-4;
	}
</style>
