<template>
    <div class="graph-index">
        <div class="graph-left">
            <YBorder
                    :height="100"
            >
                <y-clock></y-clock>
            </YBorder>
            <YBorder :height="720">
                <div style="overflow: scroll;height: 100%;width: 100%;overflow-x: hidden">
                    <p style="color: #4de2ff">教学区</p>
                   <el-table
                           :data="tableData"
                   >
                       <el-table-column prop="name" label="校区">
                           <template slot-scope="scope" >
                               <span :style="{color:scope.row.realTimeNum>scope.row.warning?'red':'white'}">
                                   {{
                               scope.row.name!=="教学楼A"&&
                               scope.row.name!=="教学楼B"&&
                               scope.row.name!=="教学楼C"?"湖滨校区":"崇文校区"
                               }}/{{scope.row.name}}
                               </span>
                           </template>
                       </el-table-column>
                       <el-table-column prop="realTimeNum" label="实时人口">
                       </el-table-column>
                       <el-table-column prop="total" label="总人口">
                       </el-table-column>
                   </el-table>
                    <p style="color: #4de2ff">生活区</p>
                    <el-table
                            :data="tableDataLive"
                    >
                        <el-table-column prop="name" label="校区">
                            <template slot-scope="scope" >
                               <span :style="{color:scope.row.realTimeNum>scope.row.warning?'red':'white'}">
                                   {{
                               scope.row.name!=="餐厅"?"湖滨校区":"崇文校区"
                               }}/{{scope.row.name}}
                               </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="realTimeNum" label="实时人口">
                        </el-table-column>
                        <el-table-column prop="total" label="总人口">
                        </el-table-column>
                    </el-table>
                </div>
            </YBorder>
        </div>
        <div class="graph-center">
            <YBorder
                    :height="760"
            >
                <y-full-screen>
                    <y-map
                            :map-data="mapData"
                            :start="action.start"
                            :req-body="reqMaker"
                            v-if="status"
                    ></y-map>
                    <y-heat-map
                            v-if="!status"
                    >

                    </y-heat-map>
                </y-full-screen>
            </YBorder>
            <y-tool-bar>
                <y-tool-bar-item>
                    <el-icon class="el-icon-map-location" title="切换地图" @click.native="changes"></el-icon>
                </y-tool-bar-item>
                <y-tool-bar-item >
                    <el-icon class="el-icon-search" title="查询" @click.native="centerDialogVisible = true"></el-icon>
                </y-tool-bar-item>
                <y-tool-bar-item v-if="status">
                    <el-icon class="el-icon-video-play" title="开始动画"
                             @click.native="action.start=!action.start"></el-icon>
                </y-tool-bar-item>
            </y-tool-bar>
        </div>
        <div class="graph-right">
            <YBorder
                    :height="390"
            >
                <y-full-screen
                        @windowStatus ='screenStatus'
                >
                    <relation-tree
                            :is-reload="isReload"
                            :init-data="treeData"
                    >
                    </relation-tree>
                </y-full-screen>
            </YBorder>
            <YBorder
                    :height="430"
            >
                <b>重点地区人口流动情况</b>
                    <population-line>
                    </population-line>
            </YBorder>
        </div>
        <el-dialog
                title="查询"
                :visible.sync="centerDialogVisible"
                width="40%"
                center>
            <YBorder
                    :height="350"
            >
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="轨迹查询" name="first">
                        <el-row :span="24" style="margin: 50px">
                            <el-col :span="13" :push="6">
                                <el-input
                                        placeholder="请输入学号"
                                        prefix-icon="el-icon-search"
                                        v-model="ruleForm.num">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row :span="24" style="margin: 50px">
                            <el-col :span="15" :push="6">
                                <el-date-picker
                                        v-model="time"
                                        type="datetimerange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="n代查询" name="second">
                        <el-row :span="24" style="margin: 50px">
                            <el-col :span="13" :push="6">
                                <el-input
                                        placeholder="请输入学号"
                                        prefix-icon="el-icon-search"
                                        v-model="ruleForm.num">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row :span="24" style="margin: 50px">
                            <el-col :span="13" :push="6">
                                <el-input
                                        placeholder="请输入代数"
                                        prefix-icon="el-icon-search"
                                        v-model="ruleForm.n">
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row :span="24" style="margin: 50px">
                            <el-col :span="15" :push="6">
                                <el-date-picker
                                        v-model="time"
                                        type="datetimerange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </YBorder>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import "../css/graph-index.scss"
    import YBorder from "@/components/YBorder/YBorder";
    import YToolBar from "@/components/YToolBar/YToolBar";
    import YToolBarItem from "@/components/YToolBarItem/YToolBarItem";
    import YMap from "@/pages/graph/components/YMap/YMap";
    import YClock from "@/components/YClouk/YClock";
    import YFullScreen from "@/components/YFullScreen/YFullScreen";
    import YHeatMap from "@/pages/graph/components/YHeatMap/YHeatMap";
    import PopulationLine from "@/pages/graph/components/PopulationLine/PopulationLine";
    import RelationTree from "@/pages/graph/components/RelationTree/RelationTree";
    import {trackApi} from "@/api/trackApi";
    import {DateFormat} from "@/utils/format";
    import {relationTreeTable} from "@/api/relationTree";
    import {heatmapApi} from "@/api/heatMap";


    export default {
        name: "GraphIndex",
        data() {
            return {
                status:false,
                tableReload:false,
                isReload:'',
                treeData:null,
                activeName: 'first',
                reqMaker:{},
                ruleForm:{
                    num:"201900003148",
                    startTime:"",
                    n:"1",
                    endTime:"",
                    floor:""
                },
                time: [
                    new Date(2019, 5, 10, 11,30),
                    new Date(2020, 6, 20, 11,30)
                ],
                centerDialogVisible: false,
                action: {
                    start: false,
                },
                mapData: [
                ],
                tableData:[
                    {
                        name:"一号教学楼",
                        realTimeNum:"",
                        total:"",
                    },
                    {
                        name:"二号教学楼",
                        realTimeNum:"",
                        total:"",
                    },
                    {
                        name:"三号教学楼",
                        realTimeNum:"",
                        total:"",
                    },
                    {
                        name:"四号教学楼",
                        realTimeNum:"",
                        total:"",
                    },
                    {
                        name:"图书馆",
                        realTimeNum:"",
                        total:"",
                    },
                    {
                        name:"科技楼",
                        realTimeNum:"",
                        total:"",
                    },
                    {
                        name:"教学楼A",
                        realTimeNum:"",
                        total:"",
                    },
                    {
                        name:"教学楼B",
                        realTimeNum:"",
                        total:"",
                    },
                    {
                        name:"教学楼C",
                        realTimeNum:"",
                        total:"",
                    },
                ],
                tableDataLive:[
                    {
                        name:"红楼餐厅",
                        realTimeNum:"",
                        total:"",
                    },
                    {
                        name:"白楼餐厅",
                        realTimeNum:"",
                        total:"",
                    },
                    {
                        name:"蓝楼餐厅",
                        realTimeNum:"",
                        total:"",
                    },
                    {
                        name:"洗浴中心",
                        realTimeNum:"",
                        total:"",
                    },
                    {
                        name:"餐厅",
                        realTimeNum:"",
                        total:"",
                    },
                ]
            }
        },
        components: {
            RelationTree,
            PopulationLine,
            YHeatMap,
            YFullScreen,
            YClock,
            YMap,
            YToolBarItem,
            YToolBar,
            YBorder

        },
        methods: {
            changes() {
                this.status = !this.status;
            },
            screenStatus(val){
               this.isReload = val;
            },
            trackSubmit(postBody){
                trackApi(postBody)
                    .then(data=>{
                        console.log(data)
                        if(data.code===200){
                            let a  = data.data
                            let rs = a.filter(item=>item.ZBY);
                            this.mapData = [];
                            rs.forEach(item=>{
                                this.mapData.push({name:item.LYMC,position:[item.ZBX,item.ZBY]})
                            })
                        }else {
                            alert(data.zhCode)
                        }

                    })
            },
            submitTreeTable(postBody){
                relationTreeTable(postBody)
                .then(data=>{
                    let treeTable =[];
                    console.log(data.data)
                    if(data.code===200){

                        for (let i in data.object) {
                            if(data.object[i]&&data.object[i].length>0) {
                                data.object[i].forEach(item => {
                                    item.n = i;
                                    treeTable.push(item)
                                })
                            }
                        }

                    }
                })
            },
            submit(){
                this.centerDialogVisible = false;
                let postBody ={
                    num:this.ruleForm.num,
                    n:parseInt(this.ruleForm.n),
                    startTime:this.time[0].format("yyyy-MM-dd hh:mm:ss"),
                    endTime:this.time[1].format("yyyy-MM-dd hh:mm:ss")
                }
                if(this.activeName==="first"){
                    this.reqMaker ={
                        num:this.ruleForm.num,
                        n:parseInt(this.ruleForm.n),
                        startTime:this.time[0].format("yyyy-MM-dd hh:mm"),
                        endTime:this.time[1].format("yyyy-MM-dd hh:mm")
                    }
                    this.trackSubmit(this.reqMaker)
                }
                if(this.activeName==="second"){
                    this.treeData = postBody;
                    this.submitTreeTable(postBody);
                }
                this.ruleForm = postBody;

            },
            handleClick(tab, event) {
                    console.log(tab, event);
            },
            initTable(){
                this.getData()
                setInterval(()=>{
                    this.getData()
                },5000)

            },
            getData(){
                heatmapApi().then(data=>{
                    data.data.forEach(data=>{

                        this.tableData.forEach(item=>{
                            if(data.LY===item.name){
                                item.name = data.LY;
                                let srss = Math.ceil(Math.random()*1000);
                                item.realTimeNum = srss;
                                item.total = data.KRNRS;
                                item.warning = data.LYYJRL;
                            }
                        })
                        this.tableDataLive.forEach(item=>{
                            if(data.LY===item.name){
                                item.name = data.LY;
                                item.realTimeNum = Math.ceil(Math.random()*1000);
                                item.total = data.KRNRS;
                                item.warning = data.LYYJRL;
                            }
                        })
                    })

                })
            }

        },
        mounted(){
            DateFormat();//开启时间格式化

            setTimeout(()=>{
                this.initTable();
            },1000)


        }

    };
</script>

