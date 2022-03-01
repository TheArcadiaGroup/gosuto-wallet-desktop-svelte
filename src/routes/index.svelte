<script lang="ts">
	import SplashScreen from '$lib/SplashScreen/index.svelte';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { retrieveData } from '$utils/dataStorage';

	onMount(async () => {
		const selectedProfile: IWallet = retrieveData('selectedProfile');

		if (selectedProfile) {
			setTimeout(() => goto(`/profile/${selectedProfile.walletAddress}`), 1000);
		} else {
			const profiles: IWallet[] = retrieveData('profiles');
			if (profiles?.length > 0) {
				setTimeout(() => goto(`/profile`), 1000);
			} else {
				setTimeout(() => goto('/onboarding'), 1000);
			}
		}
	});
</script>

<SplashScreen />
