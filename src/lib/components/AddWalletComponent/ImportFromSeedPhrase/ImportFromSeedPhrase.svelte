<script lang="ts">
	import EyeIcon from '$icons/EyeIcon.svelte';
	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';
	import LockIcon from '$icons/LockIcon.svelte';

	let seedPhrase: string;
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

	const paste = async () => {
		if (navigator.clipboard) {
			seedPhrase = await navigator.clipboard.readText();
		}
	};
</script>

<div class="wrapper">
	<div class="logo-gosuto">
		<GosutoLogoAndText />
	</div>
	<h1 class="page-heading">Import your wallet</h1>
	<div class="instructions">
		<p>Import from seed phrase:</p>
		<ul class="instruction-list">
			<li>Enter your seed phrase with a space between each word.</li>
			<li>Setup a password for this specific instance of Gosuto.</li>
		</ul>
	</div>
	<div class="form-wrapper">
		<form>
			<div class="form-inputs">
				<div class="input-wrapper h-56 px-3 py-2">
					<label for="name">Seed Phrase</label>
					<textarea
						rows="3"
						name="seedPhrase"
						id="seedPhrase"
						class="seedphrase"
						bind:value={seedPhrase}
					/>
					<button type="button" on:click={paste} class="btn-paste">Paste</button>
				</div>
				<div class="details-wrapper">
					<!-- TODO Hidden sm:flex -->
					<div class="input-wrapper h-16 hidden sm:flex">
						<label for="name">Wallet Name</label>

						<input
							name="name"
							id="name"
							type="text"
							class="details-input"
							bind:value={walletName}
						/>
					</div>

					<div class="input-wrapper h-16 flex">
						<label for="name">New Password</label>
						<div class="password-input-wrapper">
							<span class="w-6 h-6">
								<LockIcon />
							</span>
							<input
								name="password"
								id="password"
								type="password"
								placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
								class="details-input"
								bind:value={password}
							/>
							<button type="button" on:click={togglePasswordVisibility}>
								<span class="w-6 h-6">
									<EyeIcon />
								</span>
							</button>
						</div>
					</div>

					<div class="input-wrapper h-16 flex">
						<label for="name">Confirm Password</label>
						<div class="password-input-wrapper">
							<span class="w-6 h-6">
								<LockIcon />
							</span>
							<input
								name="confirm-password"
								id="confirm-password"
								type="password"
								placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
								class="details-input"
								bind:value={confirmPassword}
							/>
							<button type="button" on:click={togglePasswordVisibility}>
								<span class="w-6 h-6">
									<EyeIcon />
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<button type="submit" class="btn btn-continue">
				<span class="hidden sm:block">Continue</span>
				<span class="block sm:hidden">Import</span>
			</button>

			<button type="button" class="btn btn-back">Back</button>
		</form>
	</div>
</div>

<style lang="postcss" global>
	.wrapper {
		@apply font-display bg-light-backgroundgray dark:bg-dark-background flex flex-col items-center;
	}
	.logo-gosuto {
		@apply mt-20 sm:mt-32;
	}
	/* TODO leading-xl */
	.page-heading {
		@apply mt-6 sm:mt-9 text-light-grey dark:text-white text-center font-bold text-2xl sm:text-3xl;
	}
	.instructions {
		@apply mt-7 sm:mt-11 mx-auto text-xs sm:text-sm leading-6 sm:leading-8 text-light-lighterGray dark:text-white dark:text-opacity-80 text-left font-normal;
	}
	.instruction-list {
		@apply list-disc ml-4 sm:list-none sm:ml-0;
	}
	.form-wrapper {
		@apply mt-8 sm:mt-14 mx-auto;
	}
	:local(form) {
		@apply flex flex-col items-center;
	}
	.form-inputs {
		@apply flex flex-col md:flex-row gap-y-8 gap-x-16;
	}
	.input-wrapper {
		@apply relative items-center w-96  border border-black border-opacity-10 dark:border-white dark:border-opacity-40 rounded-3xl;
	}
	:local(label) {
		@apply absolute -top-2 left-5 -mt-px inline-block px-1 text-xs font-medium text-light-grey bg-light-backgroundgray dark:text-white dark:bg-dark-background;
	}
	:local(textarea) {
		@apply block w-full h-full bg-transparent py-3 border-0 resize-none focus:ring-0 sm:text-sm text-opacity-40 text-black dark:text-white dark:text-opacity-40;
	}
	.btn-paste {
		@apply absolute right-5 bottom-3.5 font-bold leading-6 text-sm text-light-orange dark:text-dark-lighterGray;
	}
	.details-wrapper {
		@apply flex flex-col gap-y-8;
	}
	:local(input) {
		@apply w-full h-full bg-transparent px-7 py-3 border-0 resize-none focus:ring-0 sm:text-sm text-opacity-40 text-black dark:text-white;
	}
	.password-input-wrapper {
		@apply w-full flex items-center px-5 text-opacity-40 text-black dark:text-white dark:text-opacity-40;
	}
	:local(.btn) {
		@apply w-96 h-14 mt-8 rounded-3xl text-center font-bold text-xl leading-6;
	}
	:local(.btn-continue) {
		@apply sm:mt-12 text-white bg-light-orange;
	}
	:local(.btn-back) {
		@apply mb-9 sm:mb-48 sm:mt-11 text-light-grey dark:text-white;
	}
</style>
