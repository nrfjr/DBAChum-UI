<template>
    <div class="font-bold p-4 text-2xl text-white rounded-md">
        <iframe :src="this.url" width="100%" style="min-height: 75vh; max-height: 90vh;" class="rounded-md" sandbox></iframe>
    </div>
</template>
<script>

export default {
    props: {
        url: null
    }
}
</script>