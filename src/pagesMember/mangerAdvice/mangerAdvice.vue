<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import {useMemberStore} from '@/stores'

const store = useMemberStore()
const { safeAreaInsets } = uni.getSystemInfoSync()
const goBack = () => {
  uni.navigateBack()
}
const show = ref(false)
onLoad(()=>{
  setTimeout(()=>{
    show.value=true
  },100)
})

const list =store.indexList

const turnToAdviceDetail = (e) => {
  uni.navigateTo(
    {
      url: `/pagesMember/adviceDetail/adviceDetail?id=${e.id}&img=${e.img}&name=${e.name}`
    }
  )
}
</script>

<template>
  <view :style="{ height: safeAreaInsets?.top + 'px' }" style="background-color: rgba(128, 128, 128, 0.584);"></view>
  <view class="box-bg">
    <view class="box-bg">
      <uni-nav-bar dark color="#999" backgroundColor="#f5f5f5" shadow left-icon="left" leftText="返回" rightText="设置"
        title="设备管理" @clickLeft="goBack" fixed />
    </view>
  </view>
  <uni-transition mode-class="fade" :show="show" :duration="600">
    <view class="body">
      <uni-list>
        <uni-list-item :title="item.name" note="E2EFFE52V165" showArrow :thumb="item.img" thumb-size="base"
          :border="false" style="margin-bottom: 20rpx" v-for="(item, index) in list" :key="index" @tap="turnToAdviceDetail(item)"/>
      </uni-list>
    </view>
  </uni-transition>

</template>

<style lang="scss">
page{
  background-color: #99999922;
}
.body{
  margin-left: 30rpx;
  margin-top: 30rpx;
  width: 690rpx;
  height: fit-content;
  background-color: red;
}
</style>