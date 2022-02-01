<script>
	import Button from '$lib/Common/Button.svelte';
</script>

<div class="onboarding-page-wrapper">
	<div class="onboarding-page-tracker">
		<button class="onboarding-active-page" />
		<button class="onboarding-inactive-page" />
		<button class="onboarding-inactive-page" />
	</div>

	<div class="onboarding-text-wrapper">
		<div class="onboarding-large-text">Lorem ipsum dolor sit amet, consectetuer adipiscing</div>
		<div class="onboarding-small-text">
			Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
			tincidunt ut laoreet dolore magna aliquam erat volutpat.
		</div>
		<div class="onboarding-next-bt">
			<Button>
				<p slot="text">Next</p>
			</Button>
		</div>
	</div>
</div>

<style lang="postcss" global>
	.onboarding-page-wrapper {
		@apply absolute inset-0;
		@apply dark:bg-dark-grey;
	}

	.onboarding-page-tracker {
		@apply flex gap-2;
		@apply absolute top-24 right-24;
	}

	.onboarding-inactive-page {
		@apply py-3 px-3;
		@apply rounded-full;
		background-color: rgba(196, 196, 196, 0.35);
	}

	.onboarding-active-page {
		@apply bg-light-orange rounded-xl;
		@apply py-3 px-6;
	}

	.onboarding-text-wrapper {
		@apply flex flex-col items-center text-center;
		@apply absolute top-1/2 left-1/2 -translate-x-1/2;
	}

	.onboarding-large-text {
		@apply text-2xl font-bold font-display text-light-grey dark:text-white;
		@apply max-w-sm;
		@apply mb-4;
	}

	.onboarding-small-text {
		@apply text-lg text-light-lighterGray dark:text-white;
		@apply mb-10;
		@apply max-w-lg;
	}

	.onboarding-next-bt {
		@apply py-4 px-40;
	}
</style>
