<script lang="ts">
	export let seedWord: SeedWord;
</script>

<div class="wordbox-wrapper">
	<div class="id-circle">
		<span>{seedWord.id}</span>
	</div>
	<div class="input-wrapper">
		<input value={seedWord.word} readonly />
	</div>
</div>

<style type="postcss" global>
	:local(.id-circle) {
		@apply bg-light-grey241 dark:bg-white dark:bg-opacity-30;
		@apply rounded-full;
		@apply w-7 h-7 4xl:w-11 4xl:h-11;
		@apply grid place-items-center;
		@apply absolute translate-x-1 4xl:translate-x-2 translate-y-[0.375rem] 4xl:translate-y-[0.6rem] ml-1;
	}

	:local(span) {
		@apply text-sm 4xl:text-2xl font-bold font-display text-dark-gray dark:text-white;
	}

	:local(.input-wrapper) {
		@apply w-full;
	}

	:local(input) {
		@apply w-full;
		@apply whitespace-nowrap;
		@apply rounded-3xl 4xl:rounded-full bg-white bg-opacity-10;
		@apply py-2 4xl:py-3;
		@apply text-dark-gray font-display 4xl:text-4xl dark:text-white;
		@apply text-center;
		@apply shadow;
	}
</style>
