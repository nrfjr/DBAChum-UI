<template>
    <div class="flex flex-col gap-4 text-2xl text-white w-full">
        <div class="flex justify-end h-8">
            <button class="rounded create-or-add ml-2 w-32 text-white text-xs font-bold shadow-black shadow-md">New User <i :class="ICON_PREFIX + 'plus'" class="text-md pl-2"></i></button>
        </div>
        <Table :count="this.totalPages" :rows="JSON.parse(this.existingAppUsers)" :withAction="true" @editdata="onEditDetail"
            @deletedata="onDeleteDetail" />
    </div>
</template>

<script>
import { get_existing_application_users } from '/src/assets/js/application.js'
import { ICON_PREFIX } from '/src/assets/data/globals.json'
import Table from '../../components/Table.vue';

export default {
    data() {
        return {
            action: null,
            existingAppUsers: null,
            ICON_PREFIX,
            totalPages: 0,
            currentPage: 1
        }

    },
    components: {
        Table
    },
    methods: {
        getExistingUsers: async function () {

            let result = await get_existing_application_users(this.currentPage)
            this.existingAppUsers = JSON.stringify(result.data.message)
            this.totalPages = result.data.count

            console.log(this.existingAppUsers)
        },
        onEditDetail: function(data){
            alert(data)
        },
        onDeleteDetail: function(data){
            alert(data)
        }
    },
    mounted: function () {
        this.getExistingUsers()
    }
}
</script>