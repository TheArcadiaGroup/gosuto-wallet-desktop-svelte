<!-- 
	@component
	
	A button to be used for importing a file
 -->
<script lang="ts">
	import UploadIcon from '$icons/UploadIcon.svelte';
	import Loading from './Loading.svelte';

	export let fileUpdated = false;
	export let loading = false;
</script>

<button on:click>
	<div class="bt-content-wrapper">
		{#if fileUpdated}
			<span>Update Account Avatar</span>
		{:else}
			<UploadIcon class="icon" />
			<span>Choose File</span>
		{/if}
	</div>
	{#if loading}
		<Loading useFirework={false} size={40} />
	{/if}
</button>

<style type="postcss">
	.bt-content-wrapper {
		@apply flex;
		@apply p-1 my-7;
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
