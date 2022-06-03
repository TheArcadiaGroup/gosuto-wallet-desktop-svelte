<script lang="ts">
	import ChooseFileButton from '$lib/components/ChooseFileButton.svelte';
	import AvatarCard from '$lib/pages/Settings/AvatarCard.svelte';
	import ChangeThemeBar from '$lib/pages/Settings/ChangeThemeBar.svelte';
	import InfoInput from '$lib/pages/Settings/InfoInput.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import RoundedSelectIcon from '$icons/RoundedSelectIcon.svelte';

	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { pollyFillUser } from '$utils/pollyfillData';
	import { saveData } from '$utils/dataStorage';
	import { user } from '$stores/user';
	import emailValidation from '$utils/validators/emailValidation';

	const networkOptionsArr: ('testnet' | 'mainnet')[] = ['testnet', 'mainnet'];
	$: networkOptionValue = networkOptionsArr.indexOf($user?.network!) || 0;
	let droppedDown = false;

	let settingsData: IUser | null = $user;
	let nameError = '';
	let emailError = '';

	let initialized = false;

	onMount(() => {
		settingsData = pollyFillUser();
		initialized = true;
	});

	let handleSave = (inputValue: string, infoType: infoCategory) => {
		info[info.indexOf(infoType)].placeholder = inputValue;
		info = info;

		let ifError = false;

		if (info[info.indexOf(infoType)].name === 'Name') {
			// Check Length
			ifError = inputValue.length > 20;

			if (ifError) {
				nameError = 'Maximum 20 Characters Allowed';
			} else {
				nameError = '';
			}
		}

		if (info[info.indexOf(infoType)].name === 'Email') {
			// Check Length
			ifError = !!inputValue && !emailValidation(inputValue);

			if (ifError) {
				emailError = 'Invalid Email';
			} else {
				emailError = '';
			}
		}

		if (
			!ifError &&
			settingsData &&
			Object.keys(settingsData).includes(infoType.name.toLowerCase())
		) {
			// @ts-ignore
			settingsData[infoType.name.toLowerCase()] = inputValue.trim();
			saveData('user', JSON.stringify(settingsData));
		}
	};

	$: image = settingsData?.avatar;

	const selectProfileImage = () => {
		const res = window.api.sendSync('selectProfileImage');
		if (res && settingsData) {
			settingsData.avatar = res;
		}
	};

	/** Array to be used for creating InfoInput components with an each loop */
	// Also dynamically updates the UI
	$: info = [
		{ name: 'Name', placeholder: settingsData?.name! },
		{ name: 'Email', placeholder: settingsData?.email! },
	];

	// Dynamically Update the Selected Network
	$: ((selectedNetwork) => {
		if (initialized && settingsData) {
			settingsData['network'] = networkOptionsArr[selectedNetwork];
			saveData('user', JSON.stringify(settingsData));
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

<div class="flex">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-mid">
		<div class="settings-page-wrapper">
			<div class="settings-content">
				<div class="settings-left-side">
					<h1 class="settings-header">Account Settings</h1>
					<AvatarCard avatar={image} on:click={selectProfileImage} />
					<ChooseFileButton on:click={selectProfileImage} />
				</div>
				<div class="settings-right-side">
					{#each info as infoType}
						<InfoInput
							{infoType}
							{handleSave}
							error={infoType.name === 'Name'
								? nameError
								: infoType.name === 'Email'
								? emailError
								: ''}
						/>
					{/each}
					<div class="settings-theme-bar-wrapper">
						<ChangeThemeBar />
					</div>
					<div class="settings-network">
						<h2 class="settings-network-title">Network</h2>
						<!-- Rounded Select -->
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
					</div>
					<!-- <div class="settings-buttons">
						<button class="settings-save-bt" on:click={saveGlobalUserSettings}>Save</button>
						<button class="settings-cancel-bt">Cancel</button>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</div>

<style type="postcss" global>
	.settings-page-wrapper {
		@apply w-full h-full overflow-auto;
		@apply grid place-items-center;
		@apply dark:bg-dark-gosutoDark;
	}

	.settings-content {
		@apply flex flex-col md:flex-row place-items-center md:place-items-start gap-4 lg:gap-10;
		@apply w-[65%];
		@apply mt-24 md:mt-0;
	}

	.settings-left-side {
		@apply flex flex-col place-items-center;
		@apply text-center;
		@apply w-full md:w-1/2;
	}

	.settings-header {
		@apply font-bold font-display text-2xl 3xl:text-3xl 4xl:text-7xl dark:text-white;
		@apply mb-4 md:mb-4 lg:mb-10 4xl:mb-20;
		@apply md:max-w-min lg:max-w-max;
	}

	.settings-right-side {
		@apply flex flex-col place-items-center gap-8 md:gap-12 4xl:gap-32;
		@apply translate-y-0 md:translate-y-20 4xl:translate-y-40;
		@apply w-full md:w-1/2;
		@apply md:mr-20;
	}

	.settings-theme-bar-wrapper {
		@apply mt-4;
		@apply w-2/3 md:w-full;
	}

	/* .settings-buttons {
		@apply flex justify-evenly gap-7 md:gap-10;
		@apply mt-10 md:mt-20 4xl:mt-40 mb-8;
		@apply w-full;
	}

	.settings-save-bt {
		@apply font-bold font-display text-white text-center 4xl:text-5xl;
		@apply bg-light-orange rounded-3xl 4xl:rounded-[3rem];
		@apply w-2/5 md:w-1/2 4xl:w-1/2 py-3 4xl:py-6 min-w-fit;
	}

	.settings-cancel-bt {
		@apply font-bold font-display text-light-orange text-center 4xl:text-5xl;
		@apply bg-white dark:bg-dark-gosutoDark rounded-3xl 4xl:rounded-[3rem];
		@apply border border-light-orange;
		@apply w-2/5 md:w-1/2 4xl:w-1/2 py-3 4xl:py-6 min-w-fit;
	} */

	.settings-network {
		@apply flex w-full justify-between items-center flex-row relative px-2;
	}

	.settings-network-title {
		@apply dark:text-white;
	}

	:local(.settings-network-select) {
		@apply min-w-max w-[30%] md:w-[15%] cursor-pointer bg-white dark:bg-dark-background rounded-3xl;
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
