<script lang="ts">
	import AvatarCard from '$components/accountSettings/AvatarCard.svelte';
	import ChooseFileButton from '$components/accountSettings/ChooseFileButton.svelte';
	import ChangeThemeBar from '$components/accountSettings/ChangeThemeBar.svelte';
	import InfoInput from '$components/accountSettings/InfoInput.svelte';
	import SelectItems from '$components/navbar/SelectItems.svelte';

	let info: infoCategory[] = [
		{ name: 'Name', placeholder: 'Jake Waterson' },
		{ name: 'Email', placeholder: 'Jake.waterson@gmail.com' },
	];
</script>

<div class="page-wrapper">
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

<style type="postcss" global>
	:local(.page-wrapper) {
		@apply absolute inset-0 overflow-auto;
		@apply grid place-items-center;
		@apply dark:bg-dark-gosutoDark;
	}

	:local(.content) {
		@apply flex flex-col md:flex-row place-items-center md:place-items-start;
		@apply w-full md:w-2/3;
		@apply mt-24 md:mt-0;
	}

	.left-side {
		@apply flex flex-col place-items-center;
		@apply text-center;
		@apply w-full md:w-1/2;
	}

	:local(h1) {
		@apply font-bold font-display text-2xl dark:text-white;
		@apply mb-10;
	}

	.right-side {
		@apply flex flex-col place-items-center gap-8 md:gap-12;
		@apply translate-y-0 md:translate-y-20;
		@apply w-full md:w-1/2;
	}

	.theme-bar-wrapper {
		@apply mt-4;
		@apply w-2/3 md:w-full;
	}

	.localization {
		@apply w-1/2;
		@apply md:hidden;
	}

	.language {
		@apply float-right;
	}

	.currency {
		@apply float-left;
	}

	.buttons {
		@apply flex justify-evenly gap-7 md:gap-10;
		@apply mt-10 md:mt-20 mb-8;
		@apply w-full;
	}

	.save-bt {
		@apply font-bold font-display text-white text-center;
		@apply bg-light-orange rounded-3xl;
		@apply w-2/5 py-3 min-w-fit;
	}

	.cancel-bt {
		@apply font-bold font-display text-light-orange text-center;
		@apply bg-white dark:bg-dark-gosutoDark rounded-3xl;
		@apply border border-light-orange;
		@apply w-2/5 py-3 min-w-fit;
	}
</style>
