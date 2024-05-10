<script>
import { ICON_PREFIX } from '../../assets/data/globals.json'

export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    data: () => {
        return {
            ICON_PREFIX
        }
    }
}
</script>

<template>
    <Transition name="alert">
        <div v-if="show" class="alert-mask text-white" @click="$emit('close')">
            <div class="alert-container rounded shadow-md">
                <div class="alert-header">
                </div>

                <div :class="'alert-body my-10 text-center ' + (status ? 'text-green-400' : 'text-red-400')">
                    <slot name="body">default body</slot>
                </div>

                <div class="flex justify-end">
                    <button class="submit-buttons p-2 rounded text-xs" @click="$emit('close')">Aight.</button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
.alert-mask {
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

.alert-container {
    width: 20%;
    margin: auto;
    padding: 20px 30px;
    background-color: #35383E;
    transition: all 0.3s ease;
}

.alert-header h3 {
    margin-top: 0;
    color: #42b983;
}

.alert-enter-from {
    opacity: 0;
}

.alert-leave-to {
    opacity: 0;
}

.alert-enter-from .alert-container,
.alert-leave-to .alert-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>