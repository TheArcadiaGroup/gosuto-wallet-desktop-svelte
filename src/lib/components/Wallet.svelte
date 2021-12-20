<script>
	export let variant = 1;

	let variations = [
		['text-light-purple', '/images/svg/wallet-one.svg'],
		['text-dark-orange', '/images/svg/wallet-two.svg'],
		['text-dark-green', '/images/svg/wallet-three.svg'],
	];
</script>

<div class="wallet" style="background-image: url({variations[variant - 1][1]});">
	<div class="profile">
		<div class="avatar">
			<img src="/images/png/avatar.png" alt="avatar" />
		</div>
		<div class="title {variations[variant - 1][0]}">Wallet 1</div>
	</div>

	<div class="available">
		Available
		<div class="amount">$5,000 USD</div>
	</div>

	<div class="staked">
		Staked
		<div class="amount">$2,500 USD</div>
		<div class="msg">
			Unclaimed Reward <span>$250 USD</span>
		</div>
	</div>
</div>

<style lang="postcss">
	div.wallet {
		@apply px-8 py-6;
		@apply bg-white;
		@apply rounded-[25px];
		@apply bg-no-repeat bg-contain;
		background-position: calc(100% - -5px) -25px;
		box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
	}

	div.wallet div.profile {
		@apply flex items-center;
	}

	div.wallet div.title {
		@apply px-4;
		@apply font-display font-bold;
		@apply text-xl;
	}

	div.wallet div.avatar {
		@apply h-12;
	}

	div.wallet div.avatar img {
		@apply bg-light-orange bg-center;

		@apply rounded-2xl;
		@apply h-full;
	}

	div.wallet div.available,
	div.wallet div.staked {
		@apply py-4;
		@apply font-display uppercase tracking-wider;
		@apply text-light-grey;
	}

	div.wallet div.available {
		width: calc(100% - 12em);
		@apply border-b-[0.5px];
	}

	div.wallet div.available div.amount,
	div.wallet div.staked div.amount {
		@apply py-0.5;
		@apply font-display font-bold;
		@apply text-xl text-dark-grey;
	}

	div.wallet div.staked div.msg {
		@apply normal-case;
	}

	div.wallet div.staked div.msg span {
		@apply font-display font-bold;
		@apply text-dark-grey;
	}
</style>
