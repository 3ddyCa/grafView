<script setup lang="ts">
    import { Radar, defineProps } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

    const props = defineProps({
        labelProps:{
            type: Array<string>,
            required:true,
            default: ['val1', 'val2', 'val3'],
            //validator: (value:Array)=>{value.forEach((label:string)=>{label.length < 10})}
        },
        dataProps:{
            type:Array<number>,
            required:true,
            default: [10, 17.5, 22.3]
        },
        optionProps:{
            type:Array<string>,
            required:true,
            default: []
        },
        typeProps:{
            type:Array<string>,
            required:true,
            default: ['logarithmic','right']
        },
        axesProps:{
            type:Array<string>,
                required:true,
                default:[' ',' ']
        }

    })
</script>

<template>
  <Radar class="w-full"
    id="my-chart-id"
    :options="optionProps"
    :data="chartData"
  />
</template>

<script lang="ts">


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'RadarChart',
    components: { Radar },
    computed:{    
        chartData() {
            return {labels: this.$props.labelProps,
                datasets: [ { 
                    data: this.$props.dataProps, 
                    yAxisID:this.$props.axesProps[0],
                    xAxisID:this.$props.axesProps[1] ,
                    label:"Température (°C)",
                    backgroundColor: ['rgba(255,0,0,1.0)','rgba(255,0,0,1.0)'],
                    strokeColor: 'rgba(120,120,255,1.0)',
                    highlightStroke: 'rgba(120,120,0,1.0)'
                    
                }]
            }
        }
    }
}

</script>