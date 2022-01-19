<script lang="ts">
	import { fly } from 'svelte/transition';

	export let selectedToken;
</script>

<div class="sidebar-holder" in:fly={{ x: 200, duration: 500 }} out:fly={{ x: 200, duration: 500 }}>
	<h4>Token Test</h4>
</div>

<style lang="postcss" global>
	:local(h4) {
		@apply font-bold text-xl md:mb-4 2xl:mb-12 dark:text-white;
		@apply hidden md:block;
	}

	:local(.btn) {
		@apply flex flex-col md:flex-row items-center justify-center;
		@apply font-semibold text-sm 2xl:text-lg;
		@apply rounded-3xl h-full;
		@apply px-3 py-1 md:py-2 md:px-3 2xl:px-7;
		@apply transition duration-300;
	}

	:local(.orange-btn) {
		@apply bg-light-orange text-white;
		box-shadow: 0px 2px 15px #ff826688;
	}

	:local(.white-btn) {
		@apply text-light-grey dark:text-white;
		box-shadow: 0px 2px 15px #0000001a;
	}

	:local(.sidebar-holder) {
		@apply flex flex-col items-center h-full w-full;
	}
</style>
