import {createRouter, createWebHistory} from "vue-router";




const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path : '/', alias: '/home', component : () => import('/src/views/Home.vue')},
        {path: '/:pathMatch(.*)*',
            name: 'not-found',
            meta: {
                description: 'Page non trouvée'
            },
            component: () => import('/src/views/NotFound.vue')
        },
    ],
})

export default router;
