<script lang="ts">
	import ArrowInCircle from '$lib/Common/ArrowInCircle.svelte';

	function moveWallets(e: CustomEvent) {
		// console.log(e.detail.direction);
	}
</script>

<div class="w-full h-full flex flex-row items-center justify-center gap-2">
	<ArrowInCircle direction="left" disabled={true} on:click={moveWallets} />
	<ArrowInCircle direction="right" disabled={false} on:click={moveWallets} />
</div>
