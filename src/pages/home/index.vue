<script setup lang="ts">
import Adminer from '@/subPages/adminer/index.vue'

// 当使用defineOptions 时 下方又使用了definePage 不要设置name 否则会引起冲突 导致布局找不到
defineOptions({
  componentPlaceholder: {
    Adminer: 'view',
  },
})

definePage({
  type: 'page',
  name: 'home',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '工作台',
  },
})
</script>

<template>
  <view>
    <Adminer />
  </view>
</template>
