import { withPrevious } from 'svelte-previous';

export const [allHistoryData, previousAllHistoryData] = withPrevious<HistoryResponse | null>(null);
