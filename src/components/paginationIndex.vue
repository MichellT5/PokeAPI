<template>
    <div class="flex justify-center">
        <div class="overflow-hidden flex rounded">
            <RouterLink class="border-dotted border-l p-2 bg-blue-900 first:border-l-0" :to="firstPage">First</RouterLink>
            <RouterLink class="border-dotted border-l p-2 bg-blue-900 first:border-l-0" :to="previousPage">Previous
            </RouterLink>
            <RouterLink class="border-dotted border-l p-2 bg-blue-900 first:border-l-0" :to="nextPage">Next</RouterLink>
            <RouterLink class="border-dotted border-l p-2 bg-blue-900 first:border-l-0" :to="lastPage">Last</RouterLink>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router';
export interface PaginationData {
    total: number,
    page: number,
    limit: number,
    route: { path?: string, name?: string }
}
/* DATA */
const { data } = defineProps<{ data: PaginationData }>()
const pages = computed(() => Math.ceil(data.total / data.limit))

/* METHODS */
const firstPage = computed(() => createURL(1));
const lastPage = computed(() => createURL(pages.value));
const previousPage = computed(() => {
    const p = data.page - 1
    return createURL(p < 1 ? 1 : p)
})
const nextPage = computed(() => {
    const p = data.page + 1
    return createURL(p > pages.value ? pages.value : p)
})

const createURL = (page: number) => {
    return { ...data.route, query: { page, limit: data.limit } }
}
</script>