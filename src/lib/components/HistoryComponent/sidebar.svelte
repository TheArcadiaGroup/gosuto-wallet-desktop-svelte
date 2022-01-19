<script lang="ts">
	import { fly } from 'svelte/transition';

	export let historyObject = null;
</script>

<!-- Layout -->
<div class={!historyObject ? 'main h-screen justify-center' : 'main'}>
	{#if historyObject}
		<div
			class="sidebar-holder"
			in:fly={{ x: 200, duration: 500 }}
			out:fly={{ x: 200, duration: 500 }}
		>
			Test
		</div>
	{:else}
		<p class="inactive-text">Select an entry to view more info about it</p>
	{/if}
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply flex flex-col items-center md:pt-20 px-12 md:px-5 h-full md:h-screen w-full;
	}

	:local(.inactive-text) {
		@apply text-lg text-light-inactiveText md:max-w-[60%] 2xl:max-w-[55%] text-center;
	}

	:local(h4) {
		@apply font-bold text-xl md:mb-4 2xl:mb-12 dark:text-white;
		@apply hidden md:block;
	}
</style>
