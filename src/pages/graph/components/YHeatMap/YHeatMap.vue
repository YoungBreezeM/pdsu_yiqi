<script src="../RelationTree/option.js"></script>
<template>
    <div class="y-heat-map" id="heatContainer">

    </div>
</template>

<script>
    import "./YHeatMap.scss"
    import AMap from 'AMap'
    import {heatmapApi} from "@/api/heatMap";

    export default {
        name: "YHeatMap",
        data(){
            return{
                points:[]
            }
        },
        methods: {
            createMap() {
                if (!this.isSupportCanvas()) {
                    alert('热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~')
                }
                return new AMap.Map('heatContainer', {
                    center: [113.209784, 33.746716],
                    resizeEnable: true,
                    zoom: 13,
                    pitch: 50,
                    expandZoomRange: true,
                    zooms: [3, 20],

                });
            },
            initHeatMap(map,realTimeRefresh) {
                //初始化heatmap对象
                map.plugin(["AMap.Heatmap"],()=> {
                    //初始化heatmap对象
                    let heatmap = new AMap.Heatmap(map, {
                        radius: 30, //给定半径
                        opacity: [0.3, 0.8],
                        gradient: {
                            0: '#0b60ff',
                            0.3: 'rgb(59,232,20)',
                            0.6: '#f3b64c',
                            0.8: '#ef5b13',
                            0.9: '#e30b0b'
                        }
                    });
                    realTimeRefresh(heatmap,5000)
                });

                heatmapApi().then(data=>{
                    if(data.code===200){
                        let points = this.toChangeType(data.data);
                        this.createdCallout(map,points)
                    }

                })

            },
            createWindow(map, content, position) {
                let cont = [
                    "<div class='y-map-windows'>",
                    content,
                    "</div>"
                ];
                // 创建 infoWindow 实例
                let infoWindow = new AMap.InfoWindow({
                    anchor: 'top-left',
                    content: cont.join("<br>")  //传入 dom 对象，或者 html 字符串
                });

                infoWindow.open(map, position);
            },
            createdCallout(map, points) {

                points.forEach(point => {
                    let marker = new AMap.Marker({
                        position: [point.lng, point.lat],
                        map: map
                    });




                    marker.on('click', () => {
                        console.log(this.points)
                        this.points.forEach(p=>{
                            if(point.lng===p.lng &&point.lat===p.lat){
                                let content;
                                content = '<h4>平顶山学院' + p.bvdn + '</h4>';
                                content += '<h6>实时人数：' + p.livenum + '</h6>';
                                content += '<h6>预警人数：' + p.alertnum + '</h6>';
                                content += '<h6>总可容纳人数：' + p.totalvol + '</h6>';
                                content += '<h6>是否已超预警：' + p.isalert + '</h6>';
                                content += '<h6>负责人工号：' + p.chargn + '</h6>';
                                content += '<h6>负责人名字：' + p.chargnm + '</h6>';
                                content += '<h6>负责人电话：' + p.chargph + '</h6>';
                                // content += '<button class="btn btn-success btn-xs">实时入情况</button>';
                                // content += '<button class="btn btn-warning btn-xs">实时出情况 </button>';
                                // content += '<button class="btn btn-danger btn-xs">内部房间实时情况</button>';
                                this.createWindow(map, content, [point.lng, point.lat])
                            }
                        })

                    });
                })


            },
            isSupportCanvas() {
                let elem = document.createElement('canvas');
                return !!(elem.getContext && elem.getContext('2d'));
            },
            toChangeType(data){
                let points = [];
                data.forEach(p => {
                    let livenum = Math.random()*p.LYYJRL
                    let rs = Math.ceil(livenum) /p.LYYJRL
                    if (p.ZBX && p.ZBY) {
                        points.push({
                            "lng": p.ZBX,
                            "lat": p.ZBY - 0.000055,
                            "count":  rs,
                            "bvdn": p.LY,
                            "livenum": livenum,
                            "alertnum": p.LYYJRL,
                            "totalvol": p.KRNRS,
                            "isalert": p.SFYCYJ,
                            "chargn": 3318,
                            "chargnm": p.FZRXM,
                            "chargph": p.FZRDH
                        })
                    }
                })
                return points;
            },
            realTimeRefresh(heatmap,time){
                setInterval(() => {
                    heatmapApi()
                        .then(data => {
                            if(data.code===200){
                                let points = this.toChangeType(data.data)
                                this.points = points;
                                heatmap.setDataSet({
                                    data: points,
                                    max: 1
                                });
                            }

                        })
                }, time)
            }
        },
        mounted() {
            this.initHeatMap(this.createMap(),this.realTimeRefresh);
        }
    }
</script>

