<template>
    <div class="graph-index">
        <div class="graph-left">
            <YBorder
                    :height="100"
            >
                <y-clock></y-clock>
            </YBorder>
            <YBorder
                    :height="720"
            >

            </YBorder>
        </div>
        <div class="graph-center">
            <YBorder
                    :height="760"
            >
                <y-full-screen>
                    <y-map
                            :map-config="mapConfig"
                            :map-data="mapData"
                            :move-man="moveMan"
                            :start="action.start"
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
                <y-tool-bar-item v-if="status">
                    <el-icon class="el-icon-search" title="查找轨迹" @click.native="centerDialogVisible = true"></el-icon>
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
                title="搜索人口"
                :visible.sync="centerDialogVisible"
                width="40%"
                center>
            <YBorder
                    :height="350"
            >
                <el-row :span="24" style="margin: 50px">
                    <el-col :span="13" :push="6">
                        <el-input
                                placeholder="请输入内容"
                                prefix-icon="el-icon-search"
                                v-model="input2">
                        </el-input>
                    </el-col>
                </el-row>
                <el-row :span="24" style="margin: 50px">
                    <el-col :span="15" :push="6">
                        <el-date-picker
                                v-model="value1"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-col>
                </el-row>


            </YBorder>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
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
    import AMap from 'AMap'
    import YClock from "@/components/YClouk/YClock";
    import YFullScreen from "@/components/YFullScreen/YFullScreen";
    import YHeatMap from "@/pages/graph/components/YHeatMap/YHeatMap";
    import PopulationLine from "@/pages/graph/components/PopulationLine/PopulationLine";
    import RelationTree from "@/pages/graph/components/RelationTree/RelationTree";
    import Test from "@/pages/graph/components/Test";

    export default {
        name: "GraphIndex",
        data() {
            return {
                status:false,
                isReload:'',
                value1: [
                    new Date(2000, 10, 10, 10, 10),
                    new Date(2000, 10, 11, 10, 10)
                ],
                input2: '',
                centerDialogVisible: false,
                action: {
                    start: false,
                },
                mapConfig: {
                    center: [113.209784, 33.746716],
                    resizeEnable: true,
                    zoom: 17,
                    pitch: 50,
                    expandZoomRange: true,
                    zooms: [3, 20],

                },
                moveMan: {
                    map: {},
                    position: [113.209784, 33.749691],
                    icon: "https://webapi.amap.com/images/car.png",
                    offset: new AMap.Pixel(0, -50),
                    autoRotation: true,
                    zIndex: 9,
                    angle: 180,
                },
                mapData: [
                    {
                        name: "东北门",
                        position: [113.209784, 33.749691]
                    },
                    {
                        name: "科技楼",
                        position: [113.208475, 33.74879]
                    },
                    {
                        name: "图书馆",
                        position: [113.207021, 33.747412]
                    },
                    {
                        name: '4号楼',
                        position: [113.20553, 33.749348]
                    },
                    {
                        name: "科技楼",
                        position: [113.208475, 33.74879]
                    }
                ],
            }
        },
        components: {
            Test,
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
            }
        },

    };
</script>

