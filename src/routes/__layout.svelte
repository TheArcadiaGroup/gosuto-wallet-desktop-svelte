<script lang="ts">
	import Navbar from '$components/navbar/Navbar.svelte';

	import '$styles/tailwind.css';
</script>

<main>
	<Navbar />
	<slot />
</main>
