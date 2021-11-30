<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	let loaded = false;
	onMount(() => (loaded = true));
</script>

{#if !loaded}
	<div
		class="absolute top-0 left-0 z-50 flex align-items-center h-screen w-screen"
		style="background: #FF8266;"
		out:fade={{ delay: 2000, duration: 2100 }}
	>
		<div class="w-full my-auto mx-auto">
			<img
				src="images/svg/gosuto.svg"
				alt="Svelte Logo"
				draggable="false"
				class="my-auto mx-auto max-h-full"
			/>
			<div class="mt-2">
				<h1 class="font-bold text-3xl text-white">Gosuto</h1>
			</div>
		</div>
	</div>
	<div style="h-[16rem] my-2" />
{/if}
