<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import GosutoIcon from '$icons/GosutoIcon.svelte';
	let loaded = false;
	onMount(() => (loaded = true));
</script>

{#if !loaded}
	<div
		class="absolute top-0 left-0 z-50 flex align-items-center h-screen w-screen bg-light-orange"
		out:fade={{ delay: 2000, duration: 2100 }}
	>
		<div class="w-full my-auto mx-auto">
			<div class="flex justify-center my-auto mx-auto max-h-full w-screen">
				<GosutoIcon />
			</div>
			<div class="mt-2">
				<h1 class="font-bold text-3xl text-white">Gosuto</h1>
			</div>
		</div>
	</div>
	<div style="h-[16rem] my-2" />
{/if}
