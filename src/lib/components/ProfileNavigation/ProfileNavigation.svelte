<script>
	import PlusIcon from '$icons/PlusIcon.svelte';

	import Button from '$lib/Common/Button.svelte';
	import ProfilePicture from '$lib/Common/ProfilePicture.svelte';
	import CreditCard from './CreditCard.svelte';
	import NavigationArrows from './NavigationArrows.svelte';
	import ProfileMenu from './ProfileMenu.svelte';

	export let name = 'Jake Waterson';
	export let ppurl = 'https://miro.medium.com/fit/c/262/262/2*-cdwKPXyVI0ejgxpWkKBeA.jpeg';
	export let avalible = 5000;
	export let staked = 2500;
	export let unclaimed = 375;

	function moveCardCarousel(e) {
		const direction = e.detail.direction;
	}

	function menuSelect(e) {
		const selection = e.detail.menu_item;
	}
</script>

<div class="container">
	<div class="flex-col items-center gap-6 hidden md:flex">
		<div class="w-16 h-16 rounded-xl overflow-hidden">
			<ProfilePicture url={ppurl} />
		</div>
		<div class="font-semibold dark:text-white">
			{name}
		</div>
	</div>

	<div class="mx-6 max-w-xs w-full not-on-mobile">
		<Button>
			<div slot="text" class="button">+ Add wallet</div>
		</Button>
	</div>

	<div class="w-full flex items-center justify-center relative">
		<CreditCard {name} {ppurl} {avalible} {staked} {unclaimed} />
		<div class="absolute h-full aspect-[16/10] pointer-events-none">
			<div
				class="absolute z-10 w-12 h-12 -right-3 bg-light-orange grid place-items-center -bottom-3 md:hidden rounded-full pointer-events-auto cursor-pointer transition-all hover:scale-105"
			>
				<PlusIcon />
			</div>
		</div>
	</div>

	<div class="h-6 w-full max-w-xs not-on-mobile">
		<NavigationArrows on:move={moveCardCarousel} />
	</div>

	<div class="w-full not-on-mobile">
		<hr />
	</div>

	<div class="w-full md:max-w-xs">
		<ProfileMenu on:click={menuSelect} />
	</div>
</div>

<style lang="postcss" global>
	:local(.container) {
		@apply w-full h-full flex flex-col items-center gap-6 md:px-4 overflow-auto py-10;
	}

	:local(.button) {
		@apply my-2 text-xs;
	}

	:local(.not-on-mobile) {
		@apply hidden md:block;
	}
</style>
