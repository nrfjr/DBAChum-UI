<template>
    <div class="font-bold p-4 text-2xl text-white">
        Roles and Privileges
    </div>
    <Teleport v-if="this.ctmdropdown" to="#ctmdropdown">
        <div v-if="this.visible.dropdown" class="flex">
            <select v-model="this.store.state.databases.Id" class="input block w-fit rounded border-0 py-1 px-2 text-white">
                <option v-for="item in this.existingDBConn" :value="item.Id">{{ item.IP }}
                </option>
            </select>
        </div>
    </Teleport>
</template>

<script>
import { get_existing_db_connection } from '/src/assets/js/database.js'
import { useStore } from 'vuex'

export default{

    data(){
        return{
            selectedSubmodule: null,
            existingDBConn: null,
            store: useStore(),
            visible:{
                dropdown: null
            },
            ctmdropdown: false
        }
    },
    methods:{

        getExistingConnections: async function(){
            let result = await get_existing_db_connection('Oracle')
            if (result.data.status) {
                this.existingDBConn = result.data.message
                this.store.state.databases.Id = (this.store.state.databases.Id) ? this.store.state.databases.Id : this.existingDBConn[0].Id
            } else {
                this.existingDBConn = null
            }
        }
    },
    mounted: function (){
        this.visible.dropdown = true
        this.ctmdropdown = document.querySelector('#ctmdropdown') ? true : false
        this.getExistingConnections()
    }
}

</script>