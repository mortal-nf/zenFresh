<script setup lang="ts">
import type { UserRole } from '@/store/userStore'
import { useRouter } from '@wot-ui/router'
import { computed } from 'vue'
import { useGlobalToast } from '@/composables/useGlobalToast'
import { useManualTheme } from '@/composables/useManualTheme'
import { roleConfigs, useUserStore } from '@/store/userStore'

definePage({
  name: 'about',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的',
  },
})

const router = useRouter()
const { success } = useGlobalToast()
const { currentThemeColor, theme } = useManualTheme()
const userStore = useUserStore()

const isDark = computed(() => theme.value === 'dark')

const menuItems = [
  {
    title: '身份管理',
    icon: '🔄',
    path: '',
    desc: '切换管理员/酒店/农户',
  },
  {
    title: '录入农户',
    icon: '👨‍🌾',
    path: '/subPages/adminer/farmer/add/index',
    desc: '添加新的农户信息',
  },
  {
    title: '录入酒店',
    icon: '🏨',
    path: '/subPages/adminer/hotel/add/index',
    desc: '添加新的酒店客户',
  },
  {
    title: '我的客户',
    icon: '👥',
    path: '/subPages/adminer/customers/index',
    desc: '管理酒店和农户',
  },
  {
    title: '数据导出',
    icon: '📊',
    path: '',
    desc: '导出Excel对账单',
  },
]

const settingItems = [
  {
    title: '分享应用',
    icon: '📤',
    path: '',
    action: 'share',
  },
  {
    title: '关于我们',
    icon: 'ℹ️',
    path: '/subPages/adminer/about/index',
  },
  {
    title: '系统设置',
    icon: '⚙️',
    path: '/subPages/adminer/settings/index',
  },
]

function handleRoleSwitch(role: UserRole) {
  userStore.switchRole(role)
  success({ msg: `已切换为${roleConfigs.find(r => r.key === role)?.label}`, position: 'middle' })
}

function handleMenuClick(item: typeof menuItems[0]) {
  if (item.path) {
    router.push({ path: item.path })
  }
  else {
    success({ msg: item.desc || item.title, position: 'middle' })
  }
}

function handleSettingClick(item: typeof settingItems[0]) {
  if (item.action === 'share') {
    success({ msg: '分享功能开发中', position: 'middle' })
  }
  else if (item.path) {
    router.push({ path: item.path })
  }
  else {
    success({ msg: item.title, position: 'middle' })
  }
}
</script>

