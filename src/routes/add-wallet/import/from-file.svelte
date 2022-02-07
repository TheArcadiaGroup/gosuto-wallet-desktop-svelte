<script lang="ts">
	import Button from '$lib/Common/Button.svelte';
	import TextInput from '$lib/Common/TextInput.svelte';

	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';

	import ImportPrivateKey from '$lib/AddWalletComponent/ImportFromFile/ImportPrivateKey.svelte';

	import { goto } from '$app/navigation';
	import type { JSONString } from '@sveltejs/kit/types/helper';

	let walletName: string;

	/** function for opening the file and getting data private key or json data
		| to be implemented*/
	let openFile = () => {
		let jsonWallet = {
			address: '',
			id: '',
			version: '',
			Crypto: {
				cipher: '',
				cipherparams: {
					iv: '',
				},
				ciphertext: '',
				kdf: '',
				kdfparams: {
					salt: '',
					n: '',
					dklen: '',
					p: '',
					r: '',
				},
				mac: '',
			},
		};

		let privateKey = 'e308a23beba3be185e707effd05dde3445a3f9ad30a350b703631bb9a79eaf2b';

		postData();
	};

	/** Sends wallet creation data to api route to create a wallet */
	const postData = async (object = { walletName }) => {
		let profiles: JSONString[] | null[] = [];

		const response = fetch('/api/create-wallet/file', {
			method: 'POST',
			body: JSON.stringify(object),
		})
			.then((response) => response.json())
			.then((response) => {
				profiles.push(response);
				profiles = profiles.concat(JSON.parse(localStorage.getItem('profiles') || '[]'));
				localStorage.setItem('profiles', JSON.stringify(profiles));
			})
			.then(() => goto('/profile'))
			.catch((error) => {
				console.error('error:', error);
			});
	};
</script>

<div class="fileImport-wrapper">
	<div class="fileImport-content">
		<GosutoLogoAndText class="gosuto-logo" />
		<h1 class="fileImport-header">Import From File</h1>
		<div class="fileImport-input-wrapper">
			<TextInput label={'Wallet Name'} bind:value={walletName} />
		</div>
		<ImportPrivateKey />
	</div>
	<div class="fileImport-buttons">
		<div class="fileImport-bt next-bt">
			<Button on:click={openFile}>
				<span slot="text" class="fileImport-bt-text">Import</span>
			</Button>
		</div>
		<button class="fileImport-bt fileImport-cancel-bt" on:click={() => goto('/add-wallet')}>
			<span class="fileImport-bt-text fileImport-cancel-bt-text">Back</span>
		</button>
	</div>
</div>

<style type="postcss" global>
	.fileImport-wrapper {
		@apply absolute inset-0 overflow-auto;
		@apply grid justify-items-center items-end;
		@apply dark:bg-dark-gosutoDark;
	}

	.fileImport-wrapper .gosuto-logo {
		@apply w-36 h-12 md:w-64 md:h-20 3xl:w-80 3xl:h-28 4xl:w-2/3 4xl:h-1/2;
		@apply mb-8 4xl:mb-16;
	}

	.fileImport-content {
		@apply flex flex-col place-items-center;
		@apply place-self-start justify-self-center;
		@apply mt-10 md:mt-20;
		@apply w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4;
	}

	.fileImport-header {
		@apply text-xl md:text-3xl 3xl:text-4xl 4xl:text-7xl font-display font-bold;
		@apply mb-4 4xl:mb-16;
		@apply text-dark-gray dark:text-white;
	}

	.fileImport-input-wrapper {
		@apply mt-5 4xl:mt-10 mb-10 4xl:mb-20;
		@apply w-5/6;
	}

	.fileImport-buttons {
		@apply flex flex-col items-center justify-items-end;
		@apply w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4;
		@apply mb-10 md:mb-20;
	}

	.fileImport-bt {
		@apply w-11/12 max-w-2xl h-12 4xl:h-28;
		@apply mt-10 4xl:mt-20;
		@apply rounded-3xl;
	}

	.fileImport-bt:disabled {
		@apply opacity-50;
	}

	.fileImport-cancel-bt {
		@apply mb-5;
	}

	.fileImport-bt-text {
		@apply text-base md:text-lg 3xl:text-2xl 4xl:text-5xl font-display font-bold;
	}

	.fileImport-cancel-bt-text {
		@apply text-dark-gray dark:text-white;
	}
</style>
