<script>
	export let url = 'https://i.pinimg.com/originals/bf/57/02/bf57026ee75af2f414000cec322f7404.gif';
</script>

<div class="profile-pic" style="--url: url({url})" />

<style lang="postcss" global>
	:local(.profile-pic) {
		background-image: var(--url);
		@apply w-full h-full bg-cover dark:text-white border;
	}
</style>
