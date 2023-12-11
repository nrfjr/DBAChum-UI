<template>
    <div class="flex h-screen overflow-hidden dashboard-body">
        <Sidebar>
            <div>
                <ul class="flex flex-col gap-1.5">
                    <li v-for="item in this.modules" :class="item.visible ? 'mr-2 sidebar-container rounded' : 'hidden'">
                        <div class="flex">
                            <div
                                :class="this.activeSidebarButton === item.name ? 'w-1 bg-white left-0 h-wrap rounded-r' : 'hidden'">
                            </div>
                            <button @click="sidebarClickHandler(item.name)"
                                :class="activeSidebarButton == item.name ? 'active-sidebar-button' : ''"
                                v-on:click="(item.name == 'Databases' ? open = !open : '')"
                                class="ml-2 sidebar-button w-full text-sm font-bold flex items-center gap-2.5 p-2 text-gray-400 rounded"
                                :id="item.name">
                                <i :class="ICON_PREFIX + item.icon"></i>
                                <div class="flex justify-between w-full"><span>{{ item.name.replace("_", " ") }}</span> <i
                                        v-if="item.submodules"
                                        :class="'mt-1 fa-solid ' + (open ? 'fa-angle-down' : 'fa-angle-up')"></i>
                                </div>
                            </button>
                        </div>
                        <div :class="item.submodules ? '' : 'hidden'" v-show="(item.name == 'Databases' ? open : '')">
                            <ul v-for="submodule in item.submodules" class="flex flex-col gap-1.5">
                                <li class="sidebar-container py-1">
                                    <div class="flex">
                                        <div
                                            :class="this.activeSidebarButton === submodule ? 'w-1 bg-white left-0 h-wrap rounded-r' : 'hidden'">
                                        </div>
                                        <button @click="sidebarClickHandler(submodule.split)"
                                            :class="activeSidebarButton == submodule ? 'active-sidebar-button rounded' : ''"
                                            class="ml-4 sidebar-button w-full text-sm font-bold flex p-2 text-gray-400 rounded">
                                            <i :class="ICON_PREFIX + item.icon + ' mt-0.5'"></i>
                                            <span class="pl-2">{{ submodule }}</span>
                                        </button>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </Sidebar>
        <div class="flex flex-col w-full justify-between overflow-y-scroll scroll-y-hidden no-scrollbar">
            <Header>
                <template v-slot:dropdown-slots>
                    <div class="header-buttons w-full mt-1">
                        <button
                            class="hidden rounded bg-blue-100 text-xs text-gray-300 h-6 w-28 px-2 flex items-center justify-between">
                            <span>Databases
                            </span><i class="fa-solid fa-angle-up"></i>
                        </button>
                    </div>
                </template>
                <template v-slot:settings>
                    <div class="z-20">
                        <button id="show-modal" @click="sidebarClickHandler('Settings')"
                            class="profile-menu-buttons flex justify-between px-2 w-full transition delay-100 block text-gray-300 py-2 text-center "><span>Settings
                            </span><i class="mt-0.5 fa-solid fa-cogs"></i></button>
                    </div>
                </template>
            </Header>
            <main class="h-full">
                <KeepAlive>
                    <component :is="activeComponent" />
                </KeepAlive>
            </main>
            <Footer />
        </div>
    </div>
    <Teleport to="body">
        <Spinner :show="spinner.show" @close="spinner.show = false"></Spinner>
    </Teleport>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Empty from '../components/Empty.vue'
import { ICON_PREFIX, API_SOURCE } from '../assets/js/globals'
import { getModules } from '../assets/js/module'
import { shallowRef, watchEffect, ref } from 'vue'
import { sleep } from '../assets/js/tools'
import Spinner from '../components/dialogs/Spinner.vue'

export default {
    data: () => {
        return {
            modules: null,
            activeComponent: null,
            ICON_PREFIX,
            API_SOURCE,
            activeSidebarButton: '',
            open: false,
            spinner: {
                show: false
            }
        }
    },
    name: 'Dashboard',
    components: {
        Sidebar,
        Header,
        Footer,
        Spinner,
    },
    methods: {
        sidebarClickHandler: function (name) {
            this.activeSidebarButton = name              
            watchEffect(
                        async () =>{ 
                            import('/src/views/'.concat(name,'.vue'))
                            .then((result) => this.activeComponent = result.default) 
                        }
            )         
        },
        verifyView: function () {

            if (!this.activeComponent) {
                this.activeComponent = shallowRef(Empty)
            }
        },
        getSidebarModules: async function () {

            let result = await getModules()

            if (result.data.status) {
                this.modules = result.data.message
            }

        }
    },
    mounted: async function () {
        this.spinner.show = true
        sleep(2000).then(() => {
            this.verifyView()
            this.getSidebarModules()
            this.spinner.show = false
        })
    }
};
</script>
