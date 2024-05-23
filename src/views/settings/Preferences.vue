<template>
<div class="w-[40%] flex justify-center">
    <div class="p-4 rounded third-degree-form shadow-md shadow-black w-full h-full">
        <div>
            <span class="text-white text-md">Logo</span>
            <div class="bg-transparent border-dashed border-gray-600 border-2 rounded mt-6"
                :class="logoImage.length > 0 ? '' : 'p-20'" @dragover.prevent="dragover" @dragleave.prevent="dragleave"
                @drop.prevent="dropLogo">
                <input type="file" id="logoImageInput" class="hidden" @change="onLogoChange" ref="file"
                    accept="image/jpeg,image/png,image/jpg" />

                <label for="logoImageInput" class="file-label">
                    <div class="text-white italic text-xs text-center">
                        <div v-if="isDragging && logoImage.length == 0">Release to drop files here.</div>
                        <div v-else-if="isDragging == false && logoImage.length == 0">Drop new image here or
                            <u>click
                                here</u> to
                            upload.
                        </div>
                    </div>
                </label>

                <div class="flex justify-center" v-if="logoImage.length">
                    <div v-for=" file  in  logoImage " :key="file.name" class="flex m-4 p-4">
                        <div>
                            <img class="rounded" height="150" width="150" :src="generateThumbnail(file)" />
                            <p :title="file.name" class="text-gray-300 text-xs italic text-center">
                                {{ file.name }}
                            </p>
                        </div>
                        <div>
                            <button class="ml-2 text-red-600" type="button"
                                @click="removeImage(logoImage, logoImage.indexOf(file))" title="Remove file">
                                <i :class="ICON_PREFIX + 'times'"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-end pt-10">
            <button @click="showModal('save')" class="rounded submit-buttons p-2 text-white text-xs font-bold">
                Submit?
            </button>
        </div>
    </div>
</div>
    <Teleport to="body">
        <Alert :status="alert.status" :show="alert.show" @close="alert.show = false">
            <template #body>
                <h3 class="font-bold">{{ alert.msg }}</h3>
            </template>
        </Alert>
        <Confirmation :show="confirmation.show" @close="confirmation.show = false">
            <template #body>
                <h3 class="font-bold">{{ this.confirmation.msg }}</h3>
            </template>
            <template #footer>
                <button class="p-1 rounded text-gray-300 mr-4 text-xs" @click="confirmAction(false)">Nah.</button>
                <button class="submit-buttons p-2 rounded text-xs" @click="confirmAction(true)">Yup!</button>
            </template>
        </Confirmation>
        <Spinner :show="spinner.show" />
    </Teleport>
</template>

<script>

import Alert from '/src/components/dialogs/Alert.vue';
import Confirmation from '/src/components/dialogs/Confirmation.vue';
import Spinner from '/src/components/dialogs/Spinner.vue';
import { sleep } from '/src/assets/js/tools';
import { ICON_PREFIX } from '/src/assets/data/globals.json'
import { update_preference } from '/src/assets/js/resource';

export default {
    data() {
        return {
            isDragging: false,
            logoImage: [],
            ICON_PREFIX,
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
        };
    },
    components: {
        Confirmation,
        Alert,
        Spinner
    },
    methods: {
        submitUpdate: async function () {

            this.spinner.show = false

            if (this.logoImage[0]) {

                let newPreference = new FormData()
                newPreference.append('newLogo', this.logoImage[0])

                let result = await update_preference('save_preference', newPreference)

                if (result.data.status) {
                    this.showAlert(result.data.status, 'Success! ' + result.data.message)
                    this.clearForm()
                } else {
                    this.showAlert(result.data.status, 'Oops! ' + result.data.error)
                }

            } else {
                this.showAlert(false, 'Oops! No image has been detected!')
            }


        },
        showAlert: function (status, message) {
            this.alert.status = status
            this.alert.msg = message
            this.alert.show = true
        },
        showModal: function (action) {
            this.action = action
            this.confirmation.msg = 'Are you sure to ' + action + ' these preferences?'
            this.confirmation.show = true
        },
        confirmAction: function (value) {

            this.confirmation.show = false

            if (value) {

                this.spinner.show = true

                sleep(3000).then(() => {
                    this.submitUpdate()

                })
            }
        },
        onLogoChange: function () {
            const file = [...this.$refs.file.files][0];
            const extensions = ["jpg", "png", "jpeg"];
            if (!extensions.includes(file.name.split(".")[1])) {
                this.showAlert(false, 'Only .PNG, .JPEG and .JPG format are allowed!')
            } else {
                this.logoImage = [...this.$refs.file.files];
            }
        },

        generateThumbnail: function (file) {
            let fileSrc = URL.createObjectURL(file);
            setTimeout(() => {
                URL.revokeObjectURL(fileSrc);
            }, 1000);
            return fileSrc;
        },

        clearForm: function () {
            this.logoImage = []
        },

        removeImage: function (array, index) {
            array.splice(index, 1);
        },

        dragover: function () {
            this.isDragging = true;
        },

        dragleave: function () {
            this.isDragging = false;
        },
        dropLogo: function (e) {
            this.$refs.file.files = e.dataTransfer.files;
            this.onLogoChange();
            this.isDragging = false;

        },
        handleChange(e) {
            const file = e.target.files[0];
            const extensions = ["jpg", "png", "jpeg"];
            if (!extensions.includes(file.name.split(".")[1])) {
                this.showAlert(false, 'Only .PNG, .JPEG and .JPG format are allowed.')
            }
        }
    },
};
</script>