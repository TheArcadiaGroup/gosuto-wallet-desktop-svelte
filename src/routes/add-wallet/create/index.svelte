<script lang="ts">
	import Button from '$lib/Components/Button.svelte';
	import TextInput from '$lib/Components/TextInput.svelte';

	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';
	import EyeIcon from '$icons/EyeIcon.svelte';
	import LockIcon from '$icons/LockIcon.svelte';

	import { walletName } from '$stores/WalletCreation';
	import { password } from '$stores/WalletCreation';

	import { goto } from '$app/navigation';
	import { walletNameIsValid } from '$utils/profiles';

	let walletNameValue: string;
	let passwordValue: string;
	let confirmPassword: string;
	let checked: boolean = false;
	let walletValid = true;

	let passwordInput: HTMLInputElement;
	let confirmPasswordInput: HTMLInputElement;

	/**
	 * @function
	 * A function to toggle whether password in the input field is visible or hidden
	 */
	const togglePasswordVisibility = (inputElement: HTMLInputElement) => {
		if (inputElement.type === 'text') {
			inputElement.type = 'password';
		} else {
			inputElement.type = 'text';
		}
	};

	const setValues = () => {
		walletName.set(walletNameValue);
		password.set(passwordValue);
	};

	//TODO: input restrictions
</script>

