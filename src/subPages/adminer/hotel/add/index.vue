<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '@wot-ui/router'
import { useGlobalToast } from '@/composables/useGlobalToast'

definePage({
  name: 'hotel-add',
  style: {
    navigationBarTitleText: '录入酒店',
  },
})

const router = useRouter()
const { success } = useGlobalToast()

const formData = ref({
  name: '',
  contact: '',
  phone: '',
  address: '',
  type: '',
  remark: '',
})

const hotelTypes = ref([
  { label: '星级酒店', value: '1' },
  { label: '连锁餐厅', value: '2' },
  { label: '私房菜', value: '3' },
  { label: '海鲜酒楼', value: '4' },
  { label: '快餐店', value: '5' },
])

const areas = ref([
  { label: '市中心', value: '1' },
  { label: '东区', value: '2' },
  { label: '西区', value: '3' },
  { label: '南区', value: '4' },
  { label: '北区', value: '5' },
  { label: '开发区', value: '6' },
])

function handleSave() {
  if (!formData.value.name) {
    success({ msg: '请输入酒店名称', position: 'middle' })
    return
  }
  if (!formData.value.phone) {
    success({ msg: '请输入联系电话', position: 'middle' })
    return
  }
  if (!formData.value.address) {
    success({ msg: '请输入酒店地址', position: 'middle' })
    return
  }

  success({ msg: '酒店录入成功', position: 'middle' })
  setTimeout(() => {
    router.back()
  }, 1500)
}
</script>

<template>
  <view class="min-h-screen bg-slate-50">
    <view class="bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-4">
      <view class="flex items-center justify-between">
        <view>
          <text class="block text-sm text-white/80">
            新增酒店
          </text>
          <text class="text-2xl font-bold text-white">
            录入酒店
          </text>
        </view>
        <view class="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
          <text class="text-2xl">🏨</text>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="rounded-2xl bg-white shadow-sm">
        <view class="border-b border-gray-50 px-4 py-4">
          <view class="mb-4 flex items-center">
            <view class="mr-2 h-2 w-2 rounded-full bg-rose-500" />
            <text class="font-medium text-gray-800">基本信息</text>
          </view>

          <view class="space-y-4">
            <view>
              <text class="mb-2 block text-xs font-medium text-gray-500">酒店名称 *</text>
              <wd-input
                v-model="formData.name"
                placeholder="请输入酒店名称"
              />
            </view>

            <view>
              <text class="mb-2 block text-xs font-medium text-gray-500">酒店类型</text>
              <wd-picker
                v-model="formData.type"
                :columns="hotelTypes"
                placeholder="选择酒店类型"
              >
                <template #default="{ value }">
                  <view class="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <text class="text-gray-800">{{ value?.label || '请选择' }}</text>
                    <text class="text-gray-400">›</text>
                  </view>
                </template>
              </wd-picker>
            </view>

            <view>
              <text class="mb-2 block text-xs font-medium text-gray-500">所在区域</text>
              <wd-picker
                v-model="formData.type"
                :columns="areas"
                placeholder="选择所在区域"
              >
                <template #default="{ value }">
                  <view class="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <text class="text-gray-800">{{ value?.label || '请选择' }}</text>
                    <text class="text-gray-400">›</text>
                  </view>
                </template>
              </wd-picker>
            </view>

            <view>
              <text class="mb-2 block text-xs font-medium text-gray-500">详细地址 *</text>
              <wd-input
                v-model="formData.address"
                type="textarea"
                placeholder="请输入酒店详细地址"
                :rows="2"
              />
            </view>
          </view>
        </view>

        <view class="px-4 py-4">
          <view class="mb-4 flex items-center">
            <view class="mr-2 h-2 w-2 rounded-full bg-blue-500" />
            <text class="font-medium text-gray-800">联系方式</text>
          </view>

          <view class="space-y-4">
            <view>
              <text class="mb-2 block text-xs font-medium text-gray-500">联系人</text>
              <wd-input
                v-model="formData.contact"
                placeholder="请输入联系人姓名"
              />
            </view>

            <view>
              <text class="mb-2 block text-xs font-medium text-gray-500">联系电话 *</text>
              <wd-input
                v-model="formData.phone"
                type="number"
                placeholder="请输入联系电话"
                maxlength="11"
              />
            </view>
          </view>
        </view>

        <view class="border-t border-gray-50 px-4 py-4">
          <view class="mb-4 flex items-center">
            <view class="mr-2 h-2 w-2 rounded-full bg-slate-400" />
            <text class="font-medium text-gray-800">备注信息</text>
          </view>

          <wd-input
            v-model="formData.remark"
            type="textarea"
            placeholder="添加备注信息"
            :rows="3"
          />
        </view>
      </view>
    </view>

    <view class="pb-safe fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-lg">
      <wd-button
        type="primary"
        block
        size="large"
        @click="handleSave"
      >
        保存酒店信息
      </wd-button>
    </view>
  </view>
</template>
