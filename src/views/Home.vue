<script setup lang="ts">
    import { ref,onBeforeMount,watch, useTemplateRef } from 'vue';
    import BarChart from '../components/BarChart.vue';
    import PieChart from '../components/PieChart.vue';
    import RadarChart from '../components/RadarChart.vue';
    import BubbleChart from '../components/BubbleChart.vue';
    import ScatterChart from '../components/ScatterChart.vue';
    import PolarChart from '../components/PolarChart.vue';
    import LineChart from '../components/LineChart.vue';
    import DoughnutChart from '../components/DoughnutChart.vue';
    import { useMediaQuery } from '@vueuse/core';
    import { getBarColor } from '../components/script/utils.ts';


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
    <section class="h-fit w-full">
      <h1 class="m-auto text-center text-5xl">Bienvenu sur ce site de démonstration</h1>
    </section>
    <section class="w-full m-2 menu gap-5 " >
        <BarChart class="m-2" />
        <PieChart class="m-2"/>
        <RadarChart class="m-2"/>
        <BubbleChart class="m-2"/>
        <PolarChart class="m-2"/>
        <ScatterChart class="m-2"/>
        <LineChart class="m-2"/>
        <DoughnutChart class="m-2"/>
    </section>
  </template>