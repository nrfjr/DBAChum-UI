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
    </Teleport>
</template>

<script>
import { get_existing_application_users } from '/src/assets/js/application.js'
import { ICON_PREFIX } from '/src/assets/data/globals.json'
import Table from '../../components/Table.vue';
import Forms_Modal from '../../components/Forms_Modal.vue';
import { clearObject, transferArrayToObject } from '../../assets/js/tools';

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
            form: {
                show: false,
                action: 'Create'
            }
        }

    },
    components: {
        Table,
        Forms_Modal
    },
    methods: {
        getExistingUsers: async function () {

            let result = await get_existing_application_users(this.currentPage)
            this.existingAppUsers = result.data.message
            this.totalPages = result.data.count
        },
        onEditDetail: function(data){
            this.transferArray(data)
            this.showForm('Edit')
        },
        onDeleteDetail: function(data){
            alert(data)
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