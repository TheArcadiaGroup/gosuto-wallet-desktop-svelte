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
		@apply p-1 mb-7;
	}

	.icon {
		@apply mr-3 4xl:mr-6;
	}

	span {
		@apply text-light-orange font-bold font-display;
		@apply 3xl:text-xl 4xl:text-5xl;
	}
</style>
