import { createWebHistory, createRouter } from "vue-router"

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../../views/Login.vue'),
    },
    {
        path: "/home",
        name: 'Homepage',
        component: () => import('../../views/Homepage.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;