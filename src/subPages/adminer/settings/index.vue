<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '@wot-ui/router'
import { useGlobalToast } from '@/composables/useGlobalToast'

definePage({
  name: 'settings',
  style: {
    navigationBarTitleText: '系统设置',
  },
})

const router = useRouter()
const { success } = useGlobalToast()

const themeColors = ref([
  { id: 'indigo', name: '紫韵蓝', primary: '#6366f1', gradient: 'from-indigo-600 via-purple-600 to-pink-500', selected: true },
  { id: 'emerald', name: '翡翠绿', primary: '#10b981', gradient: 'from-emerald-500 to-teal-600', selected: false },
  { id: 'rose', name: '玫瑰粉', primary: '#f43f5e', gradient: 'from-rose-500 via-pink-500 to-orange-400', selected: false },
  { id: 'blue', name: '天空蓝', primary: '#3b82f6', gradient: 'from-blue-500 via-indigo-500 to-purple-500', selected: false },
  { id: 'amber', name: '琥珀金', primary: '#f59e0b', gradient: 'from-amber-500 via-orange-500 to-red-400', selected: false },
  { id: 'slate', name: '石墨灰', primary: '#64748b', gradient: 'from-slate-600 via-slate-500 to-slate-400', selected: false },
])

const settings = ref({
  darkMode: false,
  notifications: true,
  sound: true,
  vibration: true,
  autoUpdate: true,
  language: 'zh',
})

function selectTheme(color: typeof themeColors.value[0]) {
  themeColors.value.forEach(c => c.selected = false)
  color.selected = true
  success({ msg: `已切换主题：${color.name}`, position: 'middle' })
}

function handleToggle(key: keyof typeof settings.value) {
  settings.value[key] = !settings.value[key]
  success({ msg: settings.value[key] ? '已开启' : '已关闭', position: 'middle' })
}
</script>

