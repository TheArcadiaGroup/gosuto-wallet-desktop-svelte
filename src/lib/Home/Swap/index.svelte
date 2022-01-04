<script lang="ts">
    import ReturnHome from "$components/Home/ReturnHome.svelte";
    import PlusIcon from "$icons/PlusIcon.svelte";
	import TokenCard from '$lib/Home/Swap/TokenCard.svelte';

    export let tokens = [{
      a: 1,
      positive: false
    },{ a: 2}, { a: 3}, {
      a: 4,
      positive: false
    }, {a: 5}]

    let scroll = 0
    let scrollWidth = 0
    let currentPage = 0

    let selectedTokenIndex = 0

    function selectToken(e: { detail: { id:number } }): void {
      selectedTokenIndex = e.detail.id
    }

    function onScroll (event) {
      if (!event.target || !event.target.scrollLeft || !event.target.clientWidth) return
      scroll = event.target.scrollLeft
      scrollWidth = event.target.clientWidth

      const totalPages = Math.ceil(tokens.length / 4)
      currentPage = scroll >= scrollWidth ? totalPages - 1 : Math.ceil(scroll / (scrollWidth / totalPages)) - 1
    }

</script>
<div class="mx-4 mt-10 sm:mx-11 sm:mt-20">
  <ReturnHome />
  <div class="my-6 sm:my-12">
    <div class="px-2 flex flex-row items-center">
      <p class="font-bold text-base sm:text-xl">Tokens in this wallet</p>
      <button class="ml-auto">
        <PlusIcon />
        <span>Add Token</span>
      </button>
    </div>
    <div on:scroll={onScroll}
      class="flex flex-row overflow-x-scroll scrollbar-hide gap-x-3.5 gap-y-5 px-2 py-8 snap-x
      sm:gap-8 md:flex-col">

      {#each Array(Math.ceil(tokens.length / 4)) as _, i}
        <div class="w-full shrink-0 snap-center grid grid-cols-2 grid-rows-2 gap-x-3.5 gap-y-5 sm:gap-8">
          {#each tokens.slice(i * 4, i * 4 + 4) as token, y}
            <TokenCard cardId={i * 4 + y} selected={selectedTokenIndex === i * 4 + y} on:select={selectToken}/>
          {/each}
        </div>
      {/each}
    </div>
    <!-- TODO: transition -->
    <div class="w-full mx-auto px-2 flex flex-row justify-center gap-1 mb-7 md:hidden">
      {#each Array(Math.ceil(tokens.length / 4)) as _, i}
        <div class="h-1 rounded-full { currentPage === i ? 'w-2 bg-light-orange' : 'w-1 bg-light-gray' }"></div>
      {/each}
    </div>
  </div>
</div>

<style lang="postcss">

  button {
    @apply flex gap-1 items-center py-1 px-3.5 rounded-[2.25rem] text-xs leading-7 text-white bg-light-orange
            sm:gap-2.5 sm:py-2 sm:px-5 sm:text-base;
    filter: drop-shadow(0px 4px 14px rgba(255, 130, 102, 0.3));
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .scrollbar-show {
    -ms-overflow-style: auto;
    scrollbar-width: auto;
  }

  .scrollbar-show::-webkit-scrollbar {
    display: block;
  }
</style>