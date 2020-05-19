<template>
    <div class="clock">
        <div class="digit hours" v-for="(item, index) in hours">
            <div v-for="(items, index) in item" :class="{'segment': true,'activate': items}"></div>
        </div>
        <div class="separator"></div>
        <div class="digit hours" v-for="(item, index) in minute">
            <div v-for="(items, index) in item" :class="{'segment': true,'activate': items}"></div>
        </div>
        <div class="separator"></div>
        <div class="digit hours" v-for="(item, index) in second">
            <div v-for="(items, index) in item" :class="{'segment': true,'activate': items}"></div>
        </div>
        <div class="time-date">
            {{year}} 年 {{month}} 月 {{date}} 日  周 {{day}}
        </div>
    </div>
</template>


<script>
    import './YClock.scss'
    export default {
        name: "YClock",
        data() {
            return {
                hours: [],
                minute: [],
                second: [],
                year:'',
                month:'',
                day:'',
                date:'',
                numList: [ // 数字对应的显示
                    [0,1,2,3,4,5],
                    [1,2],
                    [0,1,3,4,6],
                    [0,1,2,3,6],
                    [1,2,5,6],
                    [0,2,3,5,6],
                    [0,2,3,4,5,6],
                    [0,1,2],
                    [0,1,2,3,4,5,6],
                    [0,1,2,5,6]
                ]
            }
        },
        mounted() {
            this.clockData();
            setInterval(() => {
                this.clockData();
            }, 1000);
            this.initTime();
        },
        methods: {
            clockDisplay(arr, num) {
                arr.forEach((el_i, i) => {
                    el_i.forEach((el_j, j) => {
                        this.numList[String(num)[i]].forEach((el_k) => {
                            if (el_k === j) {
                                el_i[j] = true;
                            }
                        })
                    })
                })
                return arr
            },
            clockData() {
                const p = s => {return s < 10 ? '0' + s: s;} // 时间不足10位补0
                const myDate     = new Date()
                const getHours   = p(myDate.getHours());   // 时
                const getMinutes = p(myDate.getMinutes()) // 分
                const getSeconds = p(myDate.getSeconds()) // 秒
                const arrs  = Array.from(new Array(2),() => new Array(7).fill(0))
                this.hours  = this.clockDisplay(JSON.parse(JSON.stringify(arrs)), getHours)
                this.minute = this.clockDisplay(JSON.parse(JSON.stringify(arrs)), getMinutes)
                this.second = this.clockDisplay(JSON.parse(JSON.stringify(arrs)), getSeconds)
            },
            initTime(){
                let date = new Date();
                this.year = date.getFullYear();
                this.month = date.getMonth()+1;
                this.date = date.getDate();
                this.day = date.getDay();
            }
        }
    }
</script>

