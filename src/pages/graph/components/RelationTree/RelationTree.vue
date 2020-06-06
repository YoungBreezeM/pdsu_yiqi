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
    import {initOption, initOptionFormat, setDefaultOption} from "@/pages/graph/components/RelationTree/option";
    import {relationTree} from "@/api/relationTree";

    export default {
        name: "RelationTree",
        props:[
            "initData",
            "isReload"
        ],
        data(){
          return{
              myChart:{},
          }
        },
        methods:{
            initRelationTree(data){
                console.log(data)
                let defaultData = {
                    name:"节点",
                    children:[
                        {
                            name:"节点1",
                            children:[
                                {
                                    name:"节点1-1"
                                }
                            ]
                        },
                        {
                            name:"节点2",
                            children:[
                                {
                                    name:"节点2-1"
                                }
                            ]
                        },
                        {
                            name:"节点3",
                            children:[
                                {
                                    name:"节点3-1"
                                }
                            ]
                        }
                    ]
                }
                this.myChart = echarts.init(this.$refs.RTree);
                if(data==null){
                    this.myChart.setOption(setDefaultOption([defaultData]),true);
                }else {
                    relationTree(data).then(data=>{
                        if(data.code===200){
                            console.log("==============")
                            console.log(initOptionFormat(data.object))
                            this.myChart.clear();

                        }else {
                            alert(data.msg)
                        }
                    })
                }



            }
        },
        mounted(){
            this.initRelationTree(this.initData);
        },
        watch:{
            isReload(val){
                console.log(val)
                this.myChart.resize();
                console.log('reload')
            },
            initData(val){
                console.log(val)
                this.initRelationTree(val);
            }
        }

    }
</script>

<style scoped>

</style>