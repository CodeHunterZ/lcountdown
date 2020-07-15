<template>
    <div class="timeBox" v-if="countdownShow">
        <span class="value" v-if="pageData.day > 0">{{ pageData.day }}</span><span class="label" v-if="pageData.day > 0">天</span>
        <span class="value">{{ pageData.hour }}</span><span class="label">:</span>
        <span class="value">{{ pageData.minute }}</span><span class="label">:</span>
        <span class="value">{{ pageData.second }}</span>
    </div>
</template>

<script>
    export default {
        name: 'countdown',
        props: {
            time: {
                type: Number
            }
        },
        created() {
            this.interval = setInterval(() => {
                const endTime  = this.time - (new Date() / 1000 | 0)
                if ( endTime <=0 ) {
                    clearInterval(this.interval)
                    this.countdownShow = false
                    this.$emit('countdownClose');
                }
                let date = {
                    day: Math.floor(endTime / 86400),
                    hour: Math.floor(endTime % 86400 / 3600),
                    minute: Math.floor(endTime % 3600 / 60),
                    second: Math.floor(endTime % 3600 % 60)
                }

                Object.keys(date).forEach(value => {
                    if (date[value].toString().length < 2 && value !== 'day') {
                        this.pageData[value] = "0" + date[value]
                    } else {
                        this.pageData[value] = date[value]
                    }
                })
            }, 1000);
        },
        beforeDestroy() {
            clearInterval(this.interval)
        },
        data() {
            return {
                countdownShow: true,
                pageData: {
                    day: '0',
                    hour: '00',
                    minute: '00',
                    second: '00'
                },
                showGoodsList:[{

                }]
            }
        },

    }
</script>