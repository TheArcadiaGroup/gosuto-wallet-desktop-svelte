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
	<button>Show more</button>
</div>

<style lang="postcss">
	.main {
		@apply h-screen w-screen flex flex-col px-4;
	}

	h3 {
		@apply font-bold text-2xl;
	}

	.validator-holder {
		@apply w-full min-w-max overflow-y-auto h-[85%] pr-6;
	}

	.button-holder {
		@apply w-full flex items-center justify-center;
	}

	button {
		@apply border-2 border-light-lineColor rounded-[90px];
		@apply text-sm font-bold;
		@apply my-6 py-2 px-4 self-center;
		@apply hover:bg-light-purple hover:text-white hover:border-light-purple transition duration-500;
	}
</style>
