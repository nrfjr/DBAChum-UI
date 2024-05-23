<script>
import { ICON_PREFIX } from '/src/assets/data/globals.json'

export default {
    props: {
        show: {
            type: Boolean,
            default: false,
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
    <Transition name="spinner">
        <div v-if="show" class="spinner-mask text-white">
            <div class="spinner-container rounded">
                <div class="spinnerBody"> <svg class="pl" viewBox="0 0 200 200" width="100" height="100"
                        xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                                <stop offset="0%" stop-color="hsl(235, 86%, 65%)" />
                                <stop offset="100%" stop-color="hsl(239, 100%, 64%)" />
                            </linearGradient>
                            <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stop-color="hsl(235, 86%, 65%)" />
                                <stop offset="100%" stop-color="hsl(239, 100%, 64%)" />
                            </linearGradient>
                        </defs>
                        <circle class="pl__ring" cx="100" cy="100" r="82" fill="none" stroke="url(#pl-grad1)"
                            stroke-width="36" stroke-dasharray="0 257 1 257" stroke-dashoffset="0.01" stroke-linecap="round"
                            transform="rotate(-90,100,100)" />
                        <line class="pl__ball" stroke="url(#pl-grad2)" x1="100" y1="18" x2="100.01" y2="182"
                            stroke-width="36" stroke-dasharray="1 165" stroke-linecap="round" />
                    </svg>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style>
.spinner-mask {
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

.spinner-container {
    width: 300px;
    margin: auto;
    padding: 20px 30px;
    background-color: transparent;
    transition: all 0.3s ease;
}

.spinner-enter-from {
    opacity: 0;
}

.spinner-leave-to {
    opacity: 0;
}

.spinner-enter-from .spinner-container,
.spinner-leave-to .spinner-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.spinnerBody {
    background: var(--bg);
    color: var(--fg);
    font: 1em/1.5 sans-serif;
    height: 100vh;
    display: grid;
    place-items: center;
}

.pl {
    display: block;
    width: 6.25em;
    height: 6.25em;
}

.pl__ring,
.pl__ball {
    animation: ring 2s ease-out infinite;
}

.pl__ball {
    animation-name: ball;
}


/* Animation */
@keyframes ring {
    from {
        stroke-dasharray: 0 257 0 0 1 0 0 258;
    }

    25% {
        stroke-dasharray: 0 0 0 0 257 0 258 0;
    }

    50%,
    to {
        stroke-dasharray: 0 0 0 0 0 515 0 0;
    }
}

@keyframes ball {

    from,
    50% {
        animation-timing-function: ease-in;
        stroke-dashoffset: 1;
    }

    64% {
        animation-timing-function: ease-in;
        stroke-dashoffset: -109;
    }

    78% {
        animation-timing-function: ease-in;
        stroke-dashoffset: -145;
    }

    92% {
        animation-timing-function: ease-in;
        stroke-dashoffset: -157;
    }

    57%,
    71%,
    85%,
    99%,
    to {
        animation-timing-function: ease-out;
        stroke-dashoffset: -163;
    }
}
</style>