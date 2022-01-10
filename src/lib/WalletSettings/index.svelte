<script lang="ts">
	import TextInput from '$lib/Common/TextInput.svelte';

	let walletName: string;
	let publicKey: string;
	let privateKey: string;
	let currentPassword: string;
	let newPassword: string;
	let reEnterPassword: string;

	let walletAddress: string = '0x9f98e01d2gj92ngn2g7gn24ed7';
</script>

<div class="main">
	<div class="settings-holder">
		<div class="header">
			<div class="left-holder">
				<div class="back-btn">
					<img src="/images/svg/rightArrow.svg" alt="back" />
					<h1>Wallet Settings</h1>
				</div>
				<div class="address">
					<p>
						{`${walletAddress.slice(0, 11)}...${walletAddress.slice(-4)}`}
					</p>
					<img src="/images/svg/copy.svg" alt="copy" />
				</div>
			</div>
			<button class="confirm-button settings-btn">Export Wallet File</button>
		</div>
		<TextInput bind:value={walletName} label="Wallet Name" type="text" />
		<br />
		<TextInput bind:value={publicKey} label="Public Key" type="text" />
		<br />
		<TextInput bind:value={privateKey} label="Private Key" type="password" />
		<br />
		<h2>Change Password</h2>
		<br />
		<TextInput bind:value={currentPassword} label="Current Password" type="text" />
		<br />
		<TextInput bind:value={newPassword} label="New Password" type="text" />
		<br />
		<TextInput bind:value={reEnterPassword} label="Re-Enter New Password" type="password" />
		<br />
		<div class="button-holder">
			<button class="confirm-button settings-btn">Change Password</button>
		</div>
		<div class="ok-cancel">
			<button class="confirm-button" on:click={() => {}}>Save</button>

			<button class="cancel-button bg-light-orange" on:click={() => {}}>Cancel</button>
		</div>
	</div>
</div>

<style lang="postcss">
	.main {
		@apply w-full flex flex-col items-center px-4 md:px-0 mt-8 md:mt-0;
	}

	.settings-holder {
		@apply w-full;
	}

	.main > div {
		@apply md:w-[65%];
	}

	.header {
		@apply flex items-center justify-between h-12 md:my-[8vh];
	}

	.confirm-button {
		@apply text-white bg-light-orange border border-light-orange font-display;
	}

	.cancel-button {
		@apply text-light-orange bg-white font-display;
		@apply border border-light-orange;
	}

	.settings-btn {
		@apply rounded-full text-xs md:text-base h-9 md:h-12 px-4 md:px-5;
	}

	.back-btn {
		@apply flex items-center h-3/4;
	}

	.back-btn > img {
		@apply cursor-pointer hidden md:block;
	}

	h1 {
		@apply text-base md:text-xl font-bold md:ml-2;
	}

	.address {
		@apply flex;
	}

	.address > p {
		@apply font-normal md:font-medium text-base md:text-xl text-light-gardenText mr-2;
	}

	.address > img {
		@apply cursor-pointer;
	}

	h2 {
		@apply font-display font-bold text-base text-light-grey;
	}

	.button-holder {
		@apply h-12;
	}

	.ok-cancel {
		@apply flex m-auto w-[68%] h-[50px] justify-between;
	}

	.ok-cancel > button {
		@apply w-[42%] h-full rounded-[2vh] my-8 md:my-[8vh] mb-4;
	}

	.left-holder {
		@apply flex flex-col md:flex-row;
	}
</style>
