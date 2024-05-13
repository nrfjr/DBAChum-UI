import { createWebHistory, createRouter } from "vue-router"
import Login from "../../views/Login.vue"
import Homepage from "../../views/Homepage.vue"
import Empty from "../../components/Empty.vue"
import Settings from "../../views/Settings.vue"
import Connections from "../../views/settings/Connections.vue"
import Modules from "../../views/settings/Modules.vue"
import Disk_Servers from "../../views/settings/Disk_Servers.vue"
import Preferences from "../../views/settings/Preferences.vue"
import Advance_Settings from "../../views/settings/Advance_Settings.vue"
import Email from "../../views/Email.vue"
import { ROOT_PATH } from '../data/globals.json'

const routes = [
    {
        path: '',
        redirect: `${ROOT_PATH}`
    },
    {
        path: `${ROOT_PATH}`,
        redirect: `${ROOT_PATH}/login`,
        children:
        [
            {
                path: 'login',
                components: 
                {
                    init: Login
                }
            },
            {
                path: 'home',
                components: 
                {
                    init: Homepage
                },
                children: 
                [
                    {
                        path: '',
                        components: {
                            homeview: Empty
                        }
                    }
                ]
            },
            {
                path: 'settings',
                components: {
                    init: Homepage,
                },
                children:
                [
                    {
                        path: '',
                        components:{
                            homeview: Settings
                        },
                        children:
                        [
                            {
                                path: '',
                                redirect: 'settings/connections'
                            },
                            {
                                path: 'connections',
                                components: {
                                    tab: Connections
                                }
                            },
                            {
                                path: 'modules',
                                components: {
                                    tab: Modules
                                }
                            },
                            {
                                path: 'disk_servers',
                                components: {
                                    tab: Disk_Servers
                                }
                            },
                            {
                                path: 'preferences',
                                components: {
                                    tab: Preferences
                                }
                            },
                            {
                                path: 'advance_settings',
                                components: {
                                    tab: Advance_Settings
                                }
                            },

                        ]
                    }
                ]
            },
            {
                path: 'email',
                components: {
                    init: Homepage,
                },
                children: 
                [
                    {
                        path: '',
                        components:
                        {
                            homeview: Email
                        }
                    }
                ]
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
