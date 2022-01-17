<script lang="ts">
	import Navbar from '$components/navbar/Navbar.svelte';
</script>

<div
	class={$$slots.last ? 'app-container withLastColumn' : 'app-container withoutLastColumn'}
	class:withFirstColumn={$$slots.first}
	class:withoutFirstColumn={!$$slots.first}
>
	<div class="navbar-container">
		<Navbar />
	</div>
	{#if $$slots.first}
		<div class="first-column">
			<slot name="first" />
		</div>
	{/if}
	<div class="mid-column">
		<div>
			<slot name="mid" />
		</div>
	</div>
	{#if $$slots.last}
		<div class="last-column">
			<slot name="last" />
		</div>
	{/if}
</div>

<style lang="postcss" global>
	:local(.app-container) {
		@apply w-full grid gap-0;
	}

	@media only screen and (max-width: 768px) {
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
			@apply w-full max-w-[50%];
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
		@apply z-30 dark:md:bg-dark-blue;
		box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
	}

	:local(.first-column) {
		@apply dark:bg-dark-background;
	}

	:local(.last-column) {
		@apply dark:bg-dark-grey;
	}

	:local(.mid-column) {
		@apply dark:bg-dark-background;
	}
</style>
