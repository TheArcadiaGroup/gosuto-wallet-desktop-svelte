<div class="main">
    <slot />
</div>

<style lang="postcss" global>
    :local(.main) {
        @apply w-full flex-shrink-0 flex items-center justify-center snap-center;
    }
</style>
