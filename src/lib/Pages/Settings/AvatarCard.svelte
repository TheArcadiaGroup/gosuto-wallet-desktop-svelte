<!-- 
	@component
	
	A card with a background to serve as a profile picture showcase in the UI
 -->
<script lang="ts">
	import PhotoIcon from '$icons/PhotoIcon.svelte';

	export let avatar: string = 'https://miro.medium.com/fit/c/262/262/2*-cdwKPXyVI0ejgxpWkKBeA.jpeg';
</script>

<div class="avatarCard-wrapper" on:click>
	<div class="photoIcon-wrapper">
		<PhotoIcon class="icon" />
	</div>
	<div class="avatarCard-bg" style="--url: url('{avatar}')" />
</div>

<style type="postcss">
	.avatarCard-wrapper {
		@apply grid place-items-center;
		@apply relative cursor-pointer;
		@apply w-40 h-40 4xl:w-96 4xl:h-96 overflow-hidden;
		@apply rounded-3xl 4xl:rounded-[3rem];
	}

	.photoIcon-wrapper {
		@apply absolute;
		@apply z-50;
	}

	.photoIcon-wrapper :global(.icon) {
		@apply 4xl:w-40 4xl:h-40;
	}

	.avatarCard-bg {
		@apply absolute w-full h-full;
		@apply rounded-3xl 4xl:rounded-[3rem] bg-black opacity-60;
		@apply z-20 bg-cover;
		background-image: var(--url);
	}
</style>
