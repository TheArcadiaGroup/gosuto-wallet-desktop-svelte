
<div class="select-currency">
	<p class="select-text">Select currency you want to swap</p>
</div>

<style lang="postcss">

	.select-currency {
		@apply relative h-full w-full min-h-[20rem] rounded-t-3xl flex items-center justify-center;
		@apply md:rounded-none;
		@apply dark:bg-dark-grey md:dark:bg-dark-blue;
		box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
	}

	.select-currency::before {
		content: '';
		@apply absolute top-0 my-3 w-1/3 h-2 rounded-3xl bg-light-transparentGrey12;
		@apply md:hidden;
	}

	.select-text {
		@apply w-1/2 text-center font-semibold text-sm text-light-grey193;
		@apply dark:opacity-50 md:opacity-100 md:text-dark-lightGray;
	}

</style>