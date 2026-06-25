<script setup lang="ts">
    import { Line, defineProps } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale,LogarithmicScale,PointElement,  LineController, LineElement } from 'chart.js'

    const props = defineProps({
        labelProps:{
            type: Array<string>,
            required:true,
            default: ['Matin', 'Midi', 'Soir'],
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
            default: ['line','right']
        },
        axesProps:{
            type:Array<string>,
                required:true,
                default:[' label 1','label 2']
        },
        blockColorProps:{
            type:Array<string>,
                required:true,
                default:['rgba(255,0,0,1.0)']
        }

    })
</script>

<template>
  <Line class="w-full"
    id="my-chart-id"
    :options="optionProps"
    :data="chartData"
  />
</template>

<script lang="ts">


ChartJS.register(Title, Tooltip, Legend, LineElement,PointElement, CategoryScale, LinearScale, LogarithmicScale)

export default {
    name: 'LineChart',
    components: { Line },
    computed:{    
        chartData() {
            return {
                labels: this.$props.labelProps,
                elements:{
                    line:{
                        tension:0,
                        backgroundColor: this.$props.blockColorProps,
                        fill: 'rgba(120,120,255,10.3)',
                        strokeColor: 'rgba(120,120,255,1.0)',
                        borderColor: 'rgba(120,120,255,1.0)',
                        highlightStroke: 'rgba(120,120,0,1.0)',
                        tension: 0.5
                    }
                },
                datasets: [ { 
                    data: this.$props.dataProps, 
                    yAxisID:this.$props.axesProps[0],
                    xAxisID:this.$props.axesProps[1] ,
                    label:"Température (°C)",
                    backgroundColor: this.$props.blockColorProps,
                    fill: 'rgba(120,120,255,10.3)',
                    strokeColor: 'rgba(120,120,255,1.0)',
                    borderColor: 'rgba(120,120,255,1.0)',
                    highlightStroke: 'rgba(120,120,0,1.0)',
                    
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