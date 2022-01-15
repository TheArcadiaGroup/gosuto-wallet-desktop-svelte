<script lang="ts">
	export let choiceCard: choiceCard;
	export let selectCard: (choiceCard: choiceCard) => void;
</script>

<button class="card" class:selected={choiceCard.isSelected} on:click={() => selectCard(choiceCard)}>
	<div class="card-content">
		<div class="circle" />
		<div class="card-text">
			<h2>{choiceCard.header}</h2>
			<p class="card-description">{choiceCard.description}</p>
		</div>
	</div>
</button>

<style type="postcss" global>
	:local(.card) {
		@apply w-full;
		@apply rounded-3xl;
		@apply py-6 px-6;
		@apply shadow;
		@apply bg-white bg-opacity-10;
		@apply transition-all;
	}

	:local(.card.selected) {
		@apply bg-dark-selectedButton;
		@apply shadow-[0_4px_14px_rgba(114,93,255,0.5)];
	}

	:local(.card-content) {
		@apply flex;
	}

	:local(.circle) {
		@apply w-5 h-5 rounded-full min-w-[1.25rem] min-h-[1.25rem];
		@apply mr-6;
		@apply translate-y-[0.125rem];
		@apply bg-light-checkBox dark:bg-white opacity-50;
		@apply flex justify-center;
	}

	.card.selected :local(.circle) {
		@apply dark:opacity-100;
	}

	.card.selected :local(.circle::after) {
		@apply content-[''];
		@apply w-4 h-4 rounded-full;
		@apply place-self-center;
		@apply bg-black bg-opacity-50 dark:bg-opacity-100;
	}

	:local(.card-text) {
		@apply flex flex-col;
	}

	:local(h2) {
		@apply text-dark-gray dark:text-white font-bold font-display;
		@apply mb-3;
		@apply place-self-start;
	}

	.card.selected :local(h2) {
		@apply text-white;
	}

	:local(.card-description) {
		@apply text-sm font-display text-light-lighterGray dark:text-white dark:opacity-80;
		@apply place-self-start;
	}

	.card.selected :local(.card-description) {
		@apply text-white dark:opacity-80;
	}
</style>
