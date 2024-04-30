<script lang="ts" setup>
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

//跳转
const blueTooth = () => {
  uni.navigateTo({
    url: `/pagesMember/blueTooth/blueTooth?img=${props.img}&text=${props.text}&type=${props.type}&introduce=${props.introduce}}'`,
  })
}
const wifiTooth = () => {
  uni.navigateTo({
    url: `/pagesMember/wifiTooth/wifiTooth?img=${props.img}&text=${props.text}&type=${props.type}&introduce=${props.introduce}}'`,
  })
}
const nextTooth = () => {
  uni.navigateTo({
    url: `/pagesMember/nextTooth/nextTooth?img=${props.img}&text=${props.text}&type=${props.type}&introduce=${props.introduce}}'`,
  })
}
</script>

<template>
  <view>
    <view :style="{ height: safeAreaInsets?.top + 'px' }" style="background-color: rgba(128, 128, 128, 0.584);"></view>
    <view class="box-bg">
      <view class="box-bg">
        <uni-nav-bar dark color="#999" backgroundColor="#f5f5f5" shadow left-icon="left" leftText="返回" rightText="设置"
          title="设备接入向导" @clickLeft="goBack" fixed />
      </view>
    </view>
    <view class="top">
      <view class="title">
        <view class="innerbox">
          <view class="left">
            <image :src="props.img" />
          </view>
          <view class="right">
            {{ props.introduce }}
          </view>
        </view>
      </view>
    </view>
    <view class="know">
      <view class="knowbox">
        <view class="knowtitle">
          {{ props.text }}服务使用须知
        </view>
        <view style="height: 20rpx;"></view>
        <view>
          1.您使用的是blinker开发者版本,我们会不定期更新支持库,App及服务端程序,请确认您使用的是最新版本,才能正常使用blinker各功能。
        </view>
        <view style="height: 20rpx;"></view>
        <view>
          2.点灯不对开发者版本做稳定性承诺。
        </view>
        <view style="height: 20rpx;"></view>
        <view>
          3.有商业使用,请联系我们
        </view>
      </view>
    </view>
  </view>

  <view class="bt">
    <button type="primary" size="default" :plain="true" v-if="props.type == 0" @tap="blueTooth">
      蓝牙接入
    </button>
    <button type="primary" size="default" :plain="true" v-if="props.type == 0" @tap="wifiTooth">
      网络接入
    </button>
    <button type="primary" size="default" :plain="true" v-if="props.type == 1" @tap="nextTooth">
      下一步
    </button>
  </view>
</template>

<style lang="scss">
page {
  background-color: #99999922;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.top {
  margin-bottom: 20rpx;

  .title {
    width: 100%;
    height: 300rpx;
    border-radius: 30rpx;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    .innerbox {
      width: 710rpx;
      min-height: 150rpx;
      height: fit-content;
      display: flex;

      .left {
        display: flex;
        align-items: center;
        justify-content: center;

        image {
          width: 150rpx;
          height: 150rpx;
        }

        flex: 0.35
      }

      .right {
        flex: 0.65;
        color: gray;
        font-weight: 800
      }
    }
  }
}

.know {
  width: 100%;

  height: fit-content;
  background-color: white;
  padding-top: 30rpx;

  .knowbox {
    width: 680rpx;
    margin-left: 35rpx;
    padding-bottom: 30rpx;
  }

  .knowtitle {
    font-weight: 900;
    font-size: large;
  }
}

.bt {
  width: 700rpx;
  margin-left: 25rpx;
  height: 150rpx;
  background: white;
  border-radius: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30rpx;
}
</style>