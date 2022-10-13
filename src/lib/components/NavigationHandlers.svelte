<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { navigateToUrl } from '$utils/profiles';

	beforeNavigate(({ to, cancel }) => {
		navigateToUrl(to?.url.pathname ?? $page.url.pathname, cancel);
	});
</script>
