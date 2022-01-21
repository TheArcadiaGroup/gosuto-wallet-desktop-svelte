<script>
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
</script>

<div class="container">
	<div class="flex flex-col items-center gap-6">
		<div class="w-16 h-16 rounded-xl overflow-hidden">
			<ProfilePicture url={ppurl} />
		</div>
		<div class="font-semibold dark:text-white">
			{name}
		</div>
	</div>

	<div class="mx-6">
		<Button>
			<div slot="text" class="button">+ Add wallet</div>
		</Button>
	</div>

	<CreditCard {name} {ppurl} {avalible} {staked} {unclaimed} />

	<div class="h-6">
		<NavigationArrows on:move={moveCardCarousel} />
	</div>

	<hr />

	<ProfileMenu />
</div>

<style lang="postcss" global>
	:local(.container) {
		@apply w-full h-full flex flex-col items-stretch gap-6 px-4 overflow-auto py-10;
	}

	:local(.button) {
		@apply my-2 text-xs;
	}
</style>
