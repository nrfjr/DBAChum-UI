import { createWebHistory, createRouter } from "vue-router"
import Login from "/src/views/Login.vue"
import Homepage from "/src/views/Homepage.vue"
import Empty from "/src/components/Empty.vue"
import Not_Found from '/src/components/Not_Found.vue'


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
                                        homeview: () => import('/src/views/Settings.vue')
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
                                                    tab: () => import('/src/views/settings/Connections.vue')
                                                }
                                            },
                                            {
                                                path: 'modules',
                                                components: {
                                                    tab: () => import('/src/views/settings/Modules.vue')
                                                }
                                            },
                                            {
                                                path: 'disk_servers',
                                                components: {
                                                    tab: () => import('/src/views/settings/Disk_Servers.vue')
                                                }
                                            },
                                            {
                                                path: 'preferences',
                                                components: {
                                                    tab: () => import('/src/views/settings/Preferences.vue')
                                                }
                                            },
                                            {
                                                path: 'advance_settings',
                                                components: {
                                                    tab: () => import('/src/views/settings/Advance_Settings.vue')
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
                                        homeview: () => import('/src/views/Email.vue')
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
                                                    homeview: () => import('/src/views/oracle/Dashboard.vue')
                                                }
                                            },
                                            {
                                                path: 'flash_recovery',
                                                components:
                                                {
                                                    homeview: () => import('/src/views/oracle/Flash_Recovery.vue')
                                                }
                                            },
                                            {
                                                path: 'growth',
                                                components:
                                                {
                                                    homeview: () => import('/src/views/oracle/Growth.vue')
                                                }
                                            },
                                            {
                                                path: 'monitor',
                                                children: 
                                                [
                                                    {
                                                        path: '',
                                                        redirect: '/databases/oracle/monitor/user_sessions'
                                                    },
                                                    {
                                                        path: 'user_sessions',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/monitor/sessions/User.vue')
                                                        }
                                                    },
                                                    {
                                                        path: 'locked_sessions',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/monitor/sessions/Locked.vue')
                                                        }
                                                    },
                                                    {
                                                        path: 'redo_log_switches',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/monitor/redo_log/Switches.vue')
                                                        }
                                                    },
                                                    {
                                                        path: 'redo_log_generation',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/monitor/redo_log/Generation.vue')
                                                        }
                                                    },
                                                    {
                                                        path: 'top_sessions',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/monitor/sessions/Top.vue')
                                                        }
                                                    },
                                                    {
                                                        path: 'archive_log',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/monitor/Archive_Log.vue')
                                                        }
                                                    },
                                                    {
                                                        path: 'tables',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/monitor/Tables.vue')
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                path: 'performance',
                                                children: 
                                                [
                                                    {
                                                        path: '',
                                                        redirect: '/databases/oracle/performance/pga_ta'
                                                    },
                                                    {
                                                        path: 'pga_ta',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/performance/advisor/PGA_Target.vue')
                                                        }
                                                    },
                                                    {
                                                        path: 'sga_ta',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/performance/advisor/SGA_Target.vue')
                                                        }
                                                    },
                                                    {
                                                        path: 'buffer_ca',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/performance/advisor/Buffer_Cache.vue')
                                                        }
                                                    },
                                                    {
                                                        path: 'hit_ratio',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/performance/Hit_Ratio.vue')
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                path: 'security',
                                                children: 
                                                [
                                                    {
                                                        path: '',
                                                        redirect: '/databases/oracle/security/roles_and_privileges'
                                                    },
                                                    {
                                                        path: 'roles_and_privileges',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/security/Roles_and_Privileges.vue')
                                                        }
                                                    },
                                                    {
                                                        path: 'ldif_creation',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/security/LDIF_Creation.vue')
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                path: 'objects',
                                                children: 
                                                [
                                                    {
                                                        path: '',
                                                        redirect: '/databases/oracle/security/datafile_layout'
                                                    },
                                                    {
                                                        path: 'datafile_layout',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/objects/Datafile_Layout.vue')
                                                        }
                                                    },
                                                    {
                                                        path: 'invalid',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/objects/Datafile_Layout.vue')
                                                        }
                                                    },
                                                    {
                                                        path: 'statistics',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/objects/Statistics.vue')
                                                        }
                                                    },
                                                    {
                                                        path: 'indexes',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/objects/Indexes.vue')
                                                        }
                                                    },
                                                    {
                                                        path: 'sga_dynamic',
                                                        components:{
                                                            homeview: () => import('/src/views/oracle/objects/SGA_Dynamic.vue')
                                                        }
                                                    }
                                                ]
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
                                                    homeview: () => import('/src/views/mysql/Dashboard.vue')
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
                                                    homeview: () => import('/src/views/mssql/Dashboard.vue')
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
                                                    homeview: () => import('/src/views/maria/Dashboard.vue')
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
                                        homeview: () => import('/src/views/Disks_Storage.vue')
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
                                        homeview: () => import('/src/views/User_Management.vue')
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
                                        homeview: () => import('/src/views/Contacts.vue')
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
                                        homeview: () => import('/src/views/Assets_Management.vue')
                                    }
                                }
                            ]
                    },
                ]
        }
    ]
});

export default router;
