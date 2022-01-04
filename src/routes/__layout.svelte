<script lang="ts">
	import '$styles/tailwind.css';
	import Navbar from '$components/navbar/Navbar.svelte';
</script>

<main>
	<Navbar />
	<slot />
</main>
