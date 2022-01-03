<script>
    import CopyIcon from "$icons/CopyIcon.svelte";
    import BackIcon from '$icons/BackIcon.svelte';
</script>
<div class="relative flex flex-row gap-8 items-center">
  <div class="absolute right-full pr-2 cursor-pointer">
    <BackIcon />
  </div>
  <p class="font-bold text-2xl"><slot></slot></p>
  <div class="flex gap-[0.75rem] items-center">
    <p>0x9f98e01d3...4ed7</p>
    <div class='cursor-pointer'>
      <CopyIcon />
    </div>
  </div>
</div>