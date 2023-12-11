<template>
    <form @submit.prevent>
        <div class="p-4 rounded third-degree-form shadow-md shadow-black w-full">
            <div>
                <div class="flex">
                    <span class="text-white text-lg">Default Database </span>
                </div>
                <em class="text-gray-400 text-xs py-1.5"> This will be used for application logins and other
                    features.</em>
                <div class="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-6 mt-8">
                    <div class="col-span-1">
                        <label class="block text-sm font-medium leading-6 text-gray-200">Database Type<span
                                class="text-red-500">
                                *</span></label>
                        <select v-model="selectedDB" class="input block w-full rounded border-0 py-1.5 px-2 text-white"
                            @change="getExisting()">
                            <option v-for="db in this.databases" :value="db">{{ db }}
                            </option>
                        </select>
                    </div>
                    <div class="col-span-2">
                        <label class="block text-sm font-medium leading-6 text-gray-200">Database
                            <span class="text-red-500">
                                *</span></label>
                        <select v-model="selectedId" class="input block w-full rounded border-0 py-1.5 px-2 text-white">
                            <option v-for="db in this.existingDBConn" :value="db.Id">{{ `${db.IP} - ${db.Database}
                                                            ${db.Default ? '(Default)' : ''}` }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <hr class="divider">
            <div>
                <span class="text-white text-lg">Email</span>
                <div class="grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-6 mt-8">
                    <div class="col-span-3">
                        <label class="block text-sm font-medium leading-6 text-gray-200">New Email URL<span
                                class="text-red-500">
                                *</span></label>
                        <textarea id="url" name="url" v-model="email.url"
                            class="input text-white text-sm rounded block w-full p-2.5 input"
                            placeholder="https://email.url/"
                            v-on:input="(this.email.url == '') ? this.getEmailURL() : 'https://'"></textarea>
                        <em class="text-gray-400 text-xs">Please input valid URL.</em>
                    </div>
                </div>
            </div>
            <hr class="divider">
            <div>
                <span class="text-white text-lg">Miscellaneous</span>
                <div class="grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-6 mt-8">
                    <div class="col-span-3">
                        <label class="block text-sm font-medium leading-6 text-gray-200">API Server URL<span
                                class="text-red-500">
                                *</span></label>
                        <input v-model="api.url" type="text"
                            class="input text-white text-sm rounded block w-full p-2.5 input"
                            v-on:input="(this.api.url == '') ? this.getAPIServerURL() : 'https://'">
                    </div>
                </div>
            </div>
            <div class="flex justify-end pt-10">
                <button @click="showModal('save')" class="rounded submit-buttons p-2 text-white text-xs font-bold">
                    Submit?
                </button>
            </div>
        </div>
    </form>
    <Teleport to="body">
        <Alert :status="alert.status" :show="alert.show" @close="alert.show = false">
            <template #body>
                <h3 class="font-bold">{{ alert.msg }}</h3>
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
import Confirmation from '../../components/dialogs/Confirmation.vue'
import Alert from '../../components/dialogs/Alert.vue';
import Spinner from '../../components/dialogs/Spinner.vue';
import { updateEmailURLToAPI, updateAPIServerURL, getEmailURLFromAPI, getAPIServerURL, getAvailableDB, getExistingConnections, updateDefaultDB } from '../../assets/js/settings.js'
import { sleep } from '../../assets/js/tools';

export default {
    data() {
        return {
            databases: null,
            selectedDB: null,
            existingDBConn: null,
            selectedId: null,
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
            }

        }

    },
    components: {
        Confirmation,
        Alert,
        Spinner
    },
    methods: {
        updateAdvanceSettings: async function () {

            let EmailUpdateResult = await updateEmailURLToAPI(this.email.url)
            let APIServerResult = await updateAPIServerURL(this.api.url)
            let DefaultDBResult = await updateDefaultDB(this.selectedDB, this.selectedId)

            this.spinner.show = false

            if (EmailUpdateResult.data.status && APIServerResult.status && DefaultDBResult.data.status) {
                this.showAlert(true, 'Success! settings are saved!')
            } else {
                this.showAlert(true, "Success but something went wrong, check additional message: Email: " + (EmailUpdateResult.data.status ? EmailUpdateResult.data.message : EmailUpdateResult.data.error) + ", \nAPI Server: " + (APIServerResult.status ? APIServerResult.message : APIServerResult.error) + ", \nDefault DB: " + (DefaultDBResult.data.status ? DefaultDBResult.data.message : DefaultDBResult.data.error)) + "."
            }

        },
        confirmAction: function (value) {

            this.confirmation.show = false

            if (value) {

                this.spinner.show = true
                sleep(3000).then(() => {
                    this.updateAdvanceSettings()
                });

            }
        },
        getEmailURL: async function () {
            let result = await getEmailURLFromAPI()
            if (result.data.status) {
                this.email.url = result.data.message
            }
        },
        getAPIServerURL: function () {
            let result = getAPIServerURL()
            if (result) {
                this.api.url = result
            }
        },
        showAlert: function (status, message) {
            this.alert.status = status
            this.alert.msg = message
            this.alert.show = true
        },
        showModal: function (action) {
            this.action = action
            this.confirmation.msg = 'Are you sure to ' + action + ' these details?'
            this.confirmation.show = true
        },
        getAvaliableDBType: async function () {
            let result = await getAvailableDB()
            this.databases = result.data
        },
        getExisting: async function () {
            let result = await getExistingConnections(this.selectedDB)
            let message = result.data.message
            if (result.data.status) {
                if (message == '[]') {
                    this.existingDBConn = null
                } else {
                    this.existingDBConn = message
                }
            }
        },
    },
    mounted: async function () {
        this.getEmailURL()
        this.getAPIServerURL()
        this.getAvaliableDBType()
    }

}
</script>