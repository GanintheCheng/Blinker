<script setup lang="ts">
import { onHide, onLoad, onShow } from '@dcloudio/uni-app';
import { ref } from 'vue'
import { useMemberStore } from '@/stores'
const { safeAreaInsets } = uni.getSystemInfoSync()
const store = useMemberStore()

//左侧窗口
const showLeft = ref()
const showDrawer = () => {
  showLeft.value.open()
}
const closeDrawer = () => {
  showLeft.value.close()
}

//底部弹出层
const bottom = ref()
const openbottom = () => {
  bottom.value.open()
}

//地图渲染方式
const mapType = ref(true)
onLoad(() => {
  mapType.value = true
})
const changeChangui = () => {
  mapType.value = true
  show.value = false
  setTimeout(() => {
    show.value = true
  }, 100);
  bottom.value.close()
}
const changeJuhe = () => {
  mapType.value = false
  show.value = false
  setTimeout(() => {
    show.value = true
  }, 100);
  bottom.value.close()
}

//跳转添加设备
const turnToAdd = () => {
  uni.navigateTo(
    {
      url: '/pagesMember/addAdvice/addAdvice'
    }
  )
}

const turnToAdviceDetail = (e) => {
  uni.navigateTo(
    {
      url: `/pagesMember/adviceDetail/adviceDetail?id=${e.id}&img=${e.img}&name=${e.name}`
    }
  )
}

//扫描二维码
const scan = () => {
  uni.scanCode({
    success: function (res) {
      uni.showToast({
        title: '正在加载设备',
        icon: 'loading',
        duration: 1000
      })
    },
    fail: (fail) => {
      console.log(12);

    },
  });
}
//隐藏
const show = ref(false)
onShow(() => {
  show.value = true
})
onHide(() => {
  show.value = false
})
//渲染list
const list = ref(store.indexList)
const bt = ref()
//渲染垃圾桶
const message = ref()
const trashSize = ref(40)
let isAnimating = false;
let isTapTrash = false
const tapTrash = () => {
  if (isAnimating) return;
  isTapTrash = !isTapTrash
  const actions: { action: '+' | '-', delay: number }[] = [
    { action: '+', delay: 100 },
    { action: '+', delay: 200 },
    { action: '+', delay: 300 },
    { action: '+', delay: 400 },
    { action: '-', delay: 500 },
    { action: '-', delay: 600 },
    { action: '-', delay: 700 },
    { action: '-', delay: 800 }
  ];
  isAnimating = true;
  if (isTapTrash) message.value.open()
  actions.forEach(({ action, delay }) => {
    setTimeout(() => {
      if (action === '+') {
        // 在 TypeScript 中，如果 trashSize 的类型是数字类型，需要显式转换为数字
        trashSize.value = Number(trashSize.value) + 2;
      } else if (action === '-') {
        trashSize.value = Number(trashSize.value) - 2;
      }

      // 判断是否所有动画都已完成
      if (delay === actions[actions.length - 1].delay) {
        isAnimating = false;
      }
    }, delay);
  });
}
const tapDelete = (id) => {
  store.deleteIndexList(id)
  list.value = store.indexList
}
</script>

