<script setup lang="ts">
import TheFooter from '@/layout/TheFooter.vue';
import TheHeader from '../layout/TheHeader.vue';
import { IconArrowRight, IconSparkles } from '@tabler/icons-vue';
import FocusyArt from "@/assets/focusy-art.png";

</script>
<template>
    <TheHeader />
    <main class="pt-24">
        <!-- Hero Section -->
        <section            
            class="landing-theme relative min-h-217.5 flex items-center px-4 md:px-10 max-w-landing-container-max mx-auto overflow-hidden">
            <!-- Organic Background Shapes -->
            <div class="absolute -top-20 -right-20 w-96 h-96 bg-landing-primary/5 organic-shape-1 blur-3xl animate-pulse"></div>
            <div class="absolute top-1/2 -left-20 w-80 h-80 bg-landing-accent/5 organic-shape-2 blur-3xl animate-pulse"
                style="animation-delay: 1s"></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full z-10">
                <div class="space-y-8 max-w-xl">
                    <h1 class="font-landing-display-lg text-landing-display-lg leading-tight text-landing-on-background">
                        Master your <span class="text-landing-primary font-landing-medium">attention</span>, reclaim your <span
                            class="italic text-landing-secondary">focus</span>.
                    </h1>
                    <p class="text-landing-body-lg text-landing-secondary font-landing-body-lg">
                        In a world full of distractions, Focusy helps you realign your attention and stay focused long enough to finish what matters.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 pt-4">
                        <RouterLink to="/app">
                            <button
                                class="bg-landing-accent text-white px-8 py-4 rounded-landing-full font-landing-headline-md text-landing-label-md transition-all duration-250 ease-out cta-hover cursor-pointer flex items-center justify-center gap-2">
                                Start Your Focus Session
                                <IconArrowRight />
                            </button>
                        </RouterLink>
                        <RouterLink to="/docs/story-of-focusy">
                            <button
                                class="border-2 border-landing-primary-container text-landing-primary-container px-8 py-4 rounded-landing-full font-landing-label-md
                                 hover:bg-landing-primary-container hover:text-white transition-all duration-250 cursor-pointer text-center">
                                    Read the Story
                            </button>
                        </RouterLink>
                    </div>
                </div>
                <div class="relative flex justify-center items-center">
                    <div
                        class="w-full aspect-square max-w-md soft-depth-3 bg-white rounded-[40px] overflow-hidden relative border-4 border-landing-surface-container-low">
                        <div class="w-full h-full bg-cover bg-center">
                            <img :src="FocusyArt" alt="Focusy art" />
                        </div>
                        <div
                            class="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-2xl soft-depth-2 flex items-center gap-4">
                            <div
                                class="w-12 h-12 bg-landing-primary/20 rounded-landing-full flex items-center justify-center text-landing-primary">
                                <IconSparkles />
                            </div>
                            <div>
                                <p class="text-on-landing-surface font-bold text-landing-label-md">Current Focus State</p>
                                <p class="text-landing-secondary text-landing-label-sm">Deep Flow • 25m remaining</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Re-emphasized CTA -->
        <section class="landing-theme py-24 px-4 md:px-10 max-w-landing-container-max mx-auto">
            <div
                class="bg-landing-primary rounded-[60px] p-12 md:p-24 text-center text-white relative overflow-hidden soft-depth-3">
                <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div
                        class="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,transparent_70%)] animate-pulse">
                    </div>
                </div>
                <h2 class="font-landing-display-lg text-landing-display-lg mb-6 relative z-10">Ready to focus?</h2>
                <p class="text-landing-body-lg text-landing-primary-fixed mb-12 max-w-2xl mx-auto relative z-10 opacity-90">
                    No cloud. No tracking. No hidden data collection. Just you, your tasks, and uninterrupted focus.</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                    <RouterLink to="/app">
                        <button
                            class="bg-landing-accent text-white px-10 py-5 rounded-landing-full font-landing-headline-md text-landing-headline-md transition-all duration-250 ease-out cta-hover cursor-pointer active:scale-95 shadow-xl">
                            Get Started Now
                        </button>
                    </RouterLink>
                    <RouterLink to="/docs/how-it-works">
                        <button class="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-landing-full font-landing-headline-md text-landing-headline-md hover:bg-white/20 transition-all cursor-pointer">
                            Read How it works?
                        </button>
                    </RouterLink>
                </div>
            </div>
        </section>
    </main>
    <TheFooter />
</template>