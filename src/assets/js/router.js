import { createWebHistory, createRouter } from "vue-router"
import Login from "/src/views/Login.vue"
import Homepage from "/src/views/Homepage.vue"
import Empty from "/src/components/Empty.vue"
import Settings from "/src/views/Settings.vue"
import Connections from "/src/views/settings/Connections.vue"
import Modules from "/src/views/settings/Modules.vue"
import Disk_Servers from "/src/views/settings/Disk_Servers.vue"
import Preferences from "/src/views/settings/Preferences.vue"
import Advance_Settings from "/src/views/settings/Advance_Settings.vue"
import Email from "/src/views/Email.vue"
import Disks_Storage from '/src/views/Disks_Storage.vue'
import User_Management from '/src/views/User_Management.vue'
import Contacts from '/src/views/Contacts.vue'
import Assets_Management from '/src/views/Assets_Management.vue'
import Not_Found from '/src/components/Not_Found.vue'
import Oracle_Dashboard from '/src/views/oracle/Dashboard.vue'
import MySQL_Dashboard from '/src/views/mysql/Dashboard.vue'
import MSSQL_Dashboard from '/src/views/mssql/Dashboard.vue'
import Maria_Dashboard from '/src/views/maria/Dashboard.vue'
import Flash_Recovery from '/src/views/oracle/Flash_Recovery.vue'
import Growth from '/src/views/oracle/Growth.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/:catchAll(.*)*',
            components:
            {
                init: Not_Found
            }
        },
        {
            path: '',
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
                                    components: {
                                        homeview: Settings
                                    },
                                    children:
                                        [
                                            {
                                                path: '',
                                                redirect: '/settings/connections'
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
                    },
                    {
                        path: 'databases',
                        children:
                            [
                                {
                                    path: '',
                                    redirect: 'databases/oracle'
                                },
                                {
                                    path: 'oracle',
                                    components: {
                                        init: Homepage,
                                    },
                                    children:
                                        [
                                            {
                                                path: '',
                                                redirect: '/databases/oracle/dashboard'
                                            },
                                            {
                                                path: 'dashboard',
                                                components:
                                                {
                                                    homeview: Oracle_Dashboard
                                                }
                                            },
                                            {
                                                path: 'flash_recovery',
                                                components:
                                                {
                                                    homeview: Flash_Recovery
                                                }
                                            },
                                            {
                                                path: 'growth',
                                                components:
                                                {
                                                    homeview: Growth
                                                }
                                            }
                                        ]
                                },
                                {
                                    path: 'mysql',
                                    components: {
                                        init: Homepage,
                                    },
                                    children:
                                        [
                                            {
                                                path: '',
                                                redirect: '/databases/mysql/dashboard'
                                            },
                                            {
                                                path: 'dashboard',
                                                components:
                                                {
                                                    homeview: MySQL_Dashboard
                                                }
                                            }
                                        ]
                                },
                                {
                                    path: 'mssql',
                                    components: {
                                        init: Homepage,
                                    },
                                    children:
                                        [
                                            {
                                                path: '',
                                                redirect: '/databases/mssql/dashboard'
                                            },
                                            {
                                                path: 'dashboard',
                                                components:
                                                {
                                                    homeview: MSSQL_Dashboard
                                                }
                                            }
                                        ]
                                },
                                {
                                    path: 'maria',
                                    components: {
                                        init: Homepage,
                                    },
                                    children:
                                        [
                                            {
                                                path: '',
                                                redirect: '/databases/maria/dashboard'
                                            },
                                            {
                                                path: 'dashboard',
                                                components:
                                                {
                                                    homeview: Maria_Dashboard
                                                }
                                            }
                                        ]
                                }

                            ]
                    },
                    {
                        path: 'disks_storage',
                        components: {
                            init: Homepage,
                        },
                        children:
                            [
                                {
                                    path: '',
                                    components:
                                    {
                                        homeview: Disks_Storage
                                    }
                                }
                            ]
                    },
                    {
                        path: 'manage_users',
                        components: {
                            init: Homepage,
                        },
                        children:
                            [
                                {
                                    path: '',
                                    components:
                                    {
                                        homeview: User_Management
                                    }
                                }
                            ]
                    },
                    {
                        path: 'contacts',
                        components: {
                            init: Homepage,
                        },
                        children:
                            [
                                {
                                    path: '',
                                    components:
                                    {
                                        homeview: Contacts
                                    }
                                }
                            ]
                    },
                    {
                        path: 'assets_management',
                        components: {
                            init: Homepage,
                        },
                        children:
                            [
                                {
                                    path: '',
                                    components:
                                    {
                                        homeview: Assets_Management
                                    }
                                }
                            ]
                    },
                ]
        }
    ]
});

export default router;
