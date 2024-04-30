<script lang="ts" setup>
import { ref } from 'vue';
import { useMemberStore } from '@/stores/modules/member'
import { onLoad } from '@dcloudio/uni-app';

let store = useMemberStore()
const { safeAreaInsets } = uni.getSystemInfoSync()
const goBack = () => {
  uni.navigateBack()
}
const props = defineProps({
  id: String,
  name: String
})
//名称
const name = ref(props.name)
const inputDialog = ref()
const tapName = () => {
  inputDialog.value.open()
}
const dialogInputConfirm = (e) => {
  name.value = e
  store.changeAreaListName(props.id, e)
}
//设备
onLoad(() => {
  store = useMemberStore()
  roomAdvice.value = store.getAreaListById(props.id)
  outAdvice.value = store.getOutAreaListById(props.id)
})
const roomAdvice = ref()
const outAdvice = ref()
const trash = (e) => {
  store.trashByIds(props.id, e)
  roomAdvice.value = store.getAreaListById(props.id)
  outAdvice.value = store.getOutAreaListById(props.id)
}
const plus = (e) => {
  store.plusByIds(props.id, e)
  roomAdvice.value = store.getAreaListById(props.id)
  outAdvice.value = store.getOutAreaListById(props.id)
}
</script>

<template>
  <view :style="{ height: safeAreaInsets?.top + 'px' }" style="background-color: rgba(128, 128, 128, 0.584);"></view>
  <view class="box-bg">
    <view class="box-bg">
      <uni-nav-bar dark color="#999" backgroundColor="#f5f5f5" shadow left-icon="left" leftText="返回" title="区域管理"
        @clickLeft="goBack" fixed />
    </view>
  </view>
  <uni-notice-bar show-icon text="点击名称可修改 | 点击加减可控制设备" />
  <view class="top">
    <view @tap="tapName">{{ name }}</view>
  </view>
  <view class="box">
    <view class="title">
      房间中的设备
    </view>
    <view class="items">
      <view class="item" v-for="(item, index) in roomAdvice" :key="index">
        <view class="iteminner">
          <view class="left">
            <image :src="item.img" mode="scaleToFill" />
            <view>{{ item.name }}</view>
          </view>
          <view class="right">
            <uni-icons type="trash" size="30" color="skyblue" @tap="trash(item.id)"></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
  <view class="box">
    <view class="title">
      房间外的设备
    </view>
    <view class="items">
      <view class="item" v-for="(item, index) in outAdvice" :key="index">
        <view class="iteminner">
          <view class="left">
            <image :src="item.img" mode="scaleToFill" />
            <view>{{ item.name }}</view>
          </view>
          <view class="right">
            <uni-icons type="plus" size="30" color="skyblue" @tap="plus(item.id)"></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
  <!-- 输入框示例 -->
  <uni-popup ref="inputDialog" type="dialog">
    <uni-popup-dialog ref="inputClose" mode="input" title="输入内容" value="" placeholder="请输入内容"
      @confirm="dialogInputConfirm"></uni-popup-dialog>
  </uni-popup>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #99999922;
}

.top {
  width: 680rpx;
  height: 100rpx;
  margin-left: 35rpx;
  background-color: white;
  border-radius: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #379aed;
  font-weight: 900;
}

.box {
  margin-top: 30rpx;
  width: 680rpx;
  height: fit-content;
  margin-left: 35rpx;
  border-radius: 20rpx;

  .title {
    color: gray;
  }

  .items {
    width: 100%;
    margin-top: 20rpx;
    height: fit-content;

    .item {
      width: 100%;
      height: 140rpx;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20rpx;

      .iteminner {
        width: 600rpx;
        height: 100rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          display: flex;

          view {
            margin-left: 20rpx;
            color: gray;
            font-weight: 800;
          }

          image {
            width: 100rpx;
            height: 100rpx;
          }
        }
      }
    }
  }
}
</style>