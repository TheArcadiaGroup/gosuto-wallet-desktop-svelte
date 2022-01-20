<script>
	import Button from '$lib/Common/Button.svelte';
	import ProfilePicture from '$lib/Common/ProfilePicture.svelte';
	import CreditCard from './CreditCard.svelte';
</script>

<div class="container ">
	<div class="flex flex-col items-center gap-6">
		<div class="w-16 h-16 rounded-xl overflow-hidden">
			<ProfilePicture url="https://miro.medium.com/fit/c/262/262/2*-cdwKPXyVI0ejgxpWkKBeA.jpeg" />
		</div>
		<div class="font-semibold dark:text-white">Jake Waterson</div>
	</div>
	<div class="mx-6">
		<Button>
			<div slot="text" class="button">+ Add wallet</div>
		</Button>
	</div>
	<CreditCard />
</div>

<style lang="postcss" global>
	:local(.container) {
		@apply w-full h-full flex flex-col items-stretch gap-7 pt-20 px-4;
	}

	:local(.button) {
		@apply my-2 text-xs;
	}
</style>
