<script setup lang="ts">
import { useRouter } from '@wot-ui/router'
import { computed, ref } from 'vue'
import { useGlobalToast } from '@/composables/useGlobalToast'

definePage({
  name: 'sale-add',
  style: {
    navigationBarTitleText: '录入销售',
  },
})

const router = useRouter()
const { success } = useGlobalToast()

const today = new Date()
const orderDate = ref(formatDate(today))
const deliveryDate = ref(formatDate(addDays(today, 1)))

const hotels = ref([
  { label: '李记酒店', value: '1', phone: '138****8888', address: '市中心大道128号', type: '星级酒店' },
  { label: '王大厨', value: '2', phone: '139****9999', address: '美食街A区', type: '私房菜' },
  { label: '张大厨', value: '3', phone: '137****7777', address: '开发区商业街', type: '连锁餐厅' },
])

const categories = ref([
  { label: '土鸡', value: '1', icon: '🐔', stock: 50, lossRate: 0.95 },
  { label: '肉鸡', value: '2', icon: '🐣', stock: 30, lossRate: 0.90 },
  { label: '草鱼', value: '3', icon: '🐟', stock: 20, lossRate: 0.85 },
  { label: '鸭', value: '4', icon: '🦆', stock: 40, lossRate: 0.92 },
])

const processTypes = ref([
  { label: '整只', value: 'whole', icon: '📦' },
  { label: '切块', value: 'cut', icon: '🔪' },
  { label: '去内脏', value: 'clean', icon: '✨' },
  { label: '其他', value: 'other', icon: '📝' },
])

const selectedHotel = ref('')
const selectedHotelData = computed(() => hotels.value.find(h => h.value === selectedHotel.value))

const items = ref([
  {
    id: 1,
    category: '',
    orderQty: '',
    processType: '',
  },
])

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function addDays(date: Date, days: number) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function addItem() {
  items.value.push({
    id: Date.now(),
    category: '',
    orderQty: '',
    processType: '',
  })
}

function removeItem(index: number) {
  if (items.value.length > 1) {
    items.value.splice(index, 1)
  }
}

function getCategoryStock(categoryValue: string) {
  return categories.value.find(c => c.value === categoryValue)?.stock || 0
}

function getCategoryIcon(categoryValue: string) {
  return categories.value.find(c => c.value === categoryValue)?.icon || '📦'
}

function getLossRate(categoryValue: string) {
  return categories.value.find(c => c.value === categoryValue)?.lossRate || 0.9
}

function getProcessedWeight(item: typeof items.value[0]) {
  const qty = Number(item.orderQty) || 0
  const rate = getLossRate(item.category)
  return (qty * rate).toFixed(1)
}

function getStockStatus(item: typeof items.value[0]) {
  if (!item.category || !item.orderQty)
    return 'normal'
  const qty = Number(item.orderQty) || 0
  const stock = getCategoryStock(item.category)
  if (qty > stock)
    return 'over'
  if (qty > stock * 0.8)
    return 'warning'
  return 'normal'
}

const totalSummary = computed(() => {
  let totalQty = 0
  let totalWeight = 0

  items.value.forEach((item) => {
    if (item.category && item.orderQty) {
      const qty = Number(item.orderQty) || 0
      const rate = getLossRate(item.category)
      totalQty += qty
      totalWeight += qty * rate
    }
  })

  return {
    qty: totalQty,
    weight: totalWeight.toFixed(1),
  }
})

function handleCategoryChange(item: any, value: string) {
  item.category = value
}

function handleSave() {
  if (!selectedHotel.value) {
    success({ msg: '请选择酒店', position: 'middle' })
    return
  }

  const validItems = items.value.filter(item => item.category && item.orderQty)
  if (validItems.length === 0) {
    success({ msg: '请至少添加一个品类', position: 'middle' })
    return
  }

  const overStockItems = validItems.filter(item => Number(item.orderQty) > getCategoryStock(item.category))
  if (overStockItems.length > 0) {
    success({ msg: '部分品类库存不足', position: 'middle' })
    return
  }

  success({ msg: '保存成功，正在生成送货单...', position: 'middle' })
  setTimeout(() => {
    router.push({ path: '/subPages/adminer/sale/delivery' })
  }, 1500)
}
</script>

