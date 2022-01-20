<script>
	import CardGraphics from '$icons/CardGraphics.svelte';
	import PurpleTriangle from '$icons/PurpleTriangle.svelte';
	import ProfilePicture from '$lib/Common/ProfilePicture.svelte';

	export let ppurl = 'https://miro.medium.com/fit/c/262/262/2*-cdwKPXyVI0ejgxpWkKBeA.jpeg';
	export let name = 'Jake';
	export let avalible = 5000;
	export let staked = 2500;
	export let unclaimed = 375;
</script>

<div class="container">
	<div class="data-column">
		<div class="flex flex-row items-center gap-1">
			<div class="w-6 h-6 rounded-md overflow-hidden mb-1">
				<ProfilePicture url={ppurl} />
			</div>
			<div class="text-xs font-bold text-light-purple">{name}'s wallet</div>
		</div>
		<div class="grow-0">
			<div class="field-title">avalible</div>
			<div class="amount">${avalible} USD</div>
		</div>
		<hr class="w-1/2" />
		<div class="grow-0">
			<div class="field-title">staked</div>
			<div class="amount">${staked} USD</div>
		</div>
		<div class="flex flex-row items-center gap-1 grow-0">
			<div class="field-title">unclaimed rewards</div>
			<div class="amount">${unclaimed} USD</div>
		</div>
	</div>
	<div class="grapics-column relative py-4">
		<div class="w-full -mt-1 -mr-1 absolute right-0 top-0">
			<PurpleTriangle />
		</div>
		<div class="w-3/4 z-10">
			<CardGraphics />
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.container) {
		@apply lg:aspect-[16/10] rounded-xl w-full shadow-lg overflow-hidden transition-all border hover:border-light-purple border-white hover:shadow-xl text-xs box-border relative dark:bg-dark-grey dark:border-dark-grey dark:shadow-sm dark:hover:shadow-md dark:hover:shadow-light-purple dark:shadow-light-purple;
	}

	:local(.data-column) {
		@apply col-span-2 p-2 text-sm w-full h-full flex flex-col justify-evenly dark:text-white;
	}

	:local(.field-title) {
		@apply uppercase text-3xs xl:text-2xs text-light-gray font-semibold;
	}

	:local(.amount) {
		@apply text-2xs xl:text-xs font-semibold;
	}

	:local(.grapics-column) {
		@apply flex flex-col col-span-1 justify-center items-center h-full top-0 right-0 w-1/3 absolute;
	}
</style>
