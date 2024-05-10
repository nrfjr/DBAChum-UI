<template>
<div>
    <div class="p-4 rounded third-degree-form shadow-md shadow-black">
        <div class="flex justify-between">
            <div>
                <label class="block text-sm font-medium leading-6 text-gray-200">Database Type<span class="text-red-500">
                        *</span></label>
                <select v-model="selectedDB" class="input block w-48 rounded border-0 py-1.5 px-2 text-white"
                    @change="getExistingConnections()">
                    <option v-for="db in this.databases" :value="db">{{ db }}
                    </option>
                </select>
            </div>
            <div class="w-fit text-gray-400 text-[25px]">
                <button @click="clearForm" title="clear form"><i :class="ICON_PREFIX + 'eraser'"></i>
                </button>
            </div>
        </div>
        <form @submit.prevent>
            <div class="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-6 pt-10">
                <div class="sm:col-span-2">
                    <label class="block text-sm font-medium leading-6 text-gray-200">Host / IP
                        Address<span class="text-red-500"> *</span></label>
                    <input v-model="formData.IP" type="text" class="input text-white text-sm rounded block w-full p-2.5">
                </div>

                <div class="col-span-1">
                    <label class="block text-sm font-medium leading-6 text-gray-200">Port<span class="text-red-500">
                            *</span></label>
                    <input v-model="formData.Port" type="text" class="input text-white text-sm rounded block w-full p-2.5">
                </div>

                <div class="sm:col-span-3">
                    <label class="block text-sm font-medium leading-6 text-gray-200">Database / SID<span
                            class="text-red-500"> *</span></label>
                    <input v-model="formData.Database" type="text"
                        class="input text-white text-sm rounded block w-full p-2.5">
                </div>

                <div class="col-span-full">
                    <label class="block text-sm font-medium leading-6 text-gray-200">Applications<span class="text-red-500">
                            *</span></label>
                    <textarea v-model="formData.Applications"
                        class="p-2 input text-white text-sm rounded block w-full "> </textarea>
                    <em class="text-gray-400 text-[10px]">Please separate values by comma (,) for
                        multiple entries.</em>
                </div>

                <div class="sm:col-span-2 sm:col-start-1">
                    <label class="block text-sm font-medium leading-6 text-gray-200">Username<span class="text-red-500">
                            *</span></label>
                    <input v-model="formData.Username" class="input text-white text-sm rounded block w-full p-2.5">
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-sm font-medium leading-6 text-gray-200">Password<span class="text-red-500">
                            *</span></label>
                    <div class="relative text-white">
                        <input v-model="formData.Password" :type="showPassword ? 'text' : 'password'"
                            class="input text-white text-sm rounded block w-full p-2.5">
                        <div class="absolute inset-y-0 right-0 flex items-center pr-2">
                            <button @click="showPassword = !showPassword" class="block"><i
                                    :class="showPassword ? ICON_PREFIX + 'eye' : ICON_PREFIX + 'eye-slash'"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-end pt-10">
                <button @click="showModal('save')" class="rounded submit-buttons p-2 text-white text-xs font-bold">
                    Submit?
                </button>
            </div>
        </form>
    </div>
    <div class="mt-8 text-xs text-white">
        <div class="p-4 rounded third-degree-form shadow-md shadow-black">
            <div class="italic pb-2"> Existing Connections</div>
            <div class="relative overflow-x-auto shadow-md rounded h-48 no-scrollbar shadow-lg shadow-black">
                <table class="w-full text-sm text-left text-white">
                    <thead class="table-header text-xs  sticky top-0">
                        <tr>
                            <th scope="row" class="px-6 py-3">
                                Hosts / IP Address
                            </th>
                            <th scope="row" class="px-6 py-3">
                                Database
                            </th>
                            <th scope="row" class="py-3 text-center" rowspan="2">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody v-if="(selectedDB && existingDBConn)">
                        <tr v-for="item in this.existingDBConn" class="table-content"
                            @dblclick="transferDetailsToForm(this.formData, item)">
                            <td scope="row" class="px-6 py-4">
                                {{ item.IP }}
                            </td>
                            <td class="px-6 py-4">
                                {{ item.Database }}
                            </td>
                            <td class="">
                                <ul class="flex flex-col gap-1 items-center">
                                    <li>
                                        <button @click="transferDetailsToForm(this.formData, item)" title="edit">
                                            <i :class="ICON_PREFIX + 'edit'"></i>
                                        </button>
                                    </li>
                                    <li>
                                        <button @click="showModal('delete'), selectIdForDeletion(item.Id)" title="delete">
                                            <i :class="ICON_PREFIX + 'trash'"></i>
                                        </button>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr class="table-content ">
                            <td class="px-6 py-16 text-center" colspan="3">
                                No data
                                available atm...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
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
import Alert from '../../components/dialogs/Alert.vue'
import Spinner from '../../components/dialogs/Spinner.vue'
import { clearObject, transferArrayToObject, sleep } from '../../assets/js/tools.js'
import { ICON_PREFIX, MODULES } from '../../assets/data/globals.json'
import { postData } from '../../assets/js/api.js'
import Table from '../../components/Table.vue'
import { get_available_db_type, get_existing_db_connection, upsert_db_connection_profile, delete_db_connection_profile } from '../../assets/js/database.js'


export default {
    data() {
        return {
            action: null,
            databases: null,
            selectedDB: null,
            existingDBConn: null,
            showPassword: false,
            selectedId: null,
            formData: {
                Id: '',
                IP: '',
                Port: '',
                Database: '',
                Applications: '',
                Username: '',
                Password: '',
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
            ICON_PREFIX,
            spinner: {
                show: false
            }

        }

    },
    components: {
        Confirmation,
        Alert,
        Spinner,
        Table
    },
    methods: {
        upsertConnection: async function () {
            let result =  await upsert_db_connection_profile(JSON.stringify(this.formData), this.selectedDB)
            this.spinner.show = false

            if (result.data.status) {
                this.showAlert(true, 'Saved! ' + result.data.message)
                clearObject(this.formData)
                this.getExistingConnections()
            } else {
                this.showAlert(false, 'Oops! ' + result.data.error)
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
        confirmAction: function (value) {

            this.confirmation.show = false

            this.spinner.show = true

            sleep(3000).then(() => {
                if (value && this.action == 'save') {
                    this.upsertConnection()
                }
                else if (value && this.action == 'delete') {
                    this.deleteConnectionDetails()
                }
            })
        },
        clearForm: function () {
            clearObject(this.formData)
        },
        getExistingConnections: async function () {
            let result = await get_existing_db_connection(this.selectedDB)
            if (result.data.status) {
                this.existingDBConn = result.data.message
            } else {
                this.existingDBConn = null
            }
        },
        deleteConnectionDetails: async function () {

            let result = await delete_db_connection_profile(id, db)
            this.spinner.show = false
            if (result.data.status) {
                this.showAlert(true, 'Success! ' + result.data.message)
                clearObject(this.formData)
                this.getExistingConnections()
            } else {
                this.showAlert(false, 'Oops! ' + result.data.error)
            }
        },
        transferDetailsToForm: function (obj, array) {
            transferArrayToObject(obj, array, null)
        },
        selectIdForDeletion: function (Id) {
            this.selectedId = Id
        },
        getAvaliableDBType: async function () {
            let result = await get_available_db_type()
            this.databases = result.data
        }

    },
    mounted: function () {
        this.getAvaliableDBType()
    }
}
</script>