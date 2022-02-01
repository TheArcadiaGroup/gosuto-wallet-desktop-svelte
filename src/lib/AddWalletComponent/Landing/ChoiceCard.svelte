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
		@apply py-6 4xl:py-16 px-6 4xl:px-16 rounded-3xl 4xl:rounded-[3rem];
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
		@apply w-5 4xl:w-10 h-5 4xl:h-10 rounded-full min-w-[1.25rem] min-h-[1.25rem];
		@apply mr-4 md:mr-6;
		@apply translate-y-[0.125rem];
		@apply bg-light-checkBox dark:bg-white opacity-50;
		@apply grid place-items-center;
	}

	.card.selected :local(.circle) {
		@apply dark:opacity-100;
	}

	.card.selected :local(.circle::after) {
		@apply content-[''];
		@apply w-4 4xl:w-7 h-4 4xl:h-7 rounded-full;
		@apply bg-black bg-opacity-50 dark:bg-opacity-100;
	}

	:local(.card-text) {
		@apply flex flex-col;
	}

	:local(h2) {
		@apply text-dark-gray dark:text-white font-bold font-display text-sm md:text-base 3xl:text-xl 4xl:text-4xl;
		@apply mb-3 4xl:mb-6 text-left;
	}

	.card.selected :local(h2) {
		@apply text-white;
	}

	:local(.card-description) {
		@apply text-xs md:text-sm 3xl:text-lg 4xl:text-3xl font-display text-light-lighterGray dark:text-white dark:opacity-80;
	}

	.card.selected :local(.card-description) {
		@apply text-white dark:opacity-80;
	}
</style>
