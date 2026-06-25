<script setup lang="ts">
    import { Pie, defineProps } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale ,LogarithmicScale} from 'chart.js'

    const props = defineProps({
        labelProps:{
            type: Array<string>,
            required:true,
            default: ['Quatro Formagi', 'Margarita', 'Regina'],
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
        },
        blockColorProps:{
            type:Array<string>,
                required:true,
                default:['rgba(0,0,255,1.0)',
                    'rgba(255,255,0,1.0)',
                    'rgba(255,0,0,1.0)',]
        }

    })
</script>

<script lang="ts">


ChartJS.register(Title, Tooltip, Legend,ArcElement, LogarithmicScale, CategoryScale, LinearScale)

export default {
    name: 'PieChart',
    components: { Pie },
    computed:{    
        chartData() {
            return {labels: this.$props.labelProps,
                elements:{
                    arc:{
                        backgroundColor: this.$props.blockColorProps,
                        strokeColor: 'rgba(120,120,255,1.0)',
                        highlightStroke: 'rgba(120,120,0,1.0)'
                    }
                },
                datasets: [ { 
                    data: this.$props.dataProps, 
                    yAxisID:this.$props.axesProps[0],
                    xAxisID:this.$props.axesProps[1] ,
                    label:"Température (°C)",
                    backgroundColor: this.$props.blockColorProps,
                    
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
                        r:{
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

<template>
  <Pie class="w-full"
    id="my-chart-id"
    :options="optionProps"
    :data="chartData"
  />
</template>