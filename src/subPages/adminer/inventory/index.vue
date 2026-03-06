<script setup lang="ts">
import { useRouter } from '@wot-ui/router'
import { computed, ref } from 'vue'
import { useGlobalToast } from '@/composables/useGlobalToast'
import { useManualTheme } from '@/composables/useManualTheme'

definePage({
  name: 'inventory',
  style: {
    navigationBarTitleText: '库存管理',
  },
})

const router = useRouter()
const { success } = useGlobalToast()
const { theme, currentThemeColor } = useManualTheme()

const isDark = computed(() => theme.value === 'dark')

const categories = ref([
  { id: '1', name: '土鸡', icon: '🐔', stock: 45, minStock: 20, price: 25, unit: '只', status: 'normal' },
  { id: '2', name: '肉鸡', icon: '🐣', stock: 12, minStock: 15, price: 18, unit: '只', status: 'warning' },
  { id: '3', name: '草鱼', icon: '🐟', stock: 8, minStock: 10, price: 15, unit: '只', status: 'danger' },
  { id: '4', name: '鸭', icon: '🦆', stock: 38, minStock: 15, price: 22, unit: '只', status: 'normal' },
  { id: '5', name: '鹅', icon: '🦢', stock: 25, minStock: 10, price: 35, unit: '只', status: 'normal' },
  { id: '6', name: '甲鱼', icon: '🐢', stock: 5, minStock: 8, price: 50, unit: '只', status: 'danger' },
])

const totalStats = computed(() => {
  const total = categories.value.length
  const normal = categories.value.filter(c => c.status === 'normal').length
  const warning = categories.value.filter(c => c.status === 'warning').length
  const danger = categories.value.filter(c => c.status === 'danger').length
  const totalValue = categories.value.reduce((sum, c) => sum + c.stock * c.price, 0)
  return { total, normal, warning, danger, totalValue }
})

const activeTab = ref('all')
const tabs = [
  { key: 'all', label: '全部', count: computed(() => categories.value.length) },
  { key: 'normal', label: '充足', count: computed(() => categories.value.filter(c => c.status === 'normal').length) },
  { key: 'warning', label: '紧张', count: computed(() => categories.value.filter(c => c.status === 'warning').length) },
  { key: 'danger', label: '不足', count: computed(() => categories.value.filter(c => c.status === 'danger').length) },
]

const filteredCategories = computed(() => {
  if (activeTab.value === 'all')
    return categories.value
  return categories.value.filter(c => c.status === activeTab.value)
})

function getStockStatus(item: typeof categories.value[0]) {
  if (item.stock <= item.minStock * 0.5)
    return 'danger'
  if (item.stock <= item.minStock)
    return 'warning'
  return 'normal'
}

function getStatusConfig(status: string) {
  const config = {
    normal: { label: '充足', color: '#10b981', bg: '#ecfdf5', text: 'text-green-600' },
    warning: { label: '紧张', color: '#f59e0b', bg: '#fffbeb', text: 'text-amber-600' },
    danger: { label: '不足', color: '#ef4444', bg: '#fef2f2', text: 'text-red-600' },
  }
  return config[status as keyof typeof config] || config.normal
}

function handleAdjust(item: typeof categories.value[0]) {
  success({ msg: `调整 ${item.name} 库存`, position: 'middle' })
}
</script>

