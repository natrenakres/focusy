import { createWebHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AppView from "@/views/AppView.vue";
import HowToView from "@/views/HowToView.vue";



const routes = [
    { path: '/', component: HomeView},
    { path: '/app', component: AppView },
    { path: '/docs/:slug', component: HowToView}
]

export const router = createRouter({
    history: createWebHistory(),
    routes
});