<template>
  <view class="min-h-screen bg-slate-50">
    <view class="bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-4">
      <view class="flex items-center justify-between">
        <view>
          <text class="block text-sm text-white/80">
            销售订单
          </text>
          <text class="text-2xl text-white font-bold">
            录入销售
          </text>
        </view>
        <view class="h-12 w-12 flex items-center justify-center rounded-full bg-white/20">
          <text class="text-2xl">
            🛒
          </text>
        </view>
      </view>
    </view>

    <view class="mx-4 -mt-4">
      <view class="rounded-2xl bg-white p-5 shadow-lg shadow-rose-500/10">
        <view class="mb-4 flex items-center">
          <view class="mr-2 h-2 w-2 rounded-full bg-rose-500" />
          <text class="text-gray-800 font-medium">
            订单信息
          </text>
        </view>

        <view class="grid grid-cols-2 mb-4 gap-3">
          <view>
            <text class="mb-2 block text-xs text-gray-500 font-medium">
              下单日期
            </text>
            <view class="border border-gray-200 rounded-xl bg-gray-50 px-3 py-2.5">
              <text class="text-sm text-gray-800">
                {{ orderDate }}
              </text>
            </view>
          </view>
          <view>
            <text class="mb-2 block text-xs text-gray-500 font-medium">
              配送日期
            </text>
            <view class="border border-gray-200 rounded-xl bg-gray-50 px-3 py-2.5">
              <text class="text-sm text-gray-800">
                {{ deliveryDate }}
              </text>
            </view>
          </view>
        </view>

        <wd-picker
          v-model="selectedHotel"
          :columns="hotels"
          placeholder="选择酒店"
        >
          <template #default="{ value }">
            <view
              class="flex items-center justify-between border border-gray-200 rounded-xl bg-gray-50 px-4 py-3"
            >
              <view class="flex items-center">
                <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-full bg-rose-100">
                  <text class="text-lg">
                    🏨
                  </text>
                </view>
                <view>
                  <text class="block text-gray-800 font-medium">
                    {{ value?.label || '请选择酒店' }}
                  </text>
                  <text v-if="value" class="text-xs text-gray-400">
                    {{ value.type }} · {{ value.phone }}
                  </text>
                </view>
              </view>
              <text class="text-gray-400">
                ›
              </text>
            </view>
          </template>
        </wd-picker>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="mb-3 flex items-center">
        <view class="mr-2 h-2 w-2 rounded-full bg-violet-500" />
        <text class="text-gray-800 font-medium">
          商品明细
        </text>
        <text class="ml-2 text-xs text-gray-400">
          ({{ items.length }}项)
        </text>
      </view>

      <view
        v-for="(item, index) in items"
        :key="item.id"
        class="mb-4 rounded-2xl bg-white p-4 shadow-sm"
      >
        <view class="mb-3 flex items-center justify-between">
          <view class="flex items-center">
            <view
              class="mr-2 h-6 w-6 flex items-center justify-center rounded-full bg-violet-100 text-xs text-violet-600 font-medium"
            >
              {{ index + 1 }}
            </view>
            <text class="text-gray-800 font-medium">
              商品 {{ index + 1 }}
            </text>
          </view>
          <text
            v-if="items.length > 1"
            class="text-sm text-red-400"
            @click="removeItem(index)"
          >
            删除
          </text>
        </view>

        <view class="space-y-3">
          <view>
            <text class="mb-2 block text-xs text-gray-500 font-medium">
              选择商品
            </text>
            <wd-picker
              :model-value="item.category"
              :columns="categories"
              placeholder="选择商品"
              @update:model-value="(val: string) => handleCategoryChange(item, val)"
            >
              <template #default="{ value }">
                <view
                  class="flex items-center justify-between border border-gray-200 rounded-xl bg-gray-50 px-4 py-3"
                >
                  <view class="flex items-center">
                    <text class="mr-2 text-lg">
                      {{ getCategoryIcon(item.category) }}
                    </text>
                    <text class="text-gray-800">
                      {{ value?.label || '请选择' }}
                    </text>
                  </view>
                  <text class="text-gray-400">
                    ›
                  </text>
                </view>
              </template>
            </wd-picker>
          </view>

          <view
            v-if="item.category"
            class="flex items-center justify-between rounded-xl px-4 py-2.5"
            :class="{
              'bg-green-50': getStockStatus(item) === 'normal',
              'bg-amber-50': getStockStatus(item) === 'warning',
              'bg-red-50': getStockStatus(item) === 'over',
            }"
          >
            <view class="flex items-center">
              <text class="mr-2 text-sm">
                📦
              </text>
              <text
                class="text-sm font-medium"
                :class="{
                  'text-green-600': getStockStatus(item) === 'normal',
                  'text-amber-600': getStockStatus(item) === 'warning',
                  'text-red-600': getStockStatus(item) === 'over',
                }"
              >
                库存: {{ getCategoryStock(item.category) }}只
              </text>
            </view>
            <text
              v-if="getStockStatus(item) === 'over'"
              class="text-xs text-red-500 font-medium"
            >
              库存不足
            </text>
            <text
              v-else-if="getStockStatus(item) === 'warning'"
              class="text-xs text-amber-500 font-medium"
            >
              库存紧张
            </text>
          </view>

          <view class="flex gap-3">
            <view class="flex-1">
              <text class="mb-2 block text-xs text-gray-500 font-medium">
                下单数量
              </text>
              <wd-input
                v-model="item.orderQty"
                type="number"
                placeholder="输入数量"
              />
            </view>
            <view class="w-20">
              <text class="mb-2 block text-xs text-gray-500 font-medium">
                单位
              </text>
              <view class="border border-gray-200 rounded-xl bg-gray-50 px-3 py-2.5 text-center">
                <text class="text-gray-800">
                  只
                </text>
              </view>
            </view>
          </view>

          <view
            v-if="item.category && item.orderQty"
            class="flex items-center justify-between rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 p-3"
          >
            <view class="flex items-center">
              <text class="mr-2 text-sm">
                ⚖️
              </text>
              <text class="text-sm text-gray-600">
                处理后重量
              </text>
            </view>
            <view class="text-right">
              <text class="text-lg text-violet-600 font-bold">
                {{ getProcessedWeight(item) }} 斤
              </text>
              <text class="ml-2 text-xs text-gray-400">
                (出成率{{ getLossRate(item.category) * 100 }}%)
              </text>
            </view>
          </view>

          <view>
            <text class="mb-2 block text-xs text-gray-500 font-medium">
              处理要求
            </text>
            <view class="flex flex-wrap gap-2">
              <view
                v-for="proc in processTypes"
                :key="proc.value"
                class="flex items-center rounded-full px-4 py-2 text-sm transition-all"
                :class="[
                  item.processType === proc.value
                    ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
                ]"
                @click="item.processType = proc.value"
              >
                <text class="mr-1">
                  {{ proc.icon }}
                </text>
                <text>{{ proc.label }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view
        class="flex items-center justify-center border-2 border-violet-200 rounded-2xl border-dashed bg-white p-4"
        @click="addItem"
      >
        <view class="mr-2 h-6 w-6 flex items-center justify-center rounded-full bg-violet-100">
          <text class="text-lg text-violet-600">
            +
          </text>
        </view>
        <text class="text-violet-600 font-medium">
          添加商品
        </text>
      </view>
    </view>

    <view class="pb-safe fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-lg">
      <view class="mb-3 flex items-center justify-between">
        <view class="flex items-center">
          <text class="text-gray-600">
            合计
          </text>
          <view class="ml-2 rounded-full bg-violet-100 px-2 py-0.5">
            <text class="text-xs text-violet-600 font-medium">
              {{ items.filter(i => i.category && i.orderQty).length }}项
            </text>
          </view>
        </view>
        <view class="text-right">
          <text class="block text-gray-500">
            {{ totalSummary.qty }}只 → 预估{{ totalSummary.weight }}斤
          </text>
        </view>
      </view>
      <wd-button
        type="primary"
        block
        size="large"
        @click="handleSave"
      >
        保存并生成送货单
      </wd-button>
    </view>
  </view>
</template>
