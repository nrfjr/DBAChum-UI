<template>
    <aside class="max-xs:hidden left-0 top-0 z-30 h-screen duration-300 ease-linear sidebar-base w-[12%]">
        <div class="flex justify-center text-white font-bold text-4xl py-1">
            <a href="#">
                <div class="flex justify-between">
                    <img class="h-6 w-7 mt-2" v-bind:src="this.logo" />
                    <hr class="border h-6 m-2">
                    <p class="sidebar-brand-title">DBAChum </p>
                </div>
            </a>
        </div>
        <div class="flex flex-col overflow-auto duration-300 ease-linear">
            <nav class="mt-2">
                <div>
                    <ul class="flex flex-col gap-1.5">
                        <li v-for="item in this.modules" :class="item.visible ? 'mr-2 sidebar-container rounded' : 'hidden'">
                            <div v-if="item.type === 'button'" class="flex">
                                <div
                                    :class="this.activeSidebarButton === item.id ? 'w-1 bg-white left-0 h-wrap rounded-r' : 'hidden'">
                                </div>
                                <button @click="!item.submodules ? sidebarClickHandler(item.id) : null" :class="activeSidebarButton == item.id ? 'active-sidebar-button' : ''"
                                    v-on:click="(item.submodules ? item.isOpen = !item.isOpen : '')"
                                    class="ml-2 sidebar-button w-full text-sm font-bold flex items-center gap-2.5 p-2 text-gray-400 rounded"
                                    :id="item.id">
                                    <i :class="ICON_PREFIX + item.icon"></i>
                                    <div class="flex justify-between w-full">
                                        <span>{{ item.name.replace("_", " ") }}</span> 
                                        <i v-if="item.submodules" :class="'mt-1 fa-solid ' + (item.isOpen ? 'fa-angle-down' : 'fa-angle-up')"></i>
                                    </div>
                                </button>
                            </div>
                            <div v-else class="flex">
                                <div
                                    :class="this.activeSidebarButton === item.id ? 'w-1 bg-white left-0 h-wrap rounded-r' : 'hidden'">
                                </div>
                                <RouterLink :to="`${item.url}`" @click="!item.submodules ? sidebarClickHandler(item.id) : null" :class="activeSidebarButton == item.id ? 'active-sidebar-button' : ''"
                                    v-on:click="(item.submodules ? item.isOpen = !item.isOpen : '')"
                                    class="ml-2 sidebar-button w-full text-sm font-bold flex items-center gap-2.5 p-2 text-gray-400 rounded"
                                    :id="item.id">
                                    <i :class="ICON_PREFIX + item.icon"></i>
                                    <div class="flex justify-between w-full">
                                        <span>{{ item.name.replace("_", " ") }}</span> 
                                        <i v-if="item.submodules" :class="'mt-1 fa-solid ' + (item.isOpen ? 'fa-angle-down' : 'fa-angle-up')"></i>
                                    </div>
                                </RouterLink>
                            </div>
                            <div v-if="item.submodules" :class="item.submodules ? '' : 'hidden'" v-show="(item.submodules ? item.isOpen  : '')">
                                <ul v-for="submodule in item.submodules" class="flex flex-col gap-1.5">
                                    <li class="sidebar-container py-1">
                                        <div class="flex">
                                            <div
                                                :class="this.activeSidebarButton === submodule.id ? 'w-1 bg-white left-0 h-wrap rounded-r' : 'hidden'">
                                            </div>
                                            <button :to="submodule.url" @click="!submodule.submodules ? sidebarClickHandler(submodule.id) : null" v-on:click="(submodule.submodules ? submodule.isOpen = !submodule.isOpen : '')"
                                                :class="activeSidebarButton == submodule.id ? 'active-sidebar-button rounded' : ''"
                                                class="ml-4 sidebar-button w-full text-sm font-bold flex p-2 text-gray-400 rounded">
                                                <i :class="ICON_PREFIX + submodule.icon + ' mt-0.5'"></i>
                                                <div class="flex justify-between w-full">
                                                    <span class="pl-2">{{ submodule.name.replace("_", " ") }}</span>
                                                    <i v-if="submodule.submodules" :class="'mt-1 fa-solid ' + (submodule.isOpen ? 'fa-angle-down' : 'fa-angle-up')"></i>
                                                </div>
                                            </button>
                                        </div>
                                        <div v-if="submodule.submodules" :class="submodule.submodules ? '' : 'hidden'" v-show="(submodule.submodules ? submodule.isOpen  : '')">
                                            <ul v-for="module in submodule.submodules" class="flex flex-col gap-1.5">
                                                <li class="sidebar-container py-1">
                                                    <div v-if="module.type === 'button'" class="flex">
                                                        <div
                                                            :class="this.activeSidebarButton === module.id ? 'w-1 bg-white left-0 h-wrap rounded-r' : 'hidden'">
                                                        </div>
                                                        <button :to="module.url" @click="!module.submodules ? sidebarClickHandler(module.id) : null"
                                                            :class="activeSidebarButton == module.id ? 'active-sidebar-button rounded' : ''"
                                                            class="ml-4 sidebar-button w-full text-sm font-bold flex p-2 text-gray-400 rounded">
                                                            <i :class="ICON_PREFIX + module.icon + ' mt-0.5'"></i>
                                                            <span class="pl-2">{{ module.name.replace("_", " ") }}</span>
                                                    </button>
                                                    </div>
                                                    <div v-else class="flex">
                                                        <div
                                                            :class="this.activeSidebarButton === module.id ? 'w-1 bg-white left-0 h-wrap rounded-r' : 'hidden'">
                                                        </div>
                                                        <RouterLink :to="`${module.url}`" @click="!module.submodules ? sidebarClickHandler(module.id) : null" :class="activeSidebarButton == module.id ? 'active-sidebar-button' : ''"
                                                            v-on:click="(module.submodules ? module.isOpen = !module.isOpen : '')"
                                                            class="ml-4 sidebar-button w-full text-sm font-bold flex items-center gap-2.5 p-2 text-gray-400 rounded"
                                                            :id="module.id">
                                                            <i :class="ICON_PREFIX + module.icon"></i>
                                                            <div class="flex justify-between w-full">
                                                                <span>{{ module.name.replace("_", " ") }}</span> 
                                                                <i v-if="module.submodules" :class="'mt-1 fa-solid ' + (module.isOpen ? 'fa-angle-down' : 'fa-angle-up')"></i>
                                                            </div>
                                                        </RouterLink>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="bottom-0 absolute">
        </div>
    </aside>
</template>

<script>
import { ICON_PREFIX } from '/src/assets/data/globals.json'
import { get_logo_image } from '/src/assets/js/resource'
import { get_sidebar_modules } from '/src/assets/js/module.js'
import { RouterLink } from 'vue-router';


export default {
    data: () => {
        return {
            ICON_PREFIX,
            logo: '/src/assets/images/company.png',
            modules: null,
            activeSidebarButton: '',
            ls: window.localStorage
        };
    },
    methods: {
        getImage: async function () {

            let result = await get_logo_image()

            if (result.data.status) {
                this.logo = 'data:image/jpeg;base64,' + result.data.message
            }

        },
        getSidebarModules: async function () {

            let result = await get_sidebar_modules()

            if (result.data.status) {
                this.modules = result.data.message
            }

        },
        sidebarClickHandler: function (component) {
            this.ls.setItem('component', component)
            this.activeSidebarButton = this.ls.getItem('component')
        }

    },
    mounted: function () {
        this.getImage()
        this.getSidebarModules()
        this.sidebarClickHandler(this.ls.getItem('component'))
    }
}

</script>