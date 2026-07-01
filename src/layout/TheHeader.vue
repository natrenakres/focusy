<script setup lang="ts">
import LogoIcon from "@/assets/logo.png";
</script>

<template>
    <header
        class="landing-theme  fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-10 py-4 max-w-container-max mx-auto bg-landing-surface/80 backdrop-blur-md shadow-[0_4px_20px_rgba(45,52,54,0.04)]">
        <div class="font-landing-headline-lg text-landing-headline-lg font-bold text-primary flex gap-1">
            <img :src="LogoIcon" alt="Focusy Logo" width="48" height="48" />
            <span>Focusy</span>            
        </div>
        <nav class="hidden md:flex items-center gap-8">
            <RouterLink 
                class="text-landing-secondary font-label-md hover:text-primary transition-colors duration-250 ease-out cursor-pointer"
                to="/docs/how-it-works">
                Read How it works?
            </RouterLink>

        </nav>
        <RouterLink to="/app">
            <button
                class="bg-landing-accent text-white px-6 py-2.5 rounded-full font-label-md transition-all duration-250 ease-out cta-hover cursor-pointer active:scale-95">
                Get Started
            </button>
        </RouterLink>
    </header>
</template>