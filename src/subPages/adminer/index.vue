<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

defineOptions({
  name: 'Adminer',
})
// import {useUserStore} from '@/store/user'

// const userStore = useUserStore()
const pendingSales = ref<any[]>([])

onShow(async () => {
  await loadPendingSales()
})

async function loadPendingSales() {
  try {
    // TODO: 使用 uniCloud 获取待确认销售单
    // const db = uniCloud.database()
    // const res = await db.collection('sales')
    //   .where({ status: 'pending' })
    //   .orderBy('createTime', 'desc')
    //   .get()
    // pendingSales.value = res.data || []
    console.log('loadPendingSales')
  }
  catch (e) {
    console.error('加载待确认销售单失败:', e)
  }
}

function navTo(url: string) {
  uni.navigateTo({ url })
}

async function handleConfirm(sale: any) {
  uni.navigateTo({
    url: `/pages/operator/sale/detail/index?id=${sale._id}`,
  })
}
</script>

<template>
  <view class="home">
    <view class="welcome">
      <text class="name">
        {{ '处理者' }}
      </text>
      <text class="role">
        处理者
      </text>
    </view>

    <view class="quick-actions">
      <view class="action-grid">
        <view class="action-item" @click="navTo('/pages/operator/purchase/add/index')">
          <text class="action-icon">
            📦
          </text>
          <text class="action-text">
            采购录入
          </text>
        </view>
        <view class="action-item" @click="navTo('/pages/operator/sale/add/index')">
          <text class="action-icon">
            🛒
          </text>
          <text class="action-text">
            销售录入
          </text>
        </view>
        <view class="action-item" @click="navTo('/pages/operator/inventory/list/index')">
          <text class="action-icon">
            📊
          </text>
          <text class="action-text">
            库存查看
          </text>
        </view>
        <view class="action-item" @click="navTo('/pages/operator/records/list/index')">
          <text class="action-icon">
            📋
          </text>
          <text class="action-text">
            记录查询
          </text>
        </view>
      </view>
    </view>

    <view class="pending-section">
      <view class="section-header">
        <text class="section-title">
          待确认销售单
        </text>
        <text class="count">
          {{ pendingSales.length }}
        </text>
      </view>

      <view v-if="pendingSales.length === 0" class="empty">
        <text>暂无待确认订单</text>
      </view>

      <view v-else class="pending-list">
        <view
          v-for="item in pendingSales"
          :key="item._id"
          class="pending-item"
          @click="handleConfirm(item)"
        >
          <view class="item-info">
            <text class="customer-name">
              {{ item.customerName || '未知酒店' }}
            </text>
            <text class="delivery-date">
              配送日期: {{ item.deliveryDate }}
            </text>
          </view>
          <view class="item-status">
            <text class="status-tag">
              待确认
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 30rpx;

  .welcome {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;

    .name {
      font-size: 40rpx;
      font-weight: bold;
      color: #333;
      margin-right: 20rpx;
    }

    .role {
      font-size: 24rpx;
      color: #667eea;
      background: rgba(102, 126, 234, 0.1);
      padding: 8rpx 16rpx;
      border-radius: 20rpx;
    }
  }

  .quick-actions {
    background: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;

    .action-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20rpx;

      .action-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .action-icon {
          font-size: 48rpx;
          margin-bottom: 10rpx;
        }

        .action-text {
          font-size: 24rpx;
          color: #666;
        }
      }
    }
  }

  .pending-section {
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20rpx;

      .section-title {
        font-size: 32rpx;
        font-weight: bold;
        color: #333;
      }

      .count {
        font-size: 24rpx;
        color: #fff;
        background: #ff3b30;
        padding: 4rpx 12rpx;
        border-radius: 20rpx;
      }
    }

    .empty {
      background: #fff;
      border-radius: 16rpx;
      padding: 60rpx;
      text-align: center;

      text {
        color: #999;
        font-size: 28rpx;
      }
    }

    .pending-list {
      .pending-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        border-radius: 16rpx;
        padding: 24rpx;
        margin-bottom: 20rpx;

        .item-info {
          display: flex;
          flex-direction: column;

          .customer-name {
            font-size: 28rpx;
            font-weight: bold;
            color: #333;
            margin-bottom: 8rpx;
          }

          .delivery-date {
            font-size: 24rpx;
            color: #999;
          }
        }

        .item-status {
          .status-tag {
            font-size: 24rpx;
            color: #ff9500;
            background: rgba(255, 149, 0, 0.1);
            padding: 8rpx 16rpx;
            border-radius: 20rpx;
          }
        }
      }
    }
  }
}
</style>
