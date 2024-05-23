<template>
    <div class="font-bold p-4 text-2xl text-white">
        Disk Storage
    </div>
    <div class="flex justify-center mt-1 mb-4 mx-8 h-1/3">
        <VueApexCharts v-if="this.List" ref="diskChart" width="525%" height="100%" :options="chartOptions"
            :series="series" />
        <div v-else class="grid content-center text-white">
            <img class="empty-cat" alt="idle spinning cat" title="matthew" />
            <span class="italic text-sm text-center">Please select a server first.</span>
        </div>
    </div>
    <div
        class="flex mx-4 overflow-x-auto shadow-md rounded h-max no-scrollbar shadow-lg shadow-black third-degree-form pb-4 pt-2 px-4 h-24">
        <div class="w-full">
            <div class="grid grid-cols-8 gap-4">
                <div class="col-span-1 relative absolute">
                    <label class="block text-sm font-medium leading-6 text-gray-200">Environment</label>
                    <select v-model="selectedType"
                        class="input text-sm mt-2 block w-full h-10 rounded border-0 px-2 text-white"
                        @change="getExistingIP(), this.currentPage = 1">
                        <option class="text-sm" v-for="server_type in ['AIX', 'Linux']" :value="server_type">{{
                            server_type
                        }}
                        </option>
                    </select>
                </div>
                <div class="col-span-5">
                    <label class="block text-sm font-medium leading-6 text-gray-200">IP Address</label>
                    <select v-model="this.selectedId"
                        class="input text-sm mt-2 block w-full h-10 rounded border-0 px-2 text-white"
                        @change="this.currentPage = 1">
                        <option class="text-sm" v-for="item in JSON.parse(this.existingDiskServers)" :value="item.Id">{{
                            item.IP }}
                        </option>
                    </select>
                </div>
                <div class="col-span-1 relative absolute">
                    <label class="block text-sm font-medium leading-6 text-gray-200">View by</label>
                    <select v-model="selectedUnit"
                        class="input text-sm mt-2 block w-full h-10 rounded border-0 px-2 text-white">
                        <option class="text-sm" v-for="unit in this.units" :value="unit.unit">{{
                            unit.name
                        }} ({{ unit.unit }})
                        </option>
                    </select>
                </div>
                <div class="w-wrap flex justify-center pt-8">
                    <button @click="clickView()" class="rounded submit-buttons px-2 w-full text-white text-xs font-bold">
                        View <i :class="ICON_PREFIX + 'laptop'" class="text-md pl-2"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div
        class="flex-col mx-4 mt-4 overflow-x-auto shadow-md rounded h-max no-scrollbar shadow-lg shadow-black third-degree-form pt-4 px-4">
        <Table :count="this.totalPages" :rows="JSON.parse(this.List)" :withAction="false" />
        <Pagination :total-pages="totalPages" :current-page="currentPage" @pagechanged="onPageChange" />
    </div>
    <Teleport to="body">
        <Spinner :show="spinner.show" />
    </Teleport>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import Table from '/src/components//Table.vue'
import { ICON_PREFIX } from '/src/assets/data/globals.json'
import Pagination from '/src/components//Pagination.vue'
import Spinner from '/src/components//dialogs/Spinner.vue'
import { sleep } from '/src/assets/js/tools.js'
import { get_disk_space, get_existing_ip } from '/src/assets/js/disk.js'

export default {
    data() {
        return {
            selectedType: 'AIX',
            selectedUnit: 'GB',
            currentPage: 1,
            totalPages: 0,
            selectedId: null,
            existingDiskServers: null,
            List: null,
            ICON_PREFIX,
            spinner: {
                show: false
            },
            units: [
                {
                    name: 'Megabyte',
                    unit: 'MB'
                },
                {
                    name: 'Gigabyte',
                    unit: 'GB'
                }
            ],
            chartOptions: {
                chart: {
                    id: "diskChart",
                    fontFamily: "Lexend",
                    foreColor: '#ffffff',
                    type: "bar",
                    stacked: true,
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: true
                    }
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        borderRadius: 5,
                        dataLabels: {
                            total: {
                                enabled: true,
                                style: {
                                    color: '#FFFFFF',
                                    fontSize: '14px',
                                    fontWeight: 900,
                                },
                                formatter: (val) => {
                                    return val.toFixed(2) + this.selectedUnit
                                }
                            }
                        }
                    },
                },
                dataLabels: {
                    fontSize: '8px',
                    formatter: (val) => {
                        return val.toFixed(2) + this.selectedUnit
                    }
                },
                xaxis: {
                    type: 'string',
                    categories: [],
                },
                yaxis: {
                    labels: {
                        formatter: (val) => {
                            return val.toFixed(2) + this.selectedUnit
                        }
                    }
                },
                legend: {
                    position: 'right',
                    offsetY: 40
                },
                fill: {
                    opacity: 1
                }
            },
            series: [
                {
                    name: 'USED',
                    data: []
                }, {
                    name: 'FREE',
                    data: []
                }],

        }

    },
    components: {
        Pagination,
        Table,
        Spinner,
        VueApexCharts

    },
    methods: {
        onPageChange: async function (page) {
            this.currentPage = page
            this.getDiskSpace()
        },
        getDiskSpace: async function () {
            let result = await get_disk_space(this.selectedId, this.selectedType, this.selectedUnit, this.currentPage)
            this.List = JSON.stringify(result.data.message[0])
            this.totalPages = result.data.count

            this.series[0].data = result.data.message[1].map((disk) => disk.used)
            this.series[1].data = result.data.message[1].map((disk) => disk.free)

            this.$refs.diskChart.updateSeries(this.series);

            this.$refs.diskChart.updateOptions({
                xaxis: {
                    categories: result.data.message[1].map((disk) => disk.name),
                },
            })

        },
        getExistingIP: async function () {

            let result = await get_existing_ip(this.selectedType)

            if (result.data.status) {
                this.existingDiskServers = JSON.stringify(result.data.message)
            } else {
                this.existingDiskServers = null
            }
        },
        clickView: async function () {

            this.spinner.show = true;

            this.getDiskSpace()

            sleep(3000).then(() => {
                this.spinner.show = false;
            })

        }
    },
    mounted: async function () {
        this.getExistingIP()
    }
}
</script>
