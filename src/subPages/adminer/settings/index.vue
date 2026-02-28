<script setup lang="ts">
import { computed } from 'vue'
import { useGlobalToast } from '@/composables/useGlobalToast'
import { useManualTheme } from '@/composables/useManualTheme'

definePage({
  name: 'settings',
  style: {
    navigationBarTitleText: '系统设置',
  },
})

const { success } = useGlobalToast()
const {
  theme,
  toggleTheme,
  currentThemeColor,
  themeColorOptions,
  setFollowSystem,
} = useManualTheme()

const isDark = computed({
  get() {
    return theme.value === 'dark'
  },
  set() {
    toggleTheme()
  },
})

const settings = ref({
  notifications: true,
  sound: true,
  vibration: true,
  autoUpdate: true,
})

function handleThemeColorSelect(option: any) {
  const { selectThemeColor } = useManualTheme()
  selectThemeColor(option)
}

function handleToggle(key: keyof typeof settings.value) {
  settings.value[key] = !settings.value[key]
  success({ msg: settings.value[key] ? '已开启' : '已关闭', position: 'middle' })
}
</script>

<template>
  <view class="min-h-screen bg-slate-50">
    <view
      class="bg-gradient-to-br px-5 py-4"
      :class="isDark ? 'from-slate-800 via-slate-700 to-slate-600' : 'from-indigo-600 via-purple-600 to-pink-500'"
    >
      <view class="flex items-center justify-between">
        <view>
          <text class="block text-sm text-white/80">
            个性化
          </text>
          <text class="text-2xl text-white font-bold">
            主题设置
          </text>
        </view>
        <view class="h-12 w-12 flex items-center justify-center rounded-full bg-white/20">
          <text class="text-2xl">
            🎨
          </text>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="mb-3 flex items-center">
        <view class="mr-2 h-2 w-2 rounded-full" :style="{ backgroundColor: currentThemeColor.primary }" />
        <text class="text-gray-800 font-medium">
          主题配色
        </text>
      </view>

      <view class="rounded-2xl bg-white p-4 shadow-sm">
        <view class="grid grid-cols-3 gap-3">
          <view
            v-for="option in themeColorOptions"
            :key="option.value"
            class="flex flex-col items-center"
            @click="handleThemeColorSelect(option)"
          >
            <view
              class="mb-2 h-14 w-full rounded-xl p-1 shadow-sm transition-all"
              :class="currentThemeColor.value === option.value ? 'ring-4 ring-offset-2 ring-gray-300' : ''"
            >
              <view
                class="h-full w-full rounded-lg"
                :style="{ backgroundColor: option.primary }"
              >
                <view v-if="currentThemeColor.value === option.value" class="h-full flex items-center justify-center">
                  <text class="text-white">
                    ✓
                  </text>
                </view>
              </view>
            </view>
            <text
              class="text-sm font-medium"
              :class="currentThemeColor.value === option.value ? 'text-gray-800' : 'text-gray-500'"
            >
              {{ option.name }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="mb-3 flex items-center">
        <view class="mr-2 h-2 w-2 rounded-full bg-slate-500" />
        <text class="text-gray-800 font-medium">
          外观设置
        </text>
      </view>

      <view class="rounded-2xl bg-white shadow-sm">
        <view class="flex items-center justify-between border-b border-gray-50 px-4 py-4">
          <view class="flex items-center">
            <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-xl" :style="{ backgroundColor: `${currentThemeColor.primary}15` }">
              <text class="text-xl">
                🌙
              </text>
            </view>
            <view>
              <text class="block text-gray-800 font-medium">
                深色模式
              </text>
              <text class="text-xs text-gray-400">
                切换深色/浅色主题
              </text>
            </view>
          </view>
          <view
            class="h-6 w-11 rounded-full transition-colors"
            :class="isDark ? '' : 'bg-gray-200'"
            :style="isDark ? { backgroundColor: currentThemeColor.primary } : {}"
            @click="toggleTheme()"
          >
            <view
              class="h-5 w-5 rounded-full bg-white shadow transition-transform"
              :class="isDark ? 'translate-x-5' : 'translate-x-0.5'"
            />
          </view>
        </view>

        <view class="flex items-center justify-between border-b border-gray-50 px-4 py-4">
          <view class="flex items-center">
            <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50">
              <text class="text-xl">
                📱
              </text>
            </view>
            <view>
              <text class="block text-gray-800 font-medium">
                跟随系统
              </text>
              <text class="text-xs text-gray-400">
                自动跟随系统主题
              </text>
            </view>
          </view>
          <wd-button size="small" @click="setFollowSystem">
            跟随系统
          </wd-button>
        </view>

        <view class="flex items-center justify-between border-b border-gray-50 px-4 py-4">
          <view class="flex items-center">
            <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-xl bg-indigo-50">
              <text class="text-xl">
                🔔
              </text>
            </view>
            <view>
              <text class="block text-gray-800 font-medium">
                消息通知
              </text>
              <text class="text-xs text-gray-400">
                接收订单提醒
              </text>
            </view>
          </view>
          <view
            class="h-6 w-11 rounded-full transition-colors"
            :class="settings.notifications ? '' : 'bg-gray-200'"
            :style="settings.notifications ? { backgroundColor: currentThemeColor.primary } : {}"
            @click="handleToggle('notifications')"
          >
            <view
              class="h-5 w-5 rounded-full bg-white shadow transition-transform"
              :class="settings.notifications ? 'translate-x-5' : 'translate-x-0.5'"
            />
          </view>
        </view>

        <view class="flex items-center justify-between border-b border-gray-50 px-4 py-4">
          <view class="flex items-center">
            <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-50">
              <text class="text-xl">
                🔊
              </text>
            </view>
            <view>
              <text class="block text-gray-800 font-medium">
                提示音
              </text>
              <text class="text-xs text-gray-400">
                操作反馈声音
              </text>
            </view>
          </view>
          <view
            class="h-6 w-11 rounded-full transition-colors"
            :class="settings.sound ? '' : 'bg-gray-200'"
            :style="settings.sound ? { backgroundColor: currentThemeColor.primary } : {}"
            @click="handleToggle('sound')"
          >
            <view
              class="h-5 w-5 rounded-full bg-white shadow transition-transform"
              :class="settings.sound ? 'translate-x-5' : 'translate-x-0.5'"
            />
          </view>
        </view>

        <view class="flex items-center justify-between px-4 py-4">
          <view class="flex items-center">
            <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-xl bg-purple-50">
              <text class="text-xl">
                📳
              </text>
            </view>
            <view>
              <text class="block text-gray-800 font-medium">
                振动反馈
              </text>
              <text class="text-xs text-gray-400">
                操作振动提示
              </text>
            </view>
          </view>
          <view
            class="h-6 w-11 rounded-full transition-colors"
            :class="settings.vibration ? '' : 'bg-gray-200'"
            :style="settings.vibration ? { backgroundColor: currentThemeColor.primary } : {}"
            @click="handleToggle('vibration')"
          >
            <view
              class="h-5 w-5 rounded-full bg-white shadow transition-transform"
              :class="settings.vibration ? 'translate-x-5' : 'translate-x-0.5'"
            />
          </view>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="mb-3 flex items-center">
        <view class="mr-2 h-2 w-2 rounded-full bg-amber-500" />
        <text class="text-gray-800 font-medium">
          系统设置
        </text>
      </view>

      <view class="rounded-2xl bg-white shadow-sm">
        <view class="flex items-center justify-between border-b border-gray-50 px-4 py-4">
          <view class="flex items-center">
            <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-xl bg-amber-50">
              <text class="text-xl">
                🔄
              </text>
            </view>
            <view>
              <text class="block text-gray-800 font-medium">
                自动更新
              </text>
              <text class="text-xs text-gray-400">
                新版本自动下载
              </text>
            </view>
          </view>
          <view
            class="h-6 w-11 rounded-full transition-colors"
            :class="settings.autoUpdate ? '' : 'bg-gray-200'"
            :style="settings.autoUpdate ? { backgroundColor: currentThemeColor.primary } : {}"
            @click="handleToggle('autoUpdate')"
          >
            <view
              class="h-5 w-5 rounded-full bg-white shadow transition-transform"
              :class="settings.autoUpdate ? 'translate-x-5' : 'translate-x-0.5'"
            />
          </view>
        </view>

        <view class="flex items-center justify-between border-b border-gray-50 px-4 py-4">
          <view class="flex items-center">
            <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-xl bg-rose-50">
              <text class="text-xl">
                🌐
              </text>
            </view>
            <view>
              <text class="block text-gray-800 font-medium">
                语言设置
              </text>
              <text class="text-xs text-gray-400">
                简体中文
              </text>
            </view>
          </view>
          <text class="text-gray-400">
            ›
          </text>
        </view>

        <view class="flex items-center justify-between px-4 py-4">
          <view class="flex items-center">
            <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-xl bg-cyan-50">
              <text class="text-xl">
                💾
              </text>
            </view>
            <view>
              <text class="block text-gray-800 font-medium">
                清除缓存
              </text>
              <text class="text-xs text-gray-400">
                当前 23.5 MB
              </text>
            </view>
          </view>
          <text class="text-gray-400">
            ›
          </text>
        </view>
      </view>
    </view>

    <view class="px-4 pb-8 pt-4">
      <view class="rounded-2xl bg-white p-4 shadow-sm">
        <view class="flex items-center justify-center">
          <text class="text-sm text-gray-400">
            当前版本 v1.4.0
          </text>
        </view>
      </view>
    </view>
  </view>
</template>