<template>
  <uni-icons type="trash" :size="trashSize" class="songs" @tap="tapTrash"></uni-icons>
  <view :style="{ height: safeAreaInsets?.top + 'px' }" style="background-color: rgba(128, 128, 128, 0.584);"></view>

  <view class="body">
    <view class="title">Blinker</view>
    <image src="/static/top.png" class="topimg" />
    <view class="innerbox">
      <view class="topbox">
        <view class="topleft">
          <uni-icons type="list" size="40" @click="showDrawer()"></uni-icons>
        </view>
        <view class="topright">
          <uni-icons type="plus" size="40" class="toprightfirst" @tap="turnToAdd()"></uni-icons>
          <uni-icons type="scan" size="40" class="toprightfirst" @tap="scan"></uni-icons>
          <uni-icons type="map" size="40" @tap="openbottom()"></uni-icons>
        </view>
      </view>
      <uni-transition mode-class="fade" :show="show" :duration="1000">
        <view class="itembox" v-show="mapType">
          <view class="itemtop">
            <uni-icons type="spinner-cycle" size="32"></uni-icons>
            <text class="itemtoptext">所有设备</text>
          </view>
          <view class="items">
            <view class="item" v-for="(item, index) in list" :key="index" v-if="list.length != 0">
              <view class="itemleft">
                <image :src="item.img" mode="scaleToFill" @tap="turnToAdviceDetail(item)" />
                <view class="name">{{ item.name }}</view>
              </view>
              <view class="itemright">
                <uni-icons type="clear" size="30" color="red" v-show="isTapTrash" @tap="tapDelete(item.id)"></uni-icons>
                {{ item.state }}
              </view>
            </view>
            <view v-else style="margin:0 auto;">
              暂无数据
            </view>
          </view>
        </view>
        <view class="map2" v-if="!mapType">
          <view class="open">
            <image src="/static/开灯.png" mode="scaleToFill" />
            <view>点我开关灯</view>
          </view>
          <view class="open">
            <image src="/static/计数.png" mode="scaleToFill" />
            <view>点我计数</view>
          </view>
          <view class="open">
            <image src="/static/测试.png" mode="scaleToFill" />
            <view>测试</view>
          </view>
        </view>
      </uni-transition>
    </view>
  </view>

  <!-- 左侧滑出 -->
  <uni-drawer ref="showLeft" mode="left" :width="290" class="unileft">
    <view class="unileft">
      <view :style="{ height: safeAreaInsets?.top + 'px' }"></view>
      <view class="body">
        <view class="topinfo">
          <view class="language">
            Blinker菜单
          </view>
          <view>
            <uni-icons type="email" size="30" color="white"></uni-icons>
          </view>
        </view>
        <view class="headinfo">
          <image src="/static/head.png" mode="scaleToFill" />
          <view>
            <view class="name">18081204700SM</view>
            <view class="num">1个设备已接入</view>
          </view>
        </view>

        <view class="list">
          <navigator url="/pagesMember/mangerAdvice/mangerAdvice" open-type="navigate" hover-class="navigator-hover">
            <view class="listitem">
              <view class="listleft">
                <image src="/static/设备.png" mode="scaleToFill" />
                <view class="listinfo">设备管理</view>
              </view>
              <view class="listright">
                <uni-icons type="right" size="20" color="white"></uni-icons>
              </view>
            </view>
          </navigator>

          <navigator url="/pagesMember/shareAdvice/shareAdvice" open-type="navigate" hover-class="navigator-hover">
            <view class="listitem">
              <view class="listleft">
                <image src="/static/设备共享.png" mode="scaleToFill" />
                <view class="listinfo">设备共享</view>
              </view>
              <view class="listright">
                <uni-icons type="right" size="20" color="white"></uni-icons>
              </view>
            </view>
          </navigator>

          <navigator url="/pagesMember/mangerScene/mangerScene" open-type="navigate" hover-class="navigator-hover">
            <view class="listitem">
              <view class="listleft">
                <image src="/static/场景管理.png" mode="scaleToFill" />
                <view class="listinfo">场景管理</view>
              </view>
              <view class="listright">
                <uni-icons type="right" size="20" color="white"></uni-icons>
              </view>
            </view>
          </navigator>

          <navigator url="/pagesMember/mangerArea/mangerArea" open-type="navigate" hover-class="navigator-hover">
            <view class="listitem">
              <view class="listleft">
                <image src="/static/区域管理.png" mode="scaleToFill" />
                <view class="listinfo">区域管理</view>
              </view>
              <view class="listright">
                <uni-icons type="right" size="20" color="white"></uni-icons>
              </view>
            </view>
          </navigator>

          <navigator url="/pagesMember/feedBack/feedBack" open-type="navigate" hover-class="navigator-hover">
            <view class="listitem">
              <view class="listleft">
                <image src="/static/用户反馈.png" mode="scaleToFill" />
                <view class="listinfo">用户反馈</view>
              </view>
              <view class="listright">
                <uni-icons type="right" size="20" color="white"></uni-icons>
              </view>
            </view>
          </navigator>


          <navigator url="/pagesMember/aboutUs/aboutUs" open-type="navigate" hover-class="navigator-hover">
            <view class="listitem">
              <view class="listleft">
                <image src="/static/关于我们.png" mode="scaleToFill" />
                <view class="listinfo">关于我们</view>
              </view>
              <view class="listright">
                <uni-icons type="right" size="20" color="white"></uni-icons>
              </view>
            </view>
          </navigator>

        </view>
      </view>
    </view>
  </uni-drawer>
  <!-- 底部弹出 -->
  <uni-popup ref="bottom" type="bottom" safe-area>
    <view class="bottombox">
      <view class="top">
        地图模式切换
      </view>
      <view class="md" @tap="changeChangui">
        常规视图
      </view>
      <view class="bt" @tap="changeJuhe">
        聚合视图
      </view>
    </view>
  </uni-popup>
  <!-- 顶部弹出 -->
  <uni-popup ref="message" type="message">
    <uni-popup-message type="warn" message="点击设备的删除符号完成删除" :duration="2000" style="margin-top: 200rpx;">
    </uni-popup-message>
  </uni-popup>
