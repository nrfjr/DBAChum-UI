<template>
    <div class="flex justify-between py-4">
        <div class="mt-2">
            <div v-if="this.currentPage == 1 || this.currentPage == this.totalPages" class="text-sm text-white">
                <span class="italic text-gray-300 ">Showing the </span>
                <span class="underline"> {{ (this.currentPage == 1) ? ' first' : ' last' }} </span>
                <span class="italic text-gray-300 "> page. </span>
            </div>
            <div v-else="(this.currentPage > 1) || (this.currentPage < this.totalPages)" class="text-sm text-white">
                <span class="italic text-gray-300 ">Showing </span>
                <span> {{ this.currentPage }} </span>
                <span class="italic text-gray-300 "> of </span>
                <span> {{ this.totalPages }} </span>
                <span class="italic text-gray-300 "> {{ (this.totalPages > 1) ? ' pages.' : ' page.' }}</span>
            </div>
        </div>
        <ul class="inline-flex text-sm">
            <li
                class="pagination-button flex items-center justify-center px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l hover:text-white shadow-black shadow-sm">
                <button type="button" @click="onClickFirstPage" :disabled="isInFirstPage" aria-label="Go to first page">
                    First
                </button>
            </li>

            <li
                class="pagination-button flex items-center justify-center px-3 ml-0 leading-tight text-gray-500 bg-white hover:text-white shadow-black shadow-sm">
                <button type="button" @click="onClickPreviousPage" :disabled="isInFirstPage"
                    aria-label="Go to previous page">
                    <i :class="ICON_PREFIX + 'angle-double-left'"></i>
                </button>
            </li>

            <li v-for="page in pages"
                class="flex items-center justify-center px-3 leading-tight text-gray-500 bg-white hover:text-white shadow-black shadow-sm"
                :class="(this.currentPage == page.name) ? 'active-pagination-button' : 'pagination-button'">
                <button type="button" @click="onClickPage(page.name)" :disabled="page.isDisabled"
                    :class="{ active: isPageActive(page.name) }" :aria-label="`Go to page number ${page.name}`">
                    {{ page.name }}
                </button>
            </li>

            <li
                class="pagination-button flex items-center justify-center px-3 ml-0 leading-tight text-gray-500 bg-white hover:text-white shadow-black shadow-sm">
                <button type="button" @click="onClickNextPage" :disabled="isInLastPage" aria-label="Go to next page">
                    <i :class="ICON_PREFIX + 'angle-double-right'"></i>
                </button>
            </li>

            <li
                class="pagination-button flex items-center justify-center px-3 leading-tight text-gray-500 bg-white rounded-r hover:text-white shadow-black shadow-sm">
                <button type="button" @click="onClickLastPage" :disabled="isInLastPage" aria-label="Go to last page">
                    Last
                </button>
            </li>
            <li class="flex">
                <input v-model="this.gotoPage" :disabled="(this.currentPage == this.totalPages)" type="number"
                    :class="isInLastPage ? 'cursor-not-allowed' : ''"
                    class="mx-2 page-input w-12 rounded text-white p-1 text-center" id="goto-page" name="goto-page" />
                <button @click="teleportPage" :disabled="(this.currentPage == this.totalPages)"
                    :class="(this.currentPage == this.totalPages) ? 'cursor-not-allowed' : ''"
                    class="submit-buttons flex items-center justify-center px-3 leading-tight text-white rounded shadow-black shadow-sm">
                    Go
                </button>

            </li>
        </ul>
    </div>
</template>

<script>
import { toNumber } from '@vue/shared';
import { ICON_PREFIX } from '../assets/js/globals';

export default {
    data() {
        return {
            ICON_PREFIX,
            gotoPage: {
                type: Number,
                required: false,
                default: 0
            }
        }
    },
    props: {
        maxVisibleButtons: {
            type: Number,
            required: false,
            default: 2
        },
        totalPages: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        },
    },
    computed: {
        startPage() {
            if (this.currentPage === 1) {
                return 1;
            }

            if (this.currentPage === this.totalPages) {
                return this.totalPages - this.maxVisibleButtons + 1;
            }

            return this.currentPage - 1;

        },
        endPage() {

            if (this.totalPages > 2) {

                return Math.min(this.startPage + this.maxVisibleButtons + 1, this.totalPages);

            } else {
                return 2
            }

        },
        pages() {
            const range = [];

            for (let i = this.startPage; i <= this.endPage; i += 1) {
                range.push({
                    name: i,
                    isDisabled: i === this.currentPage
                });
            }

            return range;
        },
        isInFirstPage() {
            return this.currentPage === 1;
        },
        isInLastPage() {
            return this.currentPage === this.totalPages;
        },
    },
    methods: {
        onClickFirstPage() {
            this.$emit('pagechanged', 1);
        },
        onClickPreviousPage() {
            this.$emit('pagechanged', this.currentPage - 1);
        },
        onClickPage(page) {
            this.$emit('pagechanged', page);
        },
        onClickNextPage() {
            this.$emit('pagechanged', this.currentPage + 1);
        },
        onClickLastPage() {
            this.$emit('pagechanged', this.totalPages);
        },
        isPageActive(page) {
            return this.currentPage === page;
        },
        teleportPage() {
            let n = toNumber(this.gotoPage)
            if (Number.isInteger(n)) {
                if (n > 0 && n <= this.totalPages)
                    this.$emit('pagechanged', n);
            }
        }
    }
}
</script>

<style>
.pagination-button {

    height: 2rem;
    background-color: #1E1F22;
}

.pagination-button:hover {
    background-color: #2E3237;
}

.active-pagination-button {
    background-color: #2E3237;
    color: white;
}

.page-input {
    background-color: #1E1F22;
}

/* Chrome, Safari, Edge, Opera */
.page-input::-webkit-outer-spin-button,
.page-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
.page-input[type=number] {
    -moz-appearance: textfield;
}
</style>