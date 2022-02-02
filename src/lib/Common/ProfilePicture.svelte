<!-- @component 
	Describtion:
	> Component that shows Profile picture from given URL.
	
	Props:
	- `url` = URL of the image, that is to be displayed. Size of the image doesn't matter as it will be automatically scale to fit, althought for shorter load times use smaller resolution picture for smaller display size.
-->
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
