<template>
    <div class="font-bold p-4 text-2xl text-white">
        Dashboard
    </div>
    <Teleport v-if="this.ctmdropdown" to="#ctmdropdown">
        <div v-if="this.visible.dropdown" class="flex">
            <select class="input block w-48 rounded border-0 py-1 text-white">
                <option v-for="item in this.existingDBConn" :value="item.Id">{{ item.IP }}
                </option>
            </select>
            <hr class="border h-6 my-1 mx-4">
        </div>
    </Teleport>
</template>

<script>
import { get_existing_db_connection } from '/src/assets/js/database.js'

export default{

    data(){
        return{
            existingDBConn: null,
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