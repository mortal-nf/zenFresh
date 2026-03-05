<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from '@wot-ui/router'
import { useGlobalToast } from '@/composables/useGlobalToast'

definePage({
  name: 'orders',
  style: {
    navigationBarTitleText: '订单管理',
  },
})

const router = useRouter()
const { success } = useGlobalToast()

const orders = ref([
  {
    id: '1',
    orderNo: 'DD20240215001',
    customerName: '李记酒店',
    customerType: '星级酒店',
    phone: '138****8888',
    items: '土鸡×10, 草鱼×5',
    totalQty: 15,
    totalWeight: '28.5',
    amount: 680,
    status: 'pending',
    orderDate: '2024-02-15',
    deliveryDate: '2024-02-16',
    processType: '切块',
  },
  {
    id: '2',
    orderNo: 'DD20240214002',
    customerName: '王大厨',
    customerType: '私房菜',
    phone: '139****9999',
    items: '鸭×20',
    totalQty: 20,
    totalWeight: '36.8',
    amount: 1200,
    status: 'confirmed',
    orderDate: '2024-02-14',
    deliveryDate: '2024-02-15',
    processType: '整只',
  },
  {
    id: '3',
    orderNo: 'DD20240213003',
    customerName: '张大厨',
    customerType: '连锁餐厅',
    phone: '137****7777',
    items: '鸡×30, 鸭×10',
    totalQty: 40,
    totalWeight: '72.0',
    amount: 2100,
    status: 'delivered',
    orderDate: '2024-02-13',
    deliveryDate: '2024-02-14',
    processType: '去内脏',
  },
  {
    id: '4',
    orderNo: 'DD20240212004',
    customerName: '赵记海鲜',
    customerType: '餐厅',
    phone: '136****6666',
    items: '草鱼×15, 甲鱼×5',
    totalQty: 20,
    totalWeight: '35.5',
    amount: 950,
    status: 'cancelled',
    orderDate: '2024-02-12',
    deliveryDate: '2024-02-13',
    processType: '切块',
  },
])

const totalStats = computed(() => {
  const total = orders.value.length
  const pending = orders.value.filter(o => o.status === 'pending').length
  const delivered = orders.value.filter(o => o.status === 'delivered').length
  const confirmed = orders.value.filter(o => o.status === 'confirmed').length
  const totalAmount = orders.value.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.amount, 0)
  return { total, pending, delivered, confirmed, totalAmount }
})

const activeTab = ref('all')
const tabs = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待处理' },
  { key: 'confirmed', label: '已确认' },
  { key: 'delivered', label: '配送中' },
]

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return orders.value
  return orders.value.filter(o => o.status === activeTab.value)
})

function getStatusConfig(status: string) {
  const config = {
    pending: { label: '待处理', color: '#3b82f6', bg: '#eff6ff', icon: '⏳' },
    confirmed: { label: '已确认', color: '#8b5cf6', bg: '#f5f3ff', icon: '✓' },
    delivered: { label: '配送中', color: '#f59e0b', bg: '#fffbeb', icon: '🚚' },
    completed: { label: '已完成', color: '#10b981', bg: '#ecfdf5', icon: '✓' },
    cancelled: { label: '已取消', color: '#6b7280', bg: '#f3f4f6', icon: '✕' },
  }
  return config[status as keyof typeof config] || config.pending
}

function handleOrderAction(order: typeof orders.value[0]) {
  if (order.status === 'pending') {
    success({ msg: '确认订单', position: 'middle' })
  }
  else if (order.status === 'confirmed') {
    success({ msg: '开始配送', position: 'middle' })
  }
  else if (order.status === 'delivered') {
    success({ msg: '确认送达', position: 'middle' })
  }
}

function handleViewDetail(order: typeof orders.value[0]) {
  success({ msg: '查看详情', position: 'middle' })
}
</script>

