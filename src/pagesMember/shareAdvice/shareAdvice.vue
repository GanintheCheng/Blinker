<script lang="ts" setup>
import { ref } from 'vue';

const { safeAreaInsets } = uni.getSystemInfoSync()
import {useMemberStore} from '@/stores'

const store = useMemberStore()
const goBack = () => {
  uni.navigateBack()
}
//选项卡
const items = ref(['共享', '接受'])
const current = ref(0)
const onClickItem = (e) => {
  if (current.value != e.currentIndex) {
    if (e.currentIndex == 1) {
      show1.value = false
      show2.value = true
    }
    else {
      show1.value = true
      show2.value = false
    }
    current.value = e.currentIndex;
  }
}

//是否隐藏
const show1 = ref(true)
const show2 = ref(false)

const list = store.indexList

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
        title="设备共享" @clickLeft="goBack" fixed />
    </view>
  </view>
  <view>
    <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
      activeColor="#4cd964"></uni-segmented-control>
    <view class="content">
      <view v-show="current === 0">
        <uni-transition mode-class="fade" :show="show1" :duration="600">
          <view class="body">
            <uni-list>
              <uni-list-item :title="item.name" note="未共享" showArrow :thumb="item.img" thumb-size="base" :border="false"
                style="margin-bottom: 20rpx" v-for="(item, index) in list" :key="index" @tap="turnToAdviceDetail(item)"/>
            </uni-list>
          </view>
        </uni-transition>
      </view>
      <view v-show="current === 1">
        <uni-transition mode-class="fade" :show="show2" :duration="600">
          <view class="accept">
            无已共享设备
          </view>
        </uni-transition>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.body {
  margin-left: 30rpx;
  margin-top: 30rpx;
  width: 690rpx;
  height: fit-content;
  background-color: red;
}

.accept {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100rpx;
  color: gray;
}
</style>