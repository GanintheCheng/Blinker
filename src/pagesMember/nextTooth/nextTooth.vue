<script lang="ts" setup>
import { ref } from 'vue';
import { useMemberStore } from '@/stores'
const store = useMemberStore()

const { safeAreaInsets } = uni.getSystemInfoSync()
const goBack = () => {
  uni.navigateBack()
}

const props = defineProps({
  img: String,
  text: String,
  type: Number,
  introduce: String
})

const wifi = ref()
const key = ref()

const isTap = ref(false)
const isName = ref(false)
const beginTap = () => {
  uni.showToast(
    {
      title: '连接中~',
      icon: 'loading',
      duration: 1000
    }
  )
  setTimeout(() => {
    isTap.value = !isTap.value
  }, 1000)
  setTimeout(() => {
    isName.value = !isName.value
  }, 3000);
}

const name = ref()
const addAdvice = () => {
  if (store.addIndexList({
    img: props.img,
    name: name.value,
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
        title="AP配网" @clickLeft="goBack" fixed />
    </view>
  </view>
  <view v-if="!isTap">
    <view class="top">
      <view class="topinnerbox">
        <view>1.确保设备已进入等待配置状态</view>
        <view>2.输入WIFI密码,并点击开始配置</view>
      </view>
    </view>
    <view style="height: 40rpx;"></view>
    <view class="bt">
      <view class="btinnerbox">
        <uni-easyinput class="uni-mt-5" trim="all" v-model="wifi" placeholder="WIFI 名称"
          style="font-weight: 900;"></uni-easyinput>
        <view style="height: 20rpx;"></view>
        <uni-easyinput class="uni-mt-5" trim="all" v-model="key" placeholder="WIFI 密码" style="font-weight: 900;">
        </uni-easyinput>
        <view style="height: 40rpx;"></view>
        <button @tap="beginTap">开始配置</button>
      </view>
    </view>
  </view>
  <uni-transition mode-class="zoom-in" :show="isTap && !isName" :duration="1000">
    <view v-if="isTap && !isName" class="loading">
      <view class="content">正在进行配置,请稍后...</view>
      <view style="height: 20rpx;"></view>
      <view style="height: 1rpx;width: 600rpx;background-color: gray;"></view>
      <view style="height: 20rpx;"></view>
      <uni-load-more iconType="circle" status="loading" :icon-size="50" />
    </view>
  </uni-transition>

  <uni-transition mode-class="zoom-in" :show="isName" :duration="1000">
    <view v-if="isName" class="later">
      <uni-section title="请输入名称" sub-title="将为您添加至首页" type="circle" padding>
        <view class="input">
          <uni-easyinput class="uni-mt-5" trim="all" v-model="name" placeholder="请输入名称">
          </uni-easyinput>
          <view @tap="addAdvice">确定</view>
        </view>
      </uni-section>
    </view>
  </uni-transition>

</template>

<style lang="scss">
uni-transition {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

page {
  background-color: #99999922;
  height: 100%;
  position: relative;
}

.top {
  width: 100%;
  height: 200rpx;
  background-color: white;
  display: flex;
  align-items: center;
  border-radius: 20rpx;

  .topinnerbox {
    margin-left: 30rpx;
    width: 690rpx;
    height: fit-content;

    view {
      margin-bottom: 10rpx;
      font-weight: 800;
    }
  }
}

.bt {
  width: 100%;
  height: 1000rpx;
  background-color: white;
  padding-top: 50rpx;

  .btinnerbox {
    margin-left: 20rpx;
    width: 710rpx;
    // background-color: red;
    height: 500rpx;

    button {
      background-color: #019ee8;
      border-radius: 50rpx;
      color: white;
      font-weight: 900;
    }
  }
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700rpx;
  // background-color: red;
  display: flex;
  align-items: center;
  flex-direction: column;

  .content {
    font-weight: 900;
    font-size: larger;
  }
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