<template>
<div>
    <div class="p-4 rounded third-degree-form shadow-md shadow-black">
        <div class="flex justify-between">
            <div>
                <label class="block text-sm font-medium leading-6 text-gray-200">Server Type<span class="text-red-500">
                        *</span></label>
                <select v-model="selectedType" class="input block w-48 rounded border-0 py-1.5 px-2 text-white"
                    @change="getExistingDiskServers()">
                    <option v-for="server_type in ['AIX', 'Linux']" :value="server_type">{{ server_type }}
                    </option>
                </select>
            </div>
            <div class="w-fit text-gray-400 text-[25px]">
                <button @click="clearForm" title="clear form"><i :class="ICON_PREFIX + 'eraser'"></i>
                </button>
            </div>
        </div>
        <form @submit.prevent>
            <div class="grid grid-cols-3 gap-x-6 gap-y-8 pt-10">
                <div class="col-span-1">
                    <label class="block text-sm font-medium leading-6 text-gray-200">Host / IP
                        Address<span class="text-red-500"> *</span></label>
                    <input v-model="formData.IP" type="text"
                        class="input text-white text-sm rounded block w-full p-2.5 input uppercase">
                </div>

                <div class="col-span-1">
                    <label class="block text-sm font-medium leading-6 text-gray-200">Port</label>
                    <input v-model="formData.Port" type="text"
                        class="input text-white text-sm rounded block w-1/2 p-2.5 input uppercase">
                </div>

                <div class="col-start-1">
                    <label class="block text-sm font-medium leading-6 text-gray-200">Username<span class="text-red-500">
                            *</span></label>
                    <input v-model="formData.Username" class="input text-white text-sm rounded block w-full p-2.5 input">
                </div>

                <div class="sm:col-span-2">
                    <label class="block text-sm font-medium leading-6 text-gray-200">Password<span class="text-red-500">
                            *</span></label>
                    <div class="relative text-white">
                        <input v-model="formData.Password" :type="showPassword ? 'text' : 'password'"
                            class="input text-white text-sm rounded block w-full p-2.5 input">
                        <div class="absolute inset-y-0 right-0 flex items-center pr-2">
                            <button @click="showPassword = !showPassword" class="block"><i
                                    :class="showPassword ? ICON_PREFIX + 'eye' : ICON_PREFIX + 'eye-slash'"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-end pt-10">
                <button @click="showModal('save')" class="rounded submit-buttons p-2 text-white text-xs font-bold"
                    data-te-ripple-init data-te-ripple-color="light">
                    Submit?
                </button>
            </div>
        </form>
    </div>
    <div class="mt-8 text-xs text-white">
        <div class="p-4 rounded third-degree-form shadow-md shadow-black">
            <div class="italic pb-2"> Existing Server Profiles</div>
            <div class="relative overflow-x-auto shadow-md rounded h-48 no-scrollbar shadow-lg shadow-black">
                <table class="w-full text-sm text-left text-white">
                    <thead class="table-header text-xs uppercase sticky top-0">
                        <tr>
                            <th scope="row" class="px-6 py-3">
                                Hosts / IP Address
                            </th>
                            <th scope="row" class="px-6 py-3">
                                Username
                            </th>
                            <th scope="row" class="py-3 text-center" rowspan="2">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody v-if="(selectedType && existingDiskServers)">
                        <tr v-for="item in JSON.parse(this.existingDiskServers)" class="table-content"
                            @dblclick="transferDetailsToForm(this.formData, item)">
                            <td scope="row" class="px-6 py-4">
                                {{ item.IP }}
                            </td>
                            <td scope="row" class="px-6 py-4">
                                {{ item.Username }}
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
                        <tr class="table-content">
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
import Spinner from '../../components/dialogs/Spinner.vue'
import Confirmation from '../../components/dialogs/Confirmation.vue'
import Alert from '../../components/dialogs/Alert.vue'
import { clearObject, transferArrayToObject, sleep } from '../../assets/js/tools.js'
import { postData } from '../../assets/js/api.js'
import { ICON_PREFIX, MODULES } from '../../assets/data/globals.json'
import { delete_disk_server_profile, get_existing_disk_server_profiles } from '../../assets/js/disk.js'
export default {
    data() {
        return {
            action: '',
            selectedType: '',
            existingDiskServers: null,
            showPassword: false,
            selectedId: null,
            formData: {
                Id: '',
                IP: '',
                Port: '',
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
        upsertDiskServer: async function () {
            let result =  await postData(JSON.stringify(this.formData), this.selectedType)

            this.spinner.show = false

            if (result.data.status) {
                this.showAlert(true, 'Saved! ' + result.data.message)
                clearObject(this.formData)
                this.getExistingDiskServers()
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
                    this.upsertDiskServer()
                }
                else if (value && this.action == 'delete') {
                    this.deleteDiskServerDetails()
                }
            })
        },
        getExistingDiskServers: async function () {
            let result = await get_existing_disk_server_profiles(this.selectedType)
            let message = JSON.stringify(result.data.message)
            if (result.data.status) {
                if (message == '[]') {
                    this.existingDiskServers = null
                } else {
                    this.existingDiskServers = message
                }
            }
        },
        clearForm: function () {
            clearObject(this.formData)
        },
        deleteDiskServerDetails: async function () {

            let result = await delete_disk_server_profile(this.selectedId, this.selectedType);
            this.spinner.show = false
            if (result.data.status) {
                this.showAlert(true, 'Success! ' + result.data.message)
                clearObject(this.formData)
                this.getExistingDiskServers()
            } else {
                this.showAlert(false, 'Oops! ' + result.data.error)
            }
        },
        transferDetailsToForm: function (obj, array) {
            transferArrayToObject(obj, array)
        },
        selectIdForDeletion: function (Id) {
            this.selectedId = Id
        }
    }
}
</script>