<template>
  <header class="fixed top-0 right-0 left-64 bg-white border-b border-gray-200 shadow-sm z-30">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- 検索バー -->
        <div class="flex-1 max-w-md">
          <div class="relative">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="チケット番号、件名で検索..."
              class="input input-bordered w-full pl-10 pr-4 py-2 text-sm"
              v-model="searchQuery"
            />
          </div>
        </div>

        <!-- 右側メニュー -->
        <div class="flex items-center space-x-4">
          <!-- 緊急通知表示 -->
          <div v-if="urgentNotifications.length > 0" class="flex items-center space-x-2 bg-error/10 text-error px-3 py-2 rounded-lg border border-error/20">
            <ExclamationTriangleIcon class="h-4 w-4 flex-shrink-0" />
            <div class="text-sm font-medium min-w-0">
              <div class="truncate">{{ currentUrgentNotification.title }}</div>
            </div>
          </div>

          <!-- 通知ベル -->
          <div class="dropdown dropdown-end" ref="notificationDropdown">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle relative" @click="toggleNotifications">
              <BellIcon class="h-5 w-5" />
              <span v-if="notifications.length > 0" class="absolute -top-1 -right-1 badge badge-error badge-sm text-white">
                {{ notifications.length }}
              </span>
            </div>
            <div v-if="showNotifications" tabindex="0" class="dropdown-content menu bg-white border border-gray-200 rounded-box z-[1] w-80 p-0 shadow-lg">
              <div class="p-4 border-b border-gray-200">
                <h3 class="font-semibold text-gray-900">通知</h3>
              </div>
              <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500">
                通知はありません
              </div>
              <div v-else class="max-h-96 overflow-y-auto">
                <div 
                  v-for="(notification, index) in notifications" 
                  :key="notification.id"
                  class="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  :class="{ 'bg-blue-50': index === currentNotificationIndex }"
                >
                  <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0">
                      <div class="w-2 h-2 rounded-full" :class="getNotificationColor(notification.type)"></div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                      <p class="text-sm text-gray-600 mt-1">{{ notification.message }}</p>
                      <p class="text-xs text-gray-400 mt-2">{{ formatTime(notification.timestamp) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="notifications.length > 1" class="p-3 border-t border-gray-200 bg-gray-50">
                <div class="flex items-center justify-between text-xs text-gray-600">
                  <span>{{ currentNotificationIndex + 1 }} / {{ notifications.length }}</span>
                  <span>5秒ごとに自動切り替え</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-1 mt-2">
                  <div 
                    class="bg-primary h-1 rounded-full transition-all duration-100"
                    :style="{ width: `${rotationProgress}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

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
                <router-link to="/login" class="flex items-center space-x-2 p-2 text-error">
                  <ArrowRightOnRectangleIcon class="h-4 w-4" />
                  <span>ログアウト</span>
                </router-link>
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
  MagnifyingGlassIcon, 
  BellIcon, 
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

const { user, userRole } = useAuth()
const searchQuery = ref('')
const showNotifications = ref(false)
const currentNotificationIndex = ref(0)
const currentUrgentIndex = ref(0)
const rotationProgress = ref(0)
const notificationDropdown = ref(null)

let rotationInterval = null
let progressInterval = null
let urgentRotationInterval = null

// ユーザー別通知データ
const allNotifications = {
  user: [
    {
      id: 1,
      type: 'info',
      title: 'チケット更新',
      message: '#IWS-2025-000489 の状態が「進行中」に変更されました',
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: 2,
      type: 'success',
      title: '問合せ回答',
      message: '#IWS-2025-000489 に新しい回答があります',
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: 3,
      type: 'success',
      title: 'チケット完了',
      message: '#IWS-2025-000473 が完了しました。評価をお願いします',
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    }
  ],
  approver: [
    {
      id: 1,
      type: 'warning',
      title: '承認依頼',
      message: '#IWS-2025-000462 の承認が必要です',
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: 2,
      type: 'warning',
      title: '承認依頼',
      message: '#IWS-2025-000485 の承認が必要です',
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: 3,
      type: 'info',
      title: 'チケット更新',
      message: '自分のチケット #IWS-2025-000490 が進行中になりました',
      timestamp: new Date(Date.now() - 25 * 60 * 1000)
    }
  ],
  support: [
    {
      id: 1,
      type: 'info',
      title: '新規チケット',
      message: '#IWS-2025-000491 が起票されました',
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: 2,
      type: 'warning',
      title: 'SLA警告',
      message: '#IWS-2025-000489 がSLA期限に近づいています',
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: 3,
      type: 'success',
      title: 'チケット承認',
      message: '#IWS-2025-000462 が承認されました',
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    }
  ]
}

// 現在のユーザーに応じた通知
const notifications = ref([])

// ユーザーロールに応じて通知を更新
const updateNotifications = () => {
  notifications.value = allNotifications[userRole.value] || []
}

// ユーザー別緊急通知
const allUrgentNotifications = {
  user: [],
  approver: [
    {
      id: 1,
      type: 'error',
      title: '緊急承認: P1チケット発生',
      message: '店舗12 Wi-Fi全断の緊急承認が必要です',
      timestamp: new Date(Date.now() - 2 * 60 * 1000)
    }
  ],
  support: [
    {
      id: 1,
      type: 'error',
      title: 'P1緊急: 店舗12 Wi-Fi全断',
      message: '顧客対応に支障が発生しています',
      timestamp: new Date(Date.now() - 2 * 60 * 1000)
    },
    {
      id: 2,
      type: 'error',
      title: 'P1緊急: Z-CRMサーバー障害',
      message: 'システム全体に影響があります',
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    }
  ]
}

// 現在のユーザーに応じた緊急通知
const urgentNotifications = ref([])

// ユーザーロールに応じて緊急通知を更新
const updateUrgentNotifications = () => {
  urgentNotifications.value = allUrgentNotifications[userRole.value] || []
}

// 現在表示中の緊急通知
const currentUrgentNotification = computed(() => {
  if (urgentNotifications.value.length === 0) return null
  return urgentNotifications.value[currentUrgentIndex.value]
})

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  
  if (showNotifications.value && notifications.value.length > 1) {
    startRotation()
  } else {
    stopRotation()
  }
}

const startRotation = () => {
  stopRotation() // 既存のインターバルをクリア
  
  // 5秒ごとに通知を切り替え
  rotationInterval = setInterval(() => {
    if (notifications.value.length > 1) {
      currentNotificationIndex.value = (currentNotificationIndex.value + 1) % notifications.value.length
      rotationProgress.value = 0 // プログレスバーをリセット
    }
  }, 5000)
  
  // プログレスバーの更新（100ms間隔）
  progressInterval = setInterval(() => {
    rotationProgress.value += 2 // 5秒で100%になるように調整
    if (rotationProgress.value >= 100) {
      rotationProgress.value = 0
    }
  }, 100)
}

const stopRotation = () => {
  if (rotationInterval) {
    clearInterval(rotationInterval)
    rotationInterval = null
  }
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  rotationProgress.value = 0
}

// 緊急通知のローテーション開始
const startUrgentRotation = () => {
  if (urgentNotifications.value.length <= 1) return
  
  urgentRotationInterval = setInterval(() => {
    currentUrgentIndex.value = (currentUrgentIndex.value + 1) % urgentNotifications.value.length
  }, 10000) // 10秒ごと
}

// 緊急通知のローテーション停止
const stopUrgentRotation = () => {
  if (urgentRotationInterval) {
    clearInterval(urgentRotationInterval)
    urgentRotationInterval = null
  }
}

const getNotificationColor = (type) => {
  const colors = {
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
    success: 'bg-green-500',
    error: 'bg-red-500'
  }
  return colors[type] || 'bg-gray-500'
}

const formatTime = (timestamp) => {
  const now = new Date()
  const diff = now - timestamp
  const minutes = Math.floor(diff / (1000 * 60))
  
  if (minutes < 1) return 'たった今'
  if (minutes < 60) return `${minutes}分前`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}時間前`
  
  const days = Math.floor(hours / 24)
  return `${days}日前`
}

// 外部クリックで通知を閉じる
const handleClickOutside = (event) => {
  if (notificationDropdown.value && !notificationDropdown.value.contains(event.target)) {
    showNotifications.value = false
    stopRotation()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  // 初期通知設定
  nextTick(() => {
    updateNotifications()
    updateUrgentNotifications()
  })
  // 緊急通知のローテーション開始
  if (urgentNotifications.value.length > 1) {
    startUrgentRotation()
  }
})

// ユーザーロール変更時に通知を更新
watch(userRole, () => {
  updateNotifications()
  updateUrgentNotifications()
  
  // 緊急通知ローテーションを再開
  stopUrgentRotation()
  if (urgentNotifications.value.length > 1) {
    startUrgentRotation()
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  stopRotation()
  stopUrgentRotation()
})
</script>