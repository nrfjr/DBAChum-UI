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
import { get_sidebar_modules } from "./module"
import { defineAsyncComponent } from "vue"

const routes = [
    {
        path: '/',
        redirect: 'login',
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
                            module: Empty
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
                            module: Settings
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
                            module: Email
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

create_sidebar_modules_route()
console.log(routes)

export async function create_sidebar_modules_route(){
    let result = await get_sidebar_modules()
    let modules = result.data.message

    for (let i in modules){
        routes[0].children.push(
            {
                path: modules[i].name.toLowerCase(),
                components: { init: Homepage },
                children:
                [
                    {
                        path: '',
                        components:
                        {
                            module: defineAsyncComponent(() => import(`/src/views/Assets_Management.vue`))
                        }
                    }
                ]

            }
        )
    }
}