<script lang="ts">
	import DarkThemeIcon from '$icons/DarkThemeIcon.svelte';
	import LightThemeIcon from '$icons/LightThemeIcon.svelte';
	import { toggleDarkMode } from '$utils/themeSettings';

	let dark: boolean = false;
</script>

<div class="wrapper">
	<button class="theme-bt" on:click={toggleDarkMode}>
		<div class="switch" class:dark>
			{#if dark}
				<DarkThemeIcon />
			{:else}
				<LightThemeIcon />
			{/if}
		</div>
	</button>
</div>

<style lang="postcss">
	.wrapper {
		@apply absolute right-3;
	}

	.theme-bt {
		@apply grid items-center;
		@apply bg-gray-100 dark:bg-dark-gosutoDark rounded-2xl;
		@apply w-16 h-9;
	}

	.switch {
		@apply grid place-items-center;
		@apply rounded-full h-8 w-8;
		@apply transition-all;
	}

	.switch:not(.dark) {
		@apply translate-x-0 ml-px my-0.5 bg-white;
	}

	.switch.dark {
		@apply mr-px my-0.5 bg-black;
		@apply translate-x-[31px];
	}
</style>
