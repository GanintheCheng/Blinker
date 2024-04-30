<script lang="ts" setup>
const { safeAreaInsets } = uni.getSystemInfoSync()
const goBack = () => {
  uni.navigateBack()
}
const baseFormData = {
  name: '',
  age: '',
  introduction: '',
  sex: 2,
  hobby: [5],
  datetimesingle: 1627529992399
}
</script>

<template>
  <view :style="{ height: safeAreaInsets?.top + 'px' }" style="background-color: rgba(128, 128, 128, 0.584);"></view>
  <view class="box-bg">
    <view class="box-bg">
      <uni-nav-bar dark color="#999" backgroundColor="#f5f5f5" shadow left-icon="left" leftText="返回" rightText="设置"
        title="用户反馈" @clickLeft="goBack" fixed />
    </view>
  </view>
  <view class="body">
    <uni-section title="反馈菜单" type="line">
      <view class="example">
        <uni-forms ref="baseForm" :modelValue="baseFormData">
          <uni-forms-item label="联系方式">
            <uni-easyinput v-model="baseFormData.name" placeholder="请输入姓名" />
          </uni-forms-item>
          <uni-forms-item label="反馈意见">
            <uni-easyinput type="textarea" v-model="baseFormData.introduction" placeholder="请输入反馈意见" />
          </uni-forms-item>
          <uni-forms-item label="相关图片">
            <uni-file-picker fileMediatype="image" mode="grid" />
          </uni-forms-item>
        </uni-forms>
      </view>
      <view class="commit">提交</view>
      <view style="height: 40rpx;"></view>
    </uni-section>

  </view>

</template>

<style lang="scss">
page {
  background-color: #99999922;
}

.body {
  margin-top: 50rpx;
  margin-left: 25rpx;
  width: 700rpx;
}

.commit {
  width: 100rpx;
  background-color: rgba(0, 255, 47, 0.671);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  margin-left: 60rpx;
  padding: 10rpx;
  border-radius: 20rpx;
}
</style>