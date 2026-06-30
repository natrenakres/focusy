import { createWebHistory, createRouter } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import AppView from "@/views/AppView.vue";



const routes = [
    { path: '/', component: HomeView},
    { path: '/app', component: AppView }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
});