<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { useRouter } from '@wot-ui/router'
import { computed, ref } from 'vue'
import { useGlobalToast } from '@/composables/useGlobalToast'
import { useManualTheme } from '@/composables/useManualTheme'

defineOptions({
  name: 'Adminer',
})

const router = useRouter()
const { success } = useGlobalToast()
const { theme } = useManualTheme()

const isDark = computed(() => theme.value === 'dark')

const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

const today = new Date()
const currentDate = computed(() => {
  const month = today.getMonth() + 1
  const date = today.getDate()
  const day = weekDays[today.getDay()]
  return `${month}月${date}日 ${day}`
})

const greeting = computed(() => {
  const hour = today.getHours()
  if (hour < 12)
    return '早上好'
  if (hour < 18)
    return '下午好'
  return '晚上好'
})

const pendingSales = ref([
  {
    _id: '1',
    customerName: '李记酒店',
    deliveryTime: '16:00',
    status: 'pending',
    items: '土鸡×10 草鱼×5',
    amount: 680,
  },
  {
    _id: '2',
    customerName: '王大厨',
    deliveryTime: '',
    status: 'delivered',
    items: '鸭×20',
    amount: 1200,
  },
  {
    _id: '3',
    customerName: '张大厨',
    deliveryTime: '',
    status: 'confirmed',
    items: '鸡×30',
    amount: 2100,
  },
])

const stats = ref([
  { label: '今日订单', value: '12', icon: 'i-carbon-document', trend: '+3', color: '#6366f1' },
  { label: '待处理', value: '5', icon: 'i-carbon-time', trend: '+2', color: '#f59e0b' },
  { label: '销售额', value: '¥8.6k', value2: '较昨日', trend: '+12%', color: '#10b981' },
])

const quickActions = [
  { label: '录采购', icon: 'i-carbon-shopping-cart', path: '/subPages/adminer/purchase/add/index', color: '#6366f1' },
  { label: '录销售', icon: 'i-carbon-receipt', path: '/subPages/adminer/sale/add/index', color: '#ec4899' },
  { label: '库存', icon: 'i-carbon-ibm-db2-warehouse', path: '/subPages/adminer/inventory/index', color: '#10b981' },
  { label: '订单', icon: 'i-carbon-document', path: '/subPages/adminer/orders/index', color: '#f59e0b' },
]

onShow(async () => {
  await loadPendingSales()
})

async function loadPendingSales() {
  try {
    console.log('loadPendingSales')
  }
  catch (e) {
    console.error('加载待确认销售单失败:', e)
  }
}

function handleAction(item: any) {
  if (item.status === 'pending') {
    router.push({ path: `/subPages/adminer/sale/detail/index`, query: { id: item._id } })
  }
  else if (item.status === 'delivered') {
    success({ msg: '已提醒客户确认' })
  }
}

function getStatusConfig(status: string) {
  const config = {
    pending: { label: '待处理', color: '#3b82f6', bg: '#eff6ff', icon: '⏳' },
    delivered: { label: '待确认', color: '#f59e0b', bg: '#fffbeb', icon: '🚚' },
    confirmed: { label: '已完成', color: '#10b981', bg: '#ecfdf5', icon: '✅' },
  }
  return config[status as keyof typeof config] || config.pending
}
</script>

