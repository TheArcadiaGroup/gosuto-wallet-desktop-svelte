<script lang="ts">
	import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<div class="theme-bar">
	<span>Change Theme</span>
	<ThemeSwitch />
</div>

<style type="postcss">
	.theme-bar {
		@apply flex flex-wrap items-center;
		@apply shadow rounded-lg dark:bg-dark-grey;
		@apply relative py-7;
	}

	span {
		@apply font-semibold font-display text-light-blue dark:text-dark-lightBlue text-sm;
		@apply ml-3;
	}
</style>
