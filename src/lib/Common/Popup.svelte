<script lang="ts">
	export let title: String;
</script>

<div class="popup bg-purple-500 dark:bg-dark-blue">
	<div class="pcontainer">
		<div class="popuptitle">{title}</div>
		<button class="confirmbutton bg-light-orange">Confirm</button>
	</div>
</div>

<style>
	.popup {
		@apply rounded-3xl text-center w-72;
	}
	.pcontainer {
		@apply py-6;
	}
	.popuptitle {
		@apply text-lg font-bold;
	}
	.confirmbutton {
		@apply rounded-full text-xs font-bold text-white py-3 px-8 mt-6;
	}
</style>
