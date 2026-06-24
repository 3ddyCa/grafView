<script setup lang="ts">
    import { ref,computed,watch,onMounted } from 'vue';
    import { BarController} from 'chart.js';
    import { Bar } from 'vue-chartjs'
    import BarChart from './BarChart.vue'
    import { getBarColor } from '../components/script/utils.ts';
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


        const props = defineProps({
            title : {
                type : String,
                required : true,
                default: 'Pas de données disponibles',
                validator: (value:string)=> value.length < 50
            },
            style : {
                type : String,
                required : true,
                default: 'bg-orage-100',
                validator: (value:string)=> value.length < 20
            },
            description : {
                type : Array,
                required : true,
                default: ['Voici une super carte !'],
                validator: (value:array)=> value.length < 10
            },
            date : {
                type : String,
                required : true,
                default: new Date('m-d-Y h:i:s').toString(),
                validator: (value:string)=> value.length < 50
            },
            country : {
                type : String,
                required : false,
                default: 'Pas d\'info à afficher',
                validator: (value:string)=> value.length < 50
            },
            temperature : {
                type : Array<number>,
                required : true,
                default: ['Pas d\'info à afficher'],
                validator: (value:array)=> value.length < 10
            },
            humidite : {
                type : String,
                required : false,
                default: 'Pas d\'info à afficher',
                validator: (value:string)=> value.length < 50
            },
            pression : {
                type : String,
                required : false,
                default: 'Pas d\'info à afficher',
                validator: (value:string)=> value.length < 50
            },
            info4 : {
                type : Array<Array<string>>,
                required : false,
                default: [['Pas d\'info à afficher']],
                validator: (value:string)=> value.length < 50
            },
            
            img : {
                type : String,
                required : true,
                default: 'https://lorem-picsum.com/200/200/',
                validator: (value:string)=> value.length < 255
            },

        })

        const emits = defineEmits([
            'avgT'
        ])
</script>




<template>
    
    <section class="p-5 bg-blue-100 flex rounded-box w-100 h-fit gap-2 shadow-md" >
        <div class=" grid grid-cols-2 gap-2 m-auto" >
            <div  >
                <strong class="text-center text-3xl m-1">{{ title }}</strong>
                <p class="text-center text-xl">({{ country }})</p>
            </div>
            <div class="p-1  rounded-box">
                <img class="w-auto h-30" :src="img" alt="Illustration de la météo">
                <p class="text-center text-xl">{{ date }}</p>
            </div>
            <div class="p-1 bg-base-100 rounded-box">
                <ul class="gap-1 menu" v-for="data in description">
                    <li class="">{{ data }}</li>
                </ul>
            </div>
            
            <div class="m-auto p-1 bg-base-100 rounded-box">
                <ul class="gap-1 menu">
                    <li>{{ humidite }}</li>
                    <li>{{ pression }}</li>
                    <li>{{ info4 }}</li>
                </ul>
                
            </div> 
            <div class="m-auto p-1 bg-base-100 rounded-box col-span-2">
                <BarChart 
                    :labelProps="['T','Tmax', 'Tmin']" 
                    :dataProps="temperature" 
                    :axesProps="['°C',' ']"
                    :typeProps="['linear','right']"
                    :blockColorProps="temperature.map((value:number)=>{return getBarColor(value)})"

                />
            </div>        
        </div>
    </section>

</template>

