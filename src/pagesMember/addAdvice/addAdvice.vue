<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

const { safeAreaInsets } = uni.getSystemInfoSync()
const arr1 = [
  {
    img: '/static/主板.png',
    text: '点灯',
    type: 0,
    introduce: '支持多种独立设备接入,如Arduino,ESP8266,ESP32开发版或其他Linux设备'
  }
]
const arr2 = [
  {
    img: '/static/发酵机.png',
    text: '乳酸发酵机',
    type: 1,
    introduce: '乳酸发酵机是一款全自动乳酸菌发酵设备,自动控温'
  },
  {
    img: '/static/养殖桶.png',
    text: '生态养殖桶',
    type: 1,
    introduce: '智能生态养殖桶是一款餐厨垃圾全自动养殖黑水的设备'
  },
  {
    img: '/static/餐厨垃圾.png',
    text: '餐厨垃圾回收',
    type: 1,
    introduce: '物联网智能餐厨垃圾减量设备是一款就地化餐厨垃圾减量处理设备,全自动油水分离'
  }
]
const arr3 = [
  {
    img: '/static/箱子.png',
    text: 'DEVICE-TEST',
    type: 1,
    introduce: 'DEVICE-TEST'
  },
  {
    img: '/static/传感器.png',
    text: '传感器',
    type: 0,
    introduce: '传感器'
  },
  {
    img: '/static/灯.png',
    text: '氛围灯',
    type: 0,
    introduce: '氛围灯'
  }
]

const goBack = () => {
  uni.navigateBack()
}

const show = ref(false)
onLoad(() => {
  setTimeout(() => {
    show.value = true
  }, 100)
})
</script>

<template>
  <view :style="{ height: safeAreaInsets?.top + 'px' }" style="background-color: rgba(128, 128, 128, 0.584);"></view>
  <view class="box-bg">
    <view class="box-bg">
      <uni-nav-bar dark color="#999" backgroundColor="#f5f5f5" shadow left-icon="left" leftText="返回" rightText="设置"
        title="添加设备" @clickLeft="goBack" fixed />
    </view>
  </view>
  <uni-transition mode-class="fade" :show="show" :duration="600">
    <view class="body">
      <view class="itembox">
        <view class="title">
          <text>点灯</text>
        </view>
        <view v-for="(item, index) in arr1" :key="index">
          <navigator
            :url="`/pagesMember/addAdviceDetail/addAdviceDetail?img=${item.img}&text=${item.text}&type=${item.type}&introduce=${item.introduce}`"
            open-type="navigate" hover-class="navigator-hover">
            <view class="item" :class="{ 'borderbottom': index < arr1.length - arr1.length % 3 }">
              <image :src="item.img" mode="scaleToFill" />
              <view>
                {{ item.text }}
              </view>
            </view>
          </navigator>
        </view>
      </view>
      <view class="itembox">
        <view class="title">
          <text>昂泰智联</text>
        </view>
        <view v-for="(item, index) in arr2" :key="index">
          <navigator
            :url="`/pagesMember/addAdviceDetail/addAdviceDetail?img=${item.img}&text=${item.text}&type=${item.type}&introduce=${item.introduce}`"
            open-type="navigate" hover-class="navigator-hover">
            <view class="item" :class="{ 'borderbottom': index < arr1.length - arr1.length % 3 }">
              <image :src="item.img" mode="scaleToFill" />
              <view>{{ item.text }}</view>
            </view>
          </navigator>
        </view>

      </view>
      <view class="itembox">
        <view class="title">
          <text>DianDeng Tech</text>
        </view>
        <view v-for="(item, index) in arr3" :key="index">
          <navigator
            :url="`/pagesMember/addAdviceDetail/addAdviceDetail?img=${item.img}&text=${item.text}&type=${item.type}&introduce=${item.introduce}`"
            open-type="navigate" hover-class="navigator-hover">
            <view class="item" :class="{ 'borderbottom': index < arr1.length - arr1.length % 3 }">
              <image :src="item.img" mode="scaleToFill" />
              <view>{{ item.text }}</view>
            </view>
          </navigator>
        </view>

      </view>
    </view>
  </uni-transition>

</template>

<style lang="scss">
page {
  background-color: #99999922;
}

.borderbottom {
  border-bottom: 1rpx solid #99999944;
}

.body {
  margin-left: 20rpx;
  margin-top: 20rpx;
  width: 710rpx;
  height: fit-content;

  .itembox {
    width: 100%;
    min-height: 300rpx;
    height: fit-content;
    background-color: white;
    border-radius: 30rpx;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30rpx;

    .title {
      width: 100%;
      height: 80rpx;
      // background-color: pink;
      display: flex;
      align-items: center;
      padding-left: 20rpx;
      color: #389bee;
      font-weight: 600;
      border-bottom: 1px solid #99999944;
    }

    .item {
      width: 234rpx;
      height: 220rpx;
      border-right: 1rpx solid #99999944;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;

      image {
        width: 120rpx;
        height: 120rpx;
      }

      view {
        font-size: small;
        font-weight: 600;
        color: gray;
        max-width: 180rpx;
        overflow: hidden;
        /* 隐藏超出部分 */
        white-space: nowrap;
        /* 文本不换行 */
      }
    }

  }
}
</style>