<template>
  <view class="min-h-screen" :class="isDark ? 'bg-dark-900' : 'bg-slate-50'">
    <view class="from-blue-500 to-indigo-600 bg-gradient-to-r px-5 py-4">
      <view class="flex items-center justify-between">
        <view>
          <text class="block text-sm text-white/80">
            实时库存
          </text>
          <text class="text-2xl text-white font-bold">
            库存管理
          </text>
        </view>
        <view class="h-12 w-12 flex items-center justify-center rounded-full bg-white/20">
          <text class="text-2xl">
            📦
          </text>
        </view>
      </view>
    </view>

    <view class="mx-4 -mt-4">
      <view class="rounded-2xl p-4 shadow-lg" :class="isDark ? 'bg-dark-700' : 'bg-white'" :style="{ boxShadow: isDark ? 'none' : '0 10px 15px -3px rgba(99, 102, 241, 0.1)' }">
        <view class="mb-4 flex items-center justify-between">
          <view class="flex items-center">
            <view class="mr-2 h-2 w-2 rounded-full bg-indigo-500" />
            <text class="font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
              库存概览
            </text>
          </view>
          <view class="text-right">
            <text class="text-lg font-bold" :class="isDark ? 'text-indigo-400' : 'text-indigo-600'">
              ¥{{ totalStats.totalValue }}
            </text>
            <text class="ml-1 text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-400'">
              总价值
            </text>
          </view>
        </view>

        <view class="grid grid-cols-4 gap-2">
          <view class="rounded-xl p-3 text-center" :class="isDark ? 'bg-gray-600/50' : 'bg-gray-50'">
            <text class="block text-2xl font-bold" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
              {{ totalStats.total }}
            </text>
            <text class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-400'">
              品类
            </text>
          </view>
          <view class="rounded-xl p-3 text-center" :class="isDark ? 'bg-green-900/30' : 'bg-green-50'">
            <text class="block text-2xl font-bold" :class="isDark ? 'text-green-400' : 'text-green-600'">
              {{ totalStats.normal }}
            </text>
            <text class="text-xs" :class="isDark ? 'text-green-400' : 'text-green-500'">
              充足
            </text>
          </view>
          <view class="rounded-xl p-3 text-center" :class="isDark ? 'bg-amber-900/30' : 'bg-amber-50'">
            <text class="block text-2xl font-bold" :class="isDark ? 'text-amber-400' : 'text-amber-600'">
              {{ totalStats.warning }}
            </text>
            <text class="text-xs" :class="isDark ? 'text-amber-400' : 'text-amber-500'">
              紧张
            </text>
          </view>
          <view class="rounded-xl p-3 text-center" :class="isDark ? 'bg-red-900/30' : 'bg-red-50'">
            <text class="block text-2xl font-bold" :class="isDark ? 'text-red-400' : 'text-red-600'">
              {{ totalStats.danger }}
            </text>
            <text class="text-xs" :class="isDark ? 'text-red-400' : 'text-red-500'">
              不足
            </text>
          </view>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="mb-3 flex items-center">
        <view class="mr-2 h-2 w-2 rounded-full bg-violet-500" />
        <text class="font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
          库存明细
        </text>
      </view>

      <view class="mb-4 flex rounded-xl p-1" :class="isDark ? 'bg-gray-700' : 'bg-white'">
        <view
          v-for="tab in tabs"
          :key="tab.key"
          class="flex-1 rounded-lg py-2 text-center text-sm transition-all"
          :class="activeTab === tab.key ? (isDark ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white shadow-md') : (isDark ? 'text-gray-400' : 'text-gray-500')"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
          <text class="ml-1 opacity-70">
            ({{ tab.count.value }})
          </text>
        </view>
      </view>

      <view class="pb-24 space-y-3">
        <view
          v-for="item in filteredCategories"
          :key="item.id"
          class="overflow-hidden rounded-2xl shadow-sm"
          :class="isDark ? 'bg-dark-700' : 'bg-white'"
          :style="{ boxShadow: isDark ? 'none' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }"
        >
          <view class="flex items-center justify-between p-4">
            <view class="flex items-center">
              <view
                class="mr-3 h-14 w-14 flex items-center justify-center rounded-xl"
                :style="{ backgroundColor: isDark ? `${getStatusConfig(item.status).bg}30` : getStatusConfig(item.status).bg }"
              >
                <text class="text-2xl">
                  {{ item.icon }}
                </text>
              </view>
              <view>
                <view class="mb-1 flex items-center">
                  <text class="mr-2 font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
                    {{ item.name }}
                  </text>
                  <view
                    class="rounded-full px-2 py-0.5 text-xs"
                    :style="{ backgroundColor: isDark ? `${getStatusConfig(item.status).bg}30` : getStatusConfig(item.status).bg, color: getStatusConfig(item.status).color }"
                  >
                    {{ getStatusConfig(item.status).label }}
                  </view>
                </view>
                <text class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-400'">
                  库存 {{ item.stock }}{{ item.unit }} · 预警 {{ item.minStock }}{{ item.unit }}
                </text>
              </view>
            </view>
            <view class="text-right">
              <text class="block text-lg font-bold" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
                ¥{{ item.price }}
              </text>
              <text class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
                /{{ item.unit }}
              </text>
            </view>
          </view>
          <view class="flex border-t" :class="isDark ? 'border-gray-600' : 'border-gray-50'">
            <view
              class="flex-1 cursor-pointer border-r p-3 text-center transition-colors"
              :class="[isDark ? 'border-gray-600' : 'border-gray-50', isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-50']"
              @click="handleAdjust(item)"
            >
              <text class="text-sm" :class="isDark ? 'text-indigo-400' : 'text-indigo-600'">
                调整库存
              </text>
            </view>
            <view
              class="flex-1 cursor-pointer p-3 text-center transition-colors"
              :class="isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-50'"
            >
              <text class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                入库记录
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
