<script lang="ts">
	import BackIcon from '$icons/BackIcon.svelte';
	import CopyIcon from '$icons/CopyIcon.svelte';
	import CopyOrange from '$icons/CopyOrange.svelte';

	import PasswordToCopyPopup from '$lib/PopUps/WalletSettings/PasswordToCopyPopup.svelte';
	import PasswordToExportPopup from '$lib/PopUps/WalletSettings/PasswordToExportPopup.svelte';
	import WalletCopiedPopup from '$lib/PopUps/WalletSettings/WalletCopiedPopup.svelte';

	import TextInput from '$lib/Common/TextInput.svelte';
	import Button from '$lib/Common/Button.svelte';

	import { onMount } from 'svelte';

	let settingsData: ProfileSettings = {
		walletName: 'default wallet name',
		walletAddress: '0x9f98e01d2gj92ngn2g7gn24ed7',
		publicKey: '0x9f98e01d2gj92ngn2g7gn24ed7',
		privateKey: '0x9f98e01d2gj92ngn2g7gn24ed7',
		currentPassword: 'password',
	};

	let newPassword: string;
	let reEnterPassword: string;

	let showCopyWalletPasswordPopup: boolean = false;
	let showExportWalletFilePopup: boolean = false;
	let showWalletCopiedPopup: boolean = false;
	let passwordIsCorrect: boolean = true;

	onMount(() => {
		getData();
	});

	const getData = async () => {
		fetch('/api/settings/profileSettings')
			.then((response) => response.json())
			.then((response) => {
				if (response.walletName) settingsData.walletName = response.walletName;
				if (response.walletAddress) settingsData.walletAddress = response.walletAddress;
				if (response.publicKey) settingsData.publicKey = response.publicKey;
				if (response.privateKey) settingsData.privateKey = response.privateKey;
				if (response.currentPassword) settingsData.currentPassword = response.currentPassword;
			});
	};

	const postData = async () => {
		fetch('/api/settings/profileSettings', {
			method: 'POST',
			body: JSON.stringify(settingsData),
		}).catch((error) => {
			console.error('error:', error);
		});
	};

	let copyToClipboard = (copyText: string) => {
		navigator.clipboard.writeText(copyText);
	};

	let changePassword = () => {
		if (newPassword && newPassword === reEnterPassword) {
			settingsData.currentPassword = newPassword;
		}
	};
</script>

