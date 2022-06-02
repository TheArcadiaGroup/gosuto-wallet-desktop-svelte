<!-- 
	@component 
	Description:
	> Container for a single validator Object data in the validator page.
	
	@author MikeBrandon
-->
<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import { loadingValidators, validators } from '$stores/user/stake';
	import ValidatorItem from './ValidatorItem.svelte';
</script>

<div class="validators">
	<h3>Validators</h3>
	<div class="validator-holder">
		{#if $loadingValidators}
			<Loading />
		{:else if $validators.length > 0}
			{#each $validators as validator, i}
				<ValidatorItem {validator} class={i > 0 ? 'top-border' : ''} />
			{/each}
		{/if}
	</div>
</div>

<style lang="postcss" global>
	:local(.validators) {
		@apply h-screen flex flex-col w-full px-4;
	}

	:local(h3) {
		@apply font-bold md:text-2xl ml-4 md:ml-0 mt-8 2xl:mt-16 dark:text-white;
	}

	:local(.validator-holder) {
		@apply w-full overflow-y-scroll pr-6;
	}
	/* 
	:local(button) {
		@apply border-2 border-light-lineColor rounded-[90px];
		@apply text-sm font-bold dark:text-white;
		@apply my-6 py-2 px-4 self-center;
		@apply hover:bg-light-purple hover:text-white hover:border-light-purple transition duration-500;
	} */
</style>
