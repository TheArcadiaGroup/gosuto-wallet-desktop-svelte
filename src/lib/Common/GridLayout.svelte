<script lang="ts">
	import Navbar from '$components/navbar/Navbar.svelte';
</script>

<div class="app-container">
	<div class="navbar-container">
		<Navbar />
	</div>
	<div class="left-column">
		<slot name="left" />
	</div>
	<div class="mid-column">
		<slot name="mid" />
	</div>
	<div class="right-column">
		<slot name="right" />
	</div>
</div>

<style lang="postcss">
	.app-container {
		@apply w-full grid grid-cols-4 grid-rows-1 gap-0;
		grid-template-columns: 5vw 25vw auto 25vw;
	}

	.left-column {
		box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
	}

	.right-column {
		box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
	}
</style>
