<template>
    <div class="font-bold p-4 text-2xl text-white">
        Oracle
    </div>
    <Teleport to="#ctmdropdown">
        <div v-if="this.visible.dropdown" class="flex">
            <select class="input block w-48 rounded border-0 py-1 text-white">
                <option v-for="server_type in ['AIX', 'Linux']" :value="server_type">{{ server_type }}
                </option>
            </select>
            <hr class="border h-6 my-1 mx-4">
            <select class="input block w-48 rounded border-0 py-1 text-white">
                <option v-for="server_type in ['AIX', 'Linux']" :value="server_type">{{ server_type }}
                </option>
            </select>
        </div>
    </Teleport>
</template>

<script>

import { shallowRef, watchEffect } from 'vue';

export default{

    data(){
        return{
            visible:{
                dropdown: null
            }
        }
    },
    methods:{

    },
    mounted: function (){
        this.visible.dropdown = true
    },
    unmounted: function(){
        this.visible.dropdown = false
    }

}

</script>