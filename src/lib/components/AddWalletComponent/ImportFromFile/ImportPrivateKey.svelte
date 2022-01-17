<script lang="ts">
	import ImportIcon from '$icons/ImportIcon.svelte';
</script>

<button>
	<div class="wrapper">
		<div class="icon-wrapper">
			<ImportIcon class="import-icon" />
		</div>
		<span>Upload Private Key File</span>
	</div>
</button>

<style type="postcss">
	.wrapper {
		@apply flex;
		@apply p-1;
	}

	.icon-wrapper {
		@apply mr-3 4xl:mr-6;
	}

	.icon-wrapper :global(.import-icon) {
		@apply 4xl:w-10 4xl:h-10;
	}

	span {
		@apply text-sm 3xl:text-base 4xl:text-3xl;
		@apply text-light-lighterOrange font-display;
	}
</style>
