<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>CountDownDemo</h2>
    <div>
      <ul>
        <li v-for="item in showGoodsList" :key="item.id">
          <div>{{item.name}}</div>
          <div v-if="item.status == 1">
            未开始
          </div>
          <div v-else-if="item.status == 2">
            进行中
          </div>
          <div v-else-if="item.status == 3">
            已结束
          </div>
          <Countdown :time="item.countdownTime" @countdownClose="countdownShow=false"></Countdown>
        </li>
      </ul>  
    </div>
  </div>
</template>



<script>

  import Countdown from './CountDown' 
  export default {
    name: 'CountDownDemo',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        countdownTime:new Date("2020-07-14 20:00:00")/1000,
        showGoodsList:[],
      }
    },
    components: {Countdown},
    mounted(){
      var goodsList=[{id:1,name:"电视",starttime:"2020-07-15 09:20:00",endtime:"2020-07-15 09:25:00"},
      {id:2,name:"手机",starttime:"2020-07-15 09:34:00",endtime:"2020-07-15 09:46:00"},
      {id:3,name:"键盘",starttime:"2020-07-15 09:45:00",endtime:"2020-07-15 09:57:00"}]
      var goods={
        id:0,
        name:"",
        status:3,//1未开始 2进行中 3已结束
        countdownTime:0,
      }
      var now=new Date();
      goodsList.forEach(item=>{
        var goods={
          id:item.id,
          name:item.name,
          status:3,//1未开始 2进行中 3已结束
          countdownTime:0,
        }
        item.starttime=new Date(item.starttime);
        item.endtime=new Date(item.endtime);
        if(now<item.starttime){
            //未开始
            goods.status=1;
            goods.countdownTime=item.starttime/1000;
            var durTime=item.starttime.getTime()-now.getTime();
            var self = this; 
            setTimeout(function(){
              //变更为进行中
              self.showGoodsList.forEach(r=>{
                if(r.id==item.id){
                  r.status=2;
                  r.countdownTime=item.endtime/1000;
                }
              })
            },durTime);

            setTimeout(function(){
              self.showGoodsList.forEach(r=>{
                //变更为结束
                if(r.id==item.id){
                  r.status=3;
                  r.countdownTime=0;
                }
              })
            },item.endtime.getTime()-item.starttime.getTime()+durTime)
          }else if(now<item.endtime){
            //进行中
            goods.status=2;
            goods.countdownTime=item.endtime/1000;
            var self = this; 
            setTimeout(function(){
              self.showGoodsList.forEach(r=>{
                //变更为结束
                if(r.id==item.id){
                  r.status=3;
                  r.countdownTime=0;
                }
              })

            }, item.endtime.getTime()-item.starttime.getTime()+durTime)
          }else{
            //已结束不处理
          }
          this.showGoodsList.push(goods);

        })
      console.log(JSON.stringify(this.showGoodsList));
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
