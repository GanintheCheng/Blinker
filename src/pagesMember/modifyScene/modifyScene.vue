<script lang="ts" setup>
import { ref } from 'vue';
import { inject } from 'vue';
import { useMemberStore } from '@/stores/modules/member'

const store = useMemberStore()

const { safeAreaInsets } = uni.getSystemInfoSync()
const goBack = () => {
  uni.navigateBack()
}

const changeName = () => {
  inputDialog.value.open()
}

const inputDialog = ref()

const dialogInputConfirm = (e) => {
  store.modifyListName(props.id, e)
  name.value = e
}

const props = defineProps({
  id: Number,
  name: String,
  img: String,
})

const changeImg = () => {
  uni.chooseImage({
    count: 1, //默认9
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], //从相册选择
    success: function (res) {
      const url = res.tempFilePaths[0] as string
      console.log(url)
      store.modifyListImg(props.id, url)
      img.value = url
    }
  });
}

const name = ref(props.name)
const img = ref(props.img)
</script>

<template>

  <view>
    <view :style="{ height: safeAreaInsets?.top + 'px' }" style="background-color: rgba(128, 128, 128, 0.584);"></view>
    <view class="box-bg">
      <view class="box-bg">
        <uni-nav-bar dark color="#999" backgroundColor="#f5f5f5" shadow left-icon="left" leftText="返回" title="编辑场景"
          @clickLeft="goBack" fixed />
      </view>
    </view>
    <view class="topbox">
      <view class="innerbox">
        <view class="left">
          <image :src="img" mode="scaleToFill" />
          <view @tap="changeImg">修改图标</view>
        </view>
        <view class="right">
          <view class="name">当前名称:{{ name }}</view>
          <view class="change" @tap="changeName">修改名称</view>
        </view>
      </view>
    </view>
    <!-- 输入框示例 -->
    <uni-popup ref="inputDialog" type="dialog">
      <uni-popup-dialog ref="inputClose" mode="input" title="输入内容" value="" placeholder="请输入内容"
        @confirm="dialogInputConfirm"></uni-popup-dialog>
    </uni-popup>
  </view>

  <view>
    <view class="btbox">
      123
    </view>
  </view>
</template>


<style lang="scss">
page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  background-color: #99999922;
}

.topbox {
  width: 680rpx;
  margin-left: 35rpx;
  height: 300rpx;
  background-color: white;
  border-radius: 30rpx;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;

  .innerbox {
    width: 550rpx;
    height: 250rpx;
    display: flex;
    padding-top: 50rpx;

    .left {
      flex: 0.5;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      font-weight: 700;
      height: 200rpx;
      color: rgb(1, 175, 255);

      image {
        width: 100rpx;
        height: 100rpx;
        margin-bottom: 20rpx;
      }
    }

    .right {
      flex: 0.5;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      height: 200rpx;

      .name {
        margin-bottom: 78rpx;
        font-weight: 900;
        text-wrap: nowrap;
      }

      .change {
        font-weight: 700;
        color: rgb(1, 175, 255);
      }
    }
  }
}
</style>