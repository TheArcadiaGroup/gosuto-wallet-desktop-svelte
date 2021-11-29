<script lang="ts">
	import '$styles/tailwind.css';
	import { onMount } from 'svelte';
	import SideBar from '$lib/SideBar.svelte';
	import TopBar from '$lib/TopBar.svelte';

	let ready: boolean = false;
	onMount(() => (ready = true));
</script>

<div class="dragbar" />

{#if ready}
	<main>
		<SideBar />
		<section class="right-section">
			<TopBar />
			<slot />
		</section>
	</main>
{/if}

<style>
	main {
		@apply flex w-screen;
	}

	.right-section {
		@apply w-full;
	}

	.dragbar {
		-webkit-app-region: drag;
		position: absolute;
		z-index: 100;
		height: 40px;
		width: 100%;
	}
</style>
