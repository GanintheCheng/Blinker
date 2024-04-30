<script lang="ts" setup>
const { safeAreaInsets } = uni.getSystemInfoSync()
const goBack = () => {
  uni.navigateBack()
}
</script>

<template>
  <view :style="{ height: safeAreaInsets?.top + 'px' }" style="background-color: rgba(128, 128, 128, 0.584);"></view>
  <view class="box-bg">
    <view class="box-bg">
      <uni-nav-bar dark color="#999" backgroundColor="#f5f5f5" shadow left-icon="left" leftText="返回" title="关于我们"
        @clickLeft="goBack" fixed />
    </view>
  </view>
  <view style="height: 100rpx;"></view>
  <view class="logo">
    <image src="/static/logo.png" mode="scaleToFill" />
  </view>
  <view style="height: 50rpx;"></view>
  <view class="content">
    blinker是一套跨硬件、跨平台的物联网解决方案,提供APP端、设备端、服务器端支持,使用公有云服务进行数据传输存储。可用于多种物联网应用场合，可以帮助用户更好更快地搭建项目。
  </view>
</template>

<style lang="scss">
page {
  background-color: #99999922;
}

.logo {
  margin: 0 auto;
  width: 300rpx;

  image {
    width: 300rpx;
    height: 300rpx;
    border-radius: 90%;
  }
}

.content {
  width: 650rpx;
  margin-left: 50rpx;
  height: fit-content;
  color: gray;
  font-weight: 800;
  letter-spacing: 2rpx;
  line-height: 60rpx;
}
</style>