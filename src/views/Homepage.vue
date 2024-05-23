<template>
    <div class="flex h-screen overflow-hidden dashboard-body">
        <Sidebar />
        <div class="flex flex-col w-full justify-between overflow-y-scroll scroll-y-hidden no-scrollbar">
            <Header />
            <main class="h-full">
                <router-view name="homeview"/>
            </main>
            <Footer />
        </div>
    </div>
    <Teleport to="body">
        <Spinner :show="spinner.show" @close="spinner.show = false"></Spinner>
    </Teleport>
</template>

<script>
import Sidebar from '/src/components//Sidebar.vue'
import Header from '/src/components//Header.vue'
import Footer from '/src/components//Footer.vue'
import { ICON_PREFIX, API_SOURCE } from '/src/assets/data/globals.json'
import { sleep } from '/src/assets/js/tools'
import Spinner from '/src/components//dialogs/Spinner.vue'

export default {
    data: () => {
        return {
            modules: null,
            ICON_PREFIX,
            API_SOURCE,
            activeSidebarButton: '',
            spinner: 
            {
                show: false
            }
        }
    },
    name: 'Dashboard',
    components: {
        Sidebar,
        Header,
        Footer,
        Spinner
    },
    mounted: async function () {
        this.spinner.show = true
        sleep(2000).then(() => {
            this.spinner.show = false
        })
    }
};
</script>
