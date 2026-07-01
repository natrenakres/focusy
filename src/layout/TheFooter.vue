<script lang="ts" setup>
const year = new Date().getFullYear();
</script>

<template>
  <!-- Footer / Contact Section -->
  <footer
    class="landing-theme w-full py-12 px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-gutter max-w-container-max mx-auto bg-landing-surface-container-low mt-12 border-t border-outline-variant/10"
    id="contact">
    <div class="flex flex-col items-center md:items-start gap-4">
      <div class="font-landing-headline-md text-landing-headline-md font-bold text-landing-primary">Focusy</div>
      <p class="text-landing-secondary text-landing-body-md text-center md:text-left max-w-xs">
        Reclaim your attention without giving away your data.
      </p>
    </div>
    <div class="flex flex-col md:flex-row items-center gap-12">
      <div class="flex gap-8">
        <a class="text-on-secondary-fixed-variant font-landing-label-sm uppercase tracking-widest hover:text-landing-accent transition-colors duration-250 ease-out cursor-pointer"
          href="#">Privacy</a>
        <a class="text-on-secondary-fixed-variant font-landing-label-sm uppercase tracking-widest hover:text-landing-accent transition-colors duration-250 ease-out cursor-pointer"
          href="#">Terms</a>
        <a class="text-on-secondary-fixed-variant font-landing-label-sm uppercase tracking-widest hover:text-landing-accent transition-colors duration-250 ease-out cursor-pointer"
          href="#">Support</a>
      </div>      
    </div>
    <div class="w-full md:w-auto text-center md:text-right">
      <p class="text-on-secondary-fixed-variant font-landing-label-sm opacity-60">© {{ year }} Focusy. All rights reserved.
      </p>
    </div>
  </footer>

</template>