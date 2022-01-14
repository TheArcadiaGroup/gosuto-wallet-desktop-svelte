<script lang="ts">
	import Navbar from '$components/navbar/Navbar.svelte';
	import LastColumnRectangle from '$icons/lastColumnRectangle.svelte';
	import { slide } from 'svelte/transition';
</script>

<div class={$$slots.last ? 'app-container withLastColumn' : 'app-container withoutLastColumn'}>
	<div class="navbar-container">
		<Navbar />
	</div>
	<div class="first-column">
		<slot name="first" />
	</div>
	<div class="mid-column">
		<slot name="mid" />
	</div>
	{#if $$slots.last}
		<div class="last-column" transition:slide>
			<div class="mobile">
				<LastColumnRectangle />
			</div>
			<slot name="last" />
		</div>
	{/if}
</div>

<style lang="postcss" global>
	:local(*) {
		@apply border-0;
	}

	:local(.app-container) {
		@apply w-full grid gap-0;
	}

	@media only screen and (max-width: 768px) {
		:local(.withLastColumn) {
			grid-template-rows: auto auto auto auto;
		}

		:local(.withoutLastColumn) {
			grid-template-rows: auto auto auto;
		}

		:local(.app-container) > div {
			@apply overflow-x-hidden;
		}
	}

	@media only screen and (min-width: 768px) {
		:local(.withLastColumn) {
			grid-template-columns: 5vw 20vw auto 20vw;
		}

		:local(.withoutLastColumn) {
			grid-template-columns: 5vw 20vw auto;
		}
	}

	:local(.first-column),
	:local(.last-column) {
		@apply z-30 dark:md:bg-dark-blue;
		box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.2);
	}

	:local(.first-column) {
		@apply dark:bg-dark-grey dark:border dark:border-dark-background;
	}

	:local(.last-column) {
		@apply dark:bg-dark-background dark:border dark:border-dark-background;
		@apply flex flex-col items-center pt-4 md:pt-0;
	}

	:local(.mid-column) {
		@apply dark:bg-dark-background dark:border dark:border-dark-background;
	}

	:local(.mobile) {
		@apply md:hidden;
	}
</style>
