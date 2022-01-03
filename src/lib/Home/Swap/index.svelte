<script lang="ts">
    import ReturnHome from "$components/Home/ReturnHome.svelte";
    import PlusIcon from "$icons/PlusIcon.svelte";
	import TokenCard from '$lib/Home/Swap/TokenCard.svelte';

    let selectedTokenIndex = 0

    function selectToken(e: { detail: { id:number } }): void {
      selectedTokenIndex = e.detail.id
    }

</script>
<div class="mx-6 mt-10 sm:mx-11 sm:mt-20">
  <ReturnHome />
  <div class="my-6 sm:my-12">
    <div class="flex flex-row items-center">
      <p class="font-bold text-base sm:text-xl">Tokens in this wallet</p>
      <button class="ml-auto">
        <PlusIcon />
        <span>Add Token</span>
      </button>
    </div>
    <div class="grid grid-rows-2 grid-cols-2 gap-x-3.5 gap-y-5 pt-8 sm:gap-8">
      <TokenCard on:select={selectToken} selected={selectedTokenIndex === 0} cardId={0} />
      <TokenCard on:select={selectToken} selected={selectedTokenIndex === 1} cardId={1} positive={false} />
      <TokenCard on:select={selectToken} selected={selectedTokenIndex === 2} cardId={2} />
      <TokenCard on:select={selectToken} selected={selectedTokenIndex === 3} cardId={3} />
    </div>
  </div>
</div>

<style lang="postcss">

  button {
    @apply flex gap-1 items-center py-1 px-3.5 rounded-[2.25rem] text-xs leading-7 text-white bg-light-orange
            sm:gap-2.5 sm:py-2 sm:px-5 sm:text-base;
    filter: drop-shadow(0px 4px 14px rgba(255, 130, 102, 0.3));
  }
</style>