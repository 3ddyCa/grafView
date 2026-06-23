<script setup lang="ts">
    import { Bar, defineProps } from 'vue-chartjs'
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
  <Bar class="w-full"
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script lang="ts">


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    computed:{    
        chartData() {
            return {labels: this.$props.labelProps,
            datasets: [ { data: this.$props.dataProps, yAxisID:this.$props.axesProps[0],xAxisID:this.$props.axesProps[1] } ]
        }},
        chartOptions() {
            return {responsive: true,
            scales:{
                myScales:{
                    type: this.$props.typeProps[0],
                    position: this.$props.typeProps[1]
                },
                // ticks: {
                //     color:'red'
                // }
            }}
        }
    }
}

</script>