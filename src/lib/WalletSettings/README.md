Add This To index route to test the page

```js
<script lang="ts">
	import WalletSettings from '$lib/WalletSettings/index.svelte';
	import GridLayout from '$lib/Common/GridLayout.svelte';
</script>

<GridLayout>
	<WalletSettings slot="mid" />
</GridLayout>
```
