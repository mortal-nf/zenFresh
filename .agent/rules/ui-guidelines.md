---
description: UI/UX 指南、样式规范和组件使用
globs: **/*.vue, **/*.scss, src/components/**/*, src/uni_modules/**/*, uno.config.ts
alwaysApply: false
---

# UI 与样式指南

## 🎨 样式系统
- **引擎**: UnoCSS (原子化 CSS) 是**首选**的样式方案。
- **配置**: `uno.config.ts`。
- **预处理**: SCSS 用于复杂的组件样式（极少需要）。
- **主题**: 通过 `src/theme.json` 和 CSS 变量支持亮色/暗色模式切换。

### UnoCSS 约定
- 使用工具类: `flex`, `items-center`, `text-primary`, `m-4`.
- 响应式前缀: `sm:`, `md:` (在移动端优先的 uni-app 中较少使用)。
- 图标: 通过 UnoCSS preset 使用 `i-carbon-{icon-name}`。

## 🧩 组件库
- **核心库**: `wot-design-uni` (`wd-` 前缀)。
- **文档**: [wot-design-uni](https://wot-ui.cn).
- **自定义组件**: 在 `src/components` 中创建。

## 📢 全局反馈
- **Toast/Message**: 请勿直接使用 `uni.showToast`。
- **标准**: 使用 `GlobalToast`, `GlobalMessage`, `GlobalLoading` 组件。
- **Skill**: 参考 **`global-feedback`** skill 查看使用示例。

## 📱 布局
- **系统**: `vite-plugin-uni-layouts`。
- **默认**: `src/layouts/default.vue`。
- **TabBar**: `src/layouts/tabbar.vue`。

---

## ✨ 现代化商业页面设计规范

本规范适用于零售/生鲜/餐饮等业务管理后台的页面设计，追求**年轻化、商业化、现代化**的视觉效果。

### 🎯 设计原则

1. **渐变色彩**: 使用品牌色渐变，避免单一颜色背景
2. **层次阴影**: 通过阴影创造卡片层次感
3. **圆角亲和**: 使用 16-24px 圆角，柔和亲切
4. **状态可视化**: 库存/订单状态用颜色区分 (绿=正常/黄=警告/红=异常)
5. **信息密度**: 关键信息(金额/数量/状态)突出显示

### 🎨 色彩体系

#### 页面头部渐变 (根据业务场景选择)

| 场景 | 渐变色 | 示例 |
|------|--------|------|
| 工作台/首页 | `from-indigo-600 via-purple-600 to-pink-500` | 紫粉渐变 |
| 采购录入 | `from-emerald-500 to-teal-600` | 翡翠绿渐变 |
| 销售订单 | `from-pink-500 via-rose-500 to-orange-400` | 玫瑰橙渐变 |
| 财务报表 | `from-blue-500 via-indigo-500 to-purple-500` | 蓝紫渐变 |
| 客户管理 | `from-cyan-500 to-blue-500` | 青色渐变 |

#### 状态色彩

| 状态 | 背景色 | 文字色 | 场景 |
|------|--------|--------|------|
| 正常/完成 | `#ecfdf5` (green-50) | `#10b981` (green-600) | 库存充足/订单完成 |
| 警告/紧张 | `#fffbeb` (amber-50) | `#f59e0b` (amber-600) | 库存紧张/待处理 |
| 异常/不足 | `#fef2f2` (red-50) | `#ef4444` (red-500) | 库存不足/订单异常 |
| 进行中 | `#eff6ff` (blue-50) | `#3b82f6` (blue-600) | 处理中/配送中 |

### 📐 页面结构

#### 1. 页面头部 (Header)

```vue
<view class="bg-gradient-to-r from-[主色] to-[副色] px-5 py-4">
  <view class="flex items-center justify-between">
    <view>
      <text class="block text-sm text-white/80">副标题</text>
      <text class="text-2xl font-bold text-white">主标题</text>
    </view>
    <view class="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
      <text class="text-2xl">图标</text>
    </view>
  </view>
</view>
```

**要点**:
- 使用 `text-white/80` 实现半透明文字
- 右侧图标使用圆形背景 `rounded-full bg-white/20`
- 内边距 `px-5 py-4`

#### 2. 信息卡片 (Card)

```vue
<view class="mx-4 -mt-4">
  <view class="rounded-2xl bg-white p-5 shadow-lg shadow-[颜色]/10">
    <!-- 标题 -->
    <view class="mb-4 flex items-center">
      <view class="mr-2 h-2 w-2 rounded-full bg-[主色]" />
      <text class="font-medium text-gray-800">标题</text>
    </view>
    <!-- 内容 -->
  </view>
</view>
```

**要点**:
- 使用 `-mt-4` 实现与头部的重叠效果
- 圆角 `rounded-2xl` (24px)
- 阴影 `shadow-lg shadow-[颜色]/10`
- 标题前加小圆点指示器

#### 3. 列表项 (List Item)

```vue
<view class="overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-md">
  <view class="flex items-center justify-between p-4">
    <!-- 左侧: 图标 + 文字 -->
    <view class="flex items-center">
      <view class="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[状态色]" />
      <view>
        <text class="font-medium text-gray-800">标题</text>
        <text class="text-sm text-gray-400">副标题</text>
      </view>
    </view>
    <!-- 右侧: 金额/状态 -->
    <view class="text-right">
      <text class="font-semibold text-gray-800">¥金额</text>
    </view>
  </view>
</view>
```

**要点**:
- 悬停效果 `hover:shadow-md`
- 选中状态使用彩色背景卡片
- 金额使用大号字体突出

#### 4. 表单项 (Form Field)

```vue
<view>
  <text class="mb-2 block text-xs font-medium text-gray-500">标签</text>
  <wd-picker ...>
    <template #default="{ value }">
      <view class="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
        <view class="flex items-center">
          <text class="mr-2 text-lg">图标</text>
          <text class="text-gray-800">{{ value?.label || '请选择' }}</text>
        </view>
        <text class="text-gray-400">›</text>
      </view>
    </template>
  </wd-picker>
</view>
```

**要点**:
- 使用 `bg-gray-50` 浅灰背景
- 标签使用 `text-xs font-medium text-gray-500`
- 添加图标增强可识别性

#### 5. 快捷操作 (Quick Actions)

```vue
<view class="grid grid-cols-4 gap-3 rounded-2xl bg-white p-4 shadow-lg">
  <view class="flex flex-col items-center">
    <view class="mb-2 flex h-12 w-12 items-center justify-center rounded-xl" :style="{ backgroundColor: 颜色 + '15' }">
      <text :class="图标" :style="{ color: 颜色 }" />
    </view>
    <text class="text-xs text-gray-600">标签</text>
  </view>
</view>
```

**要点**:
- 使用 `颜色 + '15'` 实现 10% 透明度的背景
- 彩色图标增强视觉焦点

#### 6. 底部固定栏 (Fixed Bottom Bar)

```vue
<view class="pb-safe fixed bottom-0 left-0 right-0 bg-white px-4 py-4 shadow-lg">
  <view class="mb-3 flex items-center justify-between">
    <view class="flex items-center">
      <text class="text-gray-600">合计</text>
      <view class="ml-2 rounded-full bg-[主色] px-2 py-0.5">
        <text class="text-xs font-medium text-[主色]">数量</text>
      </view>
    </view>
    <text class="text-2xl font-bold text-[主色]">¥金额</text>
  </view>
  <wd-button type="primary" block size="large">按钮</wd-button>
</view>
```

**要点**:
- 使用 `pb-safe` 处理安全区域
- 金额使用 `text-2xl font-bold` 大字突出
- 数量使用徽章样式

### 🧩 组件模式

#### 状态标签 (Status Badge)

```vue
<view
  class="rounded-full px-2 py-0.5 text-xs"
  :style="{ backgroundColor: 状态背景色, color: 状态文字色 }"
>
  状态文字
</view>
```

#### 选中按钮 (Selected Chip)

```vue
<view
  class="flex items-center rounded-full px-4 py-2 text-sm transition-all"
  :class="选中 ? 'bg-[主色] text-white shadow-lg shadow-[主色]/30' : 'bg-gray-100 text-gray-600'"
>
  <text class="mr-1">图标</text>
  <text>文字</text>
</view>
```

#### 空状态 (Empty State)

```vue
<view class="rounded-2xl bg-white py-12 text-center shadow-sm">
  <view class="mb-2 text-4xl">图标</view>
  <text class="text-gray-400">提示文字</text>
</view>
```

### 📋 命名规范

- **页面后缀**: `/index.vue`
- **组件前缀**: 根据功能如 `Adminer`, `SaleForm`
- **样式类**: 使用 UnoCSS 原子类，复杂样式用 `style` 绑定

### ✅ 检查清单

新页面设计时检查:
- [ ] 是否有渐变色头部？
- [ ] 卡片是否有阴影和圆角？
- [ ] 状态是否有颜色区分？
- [ ] 关键信息(金额/数量)是否突出？
- [ ] 是否有空状态展示？
- [ ] 底部按钮是否固定？
