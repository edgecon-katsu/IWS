<template>
  <aside class="fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 shadow-sm z-40">
    <!-- ロゴ部分 -->
    <div class="p-4 border-b border-gray-200">
      <router-link to="/" class="flex items-center space-x-2">
        <span class="text-xl font-bold text-primary">IWS</span>
      </router-link>
    </div>
    
    <nav class="p-4">
      <ul class="menu menu-vertical w-full space-y-1">
        <li v-if="userRole === 'support'">
          <router-link 
            to="/dashboard"
            class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
            :class="isActive('/dashboard') ? 'bg-primary text-primary-content' : 'hover:bg-base-200'"
          >
            <HomeIcon class="h-5 w-5" />
            <span class="font-medium">ダッシュボード</span>
          </router-link>
        </li>
        
        <li>
          <router-link 
            to="/inquiry/new"
            class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
            :class="isActive('/inquiry') ? 'bg-primary text-primary-content' : 'hover:bg-base-200'"
          >
            <PlusCircleIcon class="h-5 w-5" />
            <span class="font-medium">新規問い合わせ</span>
          </router-link>
        </li>
        
        <li v-if="userRole === 'support'">
          <router-link 
            to="/all-tickets"
            class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
            :class="isActive('/all-tickets') ? 'bg-primary text-primary-content' : 'hover:bg-base-200'"
          >
            <TicketIcon class="h-5 w-5" />
            <div class="flex items-center justify-between flex-1">
              <span class="font-medium">全チケット</span>
              <span class="badge badge-sm bg-info text-white">12</span>
            </div>
          </router-link>
        </li>
        
        <li v-if="userRole !== 'support'">
          <router-link 
            to="/tickets"
            class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
            :class="isActive('/tickets') ? 'bg-primary text-primary-content' : 'hover:bg-base-200'"
          >
            <TicketIcon class="h-5 w-5" />
            <div class="flex items-center justify-between flex-1">
              <span class="font-medium">マイチケット</span>
              <span class="badge badge-sm bg-info text-white">5</span>
            </div>
          </router-link>
        </li>
        
        <li v-if="canApprove">
          <router-link 
            to="/approvals"
            class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
            :class="isActive('/approvals') ? 'bg-primary text-primary-content' : 'hover:bg-base-200'"
          >
            <ClipboardDocumentCheckIcon class="h-5 w-5" />
            <div class="flex items-center justify-between flex-1">
              <span class="font-medium">承認待ち</span>
              <span class="badge badge-sm bg-warning text-white">2</span>
            </div>
          </router-link>
        </li>

        <div class="divider my-4"></div>

        <li v-if="canManageSettings">
          <router-link 
            to="/settings"
            class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
            :class="isActive('/settings') ? 'bg-primary text-primary-content' : 'hover:bg-base-200'"
          >
            <Cog6ToothIcon class="h-5 w-5" />
            <span class="font-medium">設定</span>
          </router-link>
        </li>
        
        <li>
          <router-link 
            to="/settings/theme"
            class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
            :class="isActive('/settings/theme') ? 'bg-primary text-primary-content' : 'hover:bg-base-200'"
          >
            <SwatchIcon class="h-5 w-5" />
            <span class="font-medium">テーマ設定</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { 
  HomeIcon, 
  PlusCircleIcon, 
  TicketIcon, 
  ClipboardDocumentCheckIcon, 
  Cog6ToothIcon,
  SwatchIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const { user, userRole, canApprove, canViewAllTickets, canManageSettings } = useAuth()

// アクティブな状態の判定
const isActive = (path) => {
  if (path === '/dashboard') {
    return route.path === '/dashboard'
  }
  return route.path.startsWith(path)
}
</script>