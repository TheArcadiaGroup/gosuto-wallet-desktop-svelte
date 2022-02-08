<!-- 
	@component 
	Description:
	> Container for a single validator Object data in the validator page.
	
	@author MikeBrandon
-->
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

<style lang="postcss" global>
	:local(.main) {
		@apply h-screen flex flex-col p-4 md:p-0;
	}

	:local(h3) {
		@apply font-bold md:text-2xl ml-4 md:ml-0 mt-8 2xl:mt-16 dark:text-white;
	}

	:local(.validator-holder) {
		@apply w-full min-w-max overflow-y-auto h-[85%] pr-6;
	}

	:local(button) {
		@apply border-2 border-light-lineColor rounded-[90px];
		@apply text-sm font-bold dark:text-white;
		@apply my-6 py-2 px-4 self-center;
		@apply hover:bg-light-purple hover:text-white hover:border-light-purple transition duration-500;
	}
</style>
