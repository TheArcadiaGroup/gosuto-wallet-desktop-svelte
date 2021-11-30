<script>
	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';
	import LargeSquareButton from '$lib/NewToGosuto/LargeSquareButton.svelte';
	import RoundedButton from '$lib/RoundedButton.svelte';
</script>

<div>
	<div class="inline-flex mt-5">
		<GosutoLogoAndText />
	</div>
</div>
<div class="mt-7">
	<div class="font-bold text-gray-600 text-4xl dark:text-white" style="color:#4F4F4F;">
		New to Gosuto?
	</div>
	<div class="text-gray-600 text-3xl dark:text-white mt-4" color="#6C727F">
		Hello there, connect or create a wallet to continue!
	</div>
</div>
<div class="flex items-center gap-x-24 justify-center mt-16">
	<LargeSquareButton
		buttonCaption1="No,"
		buttonCaption2="I have a seed phrase"
		color="#8B5CF6"
		textColor="white"
	/>
	<LargeSquareButton buttonCaption1="Yes," buttonCaption2="let's get setup" textColor="#9CA3AF" />
</div>
<div class="mt-5">
	<RoundedButton backgroundColor="#F87171"
		><div class="px-32 py-2 text-xl">Restore</div></RoundedButton
	>
</div>
