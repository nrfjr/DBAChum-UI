<script>
import { ICON_PREFIX } from '../../assets/js/globals.js'

export default {
    props: {
        show: {
            type: Boolean,
            default: false,
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
    <Transition name="confirmation">
        <div v-if="show" class="confirmation-mask text-white" @click="$emit('close')">
            <div class="confirmation-container rounded shadow-md">
                <div class="confirmation-header">
                    <button class="float-right" @click="$emit('close')"><i :class="ICON_PREFIX + 'times'"></i></button>
                </div>

                <div class="confirmation-body my-10 text-center">
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
.confirmation-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.confirmation-container {
    width: 300px;
    margin: auto;
    padding: 20px 30px;
    background-color: #35383E;
    transition: all 0.3s ease;
}

.confirmation-header h3 {
    margin-top: 0;
    color: #42b983;
}

.confirmation-enter-from {
    opacity: 0;
}

.confirmation-leave-to {
    opacity: 0;
}

.confirmation-enter-from .confirmation-container,
.confirmation-leave-to .confirmation-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>