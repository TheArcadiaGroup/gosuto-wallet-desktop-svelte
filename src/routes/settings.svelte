<script lang="ts">
	import AvatarCard from '$components/accountSettings/AvatarCard.svelte';
	import ChooseFileButton from '$components/accountSettings/ChooseFileButton.svelte';
	import ChangeThemeBar from '$components/accountSettings/ChangeThemeBar.svelte';
	import InfoInput from '$components/accountSettings/InfoInput.svelte';
	import Button from '$lib/Common/Button.svelte';

	let info: infoCategory[] = [
		{ name: 'Name', placeholder: 'Jake Waterson' },
		{ name: 'Email', placeholder: 'Jake.waterson@gmail.com' },
	];
</script>

<div class="page-wrapper pl-28">
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
				<div class="save-bt">
					<Button>
						<p slot="text" class="btn-text">Save</p>
					</Button>
				</div>
				<div class="cancel-bt">
					<Button ring={true}>
						<p slot="text" class="btn-text">Cancel</p>
					</Button>
				</div>
			</div>
		</div>
	</div>
</div>

<style type="postcss" global>
	:local(.page-wrapper) {
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
		@apply w-2/5 min-w-fit;
	}

	.cancel-bt {
		@apply w-2/5 min-w-fit;
	}

	.btn-text {
		@apply py-3;
	}
</style>
