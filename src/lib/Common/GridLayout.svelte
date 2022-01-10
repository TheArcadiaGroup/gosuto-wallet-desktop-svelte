<script lang="ts">
	import Navbar from '$components/navbar/Navbar.svelte';

	export let lastColumnActive: boolean = false;
</script>

<div class={lastColumnActive ? 'app-container withLastColumn' : 'app-container withoutLastColumn'}>
	<div class="navbar-container">
		<Navbar />
	</div>
	<div class="first-column">
		<slot name="first" />
	</div>
	<div class="mid-column">
		<slot name="mid" />
	</div>
	{#if lastColumnActive}
		<div class="last-column">
			<slot name="last" />
		</div>
	{/if}
</div>

<style lang="postcss">
	.app-container {
		@apply w-full grid gap-0;
	}

	@media only screen and (max-width: 768px) {
		.withLastColumn {
			grid-template-rows: auto auto auto auto;
		}

		.withoutLastColumn {
			grid-template-rows: auto auto auto;
		}

		.app-container > div {
			@apply overflow-x-hidden;
		}
	}

	@media only screen and (min-width: 768px) {
		.withLastColumn {
			grid-template-columns: 5vw 25vw auto 25vw;
		}

		.withoutLastColumn {
			grid-template-columns: 5vw 25vw auto;
		}
	}

	.first-column,
	.last-column {
		@apply z-30;
		box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
	}
</style>
