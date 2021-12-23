<div class="absolute inset-0 dark:bg-dark-grey">
	<div class="flex gap-2 absolute top-24 right-24">
		<button class="bg-light-orange py-3 px-6 rounded-xl" />
		<button class="inactive-page" />
		<button class="inactive-page" />
	</div>

	<div class="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2  text-center items-center">
		<div class="text-2xl font-bold text-light-grey dark:text-white mb-4 max-w-sm">
			Lorem ipsum dolor sit amet, consectetuer adipiscing
		</div>
		<div class="text-lg text-light-grey dark:text-white mb-10 max-w-lg">
			Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
			tincidunt ut laoreet dolore magna aliquam erat volutpat.
		</div>
		<button class="py-4 px-40 bg-light-orange rounded-3xl text-white text-lg">Next</button>
	</div>
</div>

<style lang="postcss">
	.inactive-page {
		@apply py-3 px-3 rounded-full;
		background-color: rgba(196, 196, 196, 0.35);
	}
</style>
