<script>
	export let dark = false;
</script>

{#if dark}
	<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M21 10H17L14 19L8 1L5 10H1"
			stroke="#FFFFFF"
			stroke-width="1.25"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
{:else}
	<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M21 10H17L14 19L8 1L5 10H1"
			stroke="#2A2F3C"
			stroke-width="1.25"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
{/if}
