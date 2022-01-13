<script lang="ts">
	export let background: 'purple' | 'white' = 'purple';

	export let mainText: string;
	export let subText: string;
	$: selected = false;

	function changeColor() {
		selected = !selected;
		if (selected) {
			background = 'purple';
		} else {
			background = 'white';
		}
	}
</script>

<div
	class="container {background == 'purple'
		? 'contentIfPurple'
		: 'contentIFWhite dark:bg-dark-blue text-white'}"
	on:click={() => changeColor()}
>
	<div class="textContainer">
		<div><input type="radio" checked={selected} /></div>
		<div class="mainText">
			<div>
				{mainText}
			</div>
			<div class="subText">
				{subText}
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		@apply rounded-3xl m-1 w-max hover:cursor-pointer;
	}
	.contentIfPurple {
		@apply bg-light-purple text-white;
	}
	.contentIFWhite {
		@apply text-black;
	}
	.textContainer {
		@apply inline-flex pl-8 pr-24 py-5;
	}
	.mainText {
		@apply text-2xl ml-8 -mt-2;
	}
	.subText {
		@apply text-lg mt-3;
	}
</style>
