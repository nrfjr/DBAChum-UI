<template>
    <div class="font-bold p-4 text-2xl text-white">
        Email
    </div>
    <Web_View :url="this.url" />
</template>
<script>
import { get_email_url } from '/src/assets/js/setting'
import Web_View from '/src/components//Web_View.vue'

export default{

    data(){
        return{
            url: 'http://google.com/'
        }
    },
    components: {
        Web_View
    },
    methods: {
        getURL: async function () {
            let result = await get_email_url()
            if (result.data.status) {
                this.url = result.data.message
            } 
        }
    },
    mounted: function () {
        this.getURL()
    }
}

</script>