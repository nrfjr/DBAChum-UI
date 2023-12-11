<template>
    <div class="p-4 rounded third-degree-form shadow-md shadow-black w-full h-full">
        <div class="pb-4">
            <span class="text-white text-md">Profile Image</span>
            <div class="bg-transparent border-dashed border-gray-600 border-2 rounded mt-6"
                :class="profileImage.length > 0 ? '' : 'p-20'" @dragover.prevent="dragover" @dragleave.prevent="dragleave"
                @drop.prevent="dropProfile">
                <input type="file" id="profileImageInput" class="hidden" @change="onProfileChange" ref="file"
                    accept="image/jpeg,image/png,image/jpg" />

                <label for="profileImageInput" class="file-label">
                    <div class="text-white italic text-xs text-center">
                        <div v-if="isDragging && profileImage.length == 0">Release to drop files here.</div>
                        <div v-else-if="isDragging == false && profileImage.length == 0">Drop new profile image here or
                            <u>click
                                here</u> to
                            upload.
                        </div>
                    </div>
                </label>

                <div class="flex justify-center" v-if="profileImage.length">
                    <div v-for=" file  in  profileImage " :key="file.name" class="flex m-4 p-4">
                        <div>
                            <img class="rounded" height="150" width="150" :src="generateThumbnail(file)" />
                            <p :title="file.name" class="text-gray-300 text-xs italic text-center">
                                {{ file.name }}
                            </p>
                        </div>
                        <div>
                            <button class="ml-2 text-red-600" type="button"
                                @click="removeImage(profileImage, profileImage.indexOf(file))" title="Remove file">
                                <i :class="ICON_PREFIX + 'times'"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr class="divider">
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
                        <div v-else-if="isDragging == false && logoImage.length == 0">Drop new profile image here or
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

import { ICON_PREFIX } from '../../assets/js/globals';
import Alert from '../../components/dialogs/Alert.vue';
import Confirmation from '../../components/dialogs/Confirmation.vue';
import Spinner from '../../components/dialogs/Spinner.vue';
import { sleep } from '../../assets/js/tools';
import { updatePreferences } from '../../assets/js/preference';

export default {
    data() {
        return {
            isDragging: false,
            profileImage: [],
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

            if (this.logoImage[0] || this.profileImage[0]) {

                let newPreference = new FormData()
                newPreference.append('newProfile', this.profileImage[0])
                newPreference.append('newLogo', this.logoImage[0])

                let result = await updatePreferences(newPreference)

                if (result.data.status) {
                    this.showAlert(result.data.status, 'Success! ' + result.data.message)
                    this.clearForm()
                    getImage()
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
        onProfileChange: function () {
            const file = [...this.$refs.file.files][0];
            const extensions = ["jpg", "png", "jpeg"];
            if (!extensions.includes(file.name.split(".")[1])) {
                this.showAlert(false, 'Only .PNG, .JPEG and .JPG format are allowed!')
            } else {
                this.profileImage = [...this.$refs.file.files];
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
            this.profileImage = []
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

        dropProfile: function (e) {
            this.$refs.file.files = e.dataTransfer.files;
            this.onProfileChange();
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