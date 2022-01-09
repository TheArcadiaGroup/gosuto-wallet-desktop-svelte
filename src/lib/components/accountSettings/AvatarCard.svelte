<script lang="ts">
	import PhotoIcon from '$icons/PhotoIcon.svelte';
</script>

<div class="card-wrapper">
	<img alt="avatar" src="images/png/avatarLarger.png" />
	<div class="icon">
		<PhotoIcon />
	</div>
	<div class="card-bg" />
</div>

<style type="postcss">
	.card-wrapper {
		@apply grid place-items-center;
		@apply relative;
		@apply py-6 px-10 mb-4;
		@apply bg-dark-brown rounded-3xl;
	}

	img {
		@apply w-32;
		@apply z-10;
	}

	.icon {
		@apply absolute;
		@apply z-30;
	}

	.card-bg {
		@apply absolute w-full h-full;
		@apply rounded-3xl bg-black opacity-60;
		@apply z-20;
	}
</style>
