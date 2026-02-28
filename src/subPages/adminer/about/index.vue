<script setup lang="ts">
import { useRouter } from '@wot-ui/router'
import { useGlobalToast } from '@/composables/useGlobalToast'

definePage({
  name: 'about',
  style: {
    navigationBarTitleText: '关于我们',
  },
})

const router = useRouter()
const { success } = useGlobalToast()

const appInfo = {
  name: '真鲜速达',
  englishName: 'ZenFresh',
  version: '1.4.0',
  slogan: '真材实料，鲜速必达',
}

const features = [
  { icon: '📦', title: '采购管理', desc: '便捷录入农户供货信息' },
  { icon: '🛒', title: '销售订单', desc: '快速生成送货单' },
  { icon: '📊', title: '数据统计', desc: '实时掌握经营数据' },
  { icon: '👥', title: '客户管理', desc: '酒店农户一键管理' },
]

const contactInfo = [
  { icon: '📱', label: '客服电话', value: '400-888-8888' },
  { icon: '📧', label: '商务合作', value: 'business@zenfresh.com' },
  { icon: '🌐', label: '官方网站', value: 'www.zenfresh.com' },
]

function handleCall() {
  success({ msg: '正在拨打客服电话...', position: 'middle' })
}

function handleFeedback() {
  success({ msg: '反馈功能开发中', position: 'middle' })
}
</script>

<template>
  <view class="min-h-screen bg-slate-50">
    <view class="from-indigo-600 via-purple-600 to-pink-500 bg-gradient-to-r px-5 py-8">
      <view class="text-center">
        <view class="mb-4 h-20 w-20 inline-flex items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm">
          <text class="text-4xl">
            🐔
          </text>
        </view>
        <text class="mb-2 block text-3xl text-white font-bold">
          {{ appInfo.name }}
        </text>
        <text class="block text-sm text-white/80">
          {{ appInfo.englishName }} · {{ appInfo.version }}
        </text>
        <view class="mt-4 inline-block rounded-full bg-white/20 px-4 py-1.5">
          <text class="text-sm text-white">
            {{ appInfo.slogan }}
          </text>
        </view>
      </view>
    </view>

    <view class="px-4 -mt-4">
      <view class="rounded-2xl bg-white p-5 shadow-indigo-500/10 shadow-lg">
        <view class="grid grid-cols-2 gap-4">
          <view
            v-for="feature in features"
            :key="feature.title"
            class="flex items-center rounded-xl bg-slate-50 p-3"
          >
            <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-100">
              <text class="text-xl">
                {{ feature.icon }}
              </text>
            </view>
            <view>
              <text class="block text-sm text-gray-800 font-medium">
                {{ feature.title }}
              </text>
              <text class="text-xs text-gray-400">
                {{ feature.desc }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="mb-3 flex items-center">
        <view class="mr-2 h-2 w-2 rounded-full bg-indigo-500" />
        <text class="text-gray-800 font-medium">
          功能介绍
        </text>
      </view>

      <view class="rounded-2xl bg-white p-4 shadow-sm">
        <view class="space-y-4">
          <view class="flex items-start">
            <view class="mr-3 h-8 w-8 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <text class="text-sm">
                1
              </text>
            </view>
            <view class="flex-1">
              <text class="block text-gray-800 font-medium">
                录入采购
              </text>
              <text class="text-sm text-gray-500">
                管理员录入从农户处采购的食材信息，系统自动更新库存
              </text>
            </view>
          </view>

          <view class="flex items-start">
            <view class="mr-3 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <text class="text-sm">
                2
              </text>
            </view>
            <view class="flex-1">
              <text class="block text-gray-800 font-medium">
                销售订单
              </text>
              <text class="text-sm text-gray-500">
                创建销售订单，自动计算处理后重量，生成送货单
              </text>
            </view>
          </view>

          <view class="flex items-start">
            <view class="mr-3 h-8 w-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <text class="text-sm">
                3
              </text>
            </view>
            <view class="flex-1">
              <text class="block text-gray-800 font-medium">
                库存管理
              </text>
              <text class="text-sm text-gray-500">
                实时查看库存状态，库存不足自动预警
              </text>
            </view>
          </view>

          <view class="flex items-start">
            <view class="mr-3 h-8 w-8 flex items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <text class="text-sm">
                4
              </text>
            </view>
            <view class="flex-1">
              <text class="block text-gray-800 font-medium">
                数据分析
              </text>
              <text class="text-sm text-gray-500">
                销售趋势、品类分布、客户排行，助力科学决策
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="mb-3 flex items-center">
        <view class="mr-2 h-2 w-2 rounded-full bg-rose-500" />
        <text class="text-gray-800 font-medium">
          联系我们
        </text>
      </view>

      <view class="rounded-2xl bg-white shadow-sm">
        <view
          v-for="(item, index) in contactInfo"
          :key="item.label"
          class="flex items-center justify-between border-b border-gray-50 px-4 py-4 last:border-b-0"
          :class="index === 0 ? 'cursor-pointer' : ''"
          :style="index === 0 ? '' : ''"
          @click="index === 0 && handleCall()"
        >
          <view class="flex items-center">
            <view class="mr-3 h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100">
              <text class="text-xl">
                {{ item.icon }}
              </text>
            </view>
            <view>
              <text class="block text-sm text-gray-500">
                {{ item.label }}
              </text>
              <text class="block text-gray-800 font-medium">
                {{ item.value }}
              </text>
            </view>
          </view>
          <text v-if="index === 0" class="text-gray-400">
            ›
          </text>
        </view>
      </view>
    </view>

    <view class="px-4 pt-4">
      <view class="rounded-2xl bg-white p-4 shadow-sm">
        <view class="flex items-center justify-center gap-4">
          <view class="flex-1 cursor-pointer rounded-xl bg-slate-50 p-3 text-center" @click="handleFeedback">
            <text class="text-xl">
              💬
            </text>
            <text class="mt-1 block text-xs text-gray-600">
              意见反馈
            </text>
          </view>
          <view class="flex-1 cursor-pointer rounded-xl bg-slate-50 p-3 text-center">
            <text class="text-xl">
              ⭐
            </text>
            <text class="mt-1 block text-xs text-gray-600">
              给我们评分
            </text>
          </view>
          <view class="flex-1 cursor-pointer rounded-xl bg-slate-50 p-3 text-center">
            <text class="text-xl">
              📤
            </text>
            <text class="mt-1 block text-xs text-gray-600">
              分享应用
            </text>
          </view>
        </view>
      </view>
    </view>

    <view class="px-4 pb-8 pt-6 text-center">
      <text class="block text-xs text-gray-400">
        © 2024 真鲜速达 ZenFresh
      </text>
      <text class="mt-1 block text-xs text-gray-400">
        版权所有 · 保留一切权利
      </text>
    </view>
  </view>
</template>
