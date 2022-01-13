<script lang="ts">
	import Navbar from '$components/navbar/Navbar.svelte';
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
			grid-template-columns: 5vw 25vw auto 25vw;
		}

		:local(.withoutLastColumn) {
			grid-template-columns: 5vw 25vw auto;
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
