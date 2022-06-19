<script lang="ts">
	import RoundedSelectIcon from '$icons/RoundedSelectIcon.svelte';
	import { user } from '$stores/user';
	import { onMount } from 'svelte';
	import { pollyFillUser } from '$utils/pollyfillData';
	import { saveData } from '$utils/dataStorage';

	import { slide } from 'svelte/transition';

	const networkOptionsArr: ('testnet' | 'mainnet')[] = ['testnet', 'mainnet'];
	$: networkOptionValue = networkOptionsArr.indexOf($user?.network!) || 0;
	let droppedDown = false;
	let settingsData: IUser | null = $user;
	let initialized = false;

	onMount(() => {
		settingsData = pollyFillUser();
		initialized = true;
	});

	$: ((selectedNetwork) => {
		if (initialized && settingsData) {
			settingsData['network'] = networkOptionsArr[selectedNetwork];
			saveData('user', settingsData);
			user.set(settingsData);
		}
	})(networkOptionValue);
</script>

<svelte:window
	on:click={(e) => {
		// @ts-ignore
		if (!e?.target?.closest('.settings-network-select')) {
			droppedDown = false;
		}
	}}
/>

<div class="settings-network-select">
	<div
		class="top cursor-pointer"
		on:click={() => {
			droppedDown = !droppedDown;
		}}
	>
		<p class="selection">
			{networkOptionsArr[networkOptionValue]}
		</p>
		<div class="icon" class:rotate={droppedDown}>
			<RoundedSelectIcon />
		</div>
	</div>
	{#if droppedDown}
		<div class="options-holder" transition:slide|local>
			{#each networkOptionsArr as option, i}
				<p
					class="option {i === networkOptionValue ? 'selected' : ''}"
					on:click={() => {
						networkOptionValue = i;
						droppedDown = false;
					}}
				>
					{option}
				</p>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss" global>
	:local(.settings-network-select) {
		@apply min-w-max cursor-pointer bg-white dark:bg-dark-background rounded-3xl;
		@apply border border-light-lighterGray dark:border-white;
		@apply text-sm dark:text-white;
		@apply px-4 absolute right-0 -top-2;
	}

	:local(.selection) {
		@apply py-3 mr-4 capitalize;
	}

	:local(.top) {
		@apply flex justify-between items-center;
	}

	:local(.option) {
		@apply cursor-pointer mb-4 capitalize;
	}

	:local(.options-holder) {
		@apply border-t pt-2;
	}

	:local(.selected) {
		@apply text-light-purple;
	}

	:local(.rotate) {
		@apply transform rotate-180 transition;
	}
</style>
