<template>
    <div class="y-map" id="container">

    </div>
</template>

<script>
    import './y-map.scss'

    import AMap from 'AMap'
    import {unique} from "@/utils/utils";


    export default {
        name: "YMap",
        props:[
            'mapConfig',
            'moveMan',
            'mapData',
            'start',
        ],
        data(){
            return {
                Map:{},
                Man:{},
                drawConfig:[]
            }
        },
        methods:{
            initMap(){
                this.Map = new AMap.Map('container',{
                    center: [113.209784, 33.746716],
                    resizeEnable: true,
                    zoom: 16,
                    pitch: 50,
                    expandZoomRange: true,
                    zooms: [3, 20],
                });

                this.mapData.forEach(value=>{
                    this.drawConfig.push(value.position)
                })

                let obj = unique(this.mapData,'name');


                obj.forEach(value=>{
                    let marker = new AMap.Marker({
                        position: new AMap.LngLat(value.position[0],value.position[1]),
                        offset: new AMap.Pixel(-10, -38),
                        title: value.name
                    });
                    marker.on('click',()=>{
                        this.createWindow(value.name,value.position);
                    })
                    this.Map.add(marker);
                })
            },
            initMoveMan(map,moveMan) {
                moveMan.map = map;

                this.Man = new AMap.Marker(moveMan);

            },
            createWindow(content,position){
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

                infoWindow.open(this.Map,position);
            },
            drawPath(man,map,data) {
                // 绘制轨迹
                new AMap.Polyline({
                    map: map,
                    path: data,
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
            startAnimation(target,data) {
                target .moveAlong(data, 200)
            },

        },
        mounted(){
            this.initMap();
            this.initMoveMan(this.Map,this.moveMan);
            this.drawPath(this.Man,this.Map,this.drawConfig);


        },
        watch:{
            start(){

                this.startAnimation(this.Man,this.drawConfig)
            }
        }
    }
</script>

