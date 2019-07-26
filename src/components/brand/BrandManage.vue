<template>
  <div id="main">
    <div v-show="see">
      <ul v-if="!see" v-for="maleart in malearts">
        <li>
          <h2>{{maleart.name}}</h2>
          <img v-bind:src="maleart.image">
          <a>{{maleart.url}}</a>
        </li>
      </ul>
      <ul v-if="see" v-for="femaleart in femalearts">
        <li>
          <h2>{{femaleart.name}}</h2>
          <img v-bind:src="femaleart.image">
          <a>{{femaleart.url}}</a>
        </li>
      </ul>
    </div>

  </div>


</template>
<script>
  import $ from 'jquery'
  export default {
    data() {

      return {
        see:true,
        malearts:[
        {
          name:1 ,
          image:'senma.jpg',
          url:'http://www.baidu.com'
        },
        {
          name:2 ,
          image:'senma.jpg',
          url:'http://www.taobao.com'
        }
      ]
        ,
        femalearts:[
          {
            name:'森马' ,
            image:'static/img/female1.jpg',
            url:'http://www.baidu.com'
          },
          {
            name:'美邦' ,
            image:'static/img/female2.jpg',
            url:'http://www.taobao.com'
          },
          {
            name:'唐狮' ,
            iimage:'static/img/female3.jpg',
            url:'http://www.taobao.com'
          },
          {
            name:'斯莱德' ,
            image:'static/img/female4.jpg',
            url:'http://www.taobao.com'
          }
          ,
          {
            name:'杰克琼斯' ,
            image:'static/img/female5.jpg',
            url:'http://www.taobao.com'
          },
          {
            name:'太平鸟' ,
            iimage:'static/img/female6.jpg',
            url:'http://www.taobao.com'
          }
          ,
          {
            name:'马克华菲' ,
            image:'static/img/female7.jpg',
            url:'http://www.taobao.com'
          },
          {
            name:'gxg' ,
            image:'static/img/female8.jpg',
            url:'http://www.taobao.com'
          }
        ]
      };
    },
    created() {

    },
    methods: {

    },
    mounted() {
    }
  };
</script>
<style lang="less" scoped>
  img{
    width: 100%;
    height: auto;
    max-width: 100%;
    display: block;
  }
</style>
