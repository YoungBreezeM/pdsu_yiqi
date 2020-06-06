
export const option = {
    title: {
        textStyle:{color:'#92b1d8',fontSize:'15'},
        text: '单位：人'
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    legend: {
        textStyle:{color:'#92b1d8',},
        data:['流入','流出']
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    xAxis : [
        {
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#92b1d8'
                },
            },
            type : 'category',
            boundaryGap : false,
            data: ['4.4','4.5','4.6','4.7','4.8','4.9','4.10']
        }
    ],
    yAxis: [
        {
            splitLine:{show: false},//去除网格线
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#92b1d8'
                },
            },
            name: '',
            type: 'value'
        }
    ],
    series: [
        {
            name:'流入',
            type:'line',
            showSymbol: false,
            smooth: true ,
            areaStyle: {normal: {}},
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            itemStyle:{
                normal:{
                    barBorderColor:'rgba(23,207,224,0.85)',
                    color:'rgba(23,207,224,0.85)'
                },
                emphasis:{
                    color:'rgba(23,207,224,0.85)'
                },
            },
            data:[50,40,30,60,90,280,70]
        },
        {
            name:'流出',
            type:'line',
            showSymbol: false,
            smooth: true ,
            areaStyle: {normal: {}},
            lineStyle: {
                normal: {
                    width: 1
                },
            },
            itemStyle:{
                normal:{
                    barBorderColor:'rgba(20,42,184,0.83)',
                    color:'rgba(20,42,184,0.83)'
                },
                emphasis:{
                    color:'rgba(20,42,184,0.83)'
                },
            },
            data:[20,40,50,60,190,80,90]
        }
    ]
};
