<!-- @component 
	Describtion:
	> Button consiting of an arrow in a circular border. 
	
	Props:
	- `direction` = Either 'left' or 'right' ('left' by default). Is the direction the arrow is pointing.
	- `disabled` = A boolean variable. When true, the border doesn't show up and click events are not being dispatchen when clicking the component.A
	- `alwaysShodBorder` = A boolean variable. When false (default) the border shows up only on hover. When true, the border is always showing.

	Events:
	- `click` = Is dispatched when user clicks the button. Direction of the arrow is passed via the event details.
-->
<script lang="ts">
	import ArrowLeft from '$icons/ArrowLeft.svelte';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let direction: 'left' | 'right' = 'left';
	export let disabled = true;
	export let alwaysShowBorder = false;

	/**Handler for clicking the button. Dispatches the `click` even with direction in the event details.*/
	function click() {
		if (disabled) return;
		dispatch('click', { direction });
	}
</script>

<div
	class="{!disabled ? 'not-disabled' : ''} back-arrow-circle {alwaysShowBorder && 'show-border'}"
	on:click={click}
>
	<div class="w-1/2 {direction == 'right' && 'rotate-180'}">
		<ArrowLeft />
	</div>
</div>

<style lang="postcss" global>
	:local(.back-arrow-circle) {
		@apply h-full aspect-square rounded-full border-transparent border-2 grid place-items-center dark:text-white transition-all;
	}

	:local(.not-disabled) {
		@apply cursor-pointer dark:hover:border-white hover:border-light-gray;
	}

	:local(.show-border) {
		@apply dark:border-white border-light-gray;
	}
</style>
