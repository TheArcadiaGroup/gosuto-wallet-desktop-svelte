<script>
	export let backgroundColor = 'black';
	export let disabledBackgroundColor = '#ccc';
	//export let color = "white";
	export let disabled = false;
</script>

<button
	class="rounded-full text-base text-white font-semibold py-1 px-3"
	style="background-color: {disabled ? disabledBackgroundColor : backgroundColor};"
	on:click
>
	<slot />
</button>

<style>
	button:focus {
		outline: 0;
	}
</style>
