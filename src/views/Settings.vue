<template>
    <div class="m-4 font-bold text-2xl text-white">
        Settings
    </div>
    <div class="flex mr-4 mt-10">
        <div class="tab-row-buttons w-[15%]">
            <ul class="flex-col text-sm font-medium justify-center" id="myTab" data-tabs-toggle="#myTabContent"
                role="tablist">
                <li class="mr-2">
                    <div class="flex justify-start">
                        <button @click="currentTab(1)" :class="tab === 1 ? 'font-bold text-white' : 'text-gray-400'"
                            class="inline-block p-4 text-left" type="button">Connections</button>
                    </div>
                </li>
                <li class="mr-2">
                    <div class="flex justify-start">
                        <button @click="currentTab(2)" :class="tab === 2 ? 'font-bold text-white' : 'text-gray-400'"
                            class="inline-block p-4" type="button">Modules</button>
                    </div>
                </li>
                <li class="mr-2 ">
                    <div class="flex justify-start">
                        <button @click="currentTab(3)" :class="tab === 3 ? 'font-bold text-white' : 'text-gray-400'"
                            class="inline-block p-4" type="button">Disk
                            Servers</button>
                    </div>
                </li>
                <li class="mr-2">
                    <div class="flex justify-start">
                        <button @click="currentTab(4)" :class="tab === 4 ? 'font-bold text-white' : 'text-gray-400'"
                            class="inline-block p-4 text-left" type="button">Preferences</button>
                    </div>
                </li>
                <li class="mr-2">
                    <div class="flex justify-start">
                        <button @click="currentTab(5)" :class="tab === 5 ? 'font-bold text-white' : 'text-gray-400'"
                            class="inline-block p-4 text-left" type="button">Advance</button>
                    </div>
                </li>
            </ul>
        </div>
        <div id="myTabContent" class="ml-4 flex justify-center w-full scroll-y">
            <div v-if="tab === 1" :class="tab === 1 ? '' : 'hidden'">
                <Connections />
            </div>
            <div v-else-if="tab === 2" :class="tab === 2 ? '' : 'hidden'" class="w-[40%]">
                <Modules />
            </div>
            <div v-else-if="tab === 3" :class="tab === 3 ? '' : 'hidden'">
                <Disk_Servers />
            </div>
            <div v-else-if="tab === 4" :class="tab === 4 ? '' : 'hidden'" class="w-[40%] flex justify-center">
                <Preferences />
            </div>
            <div v-else-if="tab === 5" :class="tab === 5 ? '' : 'hidden'" class="w-[40%]">
                <AdvanceSettings />
            </div>
        </div>
    </div>
</template>

<script>
import Connections from '../views/forms/Connections.vue'
import AdvanceSettings from '../views/forms/AdvanceSettings.vue'
import Disk_Servers from '../views/forms/Disk_Servers.vue'
import Preferences from '../views/forms/Preferences.vue';
import Modules from '../views/forms/Modules.vue';

export default {
    data() {
        return {
            tab: 1,
        };
    },
    components:
    {
        Connections,
        AdvanceSettings,
        Disk_Servers,
        Preferences,
        Modules
    }
    ,
    methods: {
        currentTab: function (tabNumber) {
            this.tab = tabNumber;
        },
    },
};
</script>