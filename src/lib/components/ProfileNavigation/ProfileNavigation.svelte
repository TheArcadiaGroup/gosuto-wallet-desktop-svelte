<script>
	import Button from '$lib/Common/Button.svelte';
</script>

<div class="container bg-white">
	<div class="flex flex-col items-center gap-6">
		<div class="profile-pic" />
		<div class="font-bold">Jake Waterson</div>
	</div>
	<div class="mx-8">
		<Button>
			<div slot="text" class="button">+ Add wallet</div>
		</Button>
	</div>
</div>

<style lang="postcss" global>
	:local(.container) {
		@apply w-full h-full flex flex-col items-stretch gap-7 pt-20;
	}

	:local(.profile-pic) {
		background-image: url('https://i.pinimg.com/originals/bf/57/02/bf57026ee75af2f414000cec322f7404.gif');
		@apply w-20 h-20 bg-cover rounded-xl dark:text-white shadow-inner;
	}

	:local(.button) {
		@apply my-2 text-xs;
	}
</style>
