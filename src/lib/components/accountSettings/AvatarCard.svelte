<script lang="ts">
	import PhotoIcon from '$icons/PhotoIcon.svelte';
</script>

<div class="card-wrapper">
	<img alt="avatar" src="images/png/avatarLarger.png" />
	<div class="photoIcon-wrapper">
		<PhotoIcon class="icon" />
	</div>
	<div class="card-bg" />
</div>

<style type="postcss">
	.card-wrapper {
		@apply grid place-items-center;
		@apply relative;
		@apply py-6 px-9 md:px-10 mb-4 4xl:mb-10 4xl:px-[4.5rem];
		@apply bg-dark-brown rounded-3xl 4xl:rounded-[3rem];
	}

	img {
		@apply w-24 md:w-32 4xl:w-96;
		@apply z-10;
	}

	.photoIcon-wrapper {
		@apply absolute;
		@apply z-30;
	}

	.photoIcon-wrapper :global(.icon) {
		@apply 4xl:w-40 4xl:h-40;
	}

	.card-bg {
		@apply absolute w-full h-full;
		@apply rounded-3xl 4xl:rounded-[3rem] bg-black opacity-60;
		@apply z-20;
	}
</style>
