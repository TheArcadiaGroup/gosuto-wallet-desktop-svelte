<script>
	import ValidatorItem from './ValidatorItem/index.svelte';
</script>

<div class="main">
	<h3>Validators</h3>
	<div class="validator-holder">
		<ValidatorItem first={true} />
		<ValidatorItem />
		<ValidatorItem />
		<ValidatorItem />
		<ValidatorItem />
		<ValidatorItem />
		<ValidatorItem />
		<ValidatorItem />
		<ValidatorItem />
		<ValidatorItem />
		<ValidatorItem />
	</div>
	<div class="button-holder">
		<button>Show more</button>
	</div>
</div>

<style lang="postcss">
	/* width */
	::-webkit-scrollbar {
		@apply w-[7px];
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

	.validator-holder {
		@apply w-[650px] overflow-y-auto h-[85%] pr-6;
	}

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
