<script lang="ts">
	import ImportIcon from '$icons/ImportIcon.svelte';
</script>

<button>
	<div class="wrapper">
		<div class="icon">
			<ImportIcon />
		</div>
		<span>Upload Private Key File</span>
	</div>
</button>

<style type="postcss">
	.wrapper {
		@apply flex;
		@apply p-1;
	}

	.icon {
		@apply mr-3;
	}

	span {
		@apply text-light-orange font-display;
	}
</style>
