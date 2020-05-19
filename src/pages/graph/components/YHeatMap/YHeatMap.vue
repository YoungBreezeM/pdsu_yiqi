<template>
    <div class="y-heat-map" id="heatContainer">

    </div>
</template>

<script>
    import "./YHeatMap.scss"
    import AMap from 'AMap'

    export default {
        name: "YHeatMap",
        methods: {
            initHeatMap() {
                if (!this.isSupportCanvas()) {
                    alert('热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~')
                }

                var points =[
                    {"lng":113.207511,"lat":33.749946,"count":0.99,"bvdn":"十四号宿舍楼","livenum":134,"alertnum":220,"totalvol":500,"isalert":"否","chargn":3318,"chargnm":"程亚旭","chargph":1378888888},
                    {"lng":113.209768,"lat":33.749704,"count":0.6,"bvdn":"东北门","livenum":134,"alertnum":220,"totalvol":500,"isalert":"否","chargn":3318,"chargnm":"王福强","chargph":1378888888},
                    {"lng":113.178456,"lat":33.774532,"count":0.3,"bvdn":"崇文校区（图书馆）","livenum":134,"alertnum":220,"totalvol":500,"isalert":"否","chargn":3318,"chargnm":"张贯敏","chargph":1378888888},
                    {"lng":113.208495,"lat":33.748764,"count":0.6,"bvdn":"科技楼","livenum":134,"alertnum":220,"totalvol":500,"isalert":"否","chargn":3318,"chargnm":"吕海莲","chargph":1378888888},
                    {"lng":113.206335,"lat":33.748888,"count":0.6,"bvdn":"三号教学楼","livenum":134,"alertnum":220,"totalvol":500,"isalert":"否","chargn":3318,"chargnm":"李新建","chargph":1378888888},
                    {"lng":113.209058,"lat":33.748287,"count":0.9,"bvdn":"办公楼","livenum":134,"alertnum":220,"totalvol":500,"isalert":"否","chargn":3318,"chargnm":"张国锋","chargph":1378888888},
                    {"lng":113.177872,"lat":33.773917,"count":0.6,"bvdn":"崇文校区（继续教育学院）","livenum":134,"alertnum":220,"totalvol":500,"isalert":"否","chargn":3318,"chargnm":"袁方","chargph":1378888888},
                    {"lng":113.205433,"lat":33.749352,"count":0.7,"bvdn":"四号教学楼","livenum":134,"alertnum":220,"totalvol":500,"isalert":"否","chargn":3318,"chargnm":"王巍","chargph":1378888888},
                    {"lng":113.210153,"lat":33.745006,"count":0.8,"bvdn":"琴房楼","livenum":134,"alertnum":220,"totalvol":500,"isalert":"否","chargn":3318,"chargnm":"刘立宁","chargph":1378888888}
                ];

                let map = new AMap.Map('heatContainer', {
                    center: [113.209784, 33.746716],
                    resizeEnable: true,
                    zoom: 16,
                    pitch: 50,
                    expandZoomRange: true,
                    zooms: [3, 20],

                });


                map.plugin(["AMap.Heatmap"], function () {
                    //初始化heatmap对象
                   let heatmap = new AMap.Heatmap(map, {
                        radius: 30, //给定半径
                        opacity: [0, 0.9],
                        gradient:{
                            0.5: 'blue',
                            0.65: 'rgb(30,232,64)',
                            0.7: 'rgb(255,200,0)',
                            0.9: '#ef5b13',
                            1.0: '#e30b0b'
                        }

                    });

                    heatmap.setDataSet({
                        data: points,
                        max: 1
                    });


                });

                this.createdCallout(map,points)
            },
            createdWindow(){
                return

            },
            createWindow(map,content,position){
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

                infoWindow.open(map,position);
            },
            createdCallout(map,points){

                points.forEach(point=>{
                    let marker = new AMap.Marker({
                        position: [point.lng,point.lat],
                        map: map
                    });

                    let content;
                    content  = '<h4>平顶山学院' + point.bvdn + '</h4>';
                    content += '<h6>实时人数：'+point.livenum+'</h6>';
                    content += '<h6>预警人数：'+point.alertnum+'</h6>';
                    content += '<h6>总可容纳人数：'+point.totalvol+'</h6>';
                    content += '<h6>是否已超预警：'+point.isalert+'</h6>';
                    content += '<h6>负责人工号：'+point.chargn+'</h6>';
                    content += '<h6>负责人名字：'+point.chargnm+'</h6>';
                    content += '<h6>负责人电话：'+point.chargph+'</h6>';
                    content += '<button class="btn btn-success btn-xs">实时入情况</button>';
                    content += '<button class="btn btn-warning btn-xs">实时出情况 </button>';
                    content += '<button class="btn btn-danger btn-xs">内部房间实时情况</button>';


                     marker.on('click', ()=>{
                         this.createWindow(map,content,[point.lng,point.lat])
                     });
                })

                map.setFitView();

            },
            isSupportCanvas() {
                let elem = document.createElement('canvas');
                return !!(elem.getContext && elem.getContext('2d'));
            }
        },
        mounted(){
            this.initHeatMap();
        }
    }
</script>

