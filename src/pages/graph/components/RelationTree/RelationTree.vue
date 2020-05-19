<template>
    <div class="relation-tree" ref="RTree">

    </div>
</template>

<script>
    import './relation-tree.scss'
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/tree'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/chart/radar'
    // 引入提示框和title组件，图例
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/title'
    import 'echarts/lib/component/legend'
    import 'echarts/lib/component/legendScroll'
    import {option} from "@/pages/graph/components/RelationTree/option";

    export default {
        name: "RelationTree",
        props:['isReload'],
        data(){
          return{
              myChart:{},
          }
        },
        methods:{
            initRelationTree(){
                this.myChart = echarts.init(this.$refs.RTree);
                this.myChart.setOption(option);
            }
        },
        mounted(){
             this.initRelationTree();
        },
        watch:{
            isReload(val){
                console.log(val)
                this.myChart.resize();
                console.log('reload')
            }
        }

    }
</script>

<style scoped>

</style>