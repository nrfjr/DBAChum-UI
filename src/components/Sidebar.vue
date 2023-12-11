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
                <slot></slot>
            </nav>
        </div>
        <div class="bottom-0 absolute">
        </div>
    </aside>
</template>

<script>
import { ICON_PREFIX } from '../assets/js/globals';
import { getLogoImage } from '../assets/js/preference'

export default {
    data: () => {
        return {
            ICON_PREFIX,
            logo: 'src/assets/images/company.png'
        };
    },
    methods: {
        getImage: async function () {

            let result = await getLogoImage()

            if (result.data.status) {
                this.logo = 'data:image/jpeg;base64,' + result.data.message
            }

        }
    },
    mounted: function () {
        this.getImage()
    }
}

</script>