<!-- 
	@component
	
	A button to be used for importing a file
 -->
<script lang="ts">
	import UploadIcon from '$icons/UploadIcon.svelte';
</script>

<button>
	<div class="bt-content-wrapper">
		<UploadIcon class="icon" />
		<span>Choose File</span>
	</div>
</button>

<style type="postcss">
	.bt-content-wrapper {
		@apply flex;
		@apply p-1 mb-7;
	}

	.bt-content-wrapper :global(.icon) {
		@apply mr-3 4xl:mr-6;
		@apply 3xl:w-6 3xl:h-6 4xl:w-12 4xl:h-12;
	}

	span {
		@apply text-light-orange font-bold font-display;
		@apply 3xl:text-xl 4xl:text-5xl;
	}
</style>
