import { Role } from '@/shard/index'

export interface TabbarItem {
  name: string
  value: number | null
  active: boolean
  title: string
  icon: string
}

const roleOptions = {
  [Role.ADMINER]: [
    { name: 'home', value: null, active: true, title: '工作台', icon: 'home' },
    { name: 'charts', value: null, active: false, title: '分析', icon: 'chart' },
    { name: 'mine', value: null, active: false, title: '我的', icon: 'user' },
  ],
  [Role.SUPPLIER]: [
    { name: 'home', value: null, active: true, title: '工作台', icon: 'home' },
    { name: 'charts', value: null, active: false, title: '分析', icon: 'chart' },
    { name: 'mine', value: null, active: false, title: '我的', icon: 'user' },
  ],
}

const tabbarItems = ref<TabbarItem[]>([])

export function useTabbar(role: Role) {
  if (role === Role.ADMINER) {
    tabbarItems.value = roleOptions[Role.ADMINER]
  }
  else if (role === Role.SUPPLIER) {
    tabbarItems.value = roleOptions[Role.SUPPLIER]
  }
  const tabbarList = computed(() => tabbarItems.value)

  const activeTabbar = computed(() => {
    const item = tabbarItems.value.find(item => item.active)
    return item || tabbarItems.value[0]
  })

  const getTabbarItemValue = (name: string) => {
    const item = tabbarItems.value.find(item => item.name === name)
    return item && item.value ? item.value : null
  }

  const setTabbarItem = (name: string, value: number) => {
    const tabbarItem = tabbarItems.value.find(item => item.name === name)
    if (tabbarItem) {
      tabbarItem.value = value
    }
  }

  const setTabbarItemActive = (name: string) => {
    tabbarItems.value.forEach((item) => {
      if (item.name === name) {
        item.active = true
      }
      else {
        item.active = false
      }
    })
  }

  const updateTabbarItems = (items: TabbarItem[]) => {
    tabbarItems.value = items
  }

  return {
    tabbarList,
    activeTabbar,
    getTabbarItemValue,
    setTabbarItem,
    setTabbarItemActive,
    updateTabbarItems,
  }
}
