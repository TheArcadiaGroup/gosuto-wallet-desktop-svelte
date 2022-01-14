<script lang="ts">
	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';
	import Button from '$lib/Common/Button.svelte';
	import ChoiceCard from '$lib/components/AddWalletComponent/Landing/ChoiceCard.svelte';

	let choiceCards: choiceCard[] = [
		{
			id: 0,
			header: 'Add New Wallet',
			description: 'Add new wallet to your account',
			isSelected: false,
		},
		{
			id: 1,
			header: 'Import From Seed',
			description: 'Import wallet from seed phrase',
			isSelected: false,
		},
		{
			id: 2,
			header: 'Import From File',
			description: 'Import wallet from file',
			isSelected: false,
		},
	];

	let selectCard = (choiceCard: choiceCard) => {};
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
			<Button>
				<span slot="text" class="bt-text">Next</span>
			</Button>
		</div>
		<button class="bt cancel-bt">
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
		@apply w-32 h-10;
		@apply absolute top-6 left-16;
	}

	:local(.content) {
		@apply flex flex-col place-items-center;
		@apply mt-20;
		@apply w-1/4;
	}

	:local(.page-header) {
		@apply text-center;
		@apply mb-8;
	}

	:local(h1) {
		@apply text-2xl font-display font-bold;
		@apply mb-4;
		@apply text-dark-gray dark:text-white;
	}

	:local(.header-text) {
		@apply text-sm font-display;
		@apply text-light-lighterGray dark:text-white dark:opacity-80;
	}

	:local(.choice-cards) {
		@apply w-full;
		@apply flex flex-col gap-5;
	}

	:local(.bt) {
		@apply w-11/12 max-w-sm h-12;
		@apply mt-10;
		@apply rounded-3xl;
	}

	:local(.bt-text) {
		@apply text-lg font-display font-semibold;
	}

	:local(.cancel-bt-text) {
		@apply text-dark-gray dark:text-white;
	}
</style>
