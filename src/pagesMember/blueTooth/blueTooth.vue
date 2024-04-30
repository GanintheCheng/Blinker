<script lang="ts" setup>
import { ref } from 'vue';
import { useMemberStore } from '@/stores'

const store = useMemberStore()
const { safeAreaInsets } = uni.getSystemInfoSync()
const goBack = () => {
  uni.navigateBack()
}

const flag = ref(true)
setTimeout(() => {
  flag.value = false
}, 3000)
const value = ref()

const props = defineProps({
  img: String,
  text: String,
  type: Number,
  introduce: String
})

const addAdvice = () => {
  if (store.addIndexList({
    img: props.img,
    name: value.value,
    state: '离线'
  })) {
    uni.showToast({
      title: '添加成功',
      duration: 2000
    })
    setTimeout(() => {
      uni.navigateTo({
        url: '/pages/index/index',
      })
    }, 2000)
  } else {
    uni.showToast({
      title: '名称重复',
      icon: 'error'
    })
  }

}
</script>

<template>
  <view :style="{ height: safeAreaInsets?.top + 'px' }" style="background-color: rgba(128, 128, 128, 0.584);"></view>
  <view class="box-bg">
    <view class="box-bg">
      <uni-nav-bar dark color="#999" backgroundColor="#f5f5f5" shadow left-icon="left" leftText="返回" rightText="设置"
        title="蓝牙接入" @clickLeft="goBack" fixed />
    </view>
  </view>
  <view class="before" v-if="flag">
    <view>发现设备中~</view>
    <view style="height: 40rpx;"></view>
    <view style="width: 500rpx;
    height: 1rpx;
    background-color: gray;"></view>
    <view style="height: 40rpx;"></view>
    <uni-load-more iconType="circle" status="loading" :icon-size="50" />
  </view>
  <uni-transition mode-class="zoom-in" :show="!flag" :duration="1000">
    <view class="later" v-if="!flag">
      <uni-section title="请输入名称" sub-title="将为您添加至首页" type="circle" padding>
        <view class="input">
          <uni-easyinput class="uni-mt-5" trim="all" v-model="value" placeholder="请输入内容">
          </uni-easyinput>
          <view @tap="addAdvice">添加</view>
        </view>
      </uni-section>
    </view>
  </uni-transition>
</template>

<style lang="scss">
page {
  background-color: #99999922;
  position: relative;
  height: 100%;
}

.before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: larger;
  font-weight: 900;
}

uni-transition {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.later {
  .input {
    display: flex;
    width: 500rpx;
    justify-content: space-between;
    height: 70rpx;

    view {
      background: rgba(0, 128, 0, 0.479);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5rpx;
      font-weight: 900;
    }
  }
}
</style>