<script setup lang="ts">
import AdminMine from '@/subPages/adminer/mine.vue'

defineOptions({
  componentPlaceholder: {
    AdminMine: 'view',
  },
})

definePage({
  name: 'mine',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的',
  },
})
</script>

<template>
  <view>
    <AdminMine />
  </view>
</template>
