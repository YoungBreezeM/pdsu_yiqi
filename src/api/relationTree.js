import Http from "@/Http/http";

export const relationTree = async (body)=>{
    console.log(body)
    let data =await Http({
        method:'post',
        url:"/findTree",
        data:body
    })
    return data;
}

export const relationTreeTable = async (body)=>{
    console.log(body)
    let data =await Http({
        method:'post',
        url:"/findTreeInfor",
        data:body
    })
    return data;
}

