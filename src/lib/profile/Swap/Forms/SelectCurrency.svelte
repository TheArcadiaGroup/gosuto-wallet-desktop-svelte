<!--
@component
The wallet swap last column. This component informs user that no Token is selected and if they want to swap Tokens, they have to select one.
All logic of this component (whether it is shown or not) is handled by it's parents
@author marekvospel
-->
<div class="select-currency">
	<p class="select-currency-text">Select currency you want to swap</p>
</div>

<style lang="postcss" global>
	.select-currency {
		@apply relative;
		@apply h-full w-full;
		@apply flex items-center justify-center;
		@apply rounded-t-3xl;
	}

	.select-currency-text {
		@apply w-1/2;
		@apply text-center font-semibold text-sm text-light-grey193;
		@apply dark:opacity-50 md:opacity-100 md:text-dark-lightGray;
	}
</style>
