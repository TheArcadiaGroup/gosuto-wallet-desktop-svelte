<script>
	import ValidatorItem from './ValidatorItem/index.svelte';
	export let validatorArray = Array(10);
</script>

<div class="main">
	<h3>Validators</h3>
	<div class="validator-holder">
		{#each validatorArray as validatorObject, i}
			<ValidatorItem class={i > 0 ? 'top-border' : ''} />
		{/each}
	</div>
	<div class="button-holder">
		<button>Show more</button>
	</div>
</div>

<style lang="postcss">
	/* width */
	::-webkit-scrollbar {
		@apply w-2;
	}

	/* Track */
	::-webkit-scrollbar-track {
		@apply rounded-[39px];
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		@apply bg-light-scrollBar rounded-[39px];
	}

	.main {
		@apply h-screen flex flex-col;
	}

	h3 {
		@apply font-bold text-2xl;
	}

	/* Width should be same to the button holder */
	.validator-holder {
		@apply w-[650px] overflow-y-auto h-[85%] pr-6;
	}

	/* Width should be same to the validator holder */
	.button-holder {
		@apply w-[650px] flex items-center justify-center;
	}

	button {
		@apply border-2 border-light-lineColor rounded-[90px];
		@apply text-sm font-bold;
		@apply my-6 py-2 px-4;
		@apply hover:bg-light-purple hover:text-white hover:border-light-purple transition duration-500;
	}
</style>
