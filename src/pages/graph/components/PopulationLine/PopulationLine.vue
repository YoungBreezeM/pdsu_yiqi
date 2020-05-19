<template>
    <div class="population-line" ref="pLine">
    </div>
</template>

<script>
    import "./populationLine.scss"
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/chart/radar'
    // 引入提示框和title组件，图例
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/legendScroll'
    import {option} from "@/pages/graph/components/PopulationLine/option";

    export default {
        name: "PopulationLine",
        methods:{
            initLine(){
                let myChart = echarts.init(this.$refs.pLine);

                myChart.setOption(option);


            }
        },
        mounted(){
            this.initLine();

        }
    }
</script>

<style scoped>

</style>