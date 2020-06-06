import da from "element-ui/src/locale/lang/da";

var colors = [
    "#00ADD0",
    "#FFA12F",
    "#B62AFF",
    "#604BFF",
    "#6E35FF",
    "#002AFF",
    "#20C0F4",
    "#95F300",
    "#04FDB8",
    "#AF5AFF"
]
let handle = function handleData(data, index, color = '#00f6ff') {
    //index标识第几层
    return data.map((item, index2) => {
        //计算出颜色
        if (index === 1) {
            color = colors.find((item, eq) => eq == index2 % 10);
        }
        // 设置节点大小
        if (index === 0 || index === 1) {
            item.label = {
                position: "inside",
                //   rotate: 0,
                //   borderRadius: "50%",
            }
        }
        // 设置label大小
        switch (index) {
            case 0:
                item.symbolSize = 30
                break;
            case 1:
                item.symbolSize = 20
                break;
            default:
                item.symbolSize = 10
                break;
        }
        // 设置线条颜色
        item.lineStyle = {color: color}

        if (item.children) {//存在子节点
            item.itemStyle = {
                borderColor: color,
                color: color
            };
            item.children = handle(item.children, index + 1, color)
        } else {//不存在
            item.itemStyle = {
                color: 'transparent',
                borderColor: color
            };
        }
        return item
    })
}

function treeFormat(data){
    data.forEach(item=>{
        item.name = item.xm+" "+item.xgh;
        item.children = item.chirlden
        if(item.chirlden&&item.chirlden.length>0){
            treeFormat(item.chirlden)
        }else{
            delete item["chirlden"]
        }
    })
    let rs = handle(data)
    return rs
}

const option = {
    type: "tree",
    toolbox: { //工具栏
        show: true,
        iconStyle: {
            borderColor: "#03ceda"
        },
        feature: {
            restore: {}
        }
    },
    tooltip: {//提示框
        trigger: "item",
        triggerOn: "mousemove",
        backgroundColor: "rgba(1,70,86,1)",
        borderColor: "rgba(0,246,255,1)",
        borderWidth: 0.5,
        textStyle: {
            fontSize: 10
        }
    },
    series: [
        {
            type: "tree",
            hoverAnimation: true, //hover样式
            data: null,
            top: -10,
            bottom: 0,
            left: 0,
            right: 0,
            layout: "radial",
            symbol: "circle",
            symbolSize: 10,
            nodePadding: 20,
            animationDurationUpdate: 750,
            expandAndCollapse: true, //子树折叠和展开的交互，默认打开
            initialTreeDepth: 10,
            roam: true, //是否开启鼠标缩放和平移漫游。scale/move/true
            focusNodeAdjacency: true,
            itemStyle: {
                borderWidth: 1,
            },
            label: { //标签样式
                color: "rgb(208,8,8)",
                fontSize: 10,
                fontFamily: "SourceHanSansCN",
                position: 'left',
                rotate: 0,

            },
            lineStyle: {
                width: 1,
                curveness: 0.5,
            }
        }
    ]
}



export const initOptionFormat = (data)=>{
   option.series[0].data = treeFormat([data])
    return option;
}

export const setDefaultOption = (data)=>{
    option.series[0].data = handle(data)
    return option;
}