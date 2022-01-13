<script>
	import Button from '$lib/Common/Button.svelte';
</script>

<div class="page-wrapper">
	<div class="page-tracker">
		<button class="active-page" />
		<button class="inactive-page" />
		<button class="inactive-page" />
	</div>

	<div class="text-wrapper">
		<div class="large-text">Lorem ipsum dolor sit amet, consectetuer adipiscing</div>
		<div class="small-text">
			Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
			tincidunt ut laoreet dolore magna aliquam erat volutpat.
		</div>
		<div class="next-bt">
			<Button>
				<p slot="text">Next</p>
			</Button>
		</div>
	</div>
</div>

<style lang="postcss">
	.page-wrapper {
		@apply absolute inset-0;
		@apply dark:bg-dark-grey;
	}

	.page-tracker {
		@apply flex gap-2;
		@apply absolute top-24 right-24;
	}

	.inactive-page {
		@apply py-3 px-3;
		@apply rounded-full;
		background-color: rgba(196, 196, 196, 0.35);
	}

	.active-page {
		@apply bg-light-orange rounded-xl;
		@apply py-3 px-6;
	}

	.text-wrapper {
		@apply flex flex-col items-center text-center;
		@apply absolute top-1/2 left-1/2 -translate-x-1/2;
	}

	.large-text {
		@apply text-2xl font-bold font-display text-light-grey dark:text-white;
		@apply max-w-sm;
		@apply mb-4;
	}

	.small-text {
		@apply text-lg text-light-lighterGray dark:text-white;
		@apply mb-10;
		@apply max-w-lg;
	}

	.next-bt {
		@apply py-4 px-40;
	}
</style>
