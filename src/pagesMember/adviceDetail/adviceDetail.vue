<script lang="ts" setup>
import { ref } from 'vue';
import { useMemberStore } from '@/stores'

const store = useMemberStore()
const { safeAreaInsets } = uni.getSystemInfoSync()
const goBack = () => {
  uni.navigateBack()
}

const props = defineProps({
  id: String,
  img: String,
  name: String
})
const img = ref(props.img)
const name = ref(props.name)

//弹出层
const popup = ref()
const dialogInputConfirm = (e) => {
  store.modifyIndexListName(props.id, e)
  name.value = e
  uni.showToast({
    title: '修改成功',
    icon: 'success',
    duration: 1000
  })
}
</script>

<template>
  <view :style="{ height: safeAreaInsets?.top + 'px' }" style="background-color: rgba(128, 128, 128, 0.584);"></view>
  <view class="box-bg">
    <view class="box-bg">
      <uni-nav-bar dark color="#999" backgroundColor="#f5f5f5" shadow left-icon="left" leftText="返回" rightText="设置"
        title="设备详情" @clickLeft="goBack" fixed />
    </view>
  </view>
  <view class="top">
    <view class="topinnerbox">
      <view class="topleft">
        <image :src="img" mode="scaleToFill" />
      </view>
      <view class="topright">
        <view class="rightinner">
          <view>设备名: {{ name }}<uni-icons type="compose" size="20" color="skyblue"
              @tap="popup.open()"></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
  <view style="height: 20rpx;"></view>
  <view class="box">
    <view>定时任务</view>
    <uni-icons type="right" size="20" style="margin-right: 20rpx;"></uni-icons>
  </view>
  <view class="box">
    <view>地理位置</view>
    <uni-icons type="right" size="20" style="margin-right: 20rpx; color: gray;"></uni-icons>
  </view>
  <view class="box">
    <view>触发器配置</view>
    <uni-icons type="right" size="20" style="margin-right: 20rpx;"></uni-icons>
  </view>
  <view class="box">
    <view>动作配置</view>
    <uni-icons type="right" size="20" style="margin-right: 20rpx;"></uni-icons>
  </view>
  <view class="box">
    <view>界面配置</view>
    <uni-icons type="right" size="20" style="margin-right: 20rpx;"></uni-icons>
  </view>
  <view class="box">
    <view>设备共享</view>
    <uni-icons type="right" size="20" style="margin-right: 20rpx;"></uni-icons>
  </view>
  <view class="box">
    <view>添加设备到桌面</view>
    <uni-icons type="right" size="20" style="margin-right: 20rpx;"></uni-icons>
  </view>
  <!-- 弹出层 -->
  <uni-popup ref="popup" type="dialog">
    <uni-popup-dialog ref="popupText" mode="input" title="修改设备名" value="" placeholder="请输入新设备名"
      @confirm="dialogInputConfirm"></uni-popup-dialog>
  </uni-popup>
</template>



<style lang="scss">
page {
  background-color: #99999922;
}

.box{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 25rpx;
  width: 700rpx;
  height: 120rpx;
  border-radius: 20rpx;
  background-color: white;
  margin-bottom: 30rpx;
  view{
    margin-left: 30rpx;
    color: gray;
    font-weight: 800;
  }
}

.top {
  width: 100%;
  height: 400rpx;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20rpx;

  .topinnerbox {
    width: 80%;
    height: 300rpx;
    display: flex;

    .topleft {
      flex: 0.35;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      image {
        width: 150rpx;
        height: 150rpx;
      }

      view {
        font-weight: 800;
        color: skyblue;
      }
    }

    .topright {
      flex: 0.65;
      display: flex;
      align-items: center;
      justify-content: center;

      .rightinner {
        // width: 80%;
        height: 250rpx;
        display: flex;
        align-items: center;
        font-weight: 900;
        // background-color: green;
      }
    }
  }
}
</style>