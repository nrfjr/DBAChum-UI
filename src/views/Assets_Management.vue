<template>
    <div class="font-bold p-4 text-2xl text-white">
        Assets Management
    </div>
    <div class="w-wrap flex justify-end mt-1 mb-4 mx-8 h-10">
        <button @click="showForm('Create')"
            class="rounded create-or-add ml-2 w-48 text-white text-xs font-bold shadow-black shadow-md">
            Create New Asset <i :class="ICON_PREFIX + 'plus'" class="text-md pl-2"></i>
        </button>
    </div>
    <div
        class="flex mx-4 overflow-x-auto shadow-md rounded h-max no-scrollbar shadow-lg shadow-black third-degree-form pb-4 pt-2 px-4 h-24">
        <div class="w-full">
            <div class="grid grid-cols-8 gap-4">
                <div class="col-span-5 relative absolute">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-2 pt-8">
                        <i class="w-5 h-5 text-gray-400" :class="ICON_PREFIX + 'search'"></i>
                    </div>
                    <label class="text-sm text-gray-200 font-bold">What are you looking for ?</label>
                    <input v-model="this.search"
                        class="mt-2 input text-white text-sm rounded block w-full py-2.5 pl-8 input"
                        placeholder="Search something ....">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-200">Asset Type</label>
                    <select v-model="this.selectedSearchType"
                        class="input text-sm mt-3 block w-full h-10 rounded border-0 px-2 text-white"
                        @change="this.currentPage = 1">
                        <option class="text-sm" v-for="assettype in this.assetType" :value="assettype.Id">{{
                            assettype.Name
                        }}
                        </option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-200">Environment</label>
                    <select v-model="this.selectedSearchEnv"
                        class="input text-sm mt-3 block w-full h-10 rounded border-0 px-2 text-white"
                        @change="this.currentPage = 1">
                        <option class="text-sm" v-for="env in this.assetEnv" :value="env.Id">{{ env.Name }}
                        </option>
                    </select>
                </div>
                <div class="w-wrap flex justify-center pt-8">
                    <button @click="getAssetList()" class="rounded submit-buttons px-2 w-full text-white text-xs font-bold">
                        Search <i :class="ICON_PREFIX + 'search'" class="text-md pl-2"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div
        class="flex-col mx-4 mt-4 overflow-x-auto shadow-md rounded h-max no-scrollbar shadow-lg shadow-black third-degree-form pt-4 px-4">
        <Table :count="this.totalPages" :rows="JSON.parse(this.List)" :withAction="true" @editdata="onEditDetail"
            @deletedata="onDeleteDetail" />
        <Pagination :total-pages="totalPages" :current-page="currentPage" @pagechanged="onPageChange" />
    </div>
    <Teleport to="body">
        <FormsModal :show="form.show" :action="form.action" @close="onFormClose">
            <template #body>
                <form @submit.prevent>
                    <div class="grid grid-cols-4 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="col-start-3">
                            <label class="block text-sm font-medium leading-6 text-gray-200">Asset Type</label>
                            <select v-model="formData.Type"
                                class="input text-sm mt-2 mr-5 block w-full h-10 rounded py-1.5 px-2 text-white">
                                <option class="text-sm" v-for="assettype in this.assetType" :value="assettype.Id">{{
                                    assettype.Name
                                }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium leading-6 text-gray-200">Environment</label>
                            <select v-model="formData.Environment"
                                class="input text-sm mt-2 block w-full h-10 rounded border-0 py-1.5 px-2 text-white"
                                @change="this.currentPage = 1">
                                <option class="text-sm" v-for="env in this.assetEnv" :value="env.Id">{{ env.Name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="grid grid-cols-4 gap-x-6 gap-y-8 sm:grid-cols-6 pt-10">
                        <div class="sm:col-span-3">
                            <label class="block text-sm font-medium leading-6 text-gray-200">Hostname<span
                                    class="text-red-500"> *</span></label>
                            <input v-model="formData.Hostname" type="text"
                                class="input text-white text-sm rounded block w-full p-2.5 input ">
                        </div>

                        <div class="col-span-1">
                            <label class="block text-sm font-medium leading-6 text-gray-200">IP Address<span
                                    class="text-red-500">
                                    *</span></label>
                            <input v-model="formData.IP" type="text"
                                class="input text-white text-sm rounded block w-full p-2.5 input ">
                        </div>

                        <div class="sm:col-span-3">
                            <label class="block text-sm font-medium leading-6 text-gray-200">Operating System (OS)<span
                                    class="text-red-500"> *</span></label>
                            <select v-model="formData.OS" class="input text-sm mr-5 block w-full h-10 rounded px-2 text-white">
                                <option class="text-sm" v-for="OS in this.assetOS" :value="OS.Id">{{
                                    OS.Name
                                }}
                                </option>
                            </select>
                        </div>

                        <div class="sm:col-span-2 sm:col-start-1">
                            <label class="block text-sm font-medium leading-6 text-gray-200">Version<span
                                    class="text-red-500">
                                    *</span></label>
                            <input v-model="formData.Version"
                                class="input text-white text-sm rounded block w-full p-2.5 input">
                        </div>

                        <div class="col-span-full">
                            <label class="block text-sm font-medium leading-6 text-gray-200">Remarks<span
                                    class="text-red-500">
                                    *</span></label>
                            <textarea v-model="formData.Remarks"
                                class="p-2 input text-white text-sm rounded block w-full input" />
                        </div>

                        <div class="sm:col-span-2 sm:col-start-1">
                            <label class="block text-sm font-medium leading-6 text-gray-200">Username<span
                                    class="text-red-500">
                                    *</span></label>
                            <input v-model="formData.Username"
                                class="input text-white text-sm rounded block w-full p-2.5 input ">
                        </div>

                        <div class="sm:col-span-2">
                            <label class="block text-sm font-medium leading-6 text-gray-200">Password<span
                                    class="text-red-500">
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
                </form>
            </template>
            <template #footer>
                <button class="submit-buttons p-2 rounded text-xs" @click="showModal('save')">Submit?</button>
            </template>
        </FormsModal>
        <Confirmation :show="confirmation.show" @close="confirmation.show = false">
            <template #body>
                <h3 class="font-bold">{{ this.confirmation.msg }}</h3>
            </template>
            <template #footer>
                <button class="p-1 rounded text-gray-300 mr-4 text-xs" @click="confirmAction(false)">Nah.</button>
                <button class="submit-buttons p-2 rounded text-xs" @click="confirmAction(true)">Yup!</button>
            </template>
        </Confirmation>
        <Alert :status="alert.status" :show="alert.show" @close="alert.show = false">
            <template #body>
                <h3 class="font-bold">{{ alert.msg }}</h3>
            </template>
        </Alert>
        <Spinner :show="spinner.show" />
    </Teleport>
</template>

<script>
import Table from '../components/Table.vue'
import { ICON_PREFIX } from '../assets/data/globals.json'
import Pagination from '../components/Pagination.vue'
import FormsModal from '../components/FormsModal.vue'
import Spinner from '../components/dialogs/Spinner.vue'
import Confirmation from '../components/dialogs/Confirmation.vue'
import { clearObject, transferArrayToObject, sleep } from '../assets/js/tools.js'
import Alert from '../components/dialogs/Alert.vue'
import { delete_asset, get_asset_environment, get_asset_list, get_asset_os, get_asset_type, upsert_assert } from '../assets/js/asset.js'

export default {
    data() {
        return {
            action: '',
            rawdb: null,
            databases: null,
            selectedDB: '',
            existingDBConn: null,
            showPassword: false,
            assetType: null,
            selectedSearchType: 1,
            assetEnv: null,
            selectedSearchEnv: 1,
            assetOS: null,
            currentPage: 1,
            totalPages: 0,
            selectedId: null,
            search: '',
            List: null,
            formData: {
                Id: 0,
                Type: 1,
                Environment: 1,
                Hostname: null,
                IP: null,
                Version: null,
                OS: 1,
                Remarks: null,
                Username: null,
                Password: null,
            },
            form: {
                show: false,
                action: 'Create'
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
        Pagination,
        Table,
        FormsModal,
        Spinner,
        Confirmation,
        Alert
    },
    methods: {
        onPageChange: function (page) {
            this.currentPage = page
            this.getAssetList()
        },
        onEditDetail: function (data) {
            let os = JSON.stringify(this.assetOS)
            let result = JSON.parse(data)

            result.Id = +result.Id
            result['OS'] = +JSON.parse(os).filter(item => item.Name === result.OS)[0].Id
            result['Type'] = this.selectedSearchType
            result['Environment'] = this.selectedSearchEnv

            this.transferArray(result, 
                {
                    IP: 'IP Address'
                }
            )
            this.createOrEditAssets()
            this.showForm('Edit')
        },
        onDeleteDetail: function(data){

        },
        deleteAsset: async function (data) {
            //TODO: make the deletion of asset work.
            this.spinner.show = false
            let result = await delete_asset(data, db)

            if(result.data.status){
                this.getAssetList()
                this.clearForm()
                this.showAlert(true, `Done! ${result.data.message}`)
            }else{
                this.showAlert(false, `Oops! ${result.data.message}`)
            }
        },
        onFormClose: function (event) {
            if (event) {
                this.form.show = false
                this.clearForm()
            }
        },
        createOrEditAssets: async function () {
            this.spinner.show = false
            let result = await upsert_assert(JSON.stringify(this.formData))

            if(result.data.status){
                this.getAssetList()
                this.clearForm()
                this.showAlert(true, `Saved! ${result.data.message}`)
            }else{
                this.showAlert(false, `Oops! ${result.data.message}`)
            }
        },
        showForm: function (action) {
            this.form.action = action
            this.form.show = true
        },
        getAssetOS: async function () {
            this.assetOS = await get_asset_os().data.message
        },
        getAssetType: async function () {
            this.assetType = await get_asset_type().data.message
        },
        getAssetEnvironment: async function () {
            this.assetEnv = await get_asset_environment().data.message
        },
        getAssetList: async function () {

            this.currentPage = (this.search ? 1 : this.currentPage)

            let details = {
                asset_type_id: this.selectedSearchType,
                asset_environment_id: this.selectedSearchEnv,
                search: this.search
            }
            
            this.List = JSON.stringify(await get_asset_list().data.message)
            this.totalPages = result.data.count
        },
        confirmAction: function (value) {
            if (value) {
                this.form.show = false
                this.spinner.show = true
                sleep(3000).then(() => {
                    if (value && this.action == 'save') {
                        this.createOrEditAssets()
                    }
                    else if (value && this.action == 'delete') {
                        this.onDeleteDetail()
                    }
                })
            } else {
                this.confirmation.show = false
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
        clearForm: function () {
            clearObject(this.formData)
        },
        transferArray: function (array, custom_transfer) {
            transferArrayToObject(this.formData, array, custom_transfer)
        }
    },
    mounted: function () {
        this.getAssetType()
        this.getAssetEnvironment()
        this.getAssetList()
        this.getAssetOS()
    }
}
</script>