</template>

<style lang="scss">
.uni-popup__wrapper {
  margin-top: 100rpx;
}

.bottombox {
  width: 730rpx;
  margin-bottom: 50rpx;
  margin-left: 10rpx;
  height: 300rpx;
  background-color: rgba(0, 0, 0, 0.669);
  border-radius: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;

  .top {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 0.2;
    border-bottom: gray solid 1rpx;
    color: gray;
  }

  .md,
  .bt {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0.4;
    color: rgb(24, 149, 245);
    font-weight: 600;
    font-size: larger;
  }

  .md {
    width: 100%;
    border-bottom: gray solid 1rpx;
  }
}

.unileft {
  width: 100%;
  height: 100%;
  background-color: #2b3b48;

  .body {
    margin-left: 20rpx;
    width: 90%;
    height: 100rpx;

    // background-color: red;
    .topinfo {
      display: flex;
      width: 100%;
      height: 100rpx;
      // background-color: red;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40rpx;

      .language {
        color: white;
        font-weight: bold;
      }
    }

    .headinfo {
      width: 100%;
      height: 100rpx;
      // background-color: red;
      display: flex;
      margin-bottom: 100rpx;

      image {
        width: 100rpx;
        height: 100rpx;
        border-radius: 90%;
        margin-right: 20rpx;
      }

      .name {
        margin-top: 10rpx;
        font-size: large;
        color: #f7f7f7;
        font-weight: 500;
      }

      .num {
        margin-top: 10rpx;
        font-size: small;
        color: #f7f7f7c0;
      }
    }

    .list {
      width: 100%;
      height: fit-content;

      .listitem {
        width: 100%;
        height: 60rpx;
        margin-bottom: 50rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .listleft {
          display: flex;
          align-items: center;

          image {
            width: 60rpx;
            height: 60rpx;
            margin-right: 20rpx;
          }

          .listinfo {
            color: #f7f7f7b2;
          }
        }

        // display: flex;
      }
    }
  }
}

page {
  background-color: #99999922;
  height: 100%;
  position: relative;
}

.songs {
  position: absolute;
  right: 50rpx;
  bottom: 100rpx;
  background-color: skyblue;
  border-radius: 90%;
  z-index: 9
}

.body {
  position: relative;
  height: fit-content;

  .title {
    position: absolute;
    top: 20rpx;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .topimg {
    width: 750rpx;
    height: 80rpx;
  }

  .innerbox {
    margin-left: 40rpx;
    width: 670rpx;
    height: fit-content;

    .topbox {
      width: 100%;
      height: 90rpx;
      // background-color: red;
      display: flex;
      justify-content: space-between;

      .toprightfirst {
        margin-right: 10rpx;
      }
    }

    .map2 {
      width: 100%;
      height: fit-content;
      flex-wrap: wrap;
      display: flex;
      justify-content: space-around;

      .open {
        width: 200rpx;
        height: 150rpx;
        border-radius: 30rpx;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        image {
          width: 80rpx;
          height: 80rpx;
        }
      }

    }

    .itembox {
      width: 100%;

      .itemtop {
        height: 100rpx;
        // background-color: red;
        display: flex;
        align-items: center;

        .itemtoptext {
          margin-left: 20rpx;
          color: rgb(47, 173, 240);
          font-weight: 900;
        }
      }

      .items {
        width: 100%;
        height: fit-content;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .item {
          position: relative;
          width: 320rpx;
          height: 200rpx;
          background-color: white;
          border-radius: 10rpx;
          margin-bottom: 40rpx;
          display: flex;
          justify-content: space-between;

          .itemleft {
            margin-top: 20rpx;
            margin-left: 20rpx;

            .name {
              margin-top: 10rpx;
              color: gray;
              font-size: small;
            }
          }

          .itemright {
            margin-right: 30rpx;
            margin-top: 20rpx;
            color: gray;
            display: flex;
            flex-direction: column;
          }

          image {
            width: 100rpx;
            height: 100rpx;
          }
        }

        // .item:nth-child(2n-1){
        //   margin-right: 20rpx;
        // }
      }
    }
  }
}
</style>
