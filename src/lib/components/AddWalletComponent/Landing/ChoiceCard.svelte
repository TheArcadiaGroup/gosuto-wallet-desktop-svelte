<script lang="ts">
	export let choiceCard: choiceCard;
	export let selectCard: (choiceCard: choiceCard) => void;
</script>

<button class="card" class:selected={choiceCard.isSelected} on:click={() => selectCard}>
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
		@apply shadow rounded-3xl;
		@apply py-6 px-6;
		@apply bg-white bg-opacity-10;
	}

	:local(.card-content) {
		@apply flex;
	}

	:local(.circle) {
		@apply w-5 h-5 rounded-full;
		@apply mr-6;
		@apply translate-y-[0.125rem];
		@apply bg-light-checkBox dark:bg-white opacity-50;
	}

	:local(.card-text) {
		@apply flex flex-col;
	}

	:local(h2) {
		@apply text-dark-gray dark:text-white font-bold font-display;
		@apply mb-3;
		@apply place-self-start;
	}

	:local(.card-description) {
		@apply text-sm font-display text-light-lighterGray dark:text-white dark:opacity-80;
	}
</style>
