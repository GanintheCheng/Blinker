<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { provide } from 'vue';
import { ref } from 'vue';
import { useMemberStore } from '@/stores/modules/member'

const store = useMemberStore()
const { safeAreaInsets } = uni.getSystemInfoSync()
const goBack = () => {
  uni.navigateBack()
}
const show = ref(false)
onLoad(() => {
  setTimeout(() => {
    show.value = true
  }, 100)
})

//手动定义场景list
const list = ref(store.sceneList)

//插槽
const options = ref([
  {
    text: '删除',
    style: {
      backgroundColor: '#007aff'
    }
  }
])
//过滤
const deleteScence = (e) => {
  const filteredList = list.value.filter(item => item.id !== e.id);
  list.value = filteredList
  store.sceneList = list.value
}
//弹出层
const popupText = ref()
const popup = ref()
const addScene = () => {
  popup.value.open()
}
const dialogInputConfirm = (e) => {
  list.value.push({
    img: '/static/场景.png',
    text: e,
    id: list.value.length != 0 ? (list.value[list.value.length - 1].id + 1) : "1"
  })
}
</script>

<template>
  <view>
    <view :style="{ height: safeAreaInsets?.top + 'px' }" style="background-color: rgba(128, 128, 128, 0.584);"></view>
    <view class="box-bg">
      <view class="box-bg">
        <uni-nav-bar dark color="#999" backgroundColor="#f5f5f5" shadow left-icon="left" leftText="返回" title="场景管理"
          @clickLeft="goBack" fixed />
      </view>
    </view>
    <uni-notice-bar show-icon text="左滑删除 | 单击编辑" />

    <view class="body" v-if="list.length > 0">
      <uni-list>
        <uni-transition mode-class="slide-left" :show="show" :duration="600">
          <uni-swipe-action-item :right-options="options" @click="deleteScence(item)" v-for="(item, index) in list"
            :key="index">

            <navigator :url="`/pagesMember/modifyScene/modifyScene?id=${item.id}&name=${item.text}&img=${item.img}`"
              open-type="navigate" hover-class="navigator-hover">
              <uni-list-item :title="item.text" showArrow :thumb="item.img" thumb-size="base" :border="false"
                style="margin-bottom: 10rpx;margin-top: 10rpx;" />
            </navigator>

          </uni-swipe-action-item>
        </uni-transition>
      </uni-list>
    </view>
    <view v-else style="text-align: center;">
      暂无数据
    </view>
    <!-- 弹出层 -->
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog ref="popupText" mode="input" title="新建场景" value="" placeholder="请输入场景名"
        @confirm="dialogInputConfirm"></uni-popup-dialog>
    </uni-popup>
  </view>

  <view>
    <view class="btbox" @tap="addScene">
      + 新建场景
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

.btbox {
  width: 700rpx;
  margin-left: 20rpx;
  margin-bottom: 50rpx;
  border-radius: 20rpx;
  height: 150rpx;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(1, 175, 255);
  font-weight: 800;
}
</style>