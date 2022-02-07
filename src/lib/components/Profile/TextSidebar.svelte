<!--
@component
The wallet send/swap last column. This component informs user that no Token is selected and if they want to send/swap Tokens, they have to select one.
All logic of this component (whether it is shown or not) is handled by it's parents
@author marekvospel
-->
<div class="text-sidebar">
	<p class="sidebar-text"><slot /></p>
</div>

<style lang="postcss" global>
	:local(.text-sidebar) {
		@apply relative;
		@apply h-full w-full;
		@apply flex items-center justify-center;
		@apply dark:bg-dark-grey;
	}

	:local(.sidebar-text) {
		@apply w-1/2;
		@apply text-center font-semibold text-sm text-light-grey193;
		@apply lg:opacity-100 lg:text-dark-lightGray;
		@apply dark:opacity-50;
	}
</style>
