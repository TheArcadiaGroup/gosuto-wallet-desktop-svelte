<!-- @component 
	Describtion:
	> A credit card UI component that displays the data of the wallet (such as balance) on a visual credit card. This component is mainly visual - has no functionality.
	
	Props:
	- `ppurl` = URL of the profile picture.
	- `name` = Name of the wallet holder.
	- `wallet` = Object with data (like balance, staked, etc.) of the wallet.
-->
<script lang="ts">
	import { goto } from '$app/navigation';

	import CardGraphics from '$icons/CardGraphics.svelte';
	import PurpleTriangle from '$icons/PurpleTriangle.svelte';
	import ProfilePicture from '$lib/Components/ProfilePicture.svelte';

	export let ppurl = '';
	export let name = 'unknown name';
	export let wallet = {
		available: 0,
		staked: 0,
		unclaimed: 0,
		address: '0xh924yfh0h01hf1g4y25h2',
	};

	function saveAddress() {
		localStorage.setItem('selectedProfile', wallet.address);
		goto(`/profile/${wallet.address}/history`);
	}
</script>

<div class="container" on:click={saveAddress}>
	<div class="data-column">
		<div class="pp-and-name">
			<div class="pp">
				<ProfilePicture url={ppurl || ''} />
			</div>
			<div class="username">
				{name.split(' ')[0] || 'unknown name'}'s wallet
			</div>
		</div>
		<div class="grow-0">
			<div class="field-title">avalible</div>
			<div class="amount">${wallet?.available || 0} USD</div>
		</div>
		<hr class="w-1/2" />
		<div class="grow-0">
			<div class="field-title">staked</div>
			<div class="amount">${wallet?.staked || 0} USD</div>
		</div>
		<div class="unclaimed grow-0">
			<div class="field-title">unclaimed rewards</div>
			<div class="amount">${wallet?.unclaimed || 0} USD</div>
		</div>
	</div>
	<div class="grapics-column">
		<div class="purple-triangle">
			<PurpleTriangle />
		</div>
		<div class="w-3/4 z-10">
			<CardGraphics />
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.container) {
		@apply lg:aspect-[16/10] rounded-xl w-full overflow-hidden transition-all border hover:border-light-purple border-white text-xs box-border relative shadow-md hover:shadow-lg aspect-[16/10] md:aspect-auto bg-white;
		@apply dark:border-dark-grey dark:bg-dark-grey dark:shadow-sm dark:hover:shadow-md  dark:shadow-light-purple dark:hover:shadow-light-purple max-w-xs;
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
		@apply flex flex-col col-span-1 justify-center items-center h-full top-0 right-0 w-1/3 absolute py-4;
	}

	:local(.pp-and-name) {
		@apply flex flex-row items-center gap-1;
	}

	:local(.pp) {
		@apply w-6 h-6 rounded-md overflow-hidden mb-1;
	}

	:local(.username) {
		@apply text-xs font-bold text-light-purple;
	}

	:local(.unclaimed) {
		@apply flex flex-row items-center gap-1;
	}

	:local(.purple-triangle) {
		@apply w-full -mt-1 -mr-1 absolute right-0 top-0;
	}
</style>
