<script setup lang="ts">
    import { PolarArea, defineProps } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale,RadialLinearScale,LogarithmicScale,PointElement,ArcElement,  LineController, LineElement } from 'chart.js'

    const props = defineProps({
        labelProps:{
            type: Array<string>,
            required:true,
            default: ['Portion 1', 'Portion 2', 'Portion 3', 'Portion 4', 'Portion 5', 'Portion 6', 'Portion 7'],
            //validator: (value:Array)=>{value.forEach((label:string)=>{label.length < 10})}
        },
        dataProps:{
            type:Array<number>,
            required:true,
            default: [10, 17.5, 22.3, 5, 77, 40,23]
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
                default:[' label 1','label 2']
        },
        blockColorProps:{
            type:Array<string>,
                required:true,
                default:[
                    'rgba(255,0,0,1.0)',
                    'rgba(255,255,0,1.0)',
                    'rgba(255,0,255,1.0)',
                    'rgba(0,255,0,1.0)',
                    'rgba(255,124,0,1.0)',
                    'rgba(0,0,255,1.0)',
                    'rgba(33,168,153,1.0)',
                    'rgba(62,62,255,1.0)',
                ]
        }

    })
</script>

<template>
  <PolarArea class="w-full"
    id="my-chart-id"
    :options="optionProps"
    :data="chartData"
  />
</template>

<script lang="ts">


ChartJS.register(Title, Tooltip, Legend, LineElement,PointElement, RadialLinearScale,CategoryScale,ArcElement, LinearScale, LogarithmicScale)

export default {
    name: 'PolarChart',
    components: { PolarArea },
    computed:{    
        chartData() {
            return {
                labels: this.$props.labelProps,
                elements:{
                    line:{
                        tension:0,
                        backgroundColor: this.$props.blockColorProps,
                        fill: 'rgba(120,120,255,10.3)',
                        borderColor: 'rgba(120,120,255,1.0)',
                        highlightStroke: 'rgba(120,120,0,1.0)'
                    }
                },
                datasets: [ { 
                    data: this.$props.dataProps, 
                    yAxisID:this.$props.axesProps[0],
                    xAxisID:this.$props.axesProps[1] ,
                    label:"Température (°C)",
                    tension:0,
                    backgroundColor: this.$props.blockColorProps,
                    fill: 'rgba(120,120,255,10.3)',
                    highlightStroke: 'rgba(120,120,0,1.0)'
                    
                }]
            }
        },
        chartOption() {
            return {
                options:{
                    scales:{
                        y:{
                            type: this.$props.typeProps[0],
                            position: this.$props.typeProps[1],
                            min:-20,
                            max:50,
                            ticks:{

                                stepSize:1,
                                maxTicksLimit:50,
                                fontSize: 40
                            }
                        },
                        x:{
                            ticks:{
                                fontSize: 40
                            }
                        }
                    }
                }
            }
        }
    }
}

</script>