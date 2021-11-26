<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	let visible = false;
	onMount(() => (visible = true));
</script>

{#if visible}
	<div class="flex h-[5rem]">
		<img
			src="images/png/logo.png"
			alt="Svelte Logo"
			draggable="false"
			class="max-h-full"
			in:fly={{ y: 100, duration: 1500 }}
		/>
	</div>
{:else}
	<div style="h-[16rem] my-2" />
{/if}

<style lang="postcss">
	img {
		@apply mx-auto;
		user-select: none;
	}
</style>
