<script setup lang="ts">
import { useRouter } from '@wot-ui/router'
import { computed, ref } from 'vue'
import { useGlobalToast } from '@/composables/useGlobalToast'
import { useManualTheme } from '@/composables/useManualTheme'

definePage({
  name: 'purchase-add',
  style: {
    navigationBarTitleText: '录入采购',
  },
})

const router = useRouter()
const { success } = useGlobalToast()
const { theme, currentThemeColor } = useManualTheme()

const isDark = computed(() => theme.value === 'dark')

const today = new Date()
const purchaseDate = ref(formatDate(today))

const suppliers = ref([
  { label: '张大山', value: '1', phone: '138****8888', address: '青山镇养殖场' },
  { label: '王五', value: '2', phone: '139****9999', address: '绿源农场' },
  { label: '李四', value: '3', phone: '137****7777', address: '幸福村养殖基地' },
])

const categories = ref([
  { label: '土鸡', value: '1', icon: '🐔', price: 25 },
  { label: '肉鸡', value: '2', icon: '🐣', price: 18 },
  { label: '草鱼', value: '3', icon: '🐟', price: 15 },
  { label: '鸭', value: '4', icon: '🦆', price: 22 },
])

const units = ref([
  { label: '只', value: '只' },
  { label: '斤', value: '斤' },
  { label: 'kg', value: 'kg' },
])

const selectedSupplier = ref('')
const selectedSupplierData = computed(() => suppliers.value.find(s => s.value === selectedSupplier.value))

const items = ref([
  {
    id: 1,
    category: '',
    quantity: '',
    unit: '只',
    price: '',
    remark: '',
  },
])

const totalAmount = computed(() => {
  return items.value.reduce((sum, item) => {
    const qty = Number(item.quantity) || 0
    const price = Number(item.price) || 0
    return sum + qty * price
  }, 0)
})

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function addItem() {
  items.value.push({
    id: Date.now(),
    category: '',
    quantity: '',
    unit: '只',
    price: '',
    remark: '',
  })
}

function removeItem(index: number) {
  if (items.value.length > 1) {
    items.value.splice(index, 1)
  }
}

function getSubtotal(item: typeof items.value[0]) {
  const qty = Number(item.quantity) || 0
  const price = Number(item.price) || 0
  return qty * price
}

function getCategoryIcon(categoryValue: string) {
  return categories.value.find(c => c.value === categoryValue)?.icon || '📦'
}

function handleCategoryChange(item: any, value: string) {
  item.category = value
  const category = categories.value.find(c => c.value === value)
  if (category) {
    item.price = String(category.price)
  }
}

function goBack() {
  router.back()
}

function handleSave() {
  if (!selectedSupplier.value) {
    success({ msg: '请选择农户', position: 'middle' })
    return
  }

  const validItems = items.value.filter(item => item.category && item.quantity && item.price)
  if (validItems.length === 0) {
    success({ msg: '请至少添加一个品类', position: 'middle' })
    return
  }

  success({ msg: '采购录入成功', position: 'middle' })
  setTimeout(() => {
    router.back()
  }, 1500)
}
</script>

