<template>
<div class="w-[40%]">
    <form @submit.prevent>
        <div class="p-4 rounded third-degree-form shadow-md shadow-black w-full">
            <div class="mb-10">
                <span class="text-white text-lg">Enable / Disable Module</span>
            </div>
            <div v-for="item in  this.modules ">
                <div class="col-span-3 flex justify-between">
                    <span class=" text-sm font-medium text-gray-900 dark:text-gray-300">{{ item.name.replace("_", " ") }}</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input @click="item.visible = !item.visible" type="checkbox" class="sr-only peer"
                            :checked="item.visible">
                        <div
                            class="w-11 h-6 rounded-full peer bg-gray-400 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#23A55A] peer-checked:after:translate-x-full peer-checked:after:border-white">
                        </div>
                    </label>
                </div>
                <hr class="divider">
            </div>
            <div class="flex justify-end pt-10">
                <button @click="showModal('save')" class="rounded submit-buttons p-2 text-white text-xs font-bold">
                    Submit?
                </button>
            </div>
        </div>
    </form>
</div>
    <Teleport to="body">
        <Alert :status="alert.status" :show="alert.show" @close="alert.show = false">
            <template #body>
                <h3 class="font-bold">{{ alert.msg }}<i v-if="alert.status"
                        :class="ICON_PREFIX + 'circle-notch fa-spin'"></i></h3>
            </template>
        </Alert>
        <Confirmation :show="confirmation.show" @close="confirmation.show = false">
            <template #body>
                <h3 class="font-bold">{{ this.confirmation.msg }}</h3>
            </template>
            <template #footer>
                <button class="p-1 rounded text-gray-300 mr-4 text-xs" @click="confirmAction(false)">Nah.</button>
                <button class="submit-buttons p-2 rounded text-xs" @click="confirmAction(true)">Yup!</button>
            </template>
        </Confirmation>
        <Spinner :show="spinner.show" />
    </Teleport>
</template>
<script>
import Confirmation from '/src/components/dialogs/Confirmation.vue'
import Alert from '/src/components/dialogs/Alert.vue'
import Spinner from '/src/components/dialogs/Spinner.vue'
import { sleep } from '/src/assets/js/tools'
import { ICON_PREFIX, MODULES } from '/src/assets/data/globals.json'
import { postData } from '/src/assets/js/api'
import { get_sidebar_modules, update_sidebar_modules } from '/src/assets/js/module'

export default {
    data() {
        return {
            modules: null,
            email: {
                url: ''
            },
            api: {
                url: ''
            },
            confirmation: {
                show: false,
                msg: ''
            },
            alert: {
                show: false,
                msg: '',
                status: true
            },
            spinner: {
                show: false
            },
            ICON_PREFIX

        }

    },
    components: {
        Confirmation,
        Alert,
        Spinner
    },
    methods: {
        getSidebarModules: async function () {

            let result = await get_sidebar_modules()

            if (result.data.status) {
                this.modules = result.data.message
            }

        },
        updateModules: async function () {

            let result = await update_sidebar_modules(JSON.stringify(this.modules))

            this.spinner.show = false

            if (result.data.status) {
                this.showAlert(true, 'Success! Refreshing DBAChum ')
                sleep(3000).then(() => {
                    location.reload()
                })

            } else {
                this.showAlert(false, 'Oops! ' + result.data.error)
            }

        },
        confirmAction: function (value) {

            this.confirmation.show = false

            if (value) {

                this.spinner.show = true
                sleep(3000).then(() => {
                    this.updateModules()
                });

            }
        },
        showAlert: function (status, message) {
            this.alert.status = status
            this.alert.msg = message
            this.alert.show = true
        },
        showModal: function (action) {
            this.action = action
            this.confirmation.msg = 'Are you sure to ' + action + ' these update?'
            this.confirmation.show = true
        },
    },
    mounted: async function () {
        this.getSidebarModules()
    }

}
</script>