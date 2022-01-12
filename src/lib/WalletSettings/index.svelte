<script lang="ts">
	import CopyIcon from '$icons/CopyIcon.svelte';
	import CopyOrange from '$icons/CopyOrange.svelte';
	import RightArrow from '$icons/RightArrow.svelte';
	import TextInput from '$lib/Common/TextInput.svelte';
	import PasswordToCopyPopup from '$lib/PopUps/WalletSettings/PasswordToCopyPopup.svelte';
	import PasswordToExportPopup from '$lib/PopUps/WalletSettings/PasswordToExportPopup.svelte';
	import WalletCopiedPopup from '$lib/PopUps/WalletSettings/WalletCopiedPopup.svelte';

	let walletName: string;
	let publicKey: string;
	let privateKey: string;
	let currentPassword: string;
	let newPassword: string;
	let reEnterPassword: string;

	let showCopyWalletPasswordPopup: boolean = false;
	let showExportWalletFilePopup: boolean = false;
	let showWalletCopiedPopup: boolean = false;

	let walletAddress: string = '0x9f98e01d2gj92ngn2g7gn24ed7';

	let passwordIsCorrect: boolean = true;
</script>

<div class="main">
	<!-- Popups -->
	{#if showCopyWalletPasswordPopup}
		<PasswordToCopyPopup
			on:confirm={() => {
				showCopyWalletPasswordPopup = false;
				if (passwordIsCorrect) {
					// Add code to copy private key Here
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
						<RightArrow />
					</div>
					<h1>Wallet Settings</h1>
				</div>
				<div class="address">
					<p>
						{`${walletAddress.slice(0, 11)}...${walletAddress.slice(-4)}`}
					</p>
					<div
						class="img"
						on:click={() => {
							// Add Code to copy Wallet address here
						}}
					>
						<CopyIcon />
					</div>
				</div>
			</div>
			<div class="address">
				<p>
					{`${walletAddress.slice(0, 11)}...${walletAddress.slice(-4)}`}
				</p>
				<div class="img">
					<CopyIcon />
				</div>
			</div>
			<button
				class="confirm-button settings-btn"
				on:click={() => {
					showExportWalletFilePopup = true;
				}}
			>
				Export Wallet File
			</button>
		</div>
		<TextInput bind:value={walletName} label="Wallet Name" type="text" />
		<br />
		<TextInput bind:value={publicKey} label="Public Key" type="text" />
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
			<TextInput bind:value={privateKey} label="Private Key" type="password" />
		</div>
		<br />
		<h2>Change Password</h2>
		<br />
		<TextInput bind:value={currentPassword} label="Current Password" type="password" />
		<br />
		<TextInput bind:value={newPassword} label="New Password" type="password" />
		<br />
		<TextInput bind:value={reEnterPassword} label="Re-Enter New Password" type="password" />
		<br />
		<div class="button-holder">
			<button class="confirm-button settings-btn">Change Password</button>
		</div>
		<div class="ok-cancel">
			<button class="confirm-button">Save</button>

			<button class="cancel-button bg-light-orange">Cancel</button>
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
		@apply flex items-center justify-between h-12 md:my-[8vh];
	}

	:local(.confirm-button) {
		@apply text-white bg-light-orange border border-light-orange;
	}

	:local(.cancel-button) {
		@apply text-light-orange bg-transparent;
		@apply border border-light-orange;
	}

	:local(.settings-btn) {
		@apply rounded-full text-xs md:text-base h-9 md:h-12 px-4 md:px-5;
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
		@apply flex m-auto w-[68%] h-[50px] justify-between;
	}

	:local(.ok-cancel) > button {
		@apply w-[42%] h-full rounded-[2vh] my-4 md:my-[8vh] mb-4;
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
</style>
