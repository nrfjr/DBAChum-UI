<template>
    <div v-if="this.count" class="block rounded overflow-auto shadow-black shadow max-h-[60vh] no-scrollbar">
        <table class="w-full text-sm text-left text-white" id="Table">
            <thead class="table-header text-xs sticky top-0">
                <tr>
                    <th v-for="col in columns" scope="col" :class="(regex.test(col)) ? 'hidden' : ' px-6 py-3'"
                        @click="(/password/i.test(col)) ? null : sortTable(col)">
                        <div v-if="(/password/i.test(col))">
                            <span>{{ setTitle(col) }}</span>
                            <div class="flex absolute inset-y-0 items-center pl-[10.5em]">
                                <button @click="showPassword = !showPassword"><i
                                        :class="showPassword ? ICON_PREFIX + 'eye' : ICON_PREFIX + 'eye-slash'"></i></button>
                            </div>
                        </div>
                        <span v-else>{{ setTitle(col) }}</span>
                        <i v-if="col == sortColumn"
                            v-bind:class="ascending ? ICON_PREFIX + 'caret-up' : ICON_PREFIX + 'caret-down'"
                            class="px-2"></i>
                    </th>
                    <th scope="col" class="py-3 text-center" :class="(withAction ? '' : 'hidden')" rowspan="2">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in rows" class="table-content" @dblclick="">
                    <td v-for="col in columns" :class="(regex.test(col)) ? 'hidden' : 'item px-6 py-4'">
                        <div v-if="(/password/i.test(col))">
                            <input :type="showPassword ? 'text' : 'password'" :value="item[col]"
                                class="bg-transparent pointer-events-none">
                        </div>
                        <div v-else>
                            {{ item[col] }}
                        </div>
                    </td>
                    <td class="item px-6 py-4" :class="(withAction ? '' : 'hidden')">
                        <ul class="flex gap-4 justify-end">
                            <li>
                                <button title="edit" @click="setEditDetail(item)">
                                    <i :class="ICON_PREFIX + 'pencil-alt'"></i>
                                </button>
                            </li>
                            <li>
                                <button title="delete" @click="setDeleteDetail(item)">
                                    <i :class="ICON_PREFIX + 'trash'"></i>
                                </button>
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else class="flex items-center justify-center rounded shadow-black shadow h-32">
        <img class="such-empty-cat h-20 w-15 mx-2" alt="cat sleeping">
        <span class="text-lg text-white font-bold">Wow such empty ...</span>
    </div>
</template>

<script>
import { ICON_PREFIX } from '../assets/data/globals.json';
import { makeTitle } from '../assets/js/tools';

export default {
    data() {
        return {
            ICON_PREFIX,
            ascending: false,
            sortColumn: '',
            regex: /(id|default)/i,
            showPassword: false,
        }
    },
    props: {
        rows: null,
        count: 0,
        withAction: true
    },
    el: '#Table',
    methods: {
        sortTable: function (col) {
            if (this.sortColumn === col) {
                this.ascending = !this.ascending;
            } else {
                this.ascending = true;
                this.sortColumn = col;
            }

            var ascending = this.ascending;

            this.rows.sort(function (a, b) {
                if (a[col] > b[col]) {
                    return ascending ? 1 : -1
                } else if (a[col] < b[col]) {
                    return ascending ? -1 : 1
                }
                return 0;
            })
        },
        setEditDetail: function (data) {
            this.$emit('editdata', data)
        },
        setDeleteDetail: function (data) {
            this.$emit('deletedata', data)
        },
        setTitle: function (string) {
            return makeTitle(string)
        }
    },
    computed: {
        columns: function () {
            if (this.rows.length == 0) {
                return [];
            }
            return Object.keys(this.rows[0])
        }
    }

}

</script>

