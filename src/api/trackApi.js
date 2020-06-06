import Http from "@/Http/http";

export const trackApi = async (body)=>{
    console.log(body)
    let data =await Http({
        method:'post',
        url:"/track",
        data:body
    })
    return data;
}

export const trackByFloorApi = async (body)=>{
    let data =await Http({
        method:'post',
        url:"/track/floor",
        data:body
    })
    return data;
}