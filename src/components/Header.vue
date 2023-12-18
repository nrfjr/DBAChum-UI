<template>
    <header class="z-9999 flex w-full dashboard-header border-b-[1px]">
        <div class="grid grid-cols-2 gap-1 px-4 py-1 h-10 w-full">
            <div class="flex" id="ctmdropdown">
            </div>
            <div class="grid grid-cols-1 justify-items-end" id="user-menu">
                <button v-on:click="open = !open" class="rounded-full overflow-hidden">
                    <img class="h-8 w-8" alt="User Profile Image" v-bind:src="profile">
                </button>
                <div v-show="open" class="absolute w-24 justify-center topbar-pmenu-container top-0 rounded shadow-lg mt-14"
                    id="user-menu">
                    <div
                        class="z-0 absolute top-0 right-0 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-4 h-4 topbar-pmenu-arrow">
                    </div>
                    <div class="flex flex-col text-xs justify-between z-10">
                        <div class="z-20">
                            <button @click="open = !open"
                                class="profile-menu-buttons flex justify-between px-2 w-full transition delay-100 block text-gray-300 py-2 text-center rounded-t"><span>My
                                    Profile </span><i class="mt-0.5 fa-solid fa-user-circle"></i></button>
                        </div>
                        <div class="z-20">
                            <button @click="openEmail"
                                class="profile-menu-buttons flex justify-between px-2 w-full transition delay-100 block text-gray-300 py-2"><span>Email
                                </span><i class="mt-0.5 fa-solid fa-envelope"></i></button>
                        </div>
                        <slot name="settings">
                        </slot>
                        <div class="z-20">
                            <button @click="logout()"
                                class="flex justify-between px-2 w-full transition delay-100 block text-gray-300 py-2 text-center rounded-b hover:bg-red-600 hover:text-white z-10"><span>Sign
                                    out </span><i class="mt-0.5 fa-solid fas fa-power-off"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <Teleport to="body">
        <Alert :status="alert.status" :show="alert.show" @close="alert.show = false">
            <template #body>
                <h3 class="font-bold">{{ alert.msg }}</h3>
            </template>
        </Alert>
    </Teleport>
</template>
<script>
import Confirmation from './dialogs/Confirmation.vue';
import { getEmailURLFromAPI } from '../assets/js/settings.js'
import Alert from './dialogs/Alert.vue';
import { getProfileImage } from '../assets/js/preference.js'

export default {
    data: () => {
        return {
            open: false,
            menu: document.getElementById('user-menu'),
            alert: {
                show: false,
                msg: '',
                status: true
            },
            profile: 'src/assets/images/user.png'
        }
    },
    components: {
        Confirmation,
        Alert
    },
    methods: {
        logout: function () {
            window.location.href = '/login';
        },
        openEmail: async function () {
            let result = await getEmailURLFromAPI()
            if (result.data.status) {
                window.open(result.data.message, '_blank')
            } else {
                this.showAlert(result.data.status, result.data.error);
            }
        },
        showAlert: function (status, message) {
            this.alert.status = status
            this.alert.msg = message
            this.alert.show = true
        },
        getImage: async function () {
            let result = await getProfileImage()

            if (result.data.status) {
                this.profile = 'data:image/jpeg;base64,' + result.data.message
            }
        }

    },
    mounted: function () {
        this.getImage()
        window.addEventListener('click', (event) => {

            if (!((event.target.parentNode.parentElement.id == 'user-menu') ||
                (event.target.parentNode.parentNode.parentNode.parentNode.id == 'user-menu'))) {
                if (this.open) {
                    this.open = false
                }
            } else {
                window.removeEventListener('click', (event) => {

                    if (!((event.target.parentNode.parentElement.id == 'user-menu') ||
                        (event.target.parentNode.parentNode.parentNode.parentNode.id == 'user-menu'))) {
                        if (this.open) {
                            this.open = false
                        }
                    }
                })
            }
        })
    }
}
</script>