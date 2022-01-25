<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import ArrowLeft from '$icons/ArrowLeft.svelte';

	export let direction: 'left' | 'right' = 'left';
	export let disabled = true;

	function click() {
		if (disabled) return;

		dispatch('click', { direction });
	}
</script>

<div class="{!disabled ? 'disabled' : ''} main" on:click={click}>
	<div class="w-1/2 {direction == 'right' && 'rotate-180'}">
		<ArrowLeft />
	</div>
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply h-full aspect-square rounded-full border-transparent border-2 grid place-items-center dark:text-white transition-all;
	}

	:local(.disabled) {
		@apply cursor-pointer dark:hover:border-white hover:border-light-gray;
	}
</style>
