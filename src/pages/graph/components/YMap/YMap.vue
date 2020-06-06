<template>
    <div class="y-map" id="container">

    </div>
</template>

<script>
    import './y-map.scss'

    import AMap from 'AMap'
    import {unique} from "@/utils/utils";
    import {trackByFloorApi} from "@/api/trackApi";

    export default {
        name: "YMap",
        props:[
            'mapConfig',
            'mapData',
            'reqBody',
            'start',
        ],
        data(){
            return {
                Map:{},
                Man:{},
                maker:"",
                ps:[],
            }
        },
        methods:{
            initMap(mapData){
                let map = new AMap.Map('container',{
                    center: [113.209784,33.746716],
                    resizeEnable: true,
                    zoom: 16,
                    pitch: 50,
                    expandZoomRange: true,
                    zooms: [3, 20],
                });
                this.Map = map;
                let ps = []
                mapData.forEach(item=>{
                    ps.push(item.position)
                })
                this.ps = ps;
                // 绘制轨迹
                 new AMap.Polyline({
                    map: map,
                    path: ps,
                    showDir:true,
                    strokeColor: "#28F",  //线颜色
                    // strokeOpacity: 1,     //线透明度
                    strokeWeight: 6,      //线宽

                });

                let passedPolyline = new AMap.Polyline({
                    map: map,
                    // path: lineArr,
                    strokeColor: "#d57947",  //线颜色
                    // strokeOpacity: 1,     //线透明度
                    strokeWeight: 6,      //线宽
                    // strokeStyle: "solid"  //线样式
                });

                let man = new AMap.Marker({
                    map: map,
                    position: [113.209784,33.746716],
                    icon: "https://webapi.amap.com/images/car.png",
                    offset: new AMap.Pixel(-26, -13),
                    autoRotation: true,
                    angle:-90,
                });
                this.maker = man;

                man.on('moving', function (e) {
                    passedPolyline.setPath(e.passedPath);
                });
                map.setFitView();

            },
            createWindow(map,content,position){
                this.reqBody.floor = content
                console.log(this.reqBody)
                trackByFloorApi(this.reqBody).then(data=>{
                    let cont = [];
                    if(data.code===200){
                        console.log(data.data)
                        let info ="";
                        data.data.forEach(item=>{
                            info +=
                                "<p><el-icon class='el-icon-right'>"+"房间:"+item.FJMC+'</p>'+
                                "进去时间:"+item.JRSJ+'</br>'+
                                "出来时间:"+item.CQSJ+'</br>'
                        })

                        cont = [
                            "<div class='y-map-windows'>",
                            content+'</br>',
                            info,
                            "</div>"
                        ]
                    }else {
                        cont = [
                            "<div class='y-map-windows'>",
                            content+'</br>',
                            data.zhCode,
                            "</div>"
                        ]
                    }
                    // 创建 infoWindow 实例
                    let infoWindow = new AMap.InfoWindow({
                        anchor: 'top-left',
                        content: cont.join("<br>")  //传入 dom 对象，或者 html 字符串
                    });
                    infoWindow.open(map,position);
                })
            },
            drawPath(man,map,data) {
                let ps = [];
                data.forEach(item=>{
                    ps.push(item.position)
                })
                // 绘制轨迹
                new AMap.Polyline({
                    map: map,
                    path: ps,
                    showDir: true,
                    strokeColor: "#28F",  //线颜色
                    strokeWeight: 6,      //线宽

                });

                let passedPolyline = new AMap.Polyline({
                    map: map,
                    strokeColor: "#111739",  //线颜色
                     strokeOpacity: 0.8,     //线透明度
                    strokeWeight: 6,      //线宽
                });

                man.on('moving', function (e) {
                    passedPolyline.setPath(e.passedPath);
                });
            },
            createMarker(val){
                let obj = unique(val,'name');
                obj.forEach(value=>{
                    let marker = new AMap.Marker({
                        position: new AMap.LngLat(value.position[0],value.position[1]),
                        offset: new AMap.Pixel(-10, -38),
                        title: value.name
                    });
                    marker.on('click',()=>{
                        this.createWindow(this.Map,value.name,[value.position[0],value.position[1]])
                    })
                    marker.setMap(this.Map);

                })
            },
            startAnimation() {
               this.maker.moveAlong(this.ps, 200);
            },

        },
        mounted(){
            this.initMap(this.mapData);
        },
        watch:{
            start(){
                this.startAnimation()
            },
            mapData(val){
                 this.initMap(val);
                 this.createMarker(val)
            },
            reqBody(val){
                console.log(val)
                this.reqBody =val;
            }
        }
    }
</script>

