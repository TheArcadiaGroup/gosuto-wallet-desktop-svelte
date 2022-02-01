<!--
@component
The wallet swap last column. This component informs user that no Token is selected and if they want to swap Tokens, they have to select one.
All logic of this component (whether it is shown or not) is handled by it's parents
@author marekvospel
-->
<div class="select-currency">
	<p class="select-text">Select currency you want to swap</p>
</div>

<style lang="postcss" global>
	:local(.select-currency) {
		@apply relative h-full w-full rounded-t-3xl flex items-center justify-center;
	}

	:local(.select-text) {
		@apply w-1/2 text-center font-semibold text-sm text-light-grey193;
		@apply dark:opacity-50 md:opacity-100 md:text-dark-lightGray;
	}
</style>
