<script lang="ts">
	import { onMount } from 'svelte';

	import ProfileNavigation from '$lib/pages/Profile/ProfileNavigation.svelte';
	import ValidatorPage from '$lib/pages/AllStakes/ValidatorPage/index.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';

	let validatorData: IValidator[];

	onMount(() => {
		getData();
	});

	const getData = async () => {
		fetch('/api/all-stakes/validators')
			.then((response) => response.json())
			.then((response) => (validatorData = response))
			.catch((error) => {
				console.error('error:', error);
			});
	};
</script>

<div class="main">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<div class="size-full">
			<ProfileNavigation />
		</div>
	</div>
	<div class="global-grid-mid size-full">
		<div class="validator-holder">
			<ValidatorPage {validatorData} />
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply flex;
	}

	:local(.size-full) {
		@apply w-full h-full;
	}

	:local(.validator-holder) {
		@apply flex flex-col items-center w-full h-full;
	}
</style>
