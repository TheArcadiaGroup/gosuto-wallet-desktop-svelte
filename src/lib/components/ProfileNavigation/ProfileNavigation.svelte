<script lang="ts">
	import PlusIcon from '$icons/PlusIcon.svelte';
	import Button from '$lib/Common/Button.svelte';
	import ProfilePicture from '$lib/Common/ProfilePicture.svelte';
	import CardCarousel from './CardCarousel/CardCarousel.svelte';
	import CarouselItem from './CardCarousel/CarouselItem.svelte';
	import CreditCard from './CreditCard.svelte';
	import ProfileMenu from './ProfileMenu.svelte';

	let user: {
		name: string;
		ppurl: string;
		wallets: {
			name: string;
			avalible: number;
			staked: number;
			unclaimed: number;
		}[];
	};

	function menuSelect(e: CustomEvent) {
		const selection = e.detail.menu_item;
		// redirect to subpage
	}

	function addWallet() {
		// add wallet
	}

	// DEV
	user = {
		name: 'Jake Waterson',
		ppurl: 'https://miro.medium.com/fit/c/262/262/2*-cdwKPXyVI0ejgxpWkKBeA.jpeg',
		wallets: [
			{
				name: 'Wallet 1',
				avalible: 5000,
				staked: 2500,
				unclaimed: 375,
			},
			{
				name: 'Wallet 1',
				avalible: 5000,
				staked: 2500,
				unclaimed: 375,
			},
		],
	};
</script>

<div class="h-full w-full overflow-y-scroll overflow-x-hidden flex flex-col">
	<div class="container">
		<div class="flex-col items-center gap-6 hidden md:flex md:px-4">
			<div class="w-16 h-16 rounded-xl overflow-hidden">
				<ProfilePicture url={user?.ppurl || ''} />
			</div>
			<div class="font-semibold dark:text-white">
				{user?.name || 'unknown name'}
			</div>
		</div>
		<div class="mx-6 max-w-xs w-full not-on-mobile md:px-4">
			<div class="w-full" on:click={addWallet}>
				<Button>
					<div slot="text" class="button">+ Add wallet</div>
				</Button>
			</div>
		</div>
		<div class="w-full flex items-center justify-center relative">
			<div class="w-full overflow-x-hidden px-6 md:px-4">
				<CardCarousel numberOfCards={user?.wallets.length || 0}>
					{#each user?.wallets as wallet}
						<CarouselItem>
							<CreditCard name={user?.name || 'unknown name'} ppurl={user?.ppurl || ''} {wallet} />
						</CarouselItem>
					{/each}
				</CardCarousel>
			</div>
			<div class="absolute h-full aspect-[16/10] pointer-events-none">
				<div
					class="absolute z-10 w-12 h-12 -right-2 bg-light-orange grid place-items-center -bottom-2 md:hidden rounded-full pointer-events-auto cursor-pointer transition-all hover:scale-105"
					on:click={addWallet}
				>
					<PlusIcon />
				</div>
			</div>
		</div>
		<div class="w-full not-on-mobile md:px-4">
			<hr />
		</div>
		<div class="w-full md:max-w-xs md:px-4 pb-4">
			<ProfileMenu on:click={menuSelect} />
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.container) {
		@apply w-full h-0 flex-grow flex flex-col items-center gap-6 pt-10;
	}

	:local(.button) {
		@apply my-2 text-xs;
	}

	:local(.not-on-mobile) {
		@apply hidden md:block;
	}
</style>
