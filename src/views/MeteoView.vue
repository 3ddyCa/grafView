<script setup lang="ts">
    import { ref,onBeforeMount,watch, useTemplateRef } from 'vue';
    import BarChart from '../components/BarChart.vue';
    import WidgetMeteo from '../components/WidgetMeteo.vue';
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
    let currentW = useTemplateRef('thisW');

    interface MeteoData{
      name: string,
      country: string,
      date: string,
      lat:number,
      long:number,
      elevation:number,
      TC: number,
      TCmax:number,
      TCmin: number,
      sunrise:string,
      sunset:string,
      pressure:number,
      humidity:number,
      img:string,
      barClr:string
    }

    let meteoBulletin = ref<Array<MeteoData>>([]);
    let meteoObject = ref([]);
    const cityName =
      ['toulouse',
      'paris', 
      'marseille',
      'lyon',
      'bordeau',
      'strasbourg',
      'nice',
      'lille',
      'rennes',
      'perpignan',
      'poitier',
      'agen',
      'rodez',
      'orlean',
      'metz',
      'clermont-ferrand',
      'auch'
    ]

    async function getMeteo(ville:string){
        const url = 'https://prevision-meteo.ch/services/json/';
        const response = await fetch(url+ville);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Meteo fetch : ',result);
        if(result.city_info != undefined ){
            meteoBulletin.value.push( {
              'name': result.city_info.name,
              'country': result.city_info.country,
              'date': result.current_condition.date,
              'lat':result.city_info.latitude,
              'long':result.city_info.longitude,
              'elevation':result.city_info.elevation,
              'TC': result.current_condition.tmp,
              'TCmax':result.fcst_day_0.tmax,
              'TCmin': result.fcst_day_0.tmin,
              'sunrise':result.city_info.sunrise,
              'sunset':result.city_info.sunset,
              'pressure':result.current_condition.pressure,
              'humidity':result.current_condition.humidity,
              'img':result.current_condition.icon_big,
              'barClr': getBarColor(result.current_condition.tmp)
            });
            console.log("liste : ", meteoBulletin.value)
            return result;
        }
            
    }
    

     onBeforeMount(
      ()=>{
        cityName.forEach((name)=>{
            getMeteo(name);
        })
        
     }
    )
        
    


</script>

<template>

  <section class="bg-blue-100 w-full h-fit py-5" id="Presentation" >
    <h2 class="text-3xl 2b text-center p-2">Températures par villes</h2>
    <div class="m-auto p-1 w-fit bg-base-100 rounded-box">
        <BarChart 
            class="h-160"
            key="MainChart"
            :labelProps="meteoBulletin.map((value:MeteoData)=>{if(value.TC){return value.name}})" 
            :dataProps=" meteoBulletin.map((value:MeteoData)=>{return value.TC})" 
            :axesProps="['°C',' Villes ']"
            :typeProps="['linear','right']"
            :blockColorProps="meteoBulletin.map((value:MeteoData)=>{return value.barClr})"
        />
    </div> 

  </section>

  <section id="Affichage">

    <article v-if="meteoBulletin">
      <h2 class="w-full p-5 text-center text-3xl ">Vos données météos pour les grandes villes de France</h2>
      <!-- <div id="localDisplay" class="w-full m-2 grid gap-5" :class="{'grid-cols-3' : isLargeScreen, 'grid-cols-2' : isTablet, 'grid-cols-1 m-auto' : isMobile}"> -->
      <div id="localDisplay" class="w-full m-2 grid gap-5 "  :style ="{'grid-template-columns': 'repeat( '+Math.floor(MQ_meteodisplay)+',1fr)' }">
        <WidgetMeteo  
        v-for="(contenu, index) in meteoBulletin" 
        class="m-auto"
        :key="index" ref="thisW" :title="contenu.name" :country="contenu.country" :date="contenu.date" :description="['Lat: '+contenu.lat,'Long: '+ contenu.long,'Elev: '+contenu.elevation]"  :img="contenu.img" :temperature="[contenu.TC,contenu.TCmax ,contenu.TCmin]" :humidite="'humidité '+contenu.humidity"  :pression="contenu.pressure+' bar'" :info4="meteoObject[index]"
        />
      </div>
    </article>

    <article v-else>
      <h2 class="w-full p-5 text-center text-3xl">Aucune donnée météo à afficher</h2>
    </article>

  </section>

  <section class="bg-blue-100 w-full py-5" id="More" ><h2 class="text-2xl 2b text-center">Retour au menu</h2></section>
  <section class="bg-blue-100 w-full py-5" id="spacer"></section>
</template>