<template>
  <view class="min-h-screen bg-slate-50">
    <view class="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-4">
      <view class="flex items-center justify-between">
        <view>
          <text class="block text-sm text-white/80">
            订单管理
          </text>
          <text class="text-2xl font-bold text-white">
            订单列表
          </text>
        </view>
        <view class="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
          <text class="text-2xl">📋</text>
        </view>
      </view>
    </view>

    <view class="mx-4 -mt-4">
      <view class="rounded-2xl bg-white p-4 shadow-lg shadow-amber-500/10">
        <view class="mb-4 flex items-center justify-between">
          <view class="flex items-center">
            <view class="mr-2 h-2 w-2 rounded-full bg-amber-500" />
            <text class="font-medium text-gray-800">今日订单</text>
          </view>
          <view class="text-right">
            <text class="text-lg font-bold text-amber-600">¥{{ totalStats.totalAmount }}</text>
            <text class="ml-1 text-xs text-gray-400">总金额</text>
          </view>
        </view>

        <view class="grid grid-cols-4 gap-2">
          <view class="rounded-xl bg-gray-50 p-3 text-center">
            <text class="block text-2xl font-bold text-gray-800">{{ totalStats.total }}</text>
            <text class="text-xs text-gray-400">全部</text>
          </view>
          <view class="rounded-xl bg-blue-50 p-3 text-center">
            <text class="block text-2xl font-bold text-blue-600">{{ totalStats.pending }}</text>
            <text class="text-xs text-blue-500">待处理</text>
          </view>
          <view class="rounded-xl bg-purple-50 p-3 text-center">
            <text class="block text-2xl font-bold text-purple-600">{{ totalStats.confirmed }}</text>
            <text class="text-xs text-purple-500">已确认</text>
          </view>
          <view class="rounded-xl bg-amber-50 p-3 text-center">
            <text class="block text-2xl font-bold text-amber-600">{{ totalStats.delivered }}</text>
            <text class="text-xs text-amber-500">配送中</text>
          </view>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="mb-4 flex rounded-xl bg-white p-1">
        <view
          v-for="tab in tabs"
          :key="tab.key"
          class="flex-1 rounded-lg py-2.5 text-center text-sm transition-all"
          :class="activeTab === tab.key ? 'bg-amber-500 text-white shadow-md' : 'text-gray-500'"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </view>
      </view>

      <view class="space-y-3 pb-24">
        <view
          v-for="order in filteredOrders"
          :key="order.id"
          class="overflow-hidden rounded-2xl bg-white shadow-sm"
        >
          <view class="p-4">
            <view class="mb-3 flex items-center justify-between">
              <view class="flex items-center">
                <text class="mr-2 font-medium text-gray-800">{{ order.customerName }}</text>
                <view
                  class="rounded-full px-2 py-0.5 text-xs"
                  :style="{ backgroundColor: getStatusConfig(order.status).bg, color: getStatusConfig(order.status).color }"
                >
                  {{ getStatusConfig(order.status).label }}
                </view>
              </view>
              <text class="text-xs text-gray-400">{{ order.orderNo }}</text>
            </view>

            <view class="mb-3 flex items-center">
              <view class="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                <text class="text-lg">🏨</text>
              </view>
              <view>
                <text class="block text-sm text-gray-600">{{ order.customerType }}</text>
                <text class="text-xs text-gray-400">{{ order.phone }}</text>
              </view>
            </view>

            <view class="mb-3 rounded-xl bg-gray-50 p-3">
              <text class="text-sm text-gray-600">{{ order.items }}</text>
            </view>

            <view class="flex items-center justify-between">
              <view class="flex items-center text-sm text-gray-500">
                <text class="mr-4">{{ order.orderDate }}下单</text>
                <text>{{ order.deliveryDate }}配送</text>
              </view>
              <text class="text-xl font-bold text-amber-600">
                ¥{{ order.amount }}
              </text>
            </view>
          </view>

          <view class="flex border-t border-gray-50">
            <view
              class="flex-1 cursor-pointer border-r border-gray-50 p-3 text-center transition-colors hover:bg-gray-50"
              @click="handleViewDetail(order)"
            >
              <text class="text-sm text-gray-500">查看详情</text>
            </view>
            <view
              v-if="order.status !== 'cancelled'"
              class="flex-1 cursor-pointer p-3 text-center transition-colors hover:bg-gray-50"
              @click="handleOrderAction(order)"
            >
              <text
                class="text-sm font-medium"
                :style="{ color: getStatusConfig(order.status).color }"
              >
                {{ order.status === 'pending' ? '确认订单' : order.status === 'confirmed' ? '开始配送' : order.status === 'delivered' ? '确认送达' : '' }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
