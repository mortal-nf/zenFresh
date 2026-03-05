/**
 * 页面业务类型枚举
 */
export enum PageBizType {
  HOME = 'home',           // 首页/工作台
  PURCHASE = 'purchase',   // 采购相关
  SALE = 'sale',           // 销售相关
  INVENTORY = 'inventory', // 库存管理
  ORDER = 'order',         // 订单管理
  CUSTOMER = 'customer',   // 客户管理
  ANALYSIS = 'analysis',   // 数据分析
  USER = 'user',           // 用户中心
  SETTINGS = 'settings',   // 系统设置
}

/**
 * 业务类型对应的渐变配置
 */
export const bizGradients: Record<PageBizType, {
  from: string
  via?: string
  to: string
  gradientClass: string
}> = {
  [PageBizType.HOME]: {
    from: 'from-violet-600',
    via: 'via-purple-600',
    to: 'to-pink-500',
    gradientClass: 'bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500',
  },
  [PageBizType.PURCHASE]: {
    from: 'from-emerald-500',
    to: 'to-teal-600',
    gradientClass: 'bg-gradient-to-r from-emerald-500 to-teal-600',
  },
  [PageBizType.SALE]: {
    from: 'from-violet-500',
    to: 'to-purple-600',
    gradientClass: 'bg-gradient-to-r from-violet-500 to-purple-600',
  },
  [PageBizType.INVENTORY]: {
    from: 'from-blue-500',
    to: 'to-indigo-600',
    gradientClass: 'bg-gradient-to-r from-blue-500 to-indigo-600',
  },
  [PageBizType.ORDER]: {
    from: 'from-amber-500',
    to: 'to-orange-500',
    gradientClass: 'bg-gradient-to-r from-amber-500 to-orange-500',
  },
  [PageBizType.CUSTOMER]: {
    from: 'from-cyan-500',
    to: 'to-blue-500',
    gradientClass: 'bg-gradient-to-r from-cyan-500 to-blue-500',
  },
  [PageBizType.ANALYSIS]: {
    from: 'from-violet-600',
    via: 'via-indigo-500',
    to: 'to-blue-500',
    gradientClass: 'bg-gradient-to-r from-violet-600 via-indigo-500 to-blue-500',
  },
  [PageBizType.USER]: {
    from: 'from-slate-600',
    via: 'via-slate-500',
    to: 'to-slate-400',
    gradientClass: 'bg-gradient-to-br from-slate-600 via-slate-500 to-slate-400',
  },
  [PageBizType.SETTINGS]: {
    from: 'from-indigo-500',
    to: 'to-purple-500',
    gradientClass: 'bg-gradient-to-r from-indigo-500 to-purple-500',
  },
}

/**
 * 状态颜色配置
 */
export const statusColors = {
  success: {
    bg: '#ecfdf5',
    color: '#10b981',
    light: 'green-50',
    dark: 'green-600',
  },
  warning: {
    bg: '#fffbeb',
    color: '#f59e0b',
    light: 'amber-50',
    dark: 'amber-600',
  },
  danger: {
    bg: '#fef2f2',
    color: '#ef4444',
    light: 'red-50',
    dark: 'red-500',
  },
  info: {
    bg: '#eff6ff',
    color: '#3b82f6',
    light: 'blue-50',
    dark: 'blue-600',
  },
  secondary: {
    bg: '#f5f3ff',
    color: '#8b5cf6',
    light: 'purple-50',
    dark: 'purple-600',
  },
}

/**
 * 页面路由与业务类型映射
 */
export const pageBizMap: Record<string, PageBizType> = {
  'adminer/index': PageBizType.HOME,
  'adminer/purchase/add': PageBizType.PURCHASE,
  'adminer/sale/add': PageBizType.SALE,
  'adminer/inventory': PageBizType.INVENTORY,
  'adminer/orders': PageBizType.ORDER,
  'adminer/farmer/add': PageBizType.CUSTOMER,
  'adminer/hotel/add': PageBizType.CUSTOMER,
  'charts/index': PageBizType.ANALYSIS,
  'about/index': PageBizType.USER,
  'adminer/settings': PageBizType.SETTINGS,
  'adminer/about': PageBizType.USER,
}
