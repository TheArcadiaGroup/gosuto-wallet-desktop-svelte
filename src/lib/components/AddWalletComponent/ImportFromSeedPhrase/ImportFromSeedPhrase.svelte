<script lang="ts">
	import EyeIcon from '$icons/EyeIcon.svelte';
	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';
	import LockIcon from '$icons/LockIcon.svelte';
	let passwordType: string = 'text';
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

<div
	class="font-display bg-light-backgroundgray dark:bg-dark-backgroundgray flex flex-col items-center"
>
	<div class="mt-20 sm:mt-32">
		<GosutoLogoAndText />
	</div>
	<h1
		class="mt-6 sm:mt-9 text-light-grey dark:text-white text-center font-bold text-2xl leading-xl sm:text-3xl"
	>
		Import your wallet
	</h1>
	<div
		class="mt-7 sm:mt-11 mx-auto text-xs sm:text-sm leading-6 sm:leading-8 text-light-lighterGray dark:text-white dark:text-opacity-80 text-left font-normal"
	>
		<p>Import from seed phrase:</p>
		<ul class="list-disc ml-4 sm:list-none sm:ml-0">
			<li>Enter your seed phrase with a space between each word.</li>
			<li>Setup a password for this specific instance of Gosuto.</li>
		</ul>
	</div>
	<div class="mt-8 sm:mt-14 mx-auto">
		<form action="">
			<div class="flex flex-col items-center">
				<div class="flex flex-col md:flex-row gap-y-8 gap-x-16">
					<div
						class="relative w-96 h-56  border border-black border-opacity-10 dark:border-white dark:border-opacity-40  rounded-3xl px-3 py-2"
					>
						<label
							for="name"
							class="absolute -top-2 left-5 -mt-px inline-block px-1 text-xs font-medium text-light-grey bg-light-backgroundgray dark:text-white dark:bg-dark-backgroundgray"
						>
							Seed Phrase
						</label>
						<textarea
							rows="3"
							name="seedPhrase"
							id="seedPhrase"
							bind:value={seedPhrase}
							class="block w-full h-full bg-transparent py-3 border-0 resize-none focus:ring-0 sm:text-sm text-opacity-40 text-black dark:text-white dark:text-opacity-40"
						/>
						<button
							type="button"
							on:click={paste}
							class="absolute right-5 bottom-3.5 font-bold leading-6 text-sm text-light-orange dark:text-dark-lighterGray"
						>
							Paste
						</button>
					</div>
					<div class="flex flex-col gap-y-8">
						<div
							class="relative hidden sm:flex items-center w-96 h-16  border border-black border-opacity-10 dark:border-white dark:border-opacity-40 rounded-3xl"
						>
							<label
								for="name"
								class="absolute -top-2 left-5 -mt-px inline-block px-1 text-xs font-medium text-light-grey bg-light-backgroundgray dark:text-white dark:bg-dark-backgroundgray"
							>
								Wallet Name
							</label>

							<input
								name="name"
								id="name"
								type="text"
								bind:value={walletName}
								class="block w-full h-full bg-transparent px-7 py-3 border-0 resize-none focus:ring-0 sm:text-sm text-opacity-40  text-black dark:text-white dark:text-opacity-40"
							/>
						</div>

						<div
							class="relative flex items-center w-96 h-16  border border-black border-opacity-10 dark:border-white dark:border-opacity-40 rounded-3xl"
						>
							<label
								for="name"
								class="absolute -top-2 left-5 -mt-px inline-block px-1 text-xs font-medium text-light-grey bg-light-backgroundgray dark:text-white dark:bg-dark-backgroundgray"
							>
								New Password
							</label>
							<div
								class="w-full flex items-center px-5 placeholder:text-opacity-40 text-opacity-40 text-black dark:text-white dark:text-opacity-40"
							>
								<span class="w-6 h-6">
									<LockIcon />
								</span>
								<input
									name="password"
									id="password"
									type="password"
									placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
									bind:value={password}
									class="block w-full h-full bg-transparent px-7 py-3 border-0 resize-none focus:ring-0 sm:text-sm"
								/>
								<button type="button" on:click={togglePasswordVisibility}>
									<span class="w-6 h-6">
										<EyeIcon />
									</span>
								</button>
							</div>
						</div>

						<div
							class="relative flex items-center w-96 h-16  border border-black border-opacity-10 dark:border-white dark:border-opacity-40 rounded-3xl"
						>
							<label
								for="name"
								class="absolute -top-2 left-5 -mt-px inline-block px-1 text-xs font-medium text-light-grey bg-light-backgroundgray dark:text-white dark:bg-dark-backgroundgray"
							>
								Confirm Password
							</label>
							<div
								class="w-full flex items-center px-5 text-opacity-40  text-black dark:text-white dark:text-opacity-40"
							>
								<span class="w-6 h-6">
									<LockIcon />
								</span>
								<input
									name="confirm-password"
									id="confirm-password"
									type="password"
									placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
									bind:value={confirmPassword}
									class="block w-full h-full bg-transparent px-7 py-3 border-0 resize-none focus:ring-0 sm:text-sm"
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
				<button
					type="submit"
					class="w-96 h-14 mt-8 sm:mt-12 rounded-3xl text-center text-white font-bold text-xl leading-6 bg-light-orange"
				>
					<span class="hidden sm:block">Continue</span>
					<span class="block sm:hidden">Import</span>
				</button>

				<button
					type="button"
					class=" w-96 h-14 mt-8 mb-9 sm:mb-48 sm:mt-11 rounded-3xl text-center text-light-grey dark:text-white font-bold text-xl leading-6"
				>
					Back
				</button>
			</div>
		</form>
	</div>
</div>
