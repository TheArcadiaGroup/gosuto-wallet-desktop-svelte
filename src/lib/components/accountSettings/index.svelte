<script lang="ts">
	import Navbar from '$components/navbar/Navbar.svelte';
	import AvatarCard from './AvatarCard.svelte';
	import ChangeThemeBar from './ChangeThemeBar.svelte';
	import ChooseFileButton from './ChooseFileButton.svelte';
	import InfoInput from './InfoInput.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';

	interface infoCategory {
		name: string;
		placeholder: string;
	}

	let info: infoCategory[] = [
		{ name: 'Name', placeholder: 'Jake Waterson' },
		{ name: 'Email', placeholder: 'Jake.waterson@gmail.com' },
	];
</script>

<Navbar />

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
			<div class="buttons">
				<button class="save-bt">Save</button>
				<button class="cancel-bt">Cancel</button>
			</div>
		</div>
	</div>
</div>

<style type="postcss">
	.page-wrapper {
		@apply absolute inset-0;
		@apply grid place-items-center;
		@apply dark:bg-dark-gosutoDark;
	}

	.content {
		@apply flex gap-14;
		@apply w-2/3;
	}

	.left-side {
		@apply flex flex-col place-items-center gap-8;
		@apply text-center;
		@apply ml-20;
	}

	h1 {
		@apply font-bold font-display text-2xl dark:text-white;
	}

	.right-side {
		@apply flex flex-col justify-center items-stretch gap-12;
		@apply translate-y-20 w-2/5;
	}

	.theme-bar-wrapper {
		@apply mt-4;
	}

	.buttons {
		@apply flex justify-evenly gap-10;
		@apply mt-28 mb-8;
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
