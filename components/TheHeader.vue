<template>
  <header class="fixed top-0 right-0 left-64 bg-white border-b border-gray-200 shadow-sm z-30">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- 空のスペース -->
        <div class="flex-1"></div>

        <!-- 右側メニュー -->
        <div class="flex items-center space-x-4">
          <!-- ユーザーメニュー -->
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost flex items-center space-x-2">
              <div class="avatar placeholder">
                <div class="bg-primary text-primary-content rounded-full w-8 h-8">
                  <span class="text-sm">{{ user?.name?.charAt(0) || 'U' }}</span>
                </div>
              </div>
              <div class="text-left">
                <div class="text-sm font-medium">{{ user?.name || 'ユーザー' }}</div>
                <div class="text-xs text-gray-500">{{ user?.department || '部署' }}</div>
              </div>
              <ChevronDownIcon class="h-4 w-4" />
            </div>
            <ul tabindex="0" class="dropdown-content menu bg-white border border-gray-200 rounded-box z-[1] w-52 p-2 shadow-lg">
              <li>
                <button @click="handleLogout" class="flex items-center space-x-2 p-2 text-error w-full text-left">
                  <ArrowRightOnRectangleIcon class="h-4 w-4" />
                  <span>ログアウト</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline'

const { user, logout } = useAuth()

const handleLogout = async () => {
  await logout()
}
</script>