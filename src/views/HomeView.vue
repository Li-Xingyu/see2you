<template>
    <div class="video-container">
        <div class="video-box">
            <h2 class="video-name">👰</h2>
            <video
                    ref="video"
                    preload="auto"
                    controls
                    controlsList="nofullscreen nodownload noremoteplayback"
                    style="width: 100% ;height: auto"
                    playsinline=""
                    @play="playVideo"
                    @playing="delock"
                    @pause="pauseVideo"
            >   
<!--                <source :src="videoSrc" type="video/mp4"/>-->
                <p class="vjs-no-js">
                    To view this video please enable JavaScript, and consider upgrading to a
                    web browser that
                    <a href="https://videojs.com/html5-video-support/" target="_blank"
                    >supports HTML5 video</a
                    >
                </p>
            </video>
        </div>
    <div>
    <a-button  @click="test" type="primary" block>
       同步
    </a-button>
    <a-tabs  @change="callback">
      <a-tab-pane key="1" tab="播放列表"></a-tab-pane>
      <a-tab-pane key="2" tab="待开发....." force-render></a-tab-pane>
    </a-tabs>
    </div>
        <div v-if="activeKey=='1'" class="video-control-wrapper">
            <!-- <article id="coplay" class="active" data-drag-id="0" style="cursor: default; transform: translate(0px);">
                <button @click="playVideo" id="coplay-play" title="Play">
                    <svg v-if="!playing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1408 1792">
                        <path d="M1384 927L56 1665q-23 13-39.5 3T0 1632V160q0-26 16.5-36t39.5 3l1328 738q23 13 23 31t-23 31z"></path>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1792">
                        <path
                                d="M1536 192v1408q0 26-19 45t-45 19H960q-26 0-45-19t-19-45V192q0-26 19-45t45-19h512q26 0 45 19t19 45zm-896 0v1408q0 26-19 45t-45 19H64q-26 0-45-19t-19-45V192q0-26 19-45t45-19h512q26 0 45 19t19 45z"></path>
                    </svg>
                </button>
                <button @click="seekVideo" id="coplay-sync" title="Sync with me">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1792">
                        <path
                                d="M1511 1056q0 5-1 7-64 268-268 434.5T764 1664q-146 0-282.5-55T238 1452l-129 129q-19 19-45 19t-45-19-19-45v-448q0-26 19-45t45-19h448q26 0 45 19t19 45-19 45l-137 137q71 66 161 102t187 36q134 0 250-65t186-179q11-17 53-117 8-23 30-23h192q13 0 22.5 9.5t9.5 22.5zm25-800v448q0 26-19 45t-45 19h-448q-26 0-45-19t-19-45 19-45l138-138Q969 384 768 384q-134 0-250 65T332 628q-11 17-53 117-8 23-30 23H50q-13 0-22.5-9.5T18 736v-7q65-268 270-434.5T768 128q146 0 284 55.5T1297 340l130-129q19-19 45-19t45 19 19 45z"></path>
                    </svg>
                </button>
                <button @click="toggleFullScreen" id="coplay-fullscreen" title="Toggle fullscreen">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1792">
                        <path
                                d="M755 1056q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19H64q-26 0-45-19t-19-45v-448q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23zm781-864v448q0 26-19 45t-45 19-45-19l-144-144-332 332q-10 10-23 10t-23-10L791 759q-10-10-10-23t10-23l332-332-144-144q-19-19-19-45t19-45 45-19h448q26 0 45 19t19 45z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1792">
                        <path
                                d="M768 960v448q0 26-19 45t-45 19-45-19l-144-144-332 332q-10 10-23 10t-23-10L23 1527q-10-10-10-23t10-23l332-332-144-144q-19-19-19-45t19-45 45-19h448q26 0 45 19t19 45zm755-672q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19H832q-26 0-45-19t-19-45V384q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23z"></path>
                    </svg>
                </button>
            </article> -->
            <!-- <a class="view-btn" href="/movie/">浏览目录</a> -->
            
            <a-input-search
              v-model="addSrc"
              placeholder="请输入视频链接"
              enter-button="添加"
              size="default"
              @search="addVideo"
            />
            <!-- <div class="address-input">
                <input v-model="videoSrc" type="text" placeholder="视频地址">
                <a href="javascript:;" class="submit-btn" @click="addVideo">添加视频</a>
            </div> -->
            <!-- <h2 class="video-list-title">视频列表：</h2> -->
        
                <a-config-provider>
                  <div class="config-provider">
                    <a-list :data-source="videoList" >
                     <a-list-item slot="renderItem" slot-scope="item,index">
                        <a @click="playVideoItem(item)" slot="actions">播放</a>
                        <a @click="deleteVideoItem(index)" slot="actions">删除</a>
                        <a-list-item-meta>
                          <li  slot="title" >{{ item }}</li>
                        </a-list-item-meta>
                      </a-list-item>
                    </a-list>
                  </div>
                </a-config-provider>
           
            <!-- <ul class="video-list">
                <li class="video-item" v-for="(videoItem,index) in videoList" :key="index">
                    <p class="video-name">{{videoItem}}</p>
                    <div class="button-box">
                        <a href="javascript:;" class="button-play" @click="playVideoItem(videoItem)">播放</a>
                        <a href="javascript:;" class="button-play" @click="deleteVideoItem(index)">删除</a>
                    </div>
                </li>
            </ul> -->
        </div>
    </div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
  import Hls from 'hls.js';
  import { io } from "socket.io-client";
