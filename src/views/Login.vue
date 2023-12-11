<template>
    <section class="login-bg">
        <div class="custom-shape-divider-top absolute">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path
                    d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                    class="shape-fill"></path>
            </svg>
        </div>
        <div class="flex flex-col items-center px-6 py-24 mx-auto h-screen lg:py-0">
            <a class="flex items-center mb-6 text-4xl font-semibold text-gray-900 dark:text-white">
                <img class="h-16 w-24" alt="Company Logo" v-bind:src="this.logo" />
                <hr class="border h-12 m-4 ">
                <h1 class="login-brand-title text-opacity-0">
                    <span class="text-wrapper">
                        <span class="letters">DBAChum</span>
                    </span>
                </h1>
            </a>
            <div class="max-xs:w-full max-md:w-full w-1/3 bg-white rounded shadow login-form shadow-xl">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                        Sign-in to your account
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="submit">
                        <div>
                            <label
                                :class="{ 'text-gray-300 ': this.login.loginStatus, 'text-red-400 italic ': !this.login.loginStatus }"
                                class="block mb-1 text-xs font-medium">USERNAME
                                <span v-if="this.login.loginStatus" class="login-error-msg italic text-red-400">*</span>
                                <span v-else class="login-error-msg italic text-red-400 text-2"> - Invalid username!</span>
                            </label>
                            <input type="text" v-model="login.username"
                                class="text-white sm:text-sm rounded block w-full p-2.5 input"
                                oninput="this.value = this.value.toUpperCase();" required>
                        </div>
                        <div>
                            <label
                                :class="{ 'text-gray-300 ': this.login.loginStatus, 'text-red-400 italic ': !this.login.loginStatus }"
                                class="block mb-1 text-xs font-medium">PASSWORD
                                <span v-if="this.login.loginStatus" class="login-error-msg italic text-red-400">*</span>
                                <span v-else class="login-error-msg italic text-red-400 text-2"> - Invalid password!</span>
                            </label>
                            <input type="password" v-model="login.password"
                                class="text-white sm:text-sm rounded block w-full p-2.5 input" required>
                            <button type="button" onclick="alert('Just relax, calm down and try to remember it again.');"
                                class="text-xs font-medium text-indigo-300 hover:underline dark:text-primary-500">Forgot
                                your
                                password?</button>
                        </div>
                        <button type="submit"
                            class="w-full text-white font-medium rounded-sm text-xs px-5 py-2.5 text-center login-button">Sign
                            in</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="custom-shape-divider-bottom">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    class="shape-fill"></path>
            </svg>
        </div>
        <footer class="fixed bottom-0 w-full flex items-center justify-start text-xs text-white h-6 md:justify-center">
            <p class="ml-2 absolute left-0">nrfjr &copy; 2023, All Rights reserved.</p>
        </footer>
    </section>
</template>

<script>
import anime from 'animejs'
import { getLogoImage } from '../assets/js/preference'
import { validateLogin } from '../assets/js/login'
import { sleep } from '../assets/js/tools'

export default {
    data() {
        return {
            login: {
                username: '',
                password: '',
                loginStatus: true,
            },
            logo: 'src/assets/images/company.png'
        }
    },
    methods: {
        submit: async function () {

            let USERNAME = this.login.username.toUpperCase()

            this.login.loginStatus = await validateLogin(USERNAME, this.login.password)


            if (this.login.loginStatus) {
                this.$router.push('/home')
            }

        },
        getImage: async function () {

            let result = await getLogoImage()

            if (result.data.status) {
                this.logo = 'data:image/jpeg;base64,' + result.data.message
            }

        },
        brandTitle_anime: function () {
            anime({
                targets: '.login-brand-title',
                keyframes: [
                    {
                        translateX: 0,
                        opacity: 0,
                        duration: 500,
                    },
                    {
                        translateX: -80,
                        opacity: 1,
                        duration: 500,
                    },
                ],
                easing: 'easeInOutQuad',
                loop: false,
            });
        },
        form_anime: function () {
            anime({
                targets: '.login-form',
                keyframes: [
                    {
                        translateY: -50,
                        opacity: 0,
                        duration: 100,
                    },
                    {
                        translateY: 0,
                        opacity: 1,
                        duration: 500,
                    },
                ],
                easing: 'easeInOutQuad',
                loop: false
            });
        },
    },
    mounted: function () {
        this.getImage()
        this.brandTitle_anime()
        this.form_anime()
    }
}
</script>