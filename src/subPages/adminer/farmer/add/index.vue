<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '@wot-ui/router'
import { useGlobalToast } from '@/composables/useGlobalToast'

definePage({
  name: 'farmer-add',
  style: {
    navigationBarTitleText: '录入农户',
  },
})

const router = useRouter()
const { success } = useGlobalToast()

const formData = ref({
  name: '',
  phone: '',
  address: '',
  idCard: '',
  bankName: '',
  bankAccount: '',
  category: '',
  remark: '',
})

const categories = ref([
  { label: '土鸡养殖', value: '1' },
  { label: '肉鸡养殖', value: '2' },
  { label: '水产养殖', value: '3' },
  { label: '综合养殖', value: '4' },
])

const bankList = ref([
  { label: '中国工商银行', value: 'icbc' },
  { label: '中国农业银行', value: 'abc' },
  { label: '中国建设银行', value: 'ccb' },
  { label: '中国银行', value: 'boc' },
  { label: '农村信用社', value: 'rcc' },
])

function handleSave() {
  if (!formData.value.name) {
    success({ msg: '请输入农户姓名', position: 'middle' })
    return
  }
  if (!formData.value.phone) {
    success({ msg: '请输入联系电话', position: 'middle' })
    return
  }
  if (!formData.value.address) {
    success({ msg: '请输入收货地址', position: 'middle' })
    return
  }

  success({ msg: '农户录入成功', position: 'middle' })
  setTimeout(() => {
    router.back()
  }, 1500)
}
</script>

<template>
  <view class="min-h-screen bg-slate-50">
    <view class="bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-4">
      <view class="flex items-center justify-between">
        <view>
          <text class="block text-sm text-white/80">
            新增农户
          </text>
          <text class="text-2xl font-bold text-white">
            录入农户
          </text>
        </view>
        <view class="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
          <text class="text-2xl">👨‍🌾</text>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="rounded-2xl bg-white shadow-sm">
        <view class="border-b border-gray-50 px-4 py-4">
          <view class="mb-4 flex items-center">
            <view class="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
            <text class="font-medium text-gray-800">基本信息</text>
          </view>

          <view class="space-y-4">
            <view>
              <text class="mb-2 block text-xs font-medium text-gray-500">农户姓名 *</text>
              <wd-input
                v-model="formData.name"
                placeholder="请输入农户姓名"
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

            <view>
              <text class="mb-2 block text-xs font-medium text-gray-500">养殖品类</text>
              <wd-picker
                v-model="formData.category"
                :columns="categories"
                placeholder="选择养殖品类"
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
              <text class="mb-2 block text-xs font-medium text-gray-500">收货地址 *</text>
              <wd-input
                v-model="formData.address"
                type="textarea"
                placeholder="请输入详细收货地址"
                :rows="2"
              />
            </view>
          </view>
        </view>

        <view class="px-4 py-4">
          <view class="mb-4 flex items-center">
            <view class="mr-2 h-2 w-2 rounded-full bg-blue-500" />
            <text class="font-medium text-gray-800">身份信息 (选填)</text>
          </view>

          <view class="space-y-4">
            <view>
              <text class="mb-2 block text-xs font-medium text-gray-500">身份证号</text>
              <wd-input
                v-model="formData.idCard"
                placeholder="请输入身份证号"
              />
            </view>
          </view>
        </view>

        <view class="border-t border-gray-50 px-4 py-4">
          <view class="mb-4 flex items-center">
            <view class="mr-2 h-2 w-2 rounded-full bg-amber-500" />
            <text class="font-medium text-gray-800">结算信息 (选填)</text>
          </view>

          <view class="space-y-4">
            <view>
              <text class="mb-2 block text-xs font-medium text-gray-500">开户银行</text>
              <wd-picker
                v-model="formData.bankName"
                :columns="bankList"
                placeholder="选择开户银行"
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
              <text class="mb-2 block text-xs font-medium text-gray-500">银行账号</text>
              <wd-input
                v-model="formData.bankAccount"
                type="number"
                placeholder="请输入银行账号"
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
        保存农户信息
      </wd-button>
    </view>
  </view>
</template>