<div class="createWallet-wrapper">
	<div class="createWallet-content">
		<GosutoLogoAndText class="createWallet-gosuto-logo" />
		<h1 class="createWallet-header">Create new wallet</h1>
		<div class="createWallet-explanation-text">
			<h2 class="createWallet-explanation-text-header">Name your wallet and create a password</h2>
			<ul>
				<li class="createWallet-listItem">This password will be used to unlock your wallet.</li>
			</ul>
		</div>
		<div class="createWallet-input-wrapper">
			<TextInput
				label={'Wallet Name'}
				bind:value={walletNameValue}
				on:input={() => {
					walletValid = walletNameIsValid(walletNameValue);
				}}
			/>
		</div>

		<div class="error-div wallet-name-error-div">
			{#if !walletValid}
				Wallet Name Already Exists
			{/if}
		</div>

		<div class="createWallet-password-input-wrapper createWallet-password-new">
			<p class="createWallet-password-label">New Password</p>
			<LockIcon class="createWallet-lock-icon" />
			<input
				name="password"
				id="password"
				type="password"
				placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
				class="createWallet-details-input"
				bind:value={passwordValue}
				bind:this={passwordInput}
			/>
			<button
				class="createWallet-eye-wrapper"
				type="button"
				on:click={() => togglePasswordVisibility(passwordInput)}
			>
				<EyeIcon class="createWallet-eye-icon" />
			</button>
		</div>
		<div class="createWallet-password-input-wrapper createWallet-password-confirm">
			<p class="createWallet-password-label">Confirm Password</p>
			<LockIcon class="createWallet-lock-icon" />
			<input
				name="confirm-password"
				id="confirm-password"
				type="password"
				placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
				class="createWallet-details-input"
				bind:value={confirmPassword}
				bind:this={confirmPasswordInput}
			/>
			<button
				class="createWallet-eye-wrapper"
				on:click={() => togglePasswordVisibility(confirmPasswordInput)}
			>
				<EyeIcon class="createWallet-eye-icon" />
			</button>
		</div>
		<div class="error-div">
			{#if confirmPassword !== passwordValue && passwordValue && confirmPassword}
				Passwords do not match.
			{/if}
		</div>
		<div class="createWallet-use-terms">
			<input class="createWallet-checkbox" type="checkbox" name="terms of use" bind:checked />
			<label class="createWallet-checkbox-label" for="terms of use">
				I have read and agree to the terms of service
			</label>
		</div>
		<div class="createWallet-bt createWallet-next-bt">
			<Button
				isDisabled={!walletValid ||
					!checked ||
					!walletNameValue ||
					!passwordValue ||
					!confirmPassword ||
					passwordValue !== confirmPassword}
				on:click={() => {
					setValues();
					goto('/add-wallet/create/wallet-seed');
				}}
			>
				<span slot="text" class="createWallet-bt-text">Continue</span>
			</Button>
		</div>
		<button class="createWallet-bt createWallet-cancel-bt" on:click={() => goto('/add-wallet')}>
			<span class="createWallet-bt-text createWallet-cancel-bt-text">Back</span>
		</button>
	</div>
</div>

<style type="postcss" global>
	.createWallet-wrapper {
		@apply absolute inset-0 overflow-auto;
		@apply grid;
		@apply dark:bg-dark-gosutoDark;
	}

	.createWallet-wrapper .createWallet-gosuto-logo {
		@apply w-36 h-12 md:w-64 md:h-20 3xl:w-80 3xl:h-28 4xl:w-full 4xl:h-3/5;
		@apply mb-8 4xl:mb-16;
	}

	.createWallet-content {
		@apply place-self-start justify-self-center 3xl:place-self-center;
		@apply grid place-items-center;
		@apply mt-10 md:mt-20;
		@apply w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4;
	}

	.createWallet-header {
		@apply text-2xl md:text-3xl 3xl:text-4xl 4xl:text-7xl font-display font-bold;
		@apply mb-4 4xl:mb-16;
		@apply text-dark-gray dark:text-white;
	}

	.createWallet-explanation-text {
		@apply text-light-fadedText dark:text-white opacity-80;
		@apply text-xs font-display 4xl:text-2xl;
		@apply relative;
		@apply ml-3 md:ml-0;
	}

	.createWallet-explanation-text-header {
		@apply -translate-x-4;
		@apply mb-2;
	}

	.createWallet-listItem {
		@apply list-item list-disc;
	}

	.createWallet-input-wrapper {
		@apply mt-5 4xl:mt-10 mb-10 4xl:mb-20;
		@apply w-5/6;
	}

	.createWallet-password-input-wrapper {
		@apply relative;
		@apply w-5/6;
		@apply mb-10 4xl:mb-20;
		@apply grid justify-items-center;
	}

	.createWallet-password-confirm {
		@apply mb-5;
	}

	.createWallet-password-input-wrapper .createWallet-lock-icon {
		@apply absolute;
		@apply top-[0.8rem] 4xl:top-10 left-[4%] 4xl:left-[3%];
		@apply 4xl:w-14 4xl:h-14;
		@apply opacity-40 text-black dark:text-white;
	}
	.createWallet-password-input-wrapper .createWallet-eye-icon {
		@apply absolute;
		@apply top-[0.85rem] 4xl:top-10 right-[4%] 4xl:right-[3%];
		@apply 4xl:w-14 4xl:h-14;
		@apply opacity-40 text-black dark:text-white;
	}

	.createWallet-password-label {
		@apply absolute px-1 4xl:px-3;
		@apply -top-[0.3rem] md:-top-3 4xl:-top-4 left-4 4xl:left-8;
		@apply dark:text-white leading-none font-display text-xs md:text-base 4xl:text-4xl;
		@apply bg-white dark:bg-dark-background;
	}

	.createWallet-details-input {
		@apply border border-light-gray rounded-2xl 4xl:rounded-[2.5rem] bg-white dark:bg-dark-background;
		@apply dark:text-dark-lighterGray;
		@apply w-full h-[3.125rem] 4xl:h-32;
		@apply px-12 4xl:px-24;
		@apply 4xl:text-4xl;
	}

	.createWallet-details-input::placeholder {
		@apply text-black opacity-50 dark:text-white dark:opacity-40;
	}

	.createWallet-use-terms {
		@apply w-5/6;
		@apply translate-x-2;
	}

	.createWallet-checkbox {
		@apply focus:ring-0;
		@apply dark:bg-dark-background;
		@apply rounded-[0.3rem] 4xl:rounded-xl;
		@apply border-light-fadedText dark:border-white;
		@apply 4xl:p-5 4xl:-translate-y-9 4xl:mt-16;
	}

	.createWallet-checkbox-label {
		@apply text-light-lighterGray dark:text-white;
		@apply text-xs 4xl:text-2xl font-display;
		@apply ml-px 4xl:ml-4;
	}

	.createWallet-bt {
		@apply w-11/12 max-w-3xl h-12 4xl:h-28;
		@apply mt-10 4xl:mt-32;
		@apply rounded-3xl;
	}

	.createWallet-bt:disabled {
		@apply opacity-50;
	}

	.createWallet-next-bt {
		@apply mt-28 md:mt-10 4xl:mt-32;
	}

	.createWallet-cancel-bt {
		@apply mb-5;
	}

	.createWallet-bt-text {
		@apply text-base md:text-lg 3xl:text-2xl 4xl:text-5xl font-display font-bold;
	}

	.createWallet-cancel-bt-text {
		@apply text-dark-gray dark:text-white;
	}

	.error-div {
		@apply text-left text-xs text-red-300 -mt-2 mb-3 flex w-full px-10;
	}

	.wallet-name-error-div {
		@apply -mt-8 mb-6;
	}
</style>
