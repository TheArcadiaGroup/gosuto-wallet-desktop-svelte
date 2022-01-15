<script lang="ts">
    import CopyIcon from "$icons/CopyIcon.svelte";
    import BackIcon from '$icons/BackIcon.svelte';
</script>

<div class="return-home">
  <div class="back-button">
    <a href="/">
      <BackIcon />
    </a>
  </div>
  <p class="wallet-title">
    Wallet 1
    <span class="hidden md:inline">Swap</span>
  </p>
  <div class="wallet-pub-key">
    <p class="pub-key-text">0x9f98e01d3...4ed7</p>
    <div class='cursor-pointer'>
      <CopyIcon />
    </div>
  </div>
</div>

<style lang="postcss">

  .return-home {
    @apply relative flex flex-col gap-x-8 px-2 md:flex-row md:items-center;
  }

  .back-button {
    @apply hidden absolute right-full cursor-pointer md:block;
  }

  .wallet-title {
    @apply font-bold md:text-2xl;
    @apply dark:text-white;
  }

  .wallet-pub-key {
    @apply flex gap-[0.75rem] items-center;
  }

  .pub-key-text {
    @apply text-sm md:text-base;
    @apply text-light-gardenText dark:text-white;
  }

</style>