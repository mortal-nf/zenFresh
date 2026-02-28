<script lang="ts" setup>
import { onMounted, ref } from 'vue'

definePage({
  type: 'home',
  name: 'startPage',
  layout: 'default',
  style: {
    navigationBarTitleText: 'zenFresh',
  },
})

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
    uni.reLaunch({
      url: '/pages/home/index',
    })
  }, 3000)
})
</script>

<template>
  <view class="splash">
    <view class="logo">
      <text class="title">
        真鲜速达
      </text>
      <text class="subtitle">
        ZenFresh
      </text>
    </view>
    <view v-if="loading" class="loading">
      <text>加载中...</text>
    </view>
  </view>
</template>

<style scoped lang="scss">
.splash {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 48rpx;
      font-weight: bold;
      color: #fff;
      margin-bottom: 16rpx;
    }

    .subtitle {
      font-size: 28rpx;
      color: rgba(255, 255, 255, 0.8);
      letter-spacing: 4rpx;
    }
  }

  .loading {
    position: absolute;
    bottom: 200rpx;
    color: rgba(255, 255, 255, 0.6);
    font-size: 24rpx;
  }
}
</style>
