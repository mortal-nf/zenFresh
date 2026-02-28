import { defineStore } from 'pinia'
import { persist } from './persist'

/**
 * 用户角色类型
 */
export type UserRole = 'admin' | 'hotel' | 'farmer'

/**
 * 用户角色配置
 */
export interface UserRoleConfig {
  key: UserRole
  label: string
  icon: string
  desc: string
}

/**
 * 用户基本信息
 */
export interface UserInfo {
  name: string
  phone: string
  avatar: string
  role: UserRole
  bindCode: string
}

/**
 * 用户统计数据
 */
export interface UserStats {
  customerCount: number
  orderCount: number
  salesAmount: number
}

/**
 * 用户状态接口
 */
export interface UserState {
  userInfo: UserInfo
  currentRole: UserRole
  stats: UserStats
  isLoggedIn: boolean
  lastLoginTime: string
}

/**
 * 角色配置列表
 */
export const roleConfigs: UserRoleConfig[] = [
  { key: 'admin', label: '管理员', icon: '👨‍💼', desc: '管理所有业务' },
  { key: 'hotel', label: '酒店', icon: '🏨', desc: '接收订单，确认收货' },
  { key: 'farmer', label: '农户', icon: '👨‍🌾', desc: '查看供货记录' },
]

/**
 * 用户状态管理
 * 管理用户信息、角色切换、统计数据等
 */
export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: {
      name: '张老板',
      phone: '138****8888',
      avatar: '👨',
      role: 'admin',
      bindCode: 'ZF20240215',
    },
    currentRole: 'admin',
    stats: {
      customerCount: 128,
      orderCount: 1280,
      salesAmount: 86000,
    },
    isLoggedIn: true,
    lastLoginTime: new Date().toISOString(),
  }),

  getters: {
    /**
     * 获取当前角色配置
     */
    currentRoleConfig: (state) => {
      return roleConfigs.find(r => r.key === state.currentRole) || roleConfigs[0]
    },

    /**
     * 获取用户显示名称
     */
    displayName: (state) => {
      return state.userInfo.name || '未设置'
    },

    /**
     * 获取用户角色标签
     */
    roleLabel: (state) => {
      const config = roleConfigs.find(r => r.key === state.currentRole)
      return config?.label || '未知'
    },

    /**
     * 格式化销售金额
     */
    formattedSalesAmount: (state) => {
      if (state.stats.salesAmount >= 10000) {
        return `¥${(state.stats.salesAmount / 10000).toFixed(1)}w`
      }
      return `¥${state.stats.salesAmount}`
    },

    /**
     * 格式化订单数
     */
    formattedOrderCount: (state) => {
      if (state.stats.orderCount >= 1000) {
        return `${(state.stats.orderCount / 1000).toFixed(1)}k`
      }
      return String(state.stats.orderCount)
    },
  },

  actions: {
    /**
     * 切换用户角色
     * @param role 角色 key
     */
    switchRole(role: UserRole) {
      if (this.currentRole === role) return

      this.currentRole = role
      this.userInfo.role = role

      const config = roleConfigs.find(r => r.key === role)
      if (config) {
        this.userInfo.name = config.label
      }
    },

    /**
     * 更新用户信息
     * @param info 用户信息
     */
    updateUserInfo(info: Partial<UserInfo>) {
      this.userInfo = { ...this.userInfo, ...info }
    },

    /**
     * 更新统计数据
     * @param stats 统计数据
     */
    updateStats(stats: Partial<UserStats>) {
      this.stats = { ...this.stats, ...stats }
    },

    /**
     * 增加客户数
     * @param count 增量
     */
    incrementCustomerCount(count: number = 1) {
      this.stats.customerCount += count
    },

    /**
     * 增加订单数
     * @param count 增量
     */
    incrementOrderCount(count: number = 1) {
      this.stats.orderCount += count
    },

    /**
     * 增加销售额
     * @param amount 增量
     */
    addSalesAmount(amount: number) {
      this.stats.salesAmount += amount
    },

    /**
     * 用户登录
     */
    login() {
      this.isLoggedIn = true
      this.lastLoginTime = new Date().toISOString()
    },

    /**
     * 用户登出
     */
    logout() {
      this.isLoggedIn = false
    },

    /**
     * 重置用户数据
     */
    resetUser() {
      this.userInfo = {
        name: '',
        phone: '',
        avatar: '👨',
        role: 'admin',
        bindCode: '',
      }
      this.currentRole = 'admin'
      this.stats = {
        customerCount: 0,
        orderCount: 0,
        salesAmount: 0,
      }
      this.isLoggedIn = false
    },
  },

  persist,
})
