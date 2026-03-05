# 页面风格统一计划

## 📋 问题分析

当前各页面头部渐变色不一致：

| 页面 | 当前渐变色 | 问题 |
|------|-----------|------|
| 工作台 (adminer/index) | indigo→purple→pink | 风格混乱 |
| 录入采购 (purchase/add) | emerald→teal | 颜色不统一 |
| 录入销售 (sale/add) | pink→rose→orange | 颜色不统一 |
| 库存管理 (inventory) | blue→indigo→purple | 颜色不统一 |
| 订单管理 (orders) | amber→orange→red | 颜色不统一 |
| 录入农户 (farmer/add) | emerald→teal | 与采购相同 |
| 录入酒店 (hotel/add) | rose→pink | 颜色不统一 |
| 分析报表 (charts) | violet→indigo→blue | 颜色不统一 |
| 我的/关于 (about) | indigo→purple→pink | ✓ 较好 |
| 系统设置 (settings) | 固定 slate | 需要动态 |

---

## 🎨 统一颜色规范

### 1. 头部渐变配色方案（按业务分类）

```
┌─────────────────────────────────────────────────────────────┐
│  业务场景        │  渐变起始色      │  渐变结束色        │  适用页面                    │
├─────────────────┼──────────────────┼────────────────────┼─────────────────────────────┤
│  首页/工作台     │  indigo-600      │  purple-600→pink-500│  adminer/index             │
│  采购相关        │  emerald-500     │  teal-600          │  purchase/add              │
│  销售相关        │  violet-500      │  purple-600        │  sale/add                  │
│  库存管理        │  blue-500        │  indigo-500        │  inventory                 │
│  订单管理        │  amber-500       │  orange-500        │  orders                    │
│  客户管理        │  cyan-500        │  blue-500          │  farmer/add, hotel/add    │
│  数据分析        │  violet-600      │  indigo-600→blue-500│  charts                    │
│  用户中心        │  slate-600       │  slate-500→slate-400│  about, profile            │
│  系统设置        │  跟随主题色      │  -                  │  settings                  │
└─────────────────┴──────────────────┴────────────────────┴─────────────────────────────┘
```

### 2. 状态颜色规范

```
┌─────────────────────────────────────────────────────────────┐
│  状态        │  背景色           │  文字色              │
├──────────────┼───────────────────┼──────────────────────┤
│  正常/完成   │  green-50 (#ecfdf5)│  green-600 (#10b981) │
│  警告/紧张   │  amber-50 (#fffbeb)│  amber-600 (#f59e0b) │
│  错误/不足   │  red-50 (#fef2f2)  │  red-500 (#ef4444)   │
│  进行中/待处理│  blue-50 (#eff6ff) │  blue-600 (#3b82f6)  │
│  已确认      │  purple-50 (#f5f3ff)│ purple-600 (#8b5cf6)│
└──────────────┴───────────────────┴──────────────────────┘
```

### 3. 卡片阴影规范

```
┌─────────────────────────────────────────────────────────────┐
│  场景          │  阴影类                                    │
├────────────────┼───────────────────────────────────────────┤
│  主信息卡片    │  shadow-lg shadow-{颜色}/10               │
│  次要卡片      │  shadow-sm                                 │
│  悬浮按钮      │  shadow-lg shadow-{颜色}/20               │
│  底部导航栏    │  shadow-lg                                │
└────────────────┴───────────────────────────────────────────┘
```

---

## 📝 实施步骤

### 第一阶段：定义颜色常量（1个文件）

- [ ] 在 `src/utils/constants.ts` 中定义业务颜色常量
- [ ] 导出页面类型枚举和对应的渐变配置

### 第二阶段：修改核心页面（9个页面）

- [ ] `adminer/index.vue` - 工作台 → violet→purple
- [ ] `adminer/purchase/add/index.vue` - 采购录入 → emerald→teal
- [ ] `adminer/sale/add/index.vue` - 销售录入 → violet→purple  
- [ ] `adminer/inventory/index.vue` - 库存管理 → blue→indigo
- [ ] `adminer/orders/index.vue` - 订单管理 → amber→orange
- [ ] `adminer/farmer/add/index.vue` - 录入农户 → cyan→blue
- [ ] `adminer/hotel/add/index.vue` - 录入酒店 → cyan→blue
- [ ] `pages/charts/index.vue` - 分析报表 → violet→indigo→blue
- [ ] `pages/about/index.vue` - 我的页面 → slate (深色模式)

### 第三阶段：统一组件样式

- [ ] 状态标签组件
- [ ] 列表项组件
- [ ] 底部按钮组件

---

## ✅ 预期效果

1. **头部渐变**：按业务类型统一配色，一眼识别功能模块
2. **状态颜色**：所有页面使用统一的红/黄/蓝/绿/紫状态色
3. **阴影层次**：卡片层级感一致
4. **主题色联动**：系统设置页面跟随用户选择的主题色

---

是否确认此计划？
