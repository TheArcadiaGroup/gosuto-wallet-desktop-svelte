<script lang="ts">
	import NavNotificationIcon from '$icons/NavNotificationIcon.svelte';
	import NavSettingsIcon from '$icons/NavSettingsIcon.svelte';
	import NavBookmarkIcon from '$icons/NavBookmarkIcon.svelte';
	import NavSwitchIcon from '$icons/NavSwitchIcon.svelte';
	import NavWalletIcon from '$icons/NavWalletIcon.svelte';
	import NavHomeIcon from '$icons/NavHomeIcon.svelte';
	import GosutoNavLogo from '$icons/NavLogo.svelte';
</script>

<div class="nav">
	<ul class="bar">
		<li><GosutoNavLogo /></li>
		<li class="avatar"><div class="avatar-img" /></li>
		<li class="active"><NavHomeIcon /></li>
		<li><NavNotificationIcon /></li>
		<li><NavWalletIcon /></li>
		<li><NavBookmarkIcon /></li>
		<li><NavSwitchIcon /></li>
		<li><NavSettingsIcon /></li>
	</ul>

	<select class="language">
		<option value="en">EN</option>
		<option value="de">DE</option>
	</select>

	<select class="currency">
		<option value="usd">USD</option>
		<option value="eur">EUR</option>
	</select>
</div>

<style lang="postcss">
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	.nav {
		@apply flex flex-col justify-between items-center;
		@apply bg-white;
		@apply h-screen;

		max-width: 5.5em;

		box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
	}

	ul.bar {
		@apply flex flex-col justify-evenly items-center;

		height: calc(100vh - 6em);
	}

	ul.bar li {
		@apply px-[1.15rem] py-4;

		fill: #4f4f4f;
	}

	ul.bar li.avatar {
		@apply p-0.5;
	}

	ul.bar li.active {
		@apply bg-light-purple;

		fill: #ffffff !important;

		box-shadow: 0px 4px 12px rgba(114, 93, 255, 0.5);
		border-radius: 15px;
	}

	ul.bar li div.avatar-img {
		@apply w-12 h-12;

		background-image: url('/static/images/png/avatar.png');
		@apply bg-cover bg-center;
	}

	div.nav select {
		@apply font-display font-bold;

		appearance: none;
		cursor: pointer;
	}

	div.nav select.currency {
		@apply mb-6;
	}
</style>