export default {
 data() {
   return{
     activeKey:'1',
     lock:false,
     index:0,
    socket: null,
    player: null,
    hls: null,
    goEasyConnect: null,
    videoList: [],
    addSrc:'',
    videoSrc: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',//https://e1.monidai.com/ppvod/B5812931A0D9AFEB4AA47F9EEE41F772.m3u8
    playing: false,
    controlParam: {
      user: '',
      action: '',
      time: '',
      src:''
    },
    userId: '',
    // goEasy 添加以下变量
    // channel: 'channel1', // GoEasy channel
    // appkey: '******', // GoEasy应用appkey，替换成你的appkey

    // // leancloud-realtime 添加以下变量，appId、appKey、server这几个值去leancloud控制台>设置>应用凭证里面找
    // chatRoom: null,
    // appId: '*******************',
    // appKey: '*******************',
    // server: 'https://*******************.***.com', // REST API 服务器地址
  }
  },   
  methods: {
    callback(key) {
      this.activeKey=key
    },
    delock(){this.lock=false},
    test(){
      this.controlParam.action = 'sync'
      this.sendMessage(this.controlParam)
      console.log(this.player.currentTime)
    },
    randomString(length) {
      let str = ''
      for (let i = 0; i < length; i++) {
        str += Math.random().toString(36).substr(2)
      }
      return str.substr(0, length)
    },
    addVideo() {
      if (this.addSrc) {
        this.videoList.push(decodeURI(this.addSrc))
      }
      // localStorage.setItem('videoList', JSON.stringify(this.videoList))
    },
    playVideoItem(src) {
      this.videoSrc=src
      if(src.includes('.m3u8')){
        this.hls.loadSource(src);
        this.hls.attachMedia(this.player);
        
      } else {
        this.$refs.video.src = src
        
      }
      // localStorage.setItem('currentPlayVideo', src)
     
      this.seekVideo('')
    },
    deleteVideoItem(index) {
      this.videoList.splice(index, 1)
      // localStorage.setItem('videoList', JSON.stringify(this.videoList))
    },
    toggleFullScreen() {
      if (this.player.requestFullscreen) {
        this.player.requestFullscreen()
      } else if (this.player.mozRequestFullScreen) {
        this.player.mozRequestFullScreen()
      } else if (this.player.webkitRequestFullscreen) {
        this.player.webkitRequestFullscreen()
      } else if (this.player.msRequestFullscreen) {
        this.player.msRequestFullscreen()
      }
    },
    pauseVideo() {
      
        
        this.controlParam.action = 'pause'
        this.controlParam.time = this.player.currentTime
        this.sendMessage(this.controlParam)
    },
      playVideo() {  
        this.controlParam.action = 'play'
        this.controlParam.time = this.player.currentTime
        this.sendMessage(this.controlParam)
      },
    
    seekVideo(result) {
           this.controlParam['senduser']=result
           this.controlParam.action = 'seek'
           this.controlParam.time = this.player.currentTime
           this.controlParam.src=this.videoSrc
           this.sendMessage(this.controlParam)
    },
    sendMessage(controlParam){
      const params = JSON.stringify(controlParam)

      // 使用socket-io
      if(!this.lock){  this.socket.emit('video-control', params)}
    

      // 使用GoEasy
      // this.goEasyConnect.publish({
      //   channel: this.channel,
      //   message: params
      // })

      // 使用leancloud-realtime
      // this.chatRoom.send(new TextMessage(params))
    },
    resultHandler(result) {
         
      switch (result.action) {
        case "play":
          this.lock=true
          console.log("我要开始播放了",this.player)
          this.player.currentTime = (result.time + 0.2) //播放时+0.2秒，抵消网络延迟
          this.player.play();
          break
        case "pause":
          this.lock=true
          this.player.currentTime = (result.time)
          this.player.pause(()=>{this.lock=false});
          
          
          break
        case "seek":
          this.lock=true
          if (this.videoSrc!=result.src){
            this.playVideoItem(result.src)
            }
            this.player.currentTime = (result.time+0.5);
            this.player.play();
          
       
         
          break
        case "sync":
           this.seekVideo(result.senduser)
      }
      
    },
    // 获取 url 参数
    getParam(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
    // 设置 url 参数
    setParam(param,val){
      var stateObject = 0;
      var title="0"
      var oUrl = window.location.href.toString();
      var nUrl = "";
      var pattern=param+'=([^&]*)';
      var replaceText=param+'='+val; 
      if(oUrl.match(pattern)){
          var tmp='/('+ param+'=)([^&]*)/gi';
          tmp=oUrl.replace(eval(tmp),replaceText);
          nUrl = tmp;
      }else{ 
          if(oUrl.match('[\?]')){ 
            nUrl = oUrl+'&'+replaceText; 
          }else{ 
            nUrl = oUrl+'?'+replaceText; 
          } 
      }
      history.replaceState(stateObject,title,nUrl);
    }
  },
  created() {

  //   /* 读取本地视频列表和上一次播放的视频*/

  //   const localList = JSON.parse(localStorage.getItem('videoList'))

  //   this.videoList = localList ? localList : []

  //   const currentPlayVideo = localStorage.getItem('currentPlayVideo')

  //   if(currentPlayVideo){
  //     this.videoSrc = currentPlayVideo
  //   }

  //   if(this.getParam("url")){
  //     this.videoSrc = decodeURIComponent(this.getParam("url"))
  //   }

    this.userId = this.randomString(10)

    this.controlParam.user = this.userId
  },
  mounted() {

    this.player = this.$refs.video

    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.loadSource(this.videoSrc);
      this.hls.attachMedia(this.player);
    }

    /*使用socket-io*/
    this.socket = io('http://127.0.0.1:3002/'); // 替换成你的websocket服务地址
    this.socket.on('video-control', (res) => {
      console.log(res)
      const result = JSON.parse(res);
      console.log(result)
      if (result.user !== this.userId) {
        this.resultHandler(result)
      }
    });
    

    /* 使用GoEasy*/

    // /* 创建GoEasy连接*/
    // this.goEasyConnect = new GoEasy({
    //   host: "hangzhou.goeasy.io", // 应用所在的区域地址，杭州：hangzhou.goeasy.io，新加坡：singapore.goeasy.io
    //   appkey: this.appkey,
    //   onConnected: function () {
    //     console.log('连接成功！')
    //   },
    //   onDisconnected: function () {
    //     console.log('连接断开！')
    //   },
    //   onConnectFailed: function (error) {
    //     console.log(error, '连接失败或错误！')
    //   }
    // })
    //
    // const that = this
    //
    // /* 监听GoEasy连接*/
    // this.goEasyConnect.subscribe({
    //   channel: this.channel,
    //   onMessage: function (message) {
    //     const result = JSON.parse(message.content)
    //     if (result.user !== that.userId) {
    //       that.resultHandler(result)
    //     }
    //   }
    // })

    // const realtime = new Realtime({
    //   appId: this.appId,
    //   appKey: this.appKey,
    //   server: this.server,
    // })

    //换成你自己的一个房间的 conversation id（这是服务器端生成的），第一次执行代码就会生成，在leancloud控制台>即时通讯>对话下面，复制一个过来即可

    // var roomId = this.getParam("id")?this.getParam("id"):'***********'

    // // 每个客户端自定义的 id

    // var client, room

    // realtime.createIMClient(this.userId).then(function(c) {
    //   console.log('连接成功')
    //   client = c
    //   client.on('disconnect', function() {
    //     console.log('[disconnect] 服务器连接已断开')
    //   })
    //   client.on('offline', function() {
    //     console.log('[offline] 离线（网络连接已断开）')
    //   })
    //   client.on('online', function() {
    //     console.log('[online] 已恢复在线')
    //   })
    //   client.on('schedule', function(attempt, time) {
    //     console.log(
    //       '[schedule] ' +
    //       time / 1000 +
    //       's 后进行第 ' +
    //       (attempt + 1) +
    //       ' 次重连'
    //     )
    //   })
    //   client.on('retry', function(attempt) {
    //     console.log('[retry] 正在进行第 ' + (attempt + 1) + ' 次重连')
    //   })
    //   client.on('reconnect', function() {
    //     console.log('[reconnect] 重连成功')
    //   })
    //   client.on('reconnecterror', function() {
    //     console.log('[reconnecterror] 重连失败')
    //   })
    //   // 获取对话
    //   return c.getConversation(roomId)
    // })
    //   .then(function(conversation) {
    //     if (conversation) {
    //       return conversation
    //     } else {
    //       // 如果服务器端不存在这个 conversation
    //       console.log('不存在这个 conversation，创建一个。')
    //       return client
    //         .createConversation({
    //           name: 'LeanCloud-Conversation',
    //           // 创建暂态的聊天室（暂态聊天室支持无限人员聊天）
    //           transient: true,
    //         })
    //         .then(function(conversation) {
    //           roomId = conversation.id
    //           console.log('创建新 Room 成功，id 是：', roomId)
    //           that.setParam("id", roomId)
    //           return conversation
    //         })
    //     }
    //   })
    //   .then(function(conversation) {
    //     return conversation.join()
    //   })
    //   .then(function(conversation) {
    //     // 获取聊天历史
    //     room = conversation;
    //     that.chatRoom = conversation
    //     // 房间接受消息
    //     room.on('message', function(message) {
    //       const result = JSON.parse(message._lctext)
    //       that.resultHandler(result)
    //     });
    //   })
    //   .catch(function(err) {
    //     console.error(err);
    //     console.log('错误：' + err.message);
    //   });

    // this.player.addEventListener('play', () => {
    //   this.playing = true
    // })
    // this.player.addEventListener('pause', () => {
    //   this.playing = false
    // })
  },  
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
<style scoped>
.video-container{
  display: flex;
  flex-direction:column;
  height: 100%;
}
.video-control-wrapper{
    flex: 1;
    display: flex;
    flex-direction:column;
    overflow:auto
  }
  .config-provider{
    flex: 1;
    display: flex;
    overflow: auto;
  }
.ant-list {
  width: 100%;
  flex: 1;
}
.ant-list-item-meta{
  width: 70%;
  overflow: hidden;
}
.ant-list-item-meta-content{
  width: 70%;
  overflow: hidden;
}
.video-name{
  margin-bottom:0px;
  line-height: 40px;
}
</style>