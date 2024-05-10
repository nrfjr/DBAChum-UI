<template>
    <div class="font-bold p-4 text-2xl text-white">
        Email
    </div>
    <WebView :url="this.url" />
</template>
<script>
import { get_email_url } from '../assets/js/setting'
import WebView from '../components/WebView.vue'

export default{

    data(){
        return{
            url: 'http://google.com/'
        }
    },
    components: {
        WebView
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