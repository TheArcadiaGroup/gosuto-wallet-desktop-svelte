<script lang="ts">
	import Button from '$lib/Components/Button.svelte';

	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';

	import ChoiceCard from '$lib/Pages/AddWallet/Landing/ChoiceCard.svelte';

	import { goto } from '$app/navigation';

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
		<div class="addWallet-bt next-bt">
			<Button isDisabled={selected === undefined} on:click={() => goto(selected.route)}>
				<span slot="text" class="addWallet-bt-text">Next</span>
			</Button>
		</div>
	</div>
</div>

<style type="postcss" global>
	.addWallet-wrapper {
		@apply absolute inset-0 overflow-auto;
		@apply grid place-items-center;
		@apply dark:bg-dark-gosutoDark;
	}

	.addWallet-wrapper .addWallet-gosuto-logo {
		@apply w-36 h-12 md:w-32 md:h-10 3xl:w-40 3xl:h-14 4xl:w-72 4xl:h-28;
		@apply relative md:absolute top-6 md:left-16;
		@apply place-self-center;
	}

	.addWallet-content {
		@apply flex flex-col place-items-center;
		@apply mt-10 md:mt-20;
		@apply w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4;
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
		@apply w-11/12 max-w-2xl h-12 4xl:h-28;
		@apply mt-20 4xl:mt-32;
		@apply rounded-3xl;
	}

	.addWallet-bt:disabled {
		@apply opacity-50;
	}

	.addWallet-bt-text {
		@apply text-base md:text-lg 3xl:text-2xl 4xl:text-5xl font-display font-bold;
	}
</style>
