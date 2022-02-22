<script lang="ts">
	import ChooseFileButton from '$lib/Components/ChooseFileButton.svelte';

	import AvatarCard from '$lib/Pages/Settings/AvatarCard.svelte';
	import ChangeThemeBar from '$lib/Pages/Settings/ChangeThemeBar.svelte';
	import InfoInput from '$lib/Pages/Settings/InfoInput.svelte';

	import SelectItems from '$lib/Components/Navbar/SelectItems.svelte';
	import Navbar from '$lib/Components/Navbar/Navbar.svelte';
	import { onMount } from 'svelte';

	let settingsData: AppSettings = {
		name: 'Jake Waterson',
		email: 'Jake.waterson@gmail.com',
		pictureUrl: 'https://miro.medium.com/fit/c/262/262/2*-cdwKPXyVI0ejgxpWkKBeA.jpeg',
	};

	onMount(() => {
		getData();
	});

	const getData = async () => {
		fetch('/api/settings/appSettings')
			.then((response) => response.json())
			.then((response) => {
				if (response.name) {
					settingsData.name = response.name;
					info[0].placeholder = response.name;
				}
				if (response.email) {
					settingsData.email = response.email;
					info[1].placeholder = response.email;
				}
				if (response.pictureUrl) settingsData.pictureUrl = response.pictureUrl;
			});
	};

	const postData = async () => {
		fetch('/api/settings/appSettings', {
			method: 'POST',
			body: JSON.stringify(settingsData),
		}).catch((error) => {
			console.error('error:', error);
		});
	};

	let handleSave = (inputValue: string, infoType: infoCategory) => {
		info[info.indexOf(infoType)].placeholder = inputValue;
		info = info;
	};

	/** Array to be used for creating InfoInput components with an each loop */
	let info: infoCategory[] = [
		{ name: 'Name', placeholder: settingsData.name },
		{ name: 'Email', placeholder: settingsData.email },
	];

	$: {
		info;
		settingsData.name = info[0].placeholder;
		settingsData.email = info[1].placeholder;
	}
</script>

<div class="flex">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-mid">
		<div class="settings-page-wrapper">
			<div class="settings-content">
				<div class="settings-left-side">
					<h1 class="settings-header">Account Settings</h1>
					<AvatarCard pictureUrl={settingsData.pictureUrl} />
					<ChooseFileButton />
				</div>
				<div class="settings-right-side">
					{#each info as infoType}
						<InfoInput {infoType} {handleSave} />
					{/each}
					<div class="settings-theme-bar-wrapper">
						<ChangeThemeBar />
					</div>
					<div class="settings-localization">
						<div class="settings-language">
							<SelectItems items={{ usd: 'USD', eur: 'EUR', jpy: 'JPY' }} />
						</div>
						<div class="settings-currency">
							<SelectItems items={{ en: 'EN', de: 'DE' }} />
						</div>
					</div>
					<div class="settings-buttons">
						<button class="settings-save-bt" on:click={postData}>Save</button>
						<button class="settings-cancel-bt">Cancel</button>
					</div>
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

	.settings-localization {
		@apply w-[60%];
		@apply md:hidden;
	}

	.settings-language {
		@apply float-right ml-1;
	}

	.settings-currency {
		@apply float-left mr-1;
	}

	.settings-buttons {
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
	}
</style>
