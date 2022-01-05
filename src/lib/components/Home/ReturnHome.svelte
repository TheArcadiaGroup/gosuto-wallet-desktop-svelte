<script>
    import CopyIcon from "$icons/CopyIcon.svelte";
    import BackIcon from '$icons/BackIcon.svelte';
</script>
<div class="relative flex flex-col gap-x-8 px-2 sm:flex-row sm:items-center">
  <div class="hidden absolute right-full pr-2 cursor-pointer sm:block">
    <BackIcon />
  </div>
  <p class="font-bold sm:text-2xl dark:text-white">
    Wallet 1
    <span class="hidden sm:inline">Swap</span>
  </p>
  <div class="flex gap-[0.75rem] items-center">
    <p class="text-light-gardenText text-sm sm:text-base dark:text-white">0x9f98e01d3...4ed7</p>
    <div class='cursor-pointer'>
      <CopyIcon />
    </div>
  </div>
</div>