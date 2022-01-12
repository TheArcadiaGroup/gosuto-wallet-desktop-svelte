
<div class="select-currency dark:bg-dark-grey md:dark:bg-dark-blue">
	<p class="select-text text-[#C1C1C1] dark:opacity-50 md:opacity-100 md:text-dark-lightGray">Select currency you want to swap</p>
</div>

<style lang="postcss">

	.select-currency {
		@apply relative h-full w-full min-h-[20rem] rounded-t-3xl flex items-center justify-center;
		@apply md:rounded-none;
		box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
	}

	.select-currency::before {
		content: '';
		@apply absolute top-0 my-3 w-1/3 h-2 rounded-3xl bg-[#c4c4c41e];
		@apply md:hidden;
	}

	.select-text {
		@apply w-1/2 text-center font-semibold text-sm;
	}

</style>