<div class="main">
	<!-- Popups -->
	{#if showCopyWalletPasswordPopup}
		<PasswordToCopyPopup
			on:confirm={() => {
				showCopyWalletPasswordPopup = false;
				if (passwordIsCorrect) {
					copyToClipboard(settingsData.privateKey);
					showWalletCopiedPopup = true;
				}
			}}
			on:cancel={() => {
				showCopyWalletPasswordPopup = false;
			}}
		/>
	{/if}
	{#if showExportWalletFilePopup}
		<PasswordToExportPopup
			on:confirm={() => {
				showExportWalletFilePopup = false;
			}}
			on:cancel={() => {
				showExportWalletFilePopup = false;
			}}
		/>
	{/if}
	{#if showWalletCopiedPopup}
		<WalletCopiedPopup
			on:confirm={() => {
				showWalletCopiedPopup = false;
			}}
			on:cancel={() => {
				showWalletCopiedPopup = false;
			}}
		/>
	{/if}

	<div class="settings-holder">
		<div class="header">
			<div class="left-holder">
				<div class="back-btn">
					<div class="img">
						<BackIcon />
					</div>
					<h1>Wallet Settings</h1>
				</div>
				<div class="address">
					<p>
						{`${settingsData.walletAddress.slice(0, 11)}...${settingsData.walletAddress.slice(-4)}`}
					</p>
					<div class="img">
						<CopyIcon />
					</div>
				</div>
			</div>
			<div class="address">
				<p>
					{`${settingsData.walletAddress.slice(0, 11)}...${settingsData.walletAddress.slice(-4)}`}
				</p>
				<div
					class="img"
					on:click={() => {
						copyToClipboard(settingsData.walletAddress);
					}}
				>
					<CopyIcon />
				</div>
			</div>
			<div class="confirm-button settings-btn">
				<Button
					glow={true}
					on:click={() => {
						showExportWalletFilePopup = true;
					}}
				>
					<p slot="text" class="settings-btn-text">Export Wallet File</p>
				</Button>
			</div>
		</div>
		<TextInput bind:value={settingsData.walletName} label="Wallet Name" type="text" />
		<br />
		<TextInput bind:value={settingsData.publicKey} label="Public Key" type="text" />
		<br />
		<div class="private-container">
			<div
				class="img"
				on:click={() => {
					showCopyWalletPasswordPopup = true;
				}}
			>
				<CopyOrange />
			</div>
			<TextInput bind:value={settingsData.privateKey} label="Private Key" type="password" />
		</div>
		<br />
		<h2>Change Password</h2>
		<br />
		<TextInput bind:value={settingsData.currentPassword} label="Current Password" type="password" />
		<br />
		<TextInput bind:value={newPassword} label="New Password" type="password" />
		<br />
		<TextInput bind:value={reEnterPassword} label="Re-Enter New Password" type="password" />
		<br />
		<div class="button-holder">
			<div class="settings-btn">
				<Button glow={true} on:click={changePassword}>
					<p slot="text" class="settings-btn-text">Change Password</p>
				</Button>
			</div>
		</div>
		<div class="ok-cancel">
			<div class="save-bt" on:click={postData}>
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

<style lang="postcss" global>
	:local(.main) {
		@apply w-screen md:w-full min-h-screen flex md:flex-col md:items-center px-4 md:px-0 mt-8 md:mt-0;
	}

	:local(.settings-holder) {
		@apply w-full md:w-[65%];
	}

	:local(.header) {
		@apply flex justify-center items-center h-12 md:my-[8vh] gap-8;
	}

	:local(.cancel-button) {
		@apply text-light-orange bg-transparent;
		@apply border border-light-orange;
	}

	:local(.settings-btn) {
		@apply text-xs md:text-base h-9 md:h-12 min-w-fit;
	}

	:local(.back-btn) {
		@apply flex items-center h-3/4;
	}

	:local(.back-btn) > .img {
		@apply cursor-pointer hidden md:block;
	}

	:local(h1) {
		@apply text-base md:text-xl font-bold md:ml-2;
		@apply dark:text-white;
	}

	:local(.address) {
		@apply flex;
	}

	:local(.address) > p {
		@apply font-normal md:font-medium text-base md:text-xl text-light-gardenText mr-2;
		@apply dark:text-white;
	}

	:local(.address) > .img {
		@apply cursor-pointer;
	}

	:local(h2) {
		@apply font-bold text-base text-light-grey dark:text-white;
	}

	:local(.button-holder) {
		@apply h-12;
	}

	:local(.ok-cancel) {
		@apply flex m-auto md:w-[68%] h-[50px] justify-center md:justify-between;
		@apply my-4 md:my-[4vh] mb-4;
	}

	:local(.left-holder) {
		@apply flex flex-col md:flex-row;
	}

	:local(.private-container) {
		@apply relative;
	}

	:local(.private-container) > .img {
		@apply absolute z-40 transform translate-y-4 right-4 cursor-pointer;
	}

	:local(.left-holder) > .address {
		@apply md:hidden;
	}

	:local(.header) > .address {
		@apply hidden md:flex;
	}

	:local(.save-bt) {
		@apply w-full mr-4 md:mr-0 md:w-2/5 min-w-fit;
	}

	:local(.cancel-bt) {
		@apply w-full md:w-2/5 min-w-fit;
	}

	:local(.btn-text) {
		@apply py-3;
	}

	:local(.settings-btn-text) {
		@apply px-4;
	}

	:local(.button-holder) {
		@apply max-w-[45%] md:max-w-[25%];
	}
</style>
