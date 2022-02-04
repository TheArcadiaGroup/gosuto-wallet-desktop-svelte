<script lang="ts">
	import Navbar from '$components/Navbar/Navbar.svelte';
	import LastColumnRectangle from '$icons/LastColumnRectangle.svelte';
	import { slide } from 'svelte/transition';
</script>

<div
	class={$$slots.last ? 'app-container withLastColumn' : 'app-container withoutLastColumn'}
	class:withFirstColumn={$$slots.first}
	class:withoutFirstColumn={!$$slots.first}
>
	<div class="navbar-container overflow-hidden">
		<Navbar />
	</div>
	{#if $$slots.first}
		<div class="first-column">
			<slot name="first" />
		</div>
	{/if}
	<div class="mid-column">
		<!-- <div> -->
		<slot name="mid" />
		<!-- </div> -->
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
		@apply w-full grid gap-0 h-screen md:h-auto dark:bg-dark-background;
	}

	:local(.navbar-container) {
		@apply w-20;
	}

	@media only screen and (max-width: 768px) {
		:local(.last-column) {
			@apply rounded-t-3xl;
		}

		:local(.withLastColumn.withFirstColumn) {
			grid-template-rows: auto auto auto auto;
		}

		:local(.withoutLastColumn.withFirstColumn) {
			grid-template-rows: auto auto auto;
		}

		:local(.withLastColumn.withoutFirstColumn) {
			grid-template-rows: auto auto auto;
		}

		:local(.withoutLastColumn.withoutFirstColumn) {
			grid-template-rows: auto auto;
		}

		:local(.app-container) > div {
			@apply overflow-x-hidden;
		}
	}

	@media only screen and (min-width: 768px) {
		:local(.withLastColumn.withFirstColumn) {
			grid-template-columns: 5vw 20vw auto 25vw;
		}

		:local(.withoutLastColumn.withFirstColumn) {
			grid-template-columns: 5vw 20vw auto;
		}

		:local(.withLastColumn.withoutFirstColumn) {
			grid-template-columns: 5vw auto 25vw;
		}

		:local(.withoutLastColumn.withoutFirstColumn) {
			grid-template-columns: 5vw auto;
		}

		:local(.withoutLastColumn.withoutFirstColumn) > .mid-column {
			@apply flex flex-col items-center w-full;
		}

		:local(.withoutLastColumn.withoutFirstColumn) > .mid-column > div {
			@apply w-full max-w-[50%] h-full;
		}
	}

	@media only screen and (min-width: 1920px) {
		:local(.withLastColumn.withFirstColumn) {
			grid-template-columns: 5vw 20vw auto 20vw;
		}

		:local(.withoutLastColumn.withFirstColumn) {
			grid-template-columns: 5vw 20vw auto;
		}

		:local(.withLastColumn.withoutFirstColumn) {
			grid-template-columns: 5vw auto 20vw;
		}

		:local(.withoutLastColumn.withoutFirstColumn) {
			grid-template-columns: 5vw auto;
		}

		:local(.withoutLastColumn.withoutFirstColumn) > .mid-column {
			@apply flex flex-col items-center w-full;
		}

		:local(.withoutLastColumn.withoutFirstColumn) > .mid-column > div {
			@apply w-full max-w-[50%];
		}
	}

	:local(.first-column),
	:local(.last-column) {
		@apply z-30 dark:md:bg-dark-blue w-full;
		box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.2);
	}

	:local(.first-column) {
		@apply dark:bg-dark-grey dark:border dark:border-dark-background;
	}

	:local(.last-column) {
		@apply dark:bg-dark-grey dark:md:bg-dark-background dark:border dark:border-dark-background;
		@apply flex flex-col items-center pt-4 md:pt-0;
	}

	:local(.mid-column) {
		@apply dark:bg-dark-background dark:border dark:border-dark-background;
	}

	:local(.mobile) {
		@apply md:hidden mb-4;
	}
</style>
