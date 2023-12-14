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
                        <button @click="currentTabHandler(k)" :class="tab === v ? 'font-bold text-white' : 'text-gray-400'"
                            class="inline-block p-4 text-left" type="button">{{ k.replace("_", " ") }}</button>
                    </div>
                </li>
            </ul>
        </div>
        <div id="myTabContent" class="ml-4 flex justify-center w-full scroll-y">
            <component :is="activeForm"/>
        </div>
    </div>
</template>

<script>
import { watchEffect } from 'vue';

export default {
    data() {
        return {
            tab: 1,
            activeForm: null,
            forms:{
                Connections: 1,
                Modules: 2,
                Disk_Servers: 3,
                Preferences: 4,
                Advance_Settings: 5
            }
        };
    },
    methods: {
        currentTabHandler: function (tabName) {
            this.tab = this.forms[tabName];
            watchEffect(
                        async () =>{ 
                            import('/src/views/forms/'.concat(tabName,'.vue'))
                            .then((result) => this.activeForm = result.default) 
                        }
            )    
        },
    },
    mounted: function (){
        this.currentTabHandler('Connections');
    }
};
</script>
