<script setup lang="ts">
    import { ref,onBeforeMount,watch, useTemplateRef } from 'vue';
    import BarChart from '../components/BarChart.vue';
    import WidgetMeteo from '../components/WidgetMeteo.vue';
    import { useMediaQuery } from '@vueuse/core';

    const isLargeScreen = useMediaQuery('(min-width: 1024px)')
    const isTablet = (useMediaQuery('(min-width: 768px') && useMediaQuery('(max-width: 1024px)')?true:false)
    const isMobile = useMediaQuery('(max-width: 768px)')
    const isPreferredDark = useMediaQuery('(prefers-color-scheme: dark)')
    const MQ_meteodisplay = ref(window.innerWidth / 420);
    window.addEventListener('resize', ()=>{MQ_meteodisplay.value = window.innerWidth / 400; MQ_meteodisplay.value = window.innerWidth / (400 + (MQ_meteodisplay.value * 10)) })
    // import Fetcher from '../script/Fetcher.ts'
    // const meteo = new Fetcher('https://prevision-meteo.ch/services/json/')
  </script>

  <template>
    <section class="h-500 w-full">
      <h1 class="m-auto text-center text-5xl">Bienvenu sur ce site de démonstration</h1>
    </section>
  </template>