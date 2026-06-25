<script setup lang="ts">
    import { Bar, defineProps } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LogarithmicScale } from 'chart.js'

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
  <Bar class="w-full"
    id="my-chart-id"
    :data="chartData"
    :option="chartOption"
  />
</template>

<script lang="ts">


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LogarithmicScale)

export default {
    name: 'BarChart',
    components: { Bar },
    computed:{    
        chartData() {
            return {
                labels: this.$props.labelProps,
                datasets: [ { 
                    
                    data: this.$props.dataProps, 
                    yAxisID:this.$props.axesProps[0],
                    xAxisID:this.$props.axesProps[1] ,
                    label:"Température (°C)",
                    backgroundColor: this.$props.blockColorProps,
                    strokeColor: 'rgba(120,120,255,1.0)',
                    highlightStroke: 'rgba(120,120,0,1.0)'
                    
                }]
            }
        },
        chartOption() {
            return {
                options:{
                    scales:{
                        myScale:{
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