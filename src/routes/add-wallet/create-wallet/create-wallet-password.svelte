<script lang="ts">
	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';
	import Button from '$lib/Common/Button.svelte';
	import TextInput from '$lib/Common/TextInput.svelte';
	import EyeIcon from '$icons/EyeIcon.svelte';
	import LockIcon from '$icons/LockIcon.svelte';
	import { goto } from '$app/navigation';

	let walletName: string;
	let password: string;
	let confirmPassword: string;

	const togglePasswordVisibility = () => {
		let passwordInput = <HTMLInputElement>document.getElementById('password');
		let confirmpasswordInput = <HTMLInputElement>document.getElementById('confirm-password');
		if (passwordInput.type === 'text') {
			passwordInput.type = 'password';
			confirmpasswordInput.type = 'password';
		} else {
			passwordInput.type = 'text';
			confirmpasswordInput.type = 'text';
		}
	};
</script>

<div class="wrapper">
	<div class="content">
		<GosutoLogoAndText class="gosuto-logo" />
		<h1>Create new wallet</h1>
		<div class="explanation-text">
			<h2>Name your wallet and create a password</h2>
			<ul>
				<li>This password will be used to unlock your wallet.</li>
			</ul>
		</div>
		<div class="input-wrapper">
			<TextInput label={'Wallet Name'} bind:value={walletName} />
		</div>
		<div class="password-input-wrapper password-new">
			<p class="password-label">New Password</p>
			<LockIcon class="lock-icon" />
			<input
				name="password"
				id="password"
				type="password"
				placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
				class="details-input"
				bind:value={password}
			/>
			<button class="eye-wrapper" type="button" on:click={togglePasswordVisibility}>
				<EyeIcon class="eye-icon" />
			</button>
		</div>
		<div class="password-input-wrapper password-confirm">
			<p class="password-label">Confirm Password</p>
			<LockIcon class="lock-icon" />
			<input
				name="confirm-password"
				id="confirm-password"
				type="password"
				placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
				class="details-input"
				bind:value={confirmPassword}
			/>
			<button class="eye-wrapper" on:click={togglePasswordVisibility}>
				<EyeIcon class="eye-icon" />
			</button>
		</div>
		<div class="use-terms">
			<input class="checkbox" type="checkbox" name="terms of use" />
			<label class="checkbox-label" for="terms of use">
				I have read and agree to the terms of service
			</label>
		</div>
		<div class="bt next-bt">
			<Button on:click={() => goto('/add-wallet/create-wallet/create-wallet-seed')}>
				<span slot="text" class="bt-text">Continue</span>
			</Button>
		</div>
		<button class="bt cancel-bt" on:click={() => goto('/add-wallet')}>
			<span class="bt-text cancel-bt-text">Back</span>
		</button>
	</div>
</div>

<style type="postcss" global>
	:local(.wrapper) {
		@apply absolute inset-0 overflow-auto;
		@apply grid;
		@apply dark:bg-dark-gosutoDark;
	}

	.wrapper :global(.gosuto-logo) {
		@apply w-36 h-12 md:w-64 md:h-20 3xl:w-80 3xl:h-28 4xl:w-full 4xl:h-3/5;
		@apply mb-8 4xl:mb-16;
	}

	:local(.content) {
		@apply place-self-start justify-self-center 3xl:place-self-center;
		@apply grid place-items-center;
		@apply mt-10 md:mt-20;
		@apply w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4;
	}

	:local(h1) {
		@apply text-2xl md:text-3xl 3xl:text-4xl 4xl:text-7xl font-display font-bold;
		@apply mb-4 4xl:mb-16;
		@apply text-dark-gray dark:text-white;
	}

	:local(.explanation-text) {
		@apply text-light-fadedText dark:text-white opacity-80;
		@apply text-xs font-display 4xl:text-2xl;
		@apply relative;
		@apply ml-3 md:ml-0;
	}

	:local(h2) {
		@apply -translate-x-4;
		@apply mb-2;
	}

	:local(li) {
		@apply list-item list-disc;
	}

	:local(.input-wrapper) {
		@apply mt-5 4xl:mt-10 mb-10 4xl:mb-20;
		@apply w-5/6;
	}

	:local(.password-input-wrapper) {
		@apply relative;
		@apply w-5/6;
		@apply mb-10 4xl:mb-20;
		@apply grid justify-items-center;
	}

	:local(.password-confirm) {
		@apply mb-5;
	}

	.password-input-wrapper :global(.lock-icon) {
		@apply absolute;
		@apply top-[0.8rem] 4xl:top-10 left-[4%] 4xl:left-[3%];
		@apply 4xl:w-14 4xl:h-14;
		@apply opacity-40 text-black dark:text-white;
	}
	.password-input-wrapper :global(.eye-icon) {
		@apply absolute;
		@apply top-[0.85rem] 4xl:top-10 right-[4%] 4xl:right-[3%];
		@apply 4xl:w-14 4xl:h-14;
		@apply opacity-40 text-black dark:text-white;
	}

	:local(.password-label) {
		@apply absolute px-1 4xl:px-3;
		@apply -top-[0.3rem] md:-top-3 4xl:-top-4 left-4 4xl:left-8;
		@apply dark:text-white leading-none font-display text-xs md:text-base 4xl:text-4xl;
		@apply bg-white dark:bg-dark-background;
	}

	:local(.details-input) {
		@apply border border-light-gray rounded-2xl 4xl:rounded-[2.5rem] bg-white dark:bg-dark-background;
		@apply dark:text-dark-lighterGray;
		@apply w-full h-[3.125rem] 4xl:h-32;
		@apply px-12 4xl:px-24;
		@apply 4xl:text-4xl;
	}

	:local(.details-input::placeholder) {
		@apply text-black opacity-50 dark:text-white dark:opacity-40;
	}

	:local(.use-terms) {
		@apply w-5/6;
		@apply translate-x-2;
	}

	:local(.checkbox) {
		@apply focus:ring-0;
		@apply dark:bg-dark-background;
		@apply rounded-[0.3rem] 4xl:rounded-xl;
		@apply border-light-fadedText dark:border-white;
		@apply 4xl:p-5 4xl:-translate-y-9 4xl:mt-16;
	}

	:local(.checkbox-label) {
		@apply text-light-lighterGray dark:text-white;
		@apply text-xs 4xl:text-2xl font-display;
		@apply ml-px 4xl:ml-4;
	}

	:local(.bt) {
		@apply w-11/12 max-w-3xl h-12 4xl:h-28;
		@apply mt-10 4xl:mt-32;
		@apply rounded-3xl;
	}

	:local(.bt:disabled) {
		@apply opacity-50;
	}

	:local(.next-bt) {
		@apply mt-28 md:mt-10 4xl:mt-32;
	}

	:local(.cancel-bt) {
		@apply mb-5;
	}

	:local(.bt-text) {
		@apply text-base md:text-lg 3xl:text-2xl 4xl:text-5xl font-display font-bold;
	}

	:local(.cancel-bt-text) {
		@apply text-dark-gray dark:text-white;
	}
</style>
