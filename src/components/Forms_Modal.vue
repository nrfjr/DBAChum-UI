<script>
import { ICON_PREFIX } from '../assets/data/globals.json'

export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        action: {
            type: String,
            default: 'Create',
        },
    },
    data: () => {
        return {
            ICON_PREFIX
        }
    }
}
</script>

<template>
    <Transition name="assets">
        <div v-if="show" class="assets-mask text-white">
            <div class="assets-container rounded shadow-md">
                <div class="assets-header flex justify-between">
                    <slot name="header">{{ this.action }} Asset</slot>
                    <button class="float-right" @click="this.$emit('close', true)"><i
                            :class="ICON_PREFIX + 'times'"></i></button>
                </div>

                <div class="assets-body my-10">
                    <slot name="body">default body</slot>
                </div>

                <div class="flex justify-end">
                    <slot name="footer">
                    </slot>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
.assets-mask {
    position: fixed;
    z-index: 8888;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.assets-container {
    width: 50%;
    height: fit-content;
    margin: auto;
    padding: 20px 30px;
    background-color: #35383E;
    transition: all 0.3s ease;
}

.assets-header h3 {
    margin-top: 0;
    color: #42b983;
}

.assets-enter-from {
    opacity: 0;
}

.assets-leave-to {
    opacity: 0;
}

.assets-enter-from .assets-container,
.assets-leave-to .assets-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>