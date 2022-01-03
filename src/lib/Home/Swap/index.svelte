<script>
    import ReturnHome from "$components/Home/ReturnHome.svelte";
    import PlusIcon from "$icons/PlusIcon.svelte";
	import TokenCard from '$lib/Home/Swap/TokenCard.svelte';
</script>
<div class="mt-20 mx-11">
  <ReturnHome>Wallet 1 Swap</ReturnHome>
  <div class="my-12">
    <div class="flex flex-row">
      <p class="font-bold text-xl">Tokens in this wallet</p>
      <button class="ml-auto">
        <PlusIcon />
        <span>Add Token</span>
      </button>
    </div>
    <div class="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2">
      <TokenCard />
      <TokenCard positive={false} />
      <TokenCard />
      <TokenCard />
    </div>
  </div>
</div>

<style lang="postcss">

  button {
    @apply flex gap-2.5 items-center py-2 px-5 rounded-[2.25rem] text-white bg-light-orange;
    filter: drop-shadow(0px 4px 14px rgba(255, 130, 102, 0.3));
  }
</style>