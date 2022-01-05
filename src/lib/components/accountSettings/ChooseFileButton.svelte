<script lang="ts">
	import UploadIcon from '$icons/UploadIcon.svelte';
</script>

<button>
	<div class="wrapper">
		<div class="icon">
			<UploadIcon />
		</div>
		<span>Choose File</span>
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
		@apply text-light-orange font-bold font-display;
	}
</style>