<template>
  <view class="min-h-screen bg-slate-50">
    <view class="bg-gradient-to-br from-slate-600 via-slate-500 to-slate-400 px-5 py-4">
      <view class="flex items-center justify-between">
        <view>
          <text class="block text-sm text-white/80">
            个性化
          </text>
          <text class="text-2xl font-bold text-white">
            主题配色
          </text>
        </view>
        <view class="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
          <text class="text-2xl">🎨</text>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="mb-3 flex items-center">
        <view class="mr-2 h-2 w-2 rounded-full bg-slate-500" />
        <text class="font-medium text-gray-800">选择主题色</text>
      </view>

      <view class="rounded-2xl bg-white p-4 shadow-sm">
        <view class="grid grid-cols-3 gap-3">
          <view
            v-for="color in themeColors"
            :key="color.id"
            class="flex flex-col items-center"
            @click="selectTheme(color)"
          >
            <view
              class="mb-2 h-14 w-full rounded-xl bg-gradient-to-br p-3 shadow-sm transition-all"
              :class="color.gradient"
              :style="color.selected ? 'ring-4 ring-offset-2 ring-slate-400' : ''"
            >
              <view v-if="color.selected" class="flex h-full items-center justify-center">
                <text class="text-white">✓</text>
              </view>
            </view>
            <text
              class="text-sm font-medium"
              :class="color.selected ? 'text-slate-800' : 'text-gray-500'"
            >
              {{ color.name }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="mb-3 flex items-center">
        <view class="mr-2 h-2 w-2 rounded-full bg-indigo-500" />
        <text class="font-medium text-gray-800">外观设置</text>
      </view>

      <view class="rounded-2xl bg-white shadow-sm">
        <view class="flex items-center justify-between border-b border-gray-50 px-4 py-4">
          <view class="flex items-center">
            <view class="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
              <text class="text-xl">🌙</text>
            </view>
            <view>
              <text class="block font-medium text-gray-800">深色模式</text>
              <text class="text-xs text-gray-400">跟随系统自动切换</text>
            </view>
          </view>
          <view
            class="h-6 w-11 rounded-full transition-colors"
            :class="settings.darkMode ? 'bg-indigo-500' : 'bg-gray-200'"
            @click="handleToggle('darkMode')"
          >
            <view
              class="h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform"
              :class="settings.darkMode ? 'translate-x-5' : 'translate-x-0.5'"
            />
          </view>
        </view>

        <view class="flex items-center justify-between border-b border-gray-50 px-4 py-4">
          <view class="flex items-center">
            <view class="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <text class="text-xl">🔔</text>
            </view>
            <view>
              <text class="block font-medium text-gray-800">消息通知</text>
              <text class="text-xs text-gray-400">接收订单提醒</text>
            </view>
          </view>
          <view
            class="h-6 w-11 rounded-full transition-colors"
            :class="settings.notifications ? 'bg-indigo-500' : 'bg-gray-200'"
            @click="handleToggle('notifications')"
          >
            <view
              class="h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform"
              :class="settings.notifications ? 'translate-x-5' : 'translate-x-0.5'"
            />
          </view>
        </view>

        <view class="flex items-center justify-between border-b border-gray-50 px-4 py-4">
          <view class="flex items-center">
            <view class="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <text class="text-xl">🔊</text>
            </view>
            <view>
              <text class="block font-medium text-gray-800">提示音</text>
              <text class="text-xs text-gray-400">操作反馈声音</text>
            </view>
          </view>
          <view
            class="h-6 w-11 rounded-full transition-colors"
            :class="settings.sound ? 'bg-indigo-500' : 'bg-gray-200'"
            @click="handleToggle('sound')"
          >
            <view
              class="h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform"
              :class="settings.sound ? 'translate-x-5' : 'translate-x-0.5'"
            />
          </view>
        </view>

        <view class="flex items-center justify-between px-4 py-4">
          <view class="flex items-center">
            <view class="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
              <text class="text-xl">📳</text>
            </view>
            <view>
              <text class="block font-medium text-gray-800">振动反馈</text>
              <text class="text-xs text-gray-400">操作振动提示</text>
            </view>
          </view>
          <view
            class="h-6 w-11 rounded-full transition-colors"
            :class="settings.vibration ? 'bg-indigo-500' : 'bg-gray-200'"
            @click="handleToggle('vibration')"
          >
            <view
              class="h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform"
              :class="settings.vibration ? 'translate-x-5' : 'translate-x-0.5'"
            />
          </view>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="mb-3 flex items-center">
        <view class="mr-2 h-2 w-2 rounded-full bg-amber-500" />
        <text class="font-medium text-gray-800">系统设置</text>
      </view>

      <view class="rounded-2xl bg-white shadow-sm">
        <view class="flex items-center justify-between border-b border-gray-50 px-4 py-4">
          <view class="flex items-center">
            <view class="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <text class="text-xl">🔄</text>
            </view>
            <view>
              <text class="block font-medium text-gray-800">自动更新</text>
              <text class="text-xs text-gray-400">新版本自动下载</text>
            </view>
          </view>
          <view
            class="h-6 w-11 rounded-full transition-colors"
            :class="settings.autoUpdate ? 'bg-indigo-500' : 'bg-gray-200'"
            @click="handleToggle('autoUpdate')"
          >
            <view
              class="h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform"
              :class="settings.autoUpdate ? 'translate-x-5' : 'translate-x-0.5'"
            />
          </view>
        </view>

        <view class="flex items-center justify-between border-b border-gray-50 px-4 py-4">
          <view class="flex items-center">
            <view class="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50">
              <text class="text-xl">🌐</text>
            </view>
            <view>
              <text class="block font-medium text-gray-800">语言设置</text>
              <text class="text-xs text-gray-400">简体中文</text>
            </view>
          </view>
          <text class="text-gray-400">›</text>
        </view>

        <view class="flex items-center justify-between px-4 py-4">
          <view class="flex items-center">
            <view class="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50">
              <text class="text-xl">💾</text>
            </view>
            <view>
              <text class="block font-medium text-gray-800">清除缓存</text>
              <text class="text-xs text-gray-400">当前 23.5 MB</text>
            </view>
          </view>
          <text class="text-gray-400">›</text>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4 pb-8">
      <view class="rounded-2xl bg-white p-4 shadow-sm">
        <view class="flex items-center justify-center">
          <text class="text-sm text-gray-400">当前版本 v1.4.0</text>
        </view>
      </view>
    </view>
  </view>
</template>
