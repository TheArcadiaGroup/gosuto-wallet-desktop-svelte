<script lang="ts">
	import ArrowInCircle from '$lib/Common/ArrowInCircle.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	function moveWallets(e: CustomEvent) {
		dispatch('move', { direction: e.detail.direction === 'right' ? 1 : -1 });
	}
</script>

<div class="w-full h-full flex flex-row items-center justify-center gap-2">
	<ArrowInCircle direction="left" disabled={true} on:click={moveWallets} />
	<ArrowInCircle direction="right" disabled={false} on:click={moveWallets} />
</div>
