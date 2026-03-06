<script setup lang="ts">
import { computed, ref } from 'vue'
import { useManualTheme } from '@/composables/useManualTheme'

defineOptions({
  name: 'AdminAnalysis',
})

const { theme, currentThemeColor } = useManualTheme()

const isDark = computed(() => theme.value === 'dark')

const activePeriod = ref('month')
const periods = [
  { key: 'week', label: '本周' },
  { key: 'month', label: '本月' },
  { key: 'year', label: '本年' },
]

const stats = ref({
  sales: {
    current: 86500,
    previous: 72300,
    trend: 19.6,
  },
  purchase: {
    current: 52400,
    previous: 48900,
    trend: 7.2,
  },
  profit: {
    current: 34100,
    previous: 23400,
    trend: 45.7,
  },
})

const categories = ref([
  { id: '1', name: '土鸡', icon: '🐔', color: '#f59e0b' },
  { id: '2', name: '肉鸡', icon: '🐣', color: '#eab308' },
  { id: '3', name: '草鱼', icon: '🐟', color: '#06b6d4' },
  { id: '4', name: '鸭', icon: '🦆', color: '#8b5cf6' },
])

const selectedCategory = ref('all')

const categoryStats = ref([
  { name: '土鸡', icon: '🐔', quantity: 1250, percentage: 35, sales: 45000, purchase: 28000, profit: 17000 },
  { name: '肉鸡', icon: '🐣', quantity: 860, percentage: 24, sales: 28000, purchase: 18000, profit: 10000 },
  { name: '草鱼', icon: '🐟', quantity: 680, percentage: 19, sales: 18000, purchase: 11000, profit: 7000 },
  { name: '鸭', icon: '🦆', quantity: 520, percentage: 15, sales: 15000, purchase: 9000, profit: 6000 },
])

const categoryTrends = computed(() => {
  if (selectedCategory.value === 'all') {
    return categoryStats.value
  }
  return categoryStats.value.filter(c => c.name === selectedCategory.value)
})

const monthlyTrend = ref([
  { month: '1月', sales: 42000, profit: 16000 },
  { month: '2月', sales: 38000, profit: 14000 },
  { month: '3月', sales: 52000, profit: 21000 },
  { month: '4月', sales: 61000, profit: 25000 },
  { month: '5月', sales: 58000, profit: 23000 },
  { month: '6月', sales: 72000, profit: 30000 },
  { month: '7月', sales: 68000, profit: 28000 },
  { month: '8月', sales: 79000, profit: 33000 },
  { month: '9月', sales: 86500, profit: 34100 },
])

const categoryMonthlyTrend = ref({
  土鸡: [12000, 11000, 15000, 18000, 16000, 21000, 19000, 22000, 25000],
  肉鸡: [8000, 7500, 9000, 10500, 9500, 12000, 11000, 13000, 14500],
  草鱼: [5000, 4500, 6000, 7500, 6800, 8500, 7800, 9200, 10500],
  鸭: [4000, 3800, 5000, 6000, 5500, 7000, 6500, 7500, 8500],
})

const topCustomers = ref([
  { name: '李记酒店', orders: 28, amount: 25680, avatar: '🏨' },
  { name: '王大厨', orders: 22, amount: 18920, avatar: '👨‍🍳' },
  { name: '张大厨', orders: 18, amount: 15600, avatar: '👨‍🍳' },
  { name: '赵记海鲜', orders: 15, amount: 12800, avatar: '🦐' },
])

const maxSales = computed(() => Math.max(...monthlyTrend.value.map(m => m.sales)))
const maxProfit = computed(() => Math.max(...monthlyTrend.value.map(m => m.profit)))

const maxCategorySales = computed(() => {
  const trends = selectedCategory.value === 'all'
    ? categoryStats.value.map(c => c.sales)
    : categoryMonthlyTrend.value[selectedCategory.value] || []
  return Math.max(...trends)
})

function getTrendIcon(trend: number) {
  return trend >= 0 ? '📈' : '📉'
}

function getTrendClass(trend: number) {
  return trend >= 0 ? 'text-green-500' : 'text-red-500'
}

function getCategoryTrend(categoryName: string) {
  const trend = categoryMonthlyTrend.value[categoryName]
  if (!trend || trend.length < 2)
    return 0
  const current = trend[trend.length - 1]
  const previous = trend[trend.length - 2]
  return ((current - previous) / previous * 100).toFixed(1)
}
</script>

