<script>
    import CopyIcon from "$icons/CopyIcon.svelte";
    import BackIcon from '$icons/BackIcon.svelte';
</script>
<div class="relative flex flex-col gap-x-8 sm:flex-row sm:items-center">
  <div class="hidden absolute right-full pr-2 cursor-pointer sm:block">
    <BackIcon />
  </div>
  <p class="font-bold sm:text-2xl">
    Wallet 1
    <span class="hidden sm:inline">Swap</span>
  </p>
  <div class="flex gap-[0.75rem] items-center">
    <p class="text-sm sm:text-base">0x9f98e01d3...4ed7</p>
    <div class='cursor-pointer'>
      <CopyIcon />
    </div>
  </div>
</div>