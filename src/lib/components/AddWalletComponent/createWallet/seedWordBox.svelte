<script lang="ts">
	export let seedWord: SeedWord;
</script>

<div class="wordbox-wrapper">
	<div class="id-circle">
		<span>{seedWord.id}</span>
	</div>
	<input value={seedWord.word} readonly />
</div>

<style type="postcss" global>
	:local(.id-circle) {
		@apply bg-light-grey241 dark:bg-white dark:bg-opacity-30;
		@apply rounded-full;
		@apply w-7 h-7;
		@apply grid place-items-center;
		@apply absolute translate-x-1 translate-y-[0.375rem] ml-1;
	}

	:local(span) {
		@apply text-sm font-bold font-display text-dark-gray dark:text-white;
	}

	:local(input) {
		@apply rounded-3xl bg-white bg-opacity-10;
		@apply py-2;
		@apply text-dark-gray font-display dark:text-white;
		@apply text-center;
		@apply shadow;
	}
</style>
