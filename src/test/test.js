let data = [
    {
        "chirlden": [
            {
                "chirlden": [
                    {
                        "chirlden": [],
                        "xm": "王文虎",
                        "xgh": "4339"
                    }
                ],
                "xm": "张瑞",
                "xgh": "3540"
            },
            {
                "chirlden": [],
                "xm": "王文虎",
                "xgh": "4339"
            },
            {
                "chirlden": [],
                "xm": "赵郑营",
                "xgh": "4374"
            }
        ],
        "xm": "杨雨",
        "xgh": "3214"
    }
]
function treeFormat(data){
    data.forEach(item=>{
        item["name"] = item["xm"]+" "+item["xgh"];
        item.children = item.chirlden
        delete item["xm"];
        delete item["xgh"];
        if(item.chirlden.length>0){
            treeFormat(item.chirlden)
        }else{
            delete item["chirlden"]
        }
    })
    return data
}

let rs = treeFormat(data)


console.log(rs[0])

