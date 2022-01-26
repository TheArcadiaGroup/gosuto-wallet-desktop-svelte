<script lang="ts">
	import AvatarCard from '$components/accountSettings/AvatarCard.svelte';
	import ChooseFileButton from '$components/accountSettings/ChooseFileButton.svelte';
	import ChangeThemeBar from '$components/accountSettings/ChangeThemeBar.svelte';
	import InfoInput from '$components/accountSettings/InfoInput.svelte';
	import SelectItems from '$components/navbar/SelectItems.svelte';
	import GridLayout from '$lib/Common/GridLayout.svelte';

	let info: infoCategory[] = [
		{ name: 'Name', placeholder: 'Jake Waterson' },
		{ name: 'Email', placeholder: 'Jake.waterson@gmail.com' },
	];
</script>

<GridLayout>
	<div slot="mid" class="page-wrapper">
		<div class="content">
			<div class="left-side">
				<h1>Account Settings</h1>
				<AvatarCard />
				<ChooseFileButton />
			</div>
			<div class="right-side">
				{#each info as infoType}
					<InfoInput {...infoType} />
				{/each}
				<div class="theme-bar-wrapper">
					<ChangeThemeBar />
				</div>
				<div class="localization">
					<div class="language">
						<SelectItems items={{ usd: 'USD', eur: 'EUR', jpy: 'JPY' }} />
					</div>
					<div class="currency">
						<SelectItems items={{ en: 'EN', de: 'DE' }} />
					</div>
				</div>
				<div class="buttons">
					<button class="save-bt">Save</button>
					<button class="cancel-bt">Cancel</button>
				</div>
			</div>
		</div>
	</div>
</GridLayout>

<style type="postcss" global>
	:local(.page-wrapper) {
		@apply w-full h-full overflow-auto;
		@apply grid place-items-center;
		@apply dark:bg-dark-gosutoDark;
	}

	:local(.content) {
		@apply flex flex-col md:flex-row place-items-center md:place-items-start gap-4 lg:gap-10;
		@apply w-full;
		@apply mt-24 md:mt-0;
	}

	.left-side {
		@apply flex flex-col place-items-center;
		@apply text-center;
		@apply w-full md:w-1/2;
	}

	:local(h1) {
		@apply font-bold font-display text-2xl 3xl:text-3xl 4xl:text-7xl dark:text-white;
		@apply mb-4 md:mb-4 lg:mb-10 4xl:mb-20;
		@apply md:max-w-min lg:max-w-max;
	}

	.right-side {
		@apply flex flex-col place-items-center gap-8 md:gap-12 4xl:gap-32;
		@apply translate-y-0 md:translate-y-20 4xl:translate-y-40;
		@apply w-full md:w-1/2;
		@apply md:mr-1;
	}

	.theme-bar-wrapper {
		@apply mt-4;
		@apply w-2/3 md:w-full;
	}

	.localization {
		@apply w-[60%];
		@apply md:hidden;
	}

	.language {
		@apply float-right ml-1;
	}

	.currency {
		@apply float-left mr-1;
	}

	.buttons {
		@apply flex justify-evenly gap-7 md:gap-10;
		@apply mt-10 md:mt-20 4xl:mt-40 mb-8;
		@apply w-full;
	}

	.save-bt {
		@apply font-bold font-display text-white text-center 4xl:text-5xl;
		@apply bg-light-orange rounded-3xl 4xl:rounded-[3rem];
		@apply w-2/5 md:w-1/2 4xl:w-1/2 py-3 4xl:py-6 min-w-fit;
	}

	.cancel-bt {
		@apply font-bold font-display text-light-orange text-center 4xl:text-5xl;
		@apply bg-white dark:bg-dark-gosutoDark rounded-3xl 4xl:rounded-[3rem];
		@apply border border-light-orange;
		@apply w-2/5 md:w-1/2 4xl:w-1/2 py-3 4xl:py-6 min-w-fit;
	}
</style>
