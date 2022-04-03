<!-- @component 
	Describtion:
	> Component that shows profile picture from given URL.
	
	Props:
	- `url` = URL of the image, that is to be displayed. Size of the image doesn't matter as it will be automatically scale to fit, althought for shorter load times use smaller resolution picture for smaller display size.
-->
<script>
	export let url = '/images/png/avatar.png';
</script>

<div class="profile-pic" style="--url: url({url})" />

<style lang="postcss" global>
	:local(.profile-pic) {
		background-image: var(--url);
		@apply w-full h-full bg-cover bg-center bg-no-repeat dark:text-white;
		@apply bg-light-orangeShadeOne overflow-hidden;
	}
</style>
