<!-- 
	@component

	A component encasing every navbar item to ease styling
 -->
<script lang="ts">
	import { page } from '$app/stores';

	export let baseUrl = '';
	export let justCheckBaseUrl = false;
	export let useIncludes = false;
	/** A variable representing a boolean value to indicate reverse colouring for dark and light themes */
	export let reverse = false;

	$: isActive =
		baseUrl &&
		(justCheckBaseUrl
			? $page.url.pathname === baseUrl
			: useIncludes
			? $page.url.pathname.includes(baseUrl)
			: `/${$page.url.pathname.split('/')[1]}` === baseUrl);
</script>

<!-- svelte-ignore missing-declaration -->
<div class="nav-item" class:reverse class:active={isActive} on:click>
	<slot />
</div>

<style lang="postcss" global>
	.nav-item {
		@apply grid place-items-center;
		@apply min-w-[3.5rem] min-h-[3.5rem] w-14 h-14 4xl:w-24 4xl:h-24 cursor-pointer;
		@apply text-light-grey dark:text-white;
		@apply transition-all;
	}

	.nav-item.reverse {
		@apply text-white dark:text-dark-grey;
	}

	.nav-item.active {
		@apply bg-light-purple;
		@apply text-white;
		@apply rounded-2xl shadow-[0_4px_12px_rgba(114,93,255,0.5)];
	}

	.nav-item.active.reverse {
		@apply bg-light-purple;
		@apply text-dark-grey;
		@apply rounded-2xl shadow-[0_4px_12px_rgba(114,93,255,0.5)];
	}
</style>