<template>
  <view class="min-h-screen" :class="isDark ? 'bg-dark-900' : 'bg-slate-50'">
    <view class="from-emerald-500 to-teal-600 bg-gradient-to-r px-5 py-4">
      <view class="flex items-center justify-between">
        <view>
          <text class="block text-sm text-white/80">
            采购录入
          </text>
          <text class="text-2xl text-white font-bold">
            {{ purchaseDate }}
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
      <view class="rounded-2xl p-5 shadow-lg" :class="isDark ? 'bg-dark-700' : 'bg-white'" :style="{ boxShadow: isDark ? 'none' : '0 10px 15px -3px rgba(16, 185, 129, 0.1)' }">
        <view class="mb-4 flex items-center">
          <view class="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
          <text class="font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
            农户信息
          </text>
        </view>

        <wd-picker
          v-model="selectedSupplier"
          :columns="suppliers"
          placeholder="选择农户"
        >
          <template #default="{ value }">
            <view
              class="flex items-center justify-between border rounded-xl px-4 py-3"
              :class="isDark ? 'border-gray-600 bg-dark-800' : 'border-gray-200 bg-gray-50'"
            >
              <view class="flex items-center">
                <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-full" :class="isDark ? 'bg-emerald-900/30' : 'bg-emerald-100'">
                  <text class="text-lg">
                    👨‍🌾
                  </text>
                </view>
                <view>
                  <text class="block font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
                    {{ value?.label || '请选择农户' }}
                  </text>
                  <text v-if="value" class="text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-400'">
                    {{ value.phone }} · {{ value.address }}
                  </text>
                </view>
              </view>
              <text :class="isDark ? 'text-gray-400' : 'text-gray-400'">
                ›
              </text>
            </view>
          </template>
        </wd-picker>
      </view>
    </view>

    <view class="px-4 pb-30 pt-4">
      <view class="mb-3 flex items-center">
        <view class="mr-2 h-2 w-2 rounded-full bg-indigo-500" />
        <text class="font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
          采购明细
        </text>
        <text class="ml-2 text-xs" :class="isDark ? 'text-gray-400' : 'text-gray-400'">
          ({{ items.length }}项)
        </text>
      </view>

      <view
        v-for="(item, index) in items"
        :key="item.id"
        class="mb-4 rounded-2xl p-4 shadow-sm"
        :class="isDark ? 'bg-dark-700' : 'bg-white'"
      >
        <view class="mb-3 flex items-center justify-between">
          <view class="flex items-center">
            <view
              class="mr-2 h-6 w-6 flex items-center justify-center rounded-full text-xs font-medium"
              :class="isDark ? 'bg-indigo-900/30 text-indigo-400' : 'bg-indigo-100 text-indigo-600'"
            >
              {{ index + 1 }}
            </view>
            <text class="font-medium" :class="isDark ? 'text-gray-100' : 'text-gray-800'">
              品类 {{ index + 1 }}
            </text>
          </view>
          <text
            v-if="items.length > 1"
            class="text-sm"
            :class="isDark ? 'text-red-400' : 'text-red-400'"
            @click="removeItem(index)"
          >
            删除
          </text>
        </view>

        <view class="space-y-3">
          <view>
            <text class="mb-2 block text-xs font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              选择品类
            </text>
            <wd-picker
              :model-value="item.category"
              :columns="categories"
              placeholder="选择品类"
              @update:model-value="(val: string) => handleCategoryChange(item, val)"
            >
              <template #default="{ value }">
                <view
                  class="flex items-center justify-between border rounded-xl px-4 py-3"
                  :class="isDark ? 'border-gray-600 bg-dark-800' : 'border-gray-200 bg-gray-50'"
                >
                  <view class="flex items-center">
                    <text class="mr-2 text-lg">
                      {{ getCategoryIcon(item.category) }}
                    </text>
                    <text :class="isDark ? 'text-gray-100' : 'text-gray-800'">
                      {{ value?.label || '请选择' }}
                    </text>
                  </view>
                  <text :class="isDark ? 'text-gray-400' : 'text-gray-400'">
                    ›
                  </text>
                </view>
              </template>
            </wd-picker>
          </view>

          <view class="flex gap-3">
            <view class="flex-1">
              <text class="mb-2 block text-xs font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                数量
              </text>
              <wd-input
                v-model="item.quantity"
                type="number"
                placeholder="输入数量"
              />
            </view>
            <view class="w-20">
              <text class="mb-2 block text-xs font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
                单位
              </text>
              <wd-picker
                v-model="item.unit"
                :columns="units"
              >
                <template #default="{ value }">
                  <view
                    class="border rounded-xl px-3 py-2.5 text-center"
                    :class="isDark ? 'border-gray-600 bg-dark-800' : 'border-gray-200 bg-gray-50'"
                  >
                    <text :class="isDark ? 'text-gray-100' : 'text-gray-800'">
                      {{ value || '单位' }}
                    </text>
                  </view>
                </template>
              </wd-picker>
            </view>
          </view>

          <view>
            <text class="mb-2 block text-xs font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              单价 (元/{{ item.unit }})
            </text>
            <wd-input
              v-model="item.price"
              type="number"
              placeholder="输入单价"
            >
              <template #suffix>
                <text :class="isDark ? 'text-gray-400' : 'text-gray-400'">
                  元
                </text>
              </template>
            </wd-input>
          </view>

          <view
            class="flex items-center justify-between rounded-xl p-3"
            :class="isDark ? 'bg-emerald-900/20' : 'bg-gradient-to-r from-emerald-50 to-teal-50'"
          >
            <text class="text-sm" :class="isDark ? 'text-gray-300' : 'text-gray-600'">
              小计
            </text>
            <text class="text-lg font-bold" :class="isDark ? 'text-emerald-400' : 'text-emerald-600'">
              ¥{{ getSubtotal(item) }}
            </text>
          </view>

          <view>
            <text class="mb-2 block text-xs font-medium" :class="isDark ? 'text-gray-400' : 'text-gray-500'">
              备注 (选填)
            </text>
            <wd-input
              v-model="item.remark"
              type="text"
              placeholder="添加备注信息"
            />
          </view>
        </view>
      </view>

      <view
        class="flex items-center justify-center border-2 rounded-2xl border-dashed p-4"
        :class="isDark ? 'border-indigo-700 bg-dark-700' : 'border-indigo-200 bg-white'"
        @click="addItem"
      >
        <view class="mr-2 h-6 w-6 flex items-center justify-center rounded-full" :class="isDark ? 'bg-indigo-900/30' : 'bg-indigo-100'">
          <text class="text-lg" :class="isDark ? 'text-indigo-400' : 'text-indigo-600'">
            +
          </text>
        </view>
        <text class="font-medium" :class="isDark ? 'text-indigo-400' : 'text-indigo-600'">
          添加品类
        </text>
      </view>
    </view>

    <view class="pb-safe fixed bottom-0 left-0 right-0 px-4 py-4 shadow-lg" :class="isDark ? 'bg-dark-800' : 'bg-white'">
      <view class="mb-3 flex items-center justify-between">
        <view class="flex items-center">
          <text :class="isDark ? 'text-gray-300' : 'text-gray-600'">
            合计
          </text>
          <view class="ml-2 rounded-full px-2 py-0.5" :class="isDark ? 'bg-indigo-900/30' : 'bg-indigo-100'">
            <text class="text-xs font-medium" :class="isDark ? 'text-indigo-400' : 'text-indigo-600'">
              {{ items.length }}项
            </text>
          </view>
        </view>
        <view>
          <text class="text-2xl font-bold" :class="isDark ? 'text-indigo-400' : 'text-indigo-600'">
            ¥{{ totalAmount }}
          </text>
        </view>
      </view>
      <wd-button
        type="primary"
        block
        size="large"
        @click="handleSave"
      >
        保存采购单
      </wd-button>
    </view>
  </view>
</template>
