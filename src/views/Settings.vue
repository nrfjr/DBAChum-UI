<template>
    <div class="m-4 font-bold text-2xl text-white">
        Settings
    </div>
    <div class="flex mr-4 mt-10">
        <div class="tab-row-buttons w-[15%]">
            <ul class="flex-col text-sm font-medium justify-center" id="myTab" data-tabs-toggle="#myTabContent"
                role="tablist">
                <li v-for="([k, v]) in Object.entries(this.forms)" class="mr-2">
                    <div class="flex justify-start">
                        <RouterLink :to="v.toLowerCase()"  @click="currentTabHandler(k)" :class="this.currentTab == v.toLowerCase() ? 'font-bold text-white' : 'text-gray-400'"
                            class="inline-block p-4 text-left" type="button">
                            {{ v.replace("_", " ") }}
                        </RouterLink>
                    </div>
                </li>
            </ul>
        </div>
        <div id="myTabContent" class="ml-4 flex justify-center w-full scroll-y">
            <router-view name="tab" />
        </div>
    </div>
</template>

<script>
import { RouterLink, useRouter } from 'vue-router';

export default {
    data() {
        return {
            route: useRouter(),
            defaultTab: 1,
            currentTab: null,
            forms:{
                1: "Connections",
                2: "Modules",
                3: "Disk_Servers",
                4: "Preferences",
                5: "Advance_Settings"
            }
        };
    },
    methods: {
        currentTabHandler: function (tabNumber) {
            this.currentTab = this.forms[(tabNumber) ? tabNumber : this.defaultTab].toLowerCase()
        },
    },
    mounted: function (){
        this.currentTab = this.route.currentRoute.path.split('/')[2].toLowerCase()
    }
};
</script>