<template>
  <view class="min-h-screen" :class="isDark ? 'bg-dark-900' : 'bg-slate-50'">
    <view class="from-violet-600 via-purple-600 to-pink-500 bg-gradient-to-br px-5 pb-8 pt-5">
      <view class="mb-6 flex items-center justify-between">
        <view>
          <text class="mb-1 block text-sm text-white/80">
            {{ greeting }}，管理员
          </text>
          <text class="text-2xl text-white font-bold">
            {{ currentDate }}
          </text>
        </view>
        <view class="h-12 w-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
          <text class="text-2xl">
            👤
          </text>
        </view>
      </view>

      <view class="grid grid-cols-3 gap-3">
        <view
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-2xl bg-white/20 p-3 backdrop-blur-sm"
        >
          <view class="mb-1 text-xs text-white/70">
            {{ stat.label }}
          </view>
          <view class="mb-1 text-xl text-white font-bold">
            {{ stat.value }}
          </view>
          <view class="flex items-center text-xs text-emerald-300">
            <text class="mr-1">
              {{ stat.trend }}
            </text>
            <text v-if="stat.value2" class="text-white/50">
              {{ stat.value2 }}
            </text>
          </view>
        </view>
      </view>
    </view>

    <view class="mx-4 -mt-6">
      <view class="grid grid-cols-4 gap-3 rounded-2xl p-4 shadow-lg" :class="isDark ? 'bg-dark-700' : 'bg-white'" :style="{ boxShadow: isDark ? 'none' : 'var(--un-shadow-color, 0 10px 15px -3px rgba(0, 0, 0, 0.1))' }">
        <view
          v-for="action in quickActions"
          :key="action.label"
          class="flex flex-col items-center"
          @click="action.path && router.push({ path: action.path })"
        >
          <view
            class="mb-2 h-12 w-12 flex items-center justify-center rounded-xl"
            :style="{ backgroundColor: isDark ? `${action.color}30` : `${action.color}15` }"
          >
            <text class="text-xl" :class="[action.icon]" :style="{ color: action.color }" />
          </view>
          <text class="text-xs" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
            {{ action.label }}
          </text>
        </view>
      </view>
    </view>

    <view class="px-5 pt-6">
      <view class="mb-4 flex items-center justify-between">
        <view class="flex items-center">
          <view class="mr-2 h-5 w-1 rounded-full from-indigo-500 to-pink-500 bg-gradient-to-r" />
          <text class="text-lg font-semibold" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
            待办事项
          </text>
        </view>
        <view class="flex items-center rounded-full px-3 py-1" :class="isDark ? 'bg-red-900/30' : 'bg-red-50'">
          <text class="mr-1 text-xs font-medium" :class="isDark ? 'text-red-400' : 'text-red-500'">
            {{ pendingSales.length }}
          </text>
          <text :class="isDark ? 'text-red-500/70' : 'text-red-400'">
            项
          </text>
        </view>
      </view>

      <view v-if="pendingSales.length === 0" class="rounded-2xl p-4 text-center shadow-sm" :class="isDark ? 'bg-dark-700' : 'bg-white'">
        <view class="mb-2 text-4xl">
          🎉
        </view>
        <text :class="isDark ? 'text-gray-400' : 'text-gray-400'">
          暂无待办事项
        </text>
      </view>

      <view v-else class="space-y-3">
        <view
          v-for="item in pendingSales"
          :key="item._id"
          class="overflow-hidden rounded-2xl shadow-sm transition-all duration-300"
          :class="isDark ? 'bg-dark-700' : 'bg-white'"
          :style="{ boxShadow: isDark ? 'none' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }"
        >
          <view class="flex items-center justify-between p-4">
            <view class="flex items-center">
              <view
                class="mr-3 h-10 w-10 flex items-center justify-center rounded-xl text-lg"
                :style="{ backgroundColor: isDark ? `${getStatusConfig(item.status).bg}30` : getStatusConfig(item.status).bg }"
              >
                {{ getStatusConfig(item.status).icon }}
              </view>
              <view>
                <view class="mb-0.5 flex items-center">
                  <text class="mr-2 font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
                    {{ item.customerName }}
                  </text>
                  <view
                    class="rounded-full px-2 py-0.5 text-xs"
                    :style="{ backgroundColor: isDark ? `${getStatusConfig(item.status).bg}30` : getStatusConfig(item.status).bg, color: getStatusConfig(item.status).color }"
                  >
                    {{ getStatusConfig(item.status).label }}
                  </view>
                </view>
                <text class="text-sm" :class="isDark ? 'text-gray-400' : 'text-gray-400'">
                  {{ item.items }}
                </text>
              </view>
            </view>
            <view class="text-right">
              <text class="block font-semibold" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
                ¥{{ item.amount }}
              </text>
              <text v-if="item.deliveryTime" class="text-xs" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
                {{ item.deliveryTime }}配送
              </text>
            </view>
          </view>
          <view
            v-if="item.status === 'pending' || item.status === 'delivered'"
            class="flex border-t"
            :class="isDark ? 'border-gray-600' : 'border-gray-50'"
          >
            <view
              class="flex-1 cursor-pointer p-3 text-center transition-colors"
              :class="isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-50'"
              @click="handleAction(item)"
            >
              <text
                class="text-sm font-medium"
                :style="{ color: item.status === 'pending' ? '#3b82f6' : '#f59e0b' }"
              >
                {{ item.status === 'pending' ? '开始处理' : '提醒确认' }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
