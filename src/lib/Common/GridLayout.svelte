<script lang="ts">
	import Navbar from '$components/navbar/Navbar.svelte';
</script>

<div class="app-container">
	<div class="navbar-container">
		<Navbar />
	</div>
	<div class="first-column">
		<slot name="first" />
	</div>
	<div class="mid-column">
		<slot name="mid" />
	</div>
	<div class="last-column">
		<slot name="last" />
	</div>
</div>

<style lang="postcss">
	.app-container {
		@apply w-full grid gap-0;
	}

	.app-container > div {
		@apply overflow-hidden;
	}

	@media only screen and (max-width: 768px) {
		.app-container {
			grid-template-rows: auto auto auto auto;
		}
	}

	@media only screen and (min-width: 768px) {
		.app-container {
			grid-template-columns: 5vw 25vw auto 25vw;
		}
	}

	.first-column,
	.last-column {
		@apply z-30;
		box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
	}
</style>
