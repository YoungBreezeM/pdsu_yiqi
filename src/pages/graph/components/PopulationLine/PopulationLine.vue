<template>
    <div class="population-line" >
        <el-select v-model="value"
                   @change ="changeOption"
                   size="mini"
                   placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <div  style="height: 100%;width: 100%;" ref="pLine"></div>
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
    import {getLine} from "@/api/heatMap";

    export default {
        name: "PopulationLine",
        data(){
            return{
                options: [
                    {
                        label:"湖滨校区-图书馆",
                        value:"图书馆"
                    },
                    {
                        label: "湖滨校区-南门",
                        value: "湖滨校区南门"
                    },
                    {
                        label: "湖滨校区-东区茶水房",
                        value: "东区茶水房"
                    },
                    {
                        label: "湖滨校区-洗浴中心",
                        value: "洗浴中心"
                    },
                    {
                        label: "崇文校区-大门",
                        value: "崇文校区大门"
                    },
                    {
                        label: "崇文校区-西区茶水房",
                        value: "西区茶水房"
                    },
                    {
                        label: "崇文校区-崇文图书馆",
                        value: "崇文图书馆"
                    }
                ],
                value: '图书馆'
            }
        },
        methods:{
            changeOption(){
                console.log(this.value)
                getLine(this.value).then(data=>{
                    if (data.code===200){
                        this.initLine(data.data)
                    }
                })
            },
            initLine(data){
                let myChart = echarts.init(this.$refs.pLine);
                console.log(option)
                option.xAxis[0].data = data.time;
                option.series[0].data = data.inflow;
                option.series[1].data = data.outflow;
                myChart.setOption(option);



            }
        },
        mounted(){
            getLine(this.value)
                .then(data=>{
                    console.log(data)
                    if(data.code===200){
                        this.initLine(data.data);
                    }
                })
            setInterval(()=>{
                getLine(this.value)
                    .then(data=>{
                        console.log(data)
                        if(data.code===200){
                            this.initLine(data.data);
                        }
                    })
            },1000*60*60)
        }
    }
</script>

<style scoped>

</style>