<template>
  <view class="min-h-screen" :class="isDark ? 'bg-dark-900' : 'bg-slate-50'">
    <view class="from-violet-600 via-indigo-500 to-blue-500 bg-gradient-to-r px-5 py-4">
      <view class="flex items-center justify-between">
        <view>
          <text class="block text-sm text-white/80">
            数据分析
          </text>
          <text class="text-2xl text-white font-bold">
            经营报表
          </text>
        </view>
        <view class="h-12 w-12 flex items-center justify-center rounded-full bg-white/20">
          <text class="text-2xl">
            📊
          </text>
        </view>
      </view>
    </view>

    <view class="mx-4 -mt-4">
      <view class="rounded-2xl p-4 shadow-lg" :class="isDark ? 'bg-dark-700' : 'bg-white'" :style="{ boxShadow: isDark ? 'none' : '0 10px 15px -3px rgba(99, 102, 241, 0.1)' }">
        <view class="mb-4 flex rounded-xl p-1" :class="isDark ? 'bg-gray-600' : 'bg-slate-100'">
          <view
            v-for="period in periods" :key="period.key"
            class="flex-1 rounded-lg py-2.5 text-center text-sm font-medium transition-all"
            :class="activePeriod === period.key ? (isDark ? 'bg-gray-700 text-indigo-400 shadow-sm' : 'bg-white text-indigo-600 shadow-sm') : (isDark ? 'text-slate-400' : 'text-slate-500')"
            @click="activePeriod = period.key"
          >
            {{ period.label }}
          </view>
        </view>

        <view class="grid grid-cols-3 gap-3">
          <view class="rounded-xl p-3" :class="isDark ? 'bg-blue-900/20' : 'bg-gradient-to-br from-blue-50 to-indigo-50'">
            <view class="mb-1 flex items-center justify-between">
              <text class="text-xs" :class="isDark ? 'text-blue-400' : 'text-blue-600'">
                销售额
              </text>
              <text class="text-xs">
                {{ getTrendIcon(stats.sales.trend) }}
              </text>
            </view>
            <text class="block text-xl font-bold" :class="isDark ? 'text-blue-400' : 'text-blue-600'">
              ¥{{ (stats.sales.current / 10000).toFixed(1) }}w
            </text>
            <text class="text-xs" :class="getTrendClass(stats.sales.trend)">
              {{ stats.sales.trend > 0 ? '+' : '' }}{{ stats.sales.trend }}%
            </text>
          </view>

          <view class="rounded-xl p-3" :class="isDark ? 'bg-emerald-900/20' : 'bg-gradient-to-br from-emerald-50 to-teal-50'">
            <view class="mb-1 flex items-center justify-between">
              <text class="text-xs" :class="isDark ? 'text-emerald-400' : 'text-emerald-600'">
                进货量
              </text>
              <text class="text-xs">
                {{ getTrendIcon(stats.purchase.trend) }}
              </text>
            </view>
            <text class="block text-xl font-bold" :class="isDark ? 'text-emerald-400' : 'text-emerald-600'">
              {{ (stats.purchase.current / 10000).toFixed(1)
              }}w
            </text>
            <text class="text-xs" :class="getTrendClass(stats.purchase.trend)">
              {{ stats.purchase.trend > 0 ? '+' : '' }}{{ stats.purchase.trend }}%
            </text>
          </view>

          <view class="rounded-xl p-3" :class="isDark ? 'bg-amber-900/20' : 'bg-gradient-to-br from-amber-50 to-orange-50'">
            <view class="mb-1 flex items-center justify-between">
              <text class="text-xs" :class="isDark ? 'text-amber-400' : 'text-amber-600'">
                利润
              </text>
              <text class="text-xs">
                {{ getTrendIcon(stats.profit.trend) }}
              </text>
            </view>
            <text class="block text-xl font-bold" :class="isDark ? 'text-amber-400' : 'text-amber-600'">
              ¥{{ (stats.profit.current / 10000).toFixed(1)
              }}w
            </text>
            <text class="text-xs" :class="getTrendClass(stats.profit.trend)">
              {{ stats.profit.trend > 0 ? '+' : '' }}{{ stats.profit.trend }}%
            </text>
          </view>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="mb-3 flex items-center">
        <view class="mr-2 h-2 w-2 rounded-full bg-violet-500" />
        <text class="font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
          销售趋势
        </text>
      </view>

      <view class="rounded-2xl p-4 shadow-sm" :class="isDark ? 'bg-dark-700' : 'bg-white'">
        <view class="h-40 flex items-end justify-between gap-2">
          <view v-for="item in monthlyTrend" :key="item.month" class="flex flex-1 flex-col items-center">
            <view class="relative w-full">
              <view
                class="mx-auto w-3/5 rounded-t-lg bg-gradient-to-t transition-all duration-500"
                :style="{ height: `${(item.sales / maxSales) * 100}%`, backgroundImage: isDark ? 'linear-gradient(to top, #6366f1, #818cf8)' : 'linear-gradient(to top, #6366f1, #4f46e5)' }"
              />
            </view>
            <text class="mt-2 text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-400'">
              {{ item.month }}
            </text>
          </view>
        </view>
        <view class="mt-4 flex items-center justify-center gap-6">
          <view class="flex items-center">
            <view class="mr-2 h-3 w-3 rounded-full bg-indigo-500" />
            <text class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              销售额
            </text>
          </view>
          <view class="flex items-center">
            <view class="mr-2 h-3 w-3 rounded-full bg-emerald-500" />
            <text class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              利润
            </text>
          </view>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="mb-3 flex items-center">
        <view class="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
        <text class="font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
          品类分析
        </text>
      </view>

      <view class="mb-3 flex flex-wrap gap-2">
        <view
          class="rounded-full px-3 py-1.5 text-sm transition-all"
          :class="selectedCategory === 'all' ? (isDark ? 'bg-indigo-600 text-white' : 'bg-indigo-500 text-white') : (isDark ? 'bg-dark-700 text-gray-300' : 'bg-white text-gray-600')"
          @click="selectedCategory = 'all'"
        >
          全部
        </view>
        <view
          v-for="cat in categories" :key="cat.id" class="rounded-full px-3 py-1.5 text-sm transition-all"
          :class="selectedCategory === cat.name ? 'text-white' : (isDark ? 'bg-dark-700 text-gray-300' : 'bg-white text-gray-600')"
          :style="selectedCategory === cat.name ? { backgroundColor: cat.color } : {}"
          @click="selectedCategory = cat.name"
        >
          {{ cat.icon }} {{ cat.name }}
        </view>
      </view>

      <view v-if="selectedCategory === 'all'" class="space-y-3">
        <view v-for="item in categoryStats" :key="item.name" class="overflow-hidden rounded-2xl shadow-sm" :class="isDark ? 'bg-dark-700' : 'bg-white'">
          <view class="p-4">
            <view class="mb-3 flex items-center justify-between">
              <view class="flex items-center">
                <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-xl" :class="isDark ? 'bg-gray-600' : 'bg-slate-100'">
                  <text class="text-lg">
                    {{ item.icon }}
                  </text>
                </view>
                <view>
                  <text class="font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
                    {{ item.name }}
                  </text>
                  <text class="ml-2 text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-400'">
                    {{ item.quantity }}只
                  </text>
                </view>
              </view>
              <view class="flex items-center">
                <text
                  class="mr-2 text-sm font-medium"
                  :class="Number(getCategoryTrend(item.name)) >= 0 ? (isDark ? 'text-green-400' : 'text-green-500') : (isDark ? 'text-red-400' : 'text-red-500')"
                >
                  {{ Number(getCategoryTrend(item.name)) >= 0 ? '📈' : '📉' }}{{ getCategoryTrend(item.name) }}%
                </text>
              </view>
            </view>

            <view class="grid grid-cols-3 gap-2">
              <view class="rounded-lg p-2 text-center" :class="isDark ? 'bg-blue-900/20' : 'bg-blue-50'">
                <text class="block text-xs" :class="isDark ? 'text-blue-400' : 'text-blue-600'">
                  销售额
                </text>
                <text class="block text-base font-bold" :class="isDark ? 'text-blue-400' : 'text-blue-600'">
                  ¥{{ (item.sales / 10000).toFixed(1) }}w
                </text>
              </view>
              <view class="rounded-lg p-2 text-center" :class="isDark ? 'bg-emerald-900/20' : 'bg-emerald-50'">
                <text class="block text-xs" :class="isDark ? 'text-emerald-400' : 'text-emerald-600'">
                  进货额
                </text>
                <text class="block text-base font-bold" :class="isDark ? 'text-emerald-400' : 'text-emerald-600'">
                  ¥{{ (item.purchase / 10000).toFixed(1)
                  }}w
                </text>
              </view>
              <view class="rounded-lg p-2 text-center" :class="isDark ? 'bg-amber-900/20' : 'bg-amber-50'">
                <text class="block text-xs" :class="isDark ? 'text-amber-400' : 'text-amber-600'">
                  利润
                </text>
                <text class="block text-base font-bold" :class="isDark ? 'text-amber-400' : 'text-amber-600'">
                  ¥{{ (item.profit / 10000).toFixed(1) }}w
                </text>
              </view>
            </view>

            <view class="mt-3">
              <view class="mb-1 flex items-center justify-between text-xs">
                <text :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                  进货
                </text>
                <text :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                  销售
                </text>
              </view>
              <view class="relative h-3 overflow-hidden rounded-full" :class="isDark ? 'bg-gray-600' : 'bg-slate-100'">
                <view
                  class="absolute left-0 h-full rounded-full"
                  :style="{ width: `${(item.purchase / item.sales) * 100}%`, backgroundColor: isDark ? '#34d399' : '#10b981' }"
                />
                <view
                  class="absolute h-full rounded-full"
                  :style="{ left: `${(item.purchase / item.sales) * 100}%`, width: `${((item.sales - item.purchase) / item.sales) * 100}%`, backgroundColor: isDark ? '#60a5fa' : '#3b82f6' }"
                />
              </view>
            </view>
          </view>
        </view>
      </view>

      <view v-else class="rounded-2xl p-4 shadow-sm" :class="isDark ? 'bg-dark-700' : 'bg-white'">
        <view class="mb-4">
          <view class="flex items-center justify-between">
            <view class="flex items-center">
              <view
                class="mr-3 h-12 w-12 flex items-center justify-center rounded-xl"
                :style="{ backgroundColor: `${categories.find(c => c.name === selectedCategory)?.color}20` }"
              >
                <text class="text-2xl">
                  {{ categories.find(c => c.name === selectedCategory)?.icon }}
                </text>
              </view>
              <view>
                <text class="block text-lg font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
                  {{ selectedCategory }}
                </text>
                <text class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-400'">
                  月度销售趋势
                </text>
              </view>
            </view>
            <view class="text-right">
              <text
                class="block text-lg font-bold"
                :class="Number(getCategoryTrend(selectedCategory)) >= 0 ? (isDark ? 'text-green-400' : 'text-green-500') : (isDark ? 'text-red-400' : 'text-red-500')"
              >
                {{ Number(getCategoryTrend(selectedCategory)) >= 0 ? '+' : '' }}{{ getCategoryTrend(selectedCategory)
                }}%
              </text>
              <text class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-400'">
                环比
              </text>
            </view>
          </view>
        </view>

        <view class="h-32 flex items-end justify-between gap-1">
          <view
            v-for="(value, index) in categoryMonthlyTrend[selectedCategory as keyof typeof categoryMonthlyTrend.value]" :key="index"
            class="flex flex-1 flex-col items-center"
          >
            <view
              class="w-full rounded-t-lg transition-all duration-500" :style="{
                height: `${(value / maxCategorySales) * 100}%`,
                backgroundColor: categories.find(c => c.name === selectedCategory)?.color,
              }"
            />
            <text class="mt-1 text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-400'">
              {{ index + 1 }}月
            </text>
          </view>
        </view>

        <view class="grid grid-cols-3 mt-4 gap-2">
          <view
            v-for="item in categoryStats.filter(c => c.name === selectedCategory)" :key="item.name"
            class="rounded-lg p-3 text-center" :class="isDark ? 'bg-gray-600/50' : 'bg-slate-50'"
          >
            <text class="block text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              销售
            </text>
            <text class="block text-lg font-bold" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
              ¥{{ (item.sales / 10000).toFixed(1) }}w
            </text>
          </view>
          <view
            v-for="item in categoryStats.filter(c => c.name === selectedCategory)" :key="`${item.name}p`"
            class="rounded-lg p-3 text-center" :class="isDark ? 'bg-gray-600/50' : 'bg-slate-50'"
          >
            <text class="block text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              进货
            </text>
            <text class="block text-lg font-bold" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
              ¥{{ (item.purchase / 10000).toFixed(1) }}w
            </text>
          </view>
          <view
            v-for="item in categoryStats.filter(c => c.name === selectedCategory)" :key="`${item.name}l`"
            class="rounded-lg p-3 text-center" :class="isDark ? 'bg-gray-600/50' : 'bg-slate-50'"
          >
            <text class="block text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              利润
            </text>
            <text class="block text-lg font-bold" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
              ¥{{ (item.profit / 10000).toFixed(1) }}w
            </text>
          </view>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="mb-3 flex items-center">
        <view class="mr-2 h-2 w-2 rounded-full bg-amber-500" />
        <text class="font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
          Top 客户
        </text>
      </view>

      <view class="rounded-2xl p-4 shadow-sm" :class="isDark ? 'bg-dark-700' : 'bg-white'">
        <view class="space-y-3">
          <view v-for="(customer, index) in topCustomers" :key="customer.name" class="flex items-center">
            <view
              class="mr-3 h-8 w-8 flex items-center justify-center rounded-full text-sm font-bold"
              :class="isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-600'"
            >
              {{ index + 1 }}
            </view>
            <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-full" :class="isDark ? 'bg-gray-600' : 'bg-slate-100'">
              <text class="text-lg">
                {{ customer.avatar }}
              </text>
            </view>
            <view class="flex-1">
              <text class="block font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
                {{ customer.name }}
              </text>
              <text class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-400'">
                {{ customer.orders }}笔订单
              </text>
            </view>
            <view class="text-right">
              <text class="block font-semibold" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
                ¥{{ customer.amount.toLocaleString() }}
              </text>
              <text class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-400'">
                消费金额
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="pb-8" />
  </view>
</template>
