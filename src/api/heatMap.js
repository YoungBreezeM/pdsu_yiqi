import Http from "@/Http/http";
import {DateFormat} from "@/utils/format";

export const heatmapApi = async ()=>{
   let data =await Http({
        method:'get',
        url:"/heatMap"
    })
    return data
}

export const getLine = async (floor)=>{
    DateFormat();
    let date = new Date();
    let data =await Http({
        method:'post',
        url:"/line",
        data:{
            "startTime": date.format("yyyy-MM-dd")+" 00:00:00",
            "endTime": date.format("yyyy-MM-dd hh")+":00:00",
            "floor": floor
        }
    })
    return data
}