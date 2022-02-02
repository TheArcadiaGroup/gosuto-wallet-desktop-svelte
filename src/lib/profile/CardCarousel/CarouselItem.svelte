<!-- @component 
	Describtion:
	> A container (this component is used as a wrapper; has a slot) for individual items in the carousel. Is needed, so the carousel function properly and the scroll snapping works too.
	
	Slots:
	- `-` = General slot for the content of one item in the carousel.
-->

<div class="main">
	<slot />
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply w-full flex-shrink-0 flex items-center justify-center snap-center;
	}
</style>
