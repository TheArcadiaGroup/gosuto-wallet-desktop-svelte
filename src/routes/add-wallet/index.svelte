<script lang="ts">
	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';
	import Button from '$lib/Common/Button.svelte';
	import ChoiceCard from '$lib/components/AddWalletComponent/Landing/ChoiceCard.svelte';

	import { goto } from '$app/navigation';

	let selected: choiceCard;

	let choiceCards: choiceCard[] = [
		{
			id: 0,
			header: 'Add New Wallet',
			description: 'Add new wallet to your account',
			route: '/add-wallet/create-wallet',
			isSelected: false,
		},
		{
			id: 1,
			header: 'Import From Seed',
			description: 'Import wallet from seed phrase',
			route: '/add-wallet/import-from-seed-phrase',
			isSelected: false,
		},
		{
			id: 2,
			header: 'Import From File',
			description: 'Import wallet from file',
			route: '/add-wallet/import-from-file',
			isSelected: false,
		},
	];

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

<div class="wrapper">
	<GosutoLogoAndText class="gosuto-logo" />
	<div class="content">
		<div class="page-header">
			<h1>Add Wallet</h1>
			<span class="header-text">Hello there, connect or create a wallet to continue!</span>
		</div>
		<div class="choice-cards">
			{#each choiceCards as choiceCard}
				<ChoiceCard {choiceCard} {selectCard} />
			{/each}
		</div>
		<div class="bt next-bt">
			<Button disabled={selected == undefined} on:click={() => goto(selected.route)}>
				<span slot="text" class="bt-text">Next</span>
			</Button>
		</div>
		<button class="bt cancel-bt" disabled={selected == undefined}>
			<span class="bt-text cancel-bt-text">Cancel</span>
		</button>
	</div>
</div>

<style type="postcss" global>
	:local(.wrapper) {
		@apply absolute inset-0 overflow-auto;
		@apply grid place-items-center;
		@apply dark:bg-dark-gosutoDark;
	}

	.wrapper :global(.gosuto-logo) {
		@apply w-36 h-12 md:w-32 md:h-10 3xl:w-40 3xl:h-14 4xl:w-72 4xl:h-28;
		@apply relative md:absolute top-6 md:left-16;
		@apply place-self-center;
	}

	:local(.content) {
		@apply flex flex-col place-items-center;
		@apply mt-10 md:mt-20;
		@apply w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4;
	}

	:local(.page-header) {
		@apply text-center;
		@apply mb-8 4xl:mb-20;
	}

	:local(h1) {
		@apply text-xl md:text-2xl 3xl:text-4xl 4xl:text-7xl font-display font-bold;
		@apply mb-4 4xl:mb-8;
		@apply text-dark-gray dark:text-white;
	}

	:local(.header-text) {
		@apply text-xs md:text-sm 3xl:text-lg 4xl:text-[2rem] font-display;
		@apply text-light-lighterGray dark:text-white dark:opacity-80;
	}

	:local(.choice-cards) {
		@apply w-full;
		@apply flex flex-col gap-6 4xl:gap-12;
	}

	:local(.bt) {
		@apply w-11/12 max-w-2xl h-12 4xl:h-28;
		@apply mt-10 4xl:mt-20;
		@apply rounded-3xl;
	}

	:local(.bt:disabled) {
		@apply opacity-50;
	}

	:local(.cancel-bt) {
		@apply mb-5;
	}

	:local(.bt-text) {
		@apply text-base md:text-lg 3xl:text-2xl 4xl:text-5xl font-display font-bold;
	}

	:local(.cancel-bt-text) {
		@apply text-dark-gray dark:text-white;
	}
</style>
