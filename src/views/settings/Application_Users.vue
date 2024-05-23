<template>
    <div class="flex flex-col gap-4 text-2xl text-white w-full pt-4">
        <div class="flex justify-end h-8">
            <button @click="showForm('Create')" class="rounded create-or-add ml-2 w-32 text-white text-xs font-bold shadow-black shadow-md">New User <i :class="ICON_PREFIX + 'plus'" class="text-md pl-2"></i></button>
        </div>
        <Table :count="this.totalPages" :rows="this.existingAppUsers" :withAction="true" @editdata="onEditDetail"
            @deletedata="onDeleteDetail" />
    </div>
    <Teleport to="body">
        <Forms_Modal :show="form.show" :subject="'User'" :action="form.action" @close="onFormClose">
            <template #body>
                <form @submit.prevent>
                    <div class="grid gap-x-6 gap-y-8 grid-cols-2">
                        <div class="col-span-1">
                            <label class="block text-sm font-medium leading-6 text-gray-200">IP Address<span
                                    class="text-red-500">
                                    *</span></label>
                            <input v-model="formData.IP" type="text"
                                class="input text-white text-sm rounded block w-full p-2.5 input ">
                        </div>

                        <div class="sm:col-span-1">
                            <label class="block text-sm font-medium leading-6 text-gray-200">Username<span
                                    class="text-red-500">
                                    *</span></label>
                            <input v-model="formData.Username"
                                class="input text-white text-sm rounded block w-full p-2.5 input ">
                        </div>

                        <div class="col-span-1 sm:col-start-2">
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
        </Forms_Modal>
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
import { get_existing_application_users, upsert_application_user, delete_application_user } from '/src/assets/js/application.js'
import { ICON_PREFIX } from '/src/assets/data/globals.json'
import Table from '/src/components/Table.vue';
import Forms_Modal from '/src/components/Forms_Modal.vue';
import Confirmation from '/src/components/dialogs/Confirmation.vue';
import Alert from '/src/components/dialogs/Alert.vue';
import { clearObject, transferArrayToObject, sleep } from '/src/assets/js/tools';
import Spinner from '/src/components/dialogs/Spinner.vue';

export default {
    data() {
        return {
            action: null,
            existingAppUsers: null,
            showPassword: false,
            ICON_PREFIX,
            totalPages: 0,
            currentPage: 1,
            formData:{
                Id: null,
                IP: null,
                Username: null,
                Password: null
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
            form: {
                show: false,
                action: 'Create'
            }
        }

    },
    components: {
        Table,
        Forms_Modal,
        Confirmation,
        Alert,
        Spinner
    },
    methods: {
        getExistingUsers: async function () {

            let result = await get_existing_application_users(this.currentPage)
            this.existingAppUsers = result.data.message
            this.totalPages = result.data.count
        },
        confirmAction(value){

            this.confirmation.show = false

            if(value){

                this.spinner.show = true

                sleep(3000).then(() => {
                    if (this.action == 'save') {
                        this.createOrUpdateUser()
                    }
                    else if (this.action == 'delete') {
                        this.deleteUser()
                    }
                })
            }

        },
        createOrUpdateUser: async function(){

            let result =  await upsert_application_user(JSON.stringify(this.formData))
            this.spinner.show = false

            if (result.data.status) {
                this.showAlert(true, 'Saved! ' + result.data.message)
                clearObject(this.formData)
                this.getExistingUsers()
            } else {
                this.showAlert(false, 'Oops! ' + result.data.error)
            }

        },
        deleteUser: async function(){

            let result = await delete_application_user(this.selectedId)
            this.spinner.show = false
            if (result.data.status) {
                this.showAlert(true, 'Success! ' + result.data.message)
                clearObject(this.formData)
                this.getExistingUsers()
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
        onEditDetail: function(data){
            this.transferArray(data)
            this.showForm('Edit')
        },
        onDeleteDetail: function(data){
            this.selectedId = data.Id
            this.showModal('delete')
        },
        showForm: function (action) {
            this.form.action = action
            this.form.show = true
        },
        onFormClose: function (event) {
            if (event) {
                this.form.show = false
                this.clearForm()
            }
        },
        clearForm: function () {
            clearObject(this.formData)
        },
        transferArray: function (array, custom_transfer) {
            transferArrayToObject(this.formData, array, custom_transfer)
        }
    },
    mounted: function () {
        this.getExistingUsers()
    }
}
</script>