<template>
  <view class="min-h-screen">
    <view
      class="px-5 pb-8 pt-6"
      :class="isDark ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600' : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500'"
    >
      <view class="flex items-center">
        <view class="relative mr-4">
          <view
            class="h-16 w-16 flex items-center justify-center rounded-full backdrop-blur-sm"
            :class="isDark ? 'bg-slate-700/50' : 'bg-white/30'"
          >
            <text class="text-3xl">
              {{ userStore.userInfo.avatar }}
            </text>
          </view>
          <view class="absolute h-6 w-6 flex items-center justify-center rounded-full bg-white -bottom-1 -right-1">
            <text class="text-sm">
              ✏️
            </text>
          </view>
        </view>
        <view class="flex-1">
          <text class="mb-1 block text-xl text-white font-bold">
            {{ userStore.userInfo.name }}
          </text>
          <view class="flex items-center">
            <text class="mr-2 text-sm text-white/80">
              {{ userStore.userInfo.phone }}
            </text>
            <view class="rounded-full bg-white/20 px-2 py-0.5">
              <text class="text-xs text-white">
                {{ userStore.roleLabel }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <view class="grid grid-cols-3 mt-6 gap-3">
        <view
          class="rounded-2xl p-3 text-center backdrop-blur-sm"
          :class="isDark ? 'bg-slate-700/50' : 'bg-white/20'"
        >
          <text class="block text-xl text-white font-bold">
            {{ userStore.stats.customerCount }}
          </text>
          <text class="text-xs text-white/70">
            客户数
          </text>
        </view>
        <view
          class="rounded-2xl p-3 text-center backdrop-blur-sm"
          :class="isDark ? 'bg-slate-700/50' : 'bg-white/20'"
        >
          <text class="block text-xl text-white font-bold">
            {{ userStore.formattedOrderCount }}
          </text>
          <text class="text-xs text-white/70">
            订单数
          </text>
        </view>
        <view
          class="rounded-2xl p-3 text-center backdrop-blur-sm"
          :class="isDark ? 'bg-slate-700/50' : 'bg-white/20'"
        >
          <text class="block text-xl text-white font-bold">
            {{ userStore.formattedSalesAmount }}
          </text>
          <text class="text-xs text-white/70">
            销售额
          </text>
        </view>
      </view>
    </view>

    <view class="mx-4 -mt-6">
      <view class="rounded-2xl bg-white p-3 shadow-lg">
        <view class="flex rounded-xl bg-slate-100 p-1">
          <view
            v-for="role in roleConfigs"
            :key="role.key"
            class="flex flex-1 items-center justify-center rounded-lg py-2.5 transition-all"
            :class="userStore.currentRole === role.key ? 'bg-white shadow-sm' : ''"
            @click="handleRoleSwitch(role.key)"
          >
            <text class="mr-1.5 text-base">
              {{ role.icon }}
            </text>
            <text
              :class="userStore.currentRole === role.key ? '' : 'text-slate-500'"
              class="text-sm font-medium"
              :style="userStore.currentRole === role.key ? { color: currentThemeColor.primary } : {}"
            >
              {{ role.label }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <view class="px-4 pt-6">
      <view class="mb-3 flex items-center">
        <view
          class="mr-2 h-5 w-1 rounded-full bg-gradient-to-r"
          :style="{ backgroundImage: `linear-gradient(to right, ${currentThemeColor.primary}, ${currentThemeColor.primary}80)` }"
        />
        <text class="text-base text-gray-800 font-semibold">
          业务管理
        </text>
      </view>

      <view class="rounded-2xl bg-white shadow-sm">
        <view
          v-for="item in menuItems"
          :key="item.title"
          class="flex items-center justify-between border-b border-gray-50 px-4 py-4 last:border-b-0"
          @click="handleMenuClick(item)"
        >
          <view class="flex items-center">
            <view
              class="mr-3 h-11 w-11 flex items-center justify-center rounded-xl"
              :style="{ backgroundColor: `${currentThemeColor.primary}15` }"
            >
              <text class="text-xl">
                {{ item.icon }}
              </text>
            </view>
            <view>
              <text class="block text-gray-800 font-medium">
                {{ item.title }}
              </text>
              <text class="text-xs text-gray-400">
                {{ item.desc }}
              </text>
            </view>
          </view>
          <text class="text-gray-300">
            ›
          </text>
        </view>
      </view>
    </view>

    <view class="px-4 pt-6">
      <view class="mb-3 flex items-center">
        <view class="mr-2 h-5 w-1 rounded-full from-slate-400 to-slate-600 bg-gradient-to-r" />
        <text class="text-base text-gray-800 font-semibold">
          其他设置
        </text>
      </view>

      <view class="rounded-2xl bg-white shadow-sm">
        <view
          v-for="item in settingItems"
          :key="item.title"
          class="flex items-center justify-between border-b border-gray-50 px-4 py-4 last:border-b-0"
          @click="handleSettingClick(item)"
        >
          <view class="flex items-center">
            <view class="mr-3 h-11 w-11 flex items-center justify-center rounded-xl bg-slate-100">
              <text class="text-xl">
                {{ item.icon }}
              </text>
            </view>
            <text class="text-gray-800 font-medium">
              {{ item.title }}
            </text>
          </view>
          <text class="text-gray-300">
            ›
          </text>
        </view>
      </view>
    </view>

    <view class="px-4 pb-8 pt-6">
      <view
        class="rounded-2xl p-5 text-center shadow-lg"
        :style="{ backgroundImage: `linear-gradient(to right, ${currentThemeColor.primary}, ${currentThemeColor.primary}dd)` }"
      >
        <text class="mb-2 block text-sm text-white/80">
          绑定码
        </text>
        <text class="block text-2xl text-white font-bold tracking-widest">
          {{ userStore.userInfo.bindCode }}
        </text>
        <text class="mt-2 block text-xs text-white/60">
          分享给他人即可绑定
        </text>
      </view>
    </view>

    <view class="pb-8 text-center">
      <text class="text-xs text-gray-400">
        真鲜速达 ZenFresh v1.4.0
      </text>
    </view>
  </view>
</template>
